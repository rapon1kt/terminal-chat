import net from "net";
import { Log, Send } from "@/actions";
require("dotenv").config();

const server = net.createServer();

server.on("connection", (socket) => {
  const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`[${clientId}] connected`);

  socket.on("data", (buffer) => {
    const message = buffer.toString().trim();
    Log(socket, `Message received: ${message}`);
    Send(socket, `Server received: ${message}`);
  });

  socket.on("end", () => {
    console.log(`[${clientId}] disconnected`);
  });

  socket.on("error", (err) => {
    console.log(`[${clientId}] ERROR: ${err}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server bound!");
});
