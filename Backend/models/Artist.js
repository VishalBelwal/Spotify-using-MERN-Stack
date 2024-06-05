const mongoose = require("mongoose");

const Artist = new mongoose.Schema({
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const ArtistModel = mongoose.model("Artist", Artist);

module.exports = ArtistModel;