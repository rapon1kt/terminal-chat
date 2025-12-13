import net from "net";
import { route } from "./router";
import { log, send } from "@/utils";

require("dotenv").config();

const server = net.createServer();
export const sessions = new Map<net.Socket, number>();

server.on("connection", (socket) => {
  log(socket, "connected");
  socket.on("data", async (buffer) => {
    const response = await route(socket, buffer.toString().trim());
    send(socket, response);
  });

  socket.on("end", () => {
    const userId = sessions.get(socket);
    log(socket, "disconnected");
    if (userId) sessions.delete(socket);
  });

  socket.on("error", (err) => {
    log(socket, `ERROR: ${err}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server bound!");
});
