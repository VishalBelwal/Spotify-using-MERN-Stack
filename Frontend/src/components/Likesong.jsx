import React, { useEffect, useState } from "react";
import LoggedInContainer from "./Container/Loggedincontainer";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";

function Likesong() {
  const [favSongs, setfavSongs] = useState([]);

  useEffect(() => {
    // Fetch liked songs when component mounts
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/likedsong/get/liked-songs");
        setfavSongs(response.user);
        // console.log(response.user.email);
        
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };
    getData();
  }, []);
  console.log("hello these are the liked songs",favSongs);
  //Liked sing rendring

  return (
    
    <LoggedInContainer currentActivescreen={"favSongs"}>
      {
       
        favSongs._id ? (
          <div>
        <div className="text-white text-xl pt-8 font-semibold">
          {favSongs.firstName}
        </div>

        <div className="pt-10 space-y-3">
          
        </div>
      </div>
        ) : (
          
          <div className="text-white flex items-center justify-center">No liked Songs Avialable Here</div>
          
        )
      }
    </LoggedInContainer>
  );
}

export default Likesong;
