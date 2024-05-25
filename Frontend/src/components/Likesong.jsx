import React, { useEffect, useState } from "react";
import LoggedInContainer from "./Container/Loggedincontainer";
import SingleSongCard from "./Shared/SingleSongCard"; // Make sure this is the correct path
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";

function Likesong() {
  const [likedsongs, setLikedSongs] = useState([]);

  useEffect(() => {
    // Fetch liked songs when component mounts
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/likedsong/get/liked-songs");
        setLikedSongs(response.data.likedsongs);
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };
    getData();
  }, []);

  //Liked sing rendring

  return (
    <LoggedInContainer currentActivescreen={"likedsongs"}>
      <div className="text-white">Liked Songs</div>

      <div>
        {likedsongs.map((item) => {
          return (
            <SingleSongCard
              info={item} // Pass the entire song object or adjust based on what SingleSongCard expects
              key={JSON.stringify(item)} // Assuming each song has a unique _id
              playsound={() => {}} // Implement the playsound function as needed
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
}

export default Likesong;
