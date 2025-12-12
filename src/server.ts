import net from "net";
require("dotenv").config();

const server = net.createServer();

server.on("connection", (client) => {
  console.log("Client just connected :)");
  client.write("Hello from server!");
  client.on("end", () => {
    console.log(`Client disconnected :(`);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server bound!");
});
