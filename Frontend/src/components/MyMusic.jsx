import React from "react";
import "./container.css"
import { useState,useEffect } from "react";
import SingleSongCard from "./Shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import LoggedInContainer from "./Container/Loggedincontainer";




const MyMusic = () => {
  const [songData, setSongData] = useState([]);    //ye api se fetch hokar aane wala data ke liye hai

  useEffect(() => {
    const getData = async() => {
      const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActivescreen="mymusic">
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">My Songs</div>

      <div className="space-y-3 overflow-auto">
        {songData.map((item) => {
          return <SingleSongCard info={item} playsound={() => {}} />;
        })}
      </div>
    </LoggedInContainer>
  );
}



export default MyMusic;
