import { endpoints, StatusCodes, Response } from "../types/types";
import Users from "../controllers/usersController";
import { IncomingMessage } from "http";

const requestHandler = (req: IncomingMessage, res: Response) => {
  const { url } = req;

  const isUserEndpoint = url?.startsWith(endpoints.users);

  if (isUserEndpoint) {
    Users.handle(req, res);
  } else {
    res.statusCode = StatusCodes.NOT_FOUND;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
};

export default requestHandler;
