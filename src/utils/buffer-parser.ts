import ParsedBuffer from "@/types";

export default function bufferParser(message: string): ParsedBuffer {
  const [command, ...rest] = message.split(" ");
  if (!command) return null;

  const upper = command.toUpperCase();

  if (upper === "MSG") {
    const room = rest.shift();
    const payload = rest.join(" ");
    return { command: upper, args: [room], payload };
  }
  return { command: upper, args: rest, payload: null };
}
