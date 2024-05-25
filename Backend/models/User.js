
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    password: {
      type:String,
      required:true,
      private: true,
    },
    lastName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    likedSongs: [{
      type: mongoose.Types.ObjectId,
      ref: "Song"
    }],
    likedPlaylist: {
      type: String,
      default: ""
    },
    likedArtists: {
      type: String,
      default: ""
    },
    
})

const UserModel = mongoose.model("User", User);

module.exports = UserModel;