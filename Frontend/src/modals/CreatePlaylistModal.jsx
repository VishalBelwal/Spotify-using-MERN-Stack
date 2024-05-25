import React, { useState } from "react"
import Input from "../components/Shared/Input";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelper";


function CreatePlaylistModal({closeModal}) {

  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const createPlaylist = async () => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: []
    });
  }

  return (
    <div
      className="absolute  bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div className="bg-app-black bg-opacity-100 w-1/3 rounded-md p-8" onClick={(e) => {e.stopPropagation()}}>
        <div className="text-white mb-5 font-semibold text-lg flex justify-center">Create playlist</div>

        <div className="space-y-4 flex flex-col justify-center items-center">
        <Input
            label="Name"
            labelClassName={"text-white font-light"}
            placeholder="Playlist Name"
            value={playlistName}
            setValue={setPlaylistName}
          />
          <Input
            label="Thumbnail"
            labelClassName={"text-white"}
            placeholder="Thumbnail"
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          <div className="bg-white rounded w-1/3 flex font-semibold justify-center py-3 cursor-pointer" onClick={createPlaylist}>
            <button onClick={closeModal}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylistModal;