const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
  },
  moods: [
    {
      type: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
