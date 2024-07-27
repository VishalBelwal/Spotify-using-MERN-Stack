import React from "react";
import { useState } from "react";
import Input from "./Shared/Input";
import CloudinaryUpload from "./Shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelper";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "./Container/Loggedincontainer";



function UploadSong() {

  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [playlisturl, setPlaylisturl] = useState("")
  const [uploadsongName, setUploadedSongName] = useState()
  const navigate = useNavigate(); 

  const submitSong = async () => {


    const data = {name, thumbnail, track: playlisturl}
    const response = await makeAuthenticatedPOSTRequest(
      "/song/create",
      data
    );
    console.log(response)
    if(response.err){
      alert("Could not Create Song");
      return;
    }
    navigate("/homepage")
  }

  return (
     <LoggedInContainer currentActivescreen="uploadscreen">
        <div className="content p-8 pt-0 overflow-auto">
          <div className="text-2xl font-semibold mb-5  text-white mt-8">
            Upload your Music
          </div>
          <div className=" w-2/3 flex flex-row space-x-9">
            <div className="w-1/2">
              <Input
                label="Name"
                labelClassName={"text-white"}
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/2">
              <Input
                label="Thumbnail"
                labelClassName={"text-white"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>

          <div className="w-2/3 px-3 p-5">
            {uploadsongName ? (
              <div className="bg-white rounded-full p-3 w-1/3">
                {uploadsongName.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylisturl}
                setName={setUploadedSongName}
              />
            )}
          </div>

          <div
            className="bg-white w-36 font-semibold flex items-center justify-center p-4 ml-2 rounded-full cursor-pointer"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
     </LoggedInContainer>

        
  );
}


export default UploadSong;
