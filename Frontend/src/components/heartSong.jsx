import React from "react"
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelper";
const liked_song_playlist_id="6658a569f83c0086e6f2c930";
const addSongToPlaylist = async (playlistId) => {
  const songId = currentSong._id;

  const payload = { playlistId, songId };
  const response = await makeAuthenticatedPOSTRequest(
    "/playlist/add/song",
    payload
  );
  
};
function heartSong() {
  return (
    <div>
      <Icon
              icon="ph:heart-bold"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={addSongToPlaylist(liked_song_playlist_id)}
            />
      
    </div>
  );
  
}

export default heartSong