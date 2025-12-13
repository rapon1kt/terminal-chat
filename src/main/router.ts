import net from "net";
import { sessions } from "./server";
import { bufferParser } from "@/utils";
import { userController } from "@/controllers";

export async function route(socket: net.Socket, bufferMessage: string) {
  const { command, args, payload } = bufferParser(bufferMessage);
  if (command === "LOGIN") {
    const user = await userController.handleLogin(args[0]);
    sessions.set(socket, user.id);
    return `Welcome back, ${user.username}!`;
  }
  const userId = sessions.get(socket);
  if (!userId) return "Please login first: [LOGIN <username>]";

  if (command === "LOGOUT") {
    sessions.delete(socket);
    return "LOGOUT with success.";
  }

  return `Command not found: ${command}`;
}
