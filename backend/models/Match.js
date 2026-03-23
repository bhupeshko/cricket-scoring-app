const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 }
});

module.exports = mongoose.model("Match", MatchSchema);
