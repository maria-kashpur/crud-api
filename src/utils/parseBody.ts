import { IncomingMessage } from "http";

export const parseBody = (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    const data: Buffer[] = [];

    req.on("data", (chunk) => {
      data.push(chunk);
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(data).toString()));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
};

export default parseBody;
