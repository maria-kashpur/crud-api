import { createServer } from "http";
import { HOST, PORT } from "./data/constants";

const server = createServer((_req, res) => {
  res.write("ok");
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
