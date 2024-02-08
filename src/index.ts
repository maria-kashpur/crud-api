import { createServer } from "http";

const PORT = 3500;

const server = createServer((_, res) => {
  res.write("ok");
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
