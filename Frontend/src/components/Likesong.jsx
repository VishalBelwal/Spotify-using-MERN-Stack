import React, { useEffect, useState } from "react";
import LoggedInContainer from "./Container/Loggedincontainer";
import SingleSongCard from "./Shared/SingleSongCard"; // Make sure this is the correct path
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
    // <LoggedInContainer currentActivescreen={"favSongs"}>
    //   <div className="text-white">Liked Songs</div>

    //   <div>
    //     {favSongs.user.map((item) => {
    //       return (
    //         <SingleSongCard
    //           info={item} // Pass the entire song object or adjust based on what SingleSongCard expects
    //           key={JSON.stringify(item)} // Assuming each song has a unique _id
    //           playsound={() => {}} // Implement the playsound function as needed
    //         />
    //       );
    //     })}
    //   </div>
    // </LoggedInContainer>
    <LoggedInContainer currentActivescreen={"favSongs"}>
      {
       
        favSongs._id ? (
          <div>
        <div className="text-white text-xl pt-8 font-semibold">
          {favSongs.firstName}
        </div>

        <div className="pt-10 space-y-3">
          {/* {
            favSongs.map(
              (item) => {
                return(
                  <SingleSongCard 
                    info={item}
                    key={JSON.stringify(item)}
                    playsound={() => {}}
                  />
                );
              }
            )
          } */}
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
