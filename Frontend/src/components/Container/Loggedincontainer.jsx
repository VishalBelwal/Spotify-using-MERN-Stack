import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import spotify_logo from "../assets/logo/spotify_white.svg";
import IconText from "../Shared/IconText";
import { Icon } from "@iconify/react";
import "../container.css";
import ButtonHover from "../Shared/ButtonHover";
import { Howl, Howler } from "howler";
import songContext from "../../context/songcontext";
import CreatePlaylistModal from "../../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../../utils/ServerHelper";
const liked_song_playlist_id="6658a569f83c0086e6f2c930";
import { useNavigate } from "react-router-dom";

function LoggedInContainer({ children, currentActivescreen }) {
  //showing modal
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);

  //showing like song
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  //show liked songs
  const [showLikedSongs, setShowLikedSongs] = useState(false);

  const handleHeartClick = () => {
    setShowLikedSongs(!showLikedSongs)
  };

  const navigate = useNavigate()

  //get the value of song
  const {
    currentSong,
    setCurrentSong,
    soundplay,
    setSoundplay,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  //isse ye hoga ki har gaana re-render nahi hoga pages change karne par

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    //the following useEffect will prevent the useEffect from running on the first render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }

    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundplay) {
      return;
    }
    soundplay.play();
  };

  const changeSong = (songSrc) => {
    if (soundplay) {
      soundplay.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });

    setSoundplay(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSong = () => {
    soundplay.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSong();
      setIsPaused(true);
    }
  };
  const addSongToLikedSongs = async (playlistId) => {
    console.log("heart button clicked")
    const songId = currentSong._id;
  
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    
  };
  return (
    <div className="h-full w-full bg-app-black">
      {/*opening and closing modal*/}
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}

      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        <div className="w-1/5 bg-black h-full flex flex-col justify-between">
          <div>
            <div className="logodiv p-6">
              <img src={spotify_logo} alt="Spotify" width={125} />

              <div className="logo-and-name py-5">
                <div>
                  <IconText
                    logo={"material-symbols:home"}
                    iconName={"Home"}
                    active={currentActivescreen === "homepage"}
                    targetLink={"/homepage"}
                  />
                </div>

                <div>
                  <IconText
                    logo={"material-symbols:search"}
                    iconName={"Search"}
                    active={currentActivescreen === "search"}
                    targetLink={"/search"}
                  />
                </div>

                <div>
                  <IconText
                    logo={"fluent:library-16-filled"}
                    iconName={"Library"}
                    active={currentActivescreen === "library"}
                    targetLink={"/library"}
                  />

                  <IconText
                    logo={"ic:round-library-music"}
                    iconName={"My Music"}
                    active={currentActivescreen === "mymusic"}
                    targetLink="/mymusic"
                  />
                </div>
              </div>

              <div className="pt-5">
                <IconText
                  logo={"mdi:add-box"}
                  iconName={"Create Playlist"}
                  onClick={() => {
                    setCreatePlaylistModalOpen(true);
                  }}
                />

                <IconText logo={"mdi:heart"} iconName={"Liked Song"} targetLink="/likedsongs" active={currentActivescreen === "likedsongs"} />
              </div>
            </div>
          </div>

          <div className="px-5 pb-10">
            <div className="border border-gray-300 text-white rounded-full w-1/2 flex px-2 py-1 items-center justify-center hover:border-white cursor-pointer ">
              <Icon icon="simple-line-icons:globe" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>

        <div className="h-full w-4/5 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-2/3 flex justify-around items-center">
                <ButtonHover text={"Premium"} />
                <ButtonHover text={"Support"} />
                <ButtonHover text={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>

              <div className="w-1/3 flex justify-around h-full items-center">
                <a href="/uploadsong">
                  <ButtonHover text={"Upload Song"} />
                </a>
                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  VB
                </div>
              </div>
            </div>
          </div>

          <div className="content p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>

      {/* this div is the current playing song show div */}

      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center p-6">
          <div className="w-1/4 flex  justify-start items-center">
            <img src={currentSong.thumbnail} className="h-14 w-14 rounded-md" />

            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-400 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>

          <div className="h-full w-1/2 flex justify-center flex-col items-center ">
            {/*Controls for the playing song*/}
            <div className="flex w-1/3 justify-between items-center">
              <Icon
                icon="fluent:arrow-shuffle-20-regular"
                fontSize={23}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="solar:skip-previous-bold"
                fontSize={26}
                className="cursor-pointer text-gray-500 hover:text-white"
              />

              <Icon
                icon={
                  isPaused ? "heroicons:play-solid" : "heroicons:pause-solid"
                }
                fontSize={40}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />

              <Icon
                icon="solar:skip-next-bold"
                fontSize={26}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="ph:repeat-fill"
                fontSize={20}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>

            <div></div>
          </div>

          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:twotone-playlist-add"
              fontSize={40}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />

            <Icon
              icon="ph:heart-bold"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                addSongToLikedSongs(liked_song_playlist_id);
              }}
              />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoggedInContainer;
