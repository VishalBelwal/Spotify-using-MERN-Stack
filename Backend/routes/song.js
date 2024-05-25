const express = require("express");
const router = express.Router()
const passport = require("passport");
const Song = require("../models/Song")
const User = require("../models/User")

//passport.authenticate() user ko check karega aur token -pass karega

router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {                   //session user ko loggedin rakhne ke liye use hota hai hame baar baar login nahi karna padega koi bhi button dabane par
  const {name, thumbnail, track} = req.body
  if (!name || !thumbnail || !track) {
    return res 
      .status(301)
      .json({ error: "Insufficient details" });
  }
  const artist = req.user._id;

  const songDetails =  {name, thumbnail, track, artist}
  const createdSong = await Song.create(songDetails)
  return res.status(200).json(createdSong)
})

//get route to get all song i have published
router.get(
  "/get/mySongs",
  passport.authenticate("jwt", {session: false}),  
  async (req, res) => {

    //we need to get all songs where artistid == currentuser._id

    const songs = await Song.find({artist: req.user._id}).populate("artist");
    return res.status(200).json({data: songs})
  }
)

//get route to get all song any artist has published
//send artist id and ge all song by it
router.get(
  "/get/artist/:artistId", 
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const {artistId} = req.params;

    //We can check if the artist does nt exist
    const artist = await User.findOne({_id: artistId})

    if (!artist) {
      return res.status(301).json({err: "Artist Doesnot exist"})
    }

    const songs = await Song.find({artist: artistId})
    return res.status(200).json({data: songs})
  } 
);

//get route to set single song by name
router.get(
  "/get/songName/:songName",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const {songName} = req.params

    // const songs = await Song.find({name: songName})
    const songs = await Song.find({name: { $regex: songName, $options: 'i' }}).populate("artist");
    /*regex operator hai jo expression matching karega and i matching ko case sensitive banaega*/
    return res.status(200).json({data: songs})
  }
)

module.exports = router;