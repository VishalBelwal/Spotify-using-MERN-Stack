const mongoose = require("mongoose");


const favSongs = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
        },
    ]
});

const likedSongsModel = mongoose.model("LikedSongs", favSongs);

module.exports = likedSongsModel;