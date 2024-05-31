import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "./Container/Loggedincontainer";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import SingleSongCard from "./Shared/SingleSongCard";
const liked_song_playlist_id="6658a569f83c0086e6f2c930";
const LikedSongView = () => {

  const [songinpPlaylist, setsongsinplaylist] = useState({});
  // const { liked_song_playlist_id } = useParams();
  
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + liked_song_playlist_id
      );
      setsongsinplaylist(response.playlist);
      console.log("hi there is is a response",response);
    };
    getData();
  }, []);

  //song rendring in playlist section
  // {console.log("song id",songinpPlaylist.playllis_id)}
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
          
          <div className="text-white flex items-center justify-center">No Songs Avialable Here</div>
          
        )
      }
    </LoggedInContainer>
  );
}

export default LikedSongView;
