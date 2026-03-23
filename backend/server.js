const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/cricket");

const Team = require("./models/Team");
const Match = require("./models/Match");

// ROUTES
app.post("/api/team", async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.json(team);
});

app.get("/api/team", async (req, res) => {
  res.json(await Team.find());
});

app.post("/api/match", async (req, res) => {
  const match = new Match(req.body);
  await match.save();
  res.json(match);
});

app.get("/api/match", async (req, res) => {
  res.json(await Match.find());
});

// SOCKET
io.on("connection", (socket) => {
  socket.on("scoreUpdate", (data) => {
    io.emit("liveScore", data);
  });
});

server.listen(5000, () => console.log("Server running on 5000"));
