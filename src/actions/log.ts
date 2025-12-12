import net from "net";

export default function log(socket: net.Socket, message: string) {
  const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`[${clientId}] ${message}`);
}
