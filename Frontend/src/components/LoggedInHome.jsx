import React from "react";
import LoggedInContainer from "./Container/Loggedincontainer";
// import { useNavigate } from "react-router-dom";

const focusCardData = [
  {
    title: "Arijit Singh",
    description: "Artist",
    imgUrl:
      "https://wallpapercave.com/wp/wp8207062.jpg",
  },
  {
    title: "A.R Rahman",
    description: "Artist",
    imgUrl:
      "https://imgs.search.brave.com/RcDPb2fWI-iAYl03D1fzonjMD3wavxNpIdzkf1U6Szk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2Y3L0FSX1JhaG1h/bl9BdF9UaGVfJUUy/JTgwJTk4TWFydmVs/X0FudGhlbSVFMiU4/MCU5OV9MYXVuY2gu/anBn",
  },
  {
    title: "Sonu Nigam",
    description: "Artist",
    imgUrl:
      "https://th.bing.com/th/id/R.20cb731c168e9244b07ee6b23fd5224c?rik=DsVqZpYSUx73zw&riu=http%3a%2f%2f1.bp.blogspot.com%2f_vX5vPjRoi7o%2fTRtaq0tIfQI%2fAAAAAAAACWk%2f0e9FWmsFI4w%2fs1600%2fsinger3.jpg&ehk=BbpL%2bCjmOgGILHZmXNc6gCLJjV5FqQqOjjvNR7tfayg%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    title: "Amit Trivedi",
    description: "Artist",
    imgUrl:
      "https://th.bing.com/th/id/OIP.aoVs20WYo3_FvZ9YbciHDgHaLH?rs=1&pid=ImgDetMain",
  },
  {
    title: "Shankar Mahadevan",
    description: "Artist",
    imgUrl:
      "https://imgs.search.brave.com/ebernZthVpNbuxC2xhkGjqA_x2t0HN_fgZn0e21z03I/rs:fit:860:0:0/g:ce/aHR0cDovL3N0YXJz/dW5mb2xkZWQuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzEyL1NoYW5rYXIt/TWFoYWRldmFuLTIu/anBn",
  },
];

const spotifyPlaylistCardData = [
  {
    title: "Seedhe Maut",
    description: "Artist",
    imgUrl:
      "https://th.bing.com/th/id/OIP.0OqT4beOK_VCpyX5MQEedgAAAA?w=474&h=843&rs=1&pid=ImgDetMain",
  },
  {
    title: "AcDc",
    description: "American Band Group",
    imgUrl:
      "https://th.bing.com/th/id/OIP.E4XzbJjLsUxd0NvEz4f3hgAAAA?w=469&h=834&rs=1&pid=ImgDetMain",
  },
  {
    title: "Red Hot Chili Pepper",
    description: "American Experimental Band Group",
    imgUrl:
      "https://th.bing.com/th/id/OIP.lwReu4LCmUB6hTMMKn234AHaKe?rs=1&pid=ImgDetMain",
  },
  {
    title: "Eminem",
    description: "Artist",
    imgUrl:
      "https://i.etsystatic.com/28911785/r/il/53bffd/3069284364/il_1140xN.3069284364_iwld.jpg",
  },
  {
    title: "Justin Bieber",
    description: "Artist",
    imgUrl:
      "https://i.pinimg.com/originals/81/64/af/8164af19b88d164b545250deb5560426.jpg",
  },
];

const LoggedInHome = () => {

  return (
    <LoggedInContainer currentActivescreen="homepage">
      <Playlist titleText={"Popular Artists"} cardsData={focusCardData} />
      <Playlist
        titleText={"Rock Playlists"}
        cardsData={spotifyPlaylistCardData}
      />
      {/* <Playlist titleText={"Spotify Playlist"} cardsData={focusCardData} /> */}
    </LoggedInContainer>
  );
};

const Playlist = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4  cursor-pointer">
        {
          //cards data should be an array
          cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  
  return (
    <div className="bg-black bg-opacity-30 w-1/5 border border-none  p-4 rounded-lg" >
      <div className="pb-4 ">
        <img className="w-full rounded-md" src={imgUrl} alt="label image" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default LoggedInHome;
