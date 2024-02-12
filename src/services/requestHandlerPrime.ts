import { IncomingMessage } from "http";
import { Response, StatusCodes } from "../types/types";
import createServerRes from "../utils/createServerRes";
import { request } from "http";
import { PORT } from "../data/constants";
import { cpus } from "os";

const requestHandlePrime = async (req: IncomingMessage, res: Response) => {
  let currentPort = PORT + 1;
  const { url, method, headers } = req;

  try {
    const options = {
      port: currentPort,
      path: url,
      method: method,
      headers: headers,
    };

    const callback = async (resp: IncomingMessage) => {
      const data: Buffer[] = [];
      resp.on("data", (chunk: Buffer) => {
        data.push(chunk);
      });
      resp.on("end", () => {
        res.end(Buffer.concat(data).toString());
      });
      resp.on("error", () =>
        createServerRes(res, StatusCodes.SERVER_ERROR, {
          message: "Error on the server side",
        }),
      );
    };

    const childReq = request(options, callback);

    childReq.on("response", (childRes) => {
      res.statusCode = childRes.statusCode!;
    });

    childReq.on("error", () =>
      createServerRes(res, StatusCodes.SERVER_ERROR, {
        message: "Error on the server side",
      }),
    );

    const data: Buffer[] = [];

    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      childReq.end(Buffer.concat(data).toString());
    });
    req.on("error", () =>
      createServerRes(res, StatusCodes.SERVER_ERROR, {
        message: "Error on the server side",
      }),
    );
  } catch (e) {
    console.log(`Server error: ${e}`);
    createServerRes(res, StatusCodes.SERVER_ERROR, {
      message: "Error on the server side",
    });
  }

  currentPort = currentPort < PORT + cpus().length ? currentPort + 1 : PORT + 1;
};

export default requestHandlePrime;
