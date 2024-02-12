import { IncomingMessage } from "http";

export default async function parseBody(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk: Uint8Array) => {
        body += chunk;
      });

      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
