const express = require("express");
const router = express.Router()
const passport = require("passport");

const User = require("../models/User");

router.get(
  "/get/liked-songs",
  passport.authenticate("jwt", {session: false}),  
  async (req, res) => {

    const userId = req.user.id; // Assuming you have user authentication and can get user ID from the request
    const user = await User.findOne({_id: userId}).populate("likedSongs"); // Assuming likedSongs is an array of song IDs
    
    return res.status(200).json({user});
    
  }
)

module.exports = router;