import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "./Container/Loggedincontainer";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import SingleSongCard from "./Shared/SingleSongCard";

const SinglePlaylistView = () => {

  const [songinpPlaylist, setsongsinplaylist] = useState({});

  const { playlistId } = useParams();
  
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setsongsinplaylist(response.playlist);
      console.log(response);
    };
    getData();
  }, []);

  return (
    
    <LoggedInContainer currentActivescreen={"library"}>
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

export default SinglePlaylistView;
