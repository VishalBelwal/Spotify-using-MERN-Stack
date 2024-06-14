import React, { useState } from "react"
import LoggedInContainer from "./Container/Loggedincontainer"
import { Icon } from "@iconify/react/dist/iconify.js"
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import SingleSongCard from "./Shared/SingleSongCard";

function SearchPage() {

  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchSong = async () => {
    //this function will call search api
    
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songName/" + searchText
    );
    setSearchResults(response.data);
  }

  return (
    <LoggedInContainer currentActivescreen="search">
      <div className="w-full py-6">
        <div
          className={`w-1/3 p-4 rounded-full text-sm bg-gray-800 px-5 flex text-white space-x-3 items-center ${
            isInputFocus ? "border border-white" : ""
          }`}
        >
          <div>
            <Icon icon="tabler:search" fontSize={25} />
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 focus:outline-none"
            onFocus={() => {
              setIsInputFocus(true);
            }}
            onBlur={() => {
              setIsInputFocus(false);
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {
          searchResults.length > 0 ?
          <div className="pt-10 space-y-3">
            <div className="text-white">
              Showing Search Results for 
              <span className="font-bold"> {searchText} </span>
            </div>
            {searchResults.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playsound={() => {}}
                />
              );
            })}
          </div> : <div className="text-gray-500 pt-5">Nothing to show here, search a Song</div>
        }
      </div>
    </LoggedInContainer>
  );
}

export default SearchPage