import net from "net";

export default function send(socket: net.Socket, message: string) {
  socket.write(message + "\n");
}
