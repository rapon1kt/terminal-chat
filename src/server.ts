import net from "net";
import { Log, Send } from "@/actions";
import { prisma } from "./config/prisma/db";
import send from "./actions/send";
require("dotenv").config();

const server = net.createServer();
const sessions = new Map<net.Socket, number>();

server.on("connection", (socket) => {
  const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`[${clientId}] connected`);

  socket.on("data", async (buffer) => {
    const message = buffer.toString().trim();
    const [command, ...args] = message.split(" ");
    if (command === "LOGIN") {
      const username = args[0];
      if (!username) return Send(socket, "ERRO: please insert an username.");
      let user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) {
        user = await prisma.user.create({
          data: { username },
        });
        send(socket, `USER created: ${username}`);
      } else {
        send(socket, `Welcome back, ${username}!`);
      }
      sessions.set(socket, user.id);
      Log(socket, `USER connected with id: ${user.id}`);
      return;
    }

    const userId = sessions.get(socket);
    if (!userId) return send(socket, `ERRO: login is necessary.`);

    if (command === "LOGOUT") {
      sessions.delete(socket);
      send(socket, `LOGOUT with success.`);
      return;
    }
    send(socket, "Command not found.");
  });

  socket.on("end", () => {
    const userId = sessions.get(socket);
    if (userId) {
      console.log(`[${clientId}] disconnected, removing session...`);
      sessions.delete(socket);
    }
  });

  socket.on("error", (err) => {
    console.log(`[${clientId}] ERROR: ${err}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server bound!");
});
