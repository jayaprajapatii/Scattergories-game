const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const rooms = {};

function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomIndex = Math.floor(
    Math.random() * alphabet.length
  );

  return alphabet[randomIndex];
}

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend connected successfully",
  });
});

app.post("/api/create-room", (req, res) => {
  const roomCode = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  rooms[roomCode] = {
    round: 1,
    currentLetter: ""
  };

  console.log("Rooms after create:", rooms);

  res.json({
    roomCode,
  });
});

app.post("/api/join-room", (req, res) => {
  const { roomCode } = req.body;

  console.log("Join request:", roomCode);
  console.log("Current rooms:", rooms);

  if (roomCode in rooms) {
    res.json({
      success: true,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }
});

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("next-round", (roomCode) => {

  console.log(
    "Next round request received:",
    roomCode
  );

  if (!roomCode || !rooms[roomCode]) {

    console.log("Invalid room code");

    return;

  }

  rooms[roomCode].round++;

  const newLetter = generateRandomLetter();

  rooms[roomCode].currentLetter = newLetter;

  io.to(roomCode).emit(
    "new-round",
    {
      round: rooms[roomCode].round,
      letter: newLetter,
    }
  );

});

  socket.on("join-room", (roomCode) => {

    socket.join(roomCode);

    console.log(socket.id, "joined room", roomCode);

    const room = io.sockets.adapter.rooms.get(roomCode);

    const playerCount = room ? room.size : 0;

    console.log(roomCode, "Players:", playerCount);

    io.to(roomCode).emit(
      "player-count",
      playerCount
    );

    if (playerCount === 2) {

  const randomLetter = generateRandomLetter();

  rooms[roomCode].currentLetter = randomLetter;

  io.to(roomCode).emit(
    "start-game",
    {
      round: rooms[roomCode].round,
      letter: randomLetter,
    }
  );
 }

});

  socket.on("disconnect", () => {

    console.log(
      "User disconnected:",
      socket.id
    );

  });

});

server.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});