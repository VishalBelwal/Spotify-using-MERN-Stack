import { useEffect, useState } from "react";
import LoggedInContainer from "./Container/Loggedincontainer";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import SingleSongCard from "./Shared/SingleSongCard";
const liked_song_playlist_id="6677b4da2008dfc21e6e1997";
const LikedSongView = () => {

  const [songinpPlaylist, setsongsinplaylist] = useState({});
  
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + liked_song_playlist_id
      );
      setsongsinplaylist(response.playlist);
      // console.log("hi there is is a response",response);
    };
    getData();
  }, []);

  return (
    
    <LoggedInContainer currentActivescreen={"likedsongs"}>
      {
       
        songinpPlaylist._id ? (
          <div>
        <div className="text-white text-xl pt-8 font-semibold">
          {songinpPlaylist.name}
        </div>

        <div className="pt-10 space-y-3">
          {
            songinpPlaylist.songs.map(
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
          }
        </div>
      </div>
        ) : (
          
          <div className="text-white flex items-center justify-center">No Songs Avialable Here add songs to liked songs</div>
          
        )
      }
    </LoggedInContainer>
  );
}

export default LikedSongView;
