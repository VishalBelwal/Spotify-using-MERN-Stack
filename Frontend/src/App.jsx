import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import { useCookies } from "react-cookie";
import LoggedInHome from "./components/LoggedInHome";
import UploadSong from "./components/UploadSong";
import MyMusic from "./components/MyMusic";
import songContext from "./context/songcontext";
import SearchPage from "./components/SearchPage";
import Library from "./components/Library";
import SinglePlaylistView from "./components/SinglePlaylistView";
import LikedSongView from "./components/LikedSongView";


const liked_song_playlist_id="6658a569f83c0086e6f2c930";

function App() {
  // gaane ko global state me store karna hai
  const[soundplay, setSoundplay] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentSong, setcurrentSong] = useState(null)
  const [cookie, setCookie] = useCookies(["token"]);
  

  return (
    <div className="font-poppins w-screen h-screen">
      <BrowserRouter>
        {cookie.token ? (
          //logged in routes
          <songContext.Provider value={{currentSong, setcurrentSong, soundplay, setSoundplay, isPaused, setIsPaused}}>                 {/*in saare routes ke andar jo element render ho rahe hai uske context ko set,fetch ya fir play kar sakta hai*/}
            <Routes>
              <Route path="/homepage" element={<LoggedInHome />} />
              <Route path="/uploadsong" element={<UploadSong />} />
              <Route path="/mymusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route path="/playlist/:playlistId" element={<SinglePlaylistView />} />
              <Route path="/likedsongs" element={<LikedSongView/>} />
              <Route path="*" element={<Navigate to="/homepage"/>} />
           </Routes>
          </songContext.Provider>
        ) : (
          //logged out routes
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login"/>} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
