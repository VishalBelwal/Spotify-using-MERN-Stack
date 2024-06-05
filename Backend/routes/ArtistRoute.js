const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const Artist = require("../models/Artist");


//get all things by an artist
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const {artistId} = req.params

    const artist = await Song.findOne({_id: artistId})
    if (!artist) {
      return res.status(301).json({err: "Artist Doesnot exist"})
    }

    const songs = await Artist.find({artist: artistId})
    return res.status(200).json({data: songs})
  }
)


module.exports = router;
