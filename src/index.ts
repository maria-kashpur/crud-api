import { createServer } from "http";
import { PORT, HOST } from "./data/constants";
import { StatusCodes, endpoints } from "./types/types";
import Users from "./controllers/usersController";

export const server = createServer((req, res) => {
  const { url } = req;

  const isUserEndpoint = url?.startsWith(endpoints.users);

  if (isUserEndpoint) {
    Users.handle(req, res);
  } else {
    res.statusCode = StatusCodes.NOT_FOUND;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started: http://${HOST}:${PORT}`);
});
