/* eslint-disable @typescript-eslint/no-unused-vars */
import { IncomingMessage, ServerResponse } from "http";
import Users from "../models/usersModel";
import { getIdfromURL } from "../utils/getIdFromUrl";
import { validate as uuidValidate } from "uuid";
import { User, endpoints, StatusCodes } from "../types/types";
import parseBody from "../utils/parseBody";

type Response = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
};

const USER_WHITH_ID = /^\/api\/users\/[^\/]+$/;

export default class UserController {
  static async handle(req: IncomingMessage, res: Response) {
    try {
      const { url, method } = req;
      const staticRoute = url === endpoints.users;
      const routeWithID = url?.match(USER_WHITH_ID);
      let id = null;
      let body = null;
      const isValidMethod =
        method && ["GET", "PUT", "DELETE", "POST"].includes(method);
      const isValidRoute = staticRoute || routeWithID;

      if (!isValidMethod) {
        return this.createServerRes(res, StatusCodes.NOT_FOUND, {
          message: "Not found method",
        });
      }

      if (routeWithID) {
        id = getIdfromURL("users", req.url);
        if (!id || !uuidValidate(id)) {
          return this.createServerRes(res, StatusCodes.BAD_REQUEST, {
            message: "userId is invalid (not uuid)",
          });
        }
      }

      if ((method === "POST" || method === "PUT") && isValidRoute) {
        body = await parseBody(req);
        const isValidBody = Users.checkData(body);
        if (!isValidBody) {
          return this.createServerRes(res, StatusCodes.BAD_REQUEST, {
            message: "request body does not contain required fields",
          });
        }
      }

      switch (true) {
        case staticRoute && method === "GET":
          await this.getAll(req, res);
          break;

        case staticRoute && method === "POST":
          await this.add(req, res, body as unknown as Omit<User, "id">);
          break;

        case routeWithID && method === "GET":
          await this.getByID(req, res, id as string);
          break;

        case routeWithID && method === "PUT":
          await this.update(
            req,
            res,
            id as string,
            body as unknown as Omit<User, "id">,
          );
          break;

        case routeWithID && method === "DELETE":
          await this.delete(req, res, id as string);
          break;

        default:
          this.createServerRes(res, StatusCodes.NOT_FOUND, {
            message: "Not found endpoint",
          });
          break;
      }
    } catch (e) {
      console.log(`Server error: ${e}`);
      this.createServerRes(res, StatusCodes.SERVER_ERROR, {
        message: "Error on the server side",
      });
    }
  }

  static async getAll(_req: IncomingMessage, res: Response) {
    const users = await Users.getAll();
    UserController.createServerRes(res, StatusCodes.OK, users);
  }

  static async getByID(_req: IncomingMessage, res: Response, id: string) {
    const user = await Users.getByID(id);

    if (!user) {
      this.createServerRes(res, StatusCodes.NOT_FOUND, {
        message: `userId doesn't exist`,
      });
    } else {
      this.createServerRes(res, StatusCodes.OK, user);
    }
  }

  static async add(
    req: IncomingMessage,
    res: Response,
    body: Omit<User, "id">,
  ) {
    const user = await Users.add(body);
    if (user) {
      this.createServerRes(res, StatusCodes.CREATED, user);
    }
  }

  static async delete(_req: IncomingMessage, res: Response, id: string) {
    const isUser = await Users.delete(id);
    if (isUser) {
      this.createServerRes(res, StatusCodes.NO_CONTENT);
    } else {
      this.createServerRes(res, StatusCodes.NOT_FOUND, {
        message: "userId doesn't exist",
      });
    }
  }

  static async update(
    req: IncomingMessage,
    res: Response,
    id: string,
    body: Omit<User, "id">,
  ) {
    const user = await Users.update(id, body);
    if (user) {
      this.createServerRes(res, StatusCodes.OK, user);
    } else {
      this.createServerRes(res, StatusCodes.NOT_FOUND, {
        message: `userId doesn't exist`,
      });
    }
  }

  private static createServerRes(
    res: Response,
    status: number,
    data?: unknown,
  ) {
    res.statusCode = status;

    if (data) {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(data));
    }
    res.end();
  }
}
