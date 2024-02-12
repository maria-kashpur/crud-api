import { createServer } from "http";
import requestHandler from "./services/requestHandler";
import { isMulti as isMulti } from "./data/constants";
import { HOST, PORT } from "./data/constants";
import { balancer } from "./services/balancer";

const server = createServer(requestHandler);

if (isMulti) {
  balancer(server);
} else {
  server.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
  });
}

process.on("SIGINT", () => {
  server.close(() => process.exit());
});
