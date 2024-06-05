import React from "react";
import LoggedInContainer from "./Container/Loggedincontainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import { useNavigate, useParams } from "react-router-dom";


function Artists() {
  const [artist, setArtist] = useState({});
  const { artistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/artist/get/artist/" + artistId
      );
      console.log(response)
      // setArtist(response.data);
    };
    getData();
  }, [artistId]);

  // console.log("artist --->>", artist)

  return (
    <LoggedInContainer>
      {artist._id ? (
        <div>
          <div className="text-white text-xl pt-8 font-semibold">
            {artist.userName}
          </div>

          <div className="pt-10 space-y-3">
            {artist.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playsound={() => {}}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-white">No Artist Avialable</div>
      )}
    </LoggedInContainer>
  );
}

export default Artists;
