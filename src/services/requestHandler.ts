import { endpoints, StatusCodes, Response } from "../types/types";
import Users from "../controllers/usersController";
import { IncomingMessage } from "http";
import { PORT, isMulti } from "../data/constants";
import cluster from "cluster";

const requestHandler = (req: IncomingMessage, res: Response) => {
  if (isMulti && cluster.isWorker) {
    console.log(
      `Request: ${req.method} ${req.url} - Worker on a port ${process.env.WORKER_PORT}. Pid: ${process.pid}`,
    );
  } else {
    console.log(
      `Request: ${req.method} ${req.url} - Server on port ${PORT}. Pid: ${process.pid}`,
    );
  }

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
