import React, { useContext } from "react"
import songContext from "../../context/songcontext";
// const songDuration=130;
function SingleSongCard({info, playsound, song}) {

  const {currentSong, setcurrentSong} = useContext(songContext)
  console.log(info);
  return (
    <div className="text-white flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-md " 
      onClick={() => {
        // playsound(info.track);
        setcurrentSong(info);
      }}
    >
      {/* image */}

      <div
        className="w-12 h-12 bg-white bg-cover bg-center "
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      ></div>

      <div className="flex w-full ">
        <div className="text-white flex  flex-col justify-center pl-3 w-5/6">
          <div className="cursor-pointer hover:underline">{info.name}</div>

          <div className="text-xs text-gray-400 cursor-pointer hover:underline">{`${info.artist.firstName} ${info.artist.lastName}`}</div>

        </div>
          <div className="w-1/6 flex items-center justify-center text-gray-400"></div>
      </div>
    </div>
  );
}

export default SingleSongCard;

// const formatDuration = (duration) => {
//   const minutes = Math.floor(duration/60);
//   const seconds = duration % 60;
//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
// }