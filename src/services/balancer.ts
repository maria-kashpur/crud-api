import cluster from "cluster";
import { Server, createServer } from "http";
import { cpus } from "os";
import { HOST, PORT } from "../data/constants";
import { ServiceForUsersBase } from "../data/users";
import requestHandlePrime from "./requestHandlerPrime";

const cores = cpus();

export const balancer = (server: Server) => {
  if (cluster.isPrimary) {
    cores.map((_, i) => {
      const worker = cluster.fork({ WORKER_PORT: PORT + i + 1 });
      worker.on("message", (message) => {
        ServiceForUsersBase.updateUsers(message);
        cores.map((_, i) => {
          const currentWorker = cluster.workers && cluster.workers[i + 1];
          if (currentWorker) {
            currentWorker.send({ data: ServiceForUsersBase.getUsers() });
          }
        });
      });
    });

    createServer(requestHandlePrime).listen(PORT, () => {
      console.log(`Balancer #${process.pid} is listening port ${PORT}`);
    });
  } else if (cluster.isWorker) {
    const workerPort = Number(process.env.WORKER_PORT);
    server.listen(workerPort, () => {
      console.log(
        `Worker started: http://${HOST}:${workerPort}. Pid: ${process.pid}`,
      );
    });
    process.on("message", ({ data }) => ServiceForUsersBase.updateUsers(data));
  }
};
