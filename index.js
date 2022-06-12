const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const cors = require("cors");
const PORT = 3003;

app.use(cors());
app.use(express.json());

const time = 900000;
let deadline;

const start = () => {
  deadline = Date.now() + time;
  io.emit("deadline", deadline);
  console.log(deadline);

  setTimeout(start, time);
};

start();

io.on("connect", (socket) => {
  socket.emit("deadline", deadline);
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
