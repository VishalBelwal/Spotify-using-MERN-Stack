import React from "react";
import "./container.css";
import LoggedInContainer from "./Container/Loggedincontainer";

const focusCardData = [
  {
    title: "Arijit Singh",
    description: "Artist",
    imgUrl:
      "https://imgs.search.brave.com/EwN1-vzk3Ci2_cp6e1gn_Ep7FVOJcp2So_EqtiWwwzI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS82MC8y/My9ZYTRlRkouanBn",
  },
  {
    title: "A.R Rahman",
    description: "Artist",
    imgUrl:
      "https://imgs.search.brave.com/RcDPb2fWI-iAYl03D1fzonjMD3wavxNpIdzkf1U6Szk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2Y3L0FSX1JhaG1h/bl9BdF9UaGVfJUUy/JTgwJTk4TWFydmVs/X0FudGhlbSVFMiU4/MCU5OV9MYXVuY2gu/anBn",
  },
  {
    title: "Diljit Doshanjh",
    description: "Artist",
    imgUrl:
      "https://imgs.search.brave.com/OnxuZcWoLlWvZZTuJ9wLKx1_Z3p2KeDsW1QvDrgMEzM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubGlmZXN0eWxl/YXNpYS5jb20vd3At/Y29udGVudC91cGxv/YWRzL3NpdGVzLzcv/MjAyMy8wNC8xMTEy/MzQwNS9EaWxqaXQt/RG9zYW5qaC1saXZl/LXNob3dzLTgwNng4/MDYuanBn",
  },
  {
    title: "Vishal-Shekhar",
    description: "Artist",
    imgUrl:
      "https://imgs.search.brave.com/ztWFr8lSDyypOGvJ1HmQ7j8h7OWFSdf0gzbpqna7xBo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jLnNh/YXZuY2RuLmNvbS9h/cnRpc3RzL1Zpc2hh/bC1TaGVraGFyXzIw/MTkxMTMwMDcxMzU3/XzUwMHg1MDAuanBn",
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
    title: "Focus",
    description: "tbsm",
    imgUrl:
      "https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Arijit singh",
    description: "wef",
    imgUrl:
      "https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "3",
    description: "fei",
    imgUrl:
      "https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "4",
    description: "efoij",
    imgUrl:
      "https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "5",
    description: "feiw",
    imgUrl:
      "https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const LoggedInHome = () => {
  return (
    <LoggedInContainer currentActivescreen="homepage">
      <Playlist titleText={"Popular Artists"} cardsData={focusCardData} />
      <Playlist
        titleText={"Sound of India"}
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
      <div className="w-full flex justify-between space-x-4">
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
    <div className="bg-black bg-opacity-30 w-1/5 border border-none  p-4 rounded-lg">
      <div className="pb-4 ">
        <img className="w-full rounded-md" src={imgUrl} alt="label image" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default LoggedInHome;
