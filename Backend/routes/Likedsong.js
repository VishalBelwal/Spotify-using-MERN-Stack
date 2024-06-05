

const express = require("express");
const router = express.Router()
const passport = require("passport");
const User = require("../models/User")
const Song = require("../models/Song");
const Like = require("../models/likedSongs");



//1. create a playlist
router.post(
  "/create",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const currentUser = req.user;
    const {name, thumbnail, songs} = req.body
    if(!name || !thumbnail || !songs) {
      return res.status(301).json({err: "Insufficient data"})
    }
    const playlistData = {
      name,
      thumbnail, 
      songs,
      owner: currentUser._id,
      collaborators: [],
    }
    const playlist = await Playlist.create(playlistData)
    return res.status(200).json({playlist})
  }
)

//get a playlist by id route and we will return the playlist having that id
router.get(
  "/get/playlist/:playlistId",                 
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const playlistId = req.params.playlistId;

    //need to find a playlist with the _id = palylistId

    const playlist = await Playlist.findOne({_id : playlistId}).populate({
      path: "songs",
      populate: {
        path: "artist",
      }
    });
    if(!playlist) {
      return res.status(301).json({err: "Invalid ID"})
    }
    return res.status(200).json({playlist})
  }
)
//get all playlist made by me
//get/me
router.get(
  "/get/me",             
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({owner: artistId}).populate("owner");
    return res.status(200).json({data: playlists})
  }
)

//get all playlist made by an artist
router.get(
  "/get/artist/:artistId",             
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const artistId = req.params.artistId;

    const artist = await User.findOne({_id: artistId});
    if(!artist) {
      return res.status(304).json({err: "Invalid artist ID"})
    }

    const playlists = await Playlist.find({owner: artistId});
    return res.status(200).json({data: playlists})
  }
)

//Add Song to playlist
router.get(
  "/get/me",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
      const artistId = req.user._id;

      const playlists = await Playlist.find({owner: artistId}).populate(
          "owner"
      );
      return res.status(200).json({data: playlists});
  }
);

// Get all playlists made by an artist
// /get/artist/xyz
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
      const artistId = req.params.artistId;

      // We can do this: Check if artist with given artist Id exists
      const artist = await User.findOne({_id: artistId});
      if (!artist) {
          return res.status(304).json({err: "Invalid Artist ID"});
      }

      const playlists = await Playlist.find({owner: artistId});
      return res.status(200).json({data: playlists});
  }
);

// Add a song to a playlist
router.post(
  "/add/song",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
      const currentUser = req.user;
      const {playlistId, songId} = req.body;
      // Step 0: Get the playlist if valid
      const playlist = await Playlist.findOne({_id: playlistId});
      if (!playlist) {
          return res.status(304).json({err: "Playlist does not exist"});
      }

      // Step 1: Check if currentUser owns the playlist or is a collaborator
      if (
          !playlist.owner.equals(currentUser._id) &&
          !playlist.collaborators.includes(currentUser._id)
      ) {
          return res.status(400).json({err: "Not allowed"});
      }
      // Step 2: Check if the song is a valid song
      const song = await Song.findOne({_id: songId});
      if (!song) {
          return res.status(304).json({err: "Song does not exist"});
      }

      // Step 3: We can now simply add the song to the playlist
      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).json(playlist);
  }
);

module.exports = router;