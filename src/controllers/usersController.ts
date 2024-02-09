/* eslint-disable @typescript-eslint/no-unused-vars */
import { IncomingMessage, ServerResponse } from "http";

type Response = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
};

export default class UserController {
  static async getAll(_req: IncomingMessage, _res: Response) {
    console.log("user controller: all users");
  }

  static async getByID(_req: IncomingMessage, _res: Response) {
    const id = "unknown";
    console.log(`user controller: user ${id}`);
  }

  static async add(_req: IncomingMessage, _res: Response) {
    const data = {
      username: "Ann",
      age: "10",
      hobbies: ["dance"],
    };
    console.log(`user controller: new user`, data);
  }

  static async delete(_req: IncomingMessage, _res: Response) {
    const id = "unknown";
    console.log(`user controller: delete user ${id}`);
  }

  static async update(_req: IncomingMessage, _res: Response) {
    const id = "unknown";
    const data = {
      username: "Ann",
      age: "20",
      hobbies: ["dance"],
    };
    console.log(`user controller: update user ${id}`, data);
  }
}
