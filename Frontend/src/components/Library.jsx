import React from "react"
import LoggedInContainer from "./Container/Loggedincontainer"
import {useState, useEffect} from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import { useNavigate } from "react-router-dom";

function Library() {

  const [myPlaylist, setMyPlaylist] = useState([])

  useEffect(() => {
    const getData = async() => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/me"
      );
      setMyPlaylist(response.data);
    };
    getData(); 
  }, [])

  return (
    <LoggedInContainer currentActivescreen={"library"}>
      <div className="text-white text-lg pt-6 font-semibold">My Playlists</div>

      <div className="py-4 grid gap-5 grid-cols-5 ">
        {
          myPlaylist.map(item => {
            return <Card key={JSON.stringify(item)} title={item.name} description="" imgUrl={item.thumbnail} playlistId={item._id} />
          })
        }
      </div>
    </LoggedInContainer>
  )
}

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer" onClick={() => {
      navigate("/playlist/" + playlistId)
    }}>
      <div className="pb-4 ">
        <img className="w-full rounded-md" src={imgUrl} alt="label image" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Library;