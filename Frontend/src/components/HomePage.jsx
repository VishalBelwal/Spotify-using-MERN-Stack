import React from "react";
import spotify_logo from "./assets/logo/spotify_white.svg";
import IconText from "./Shared/IconText";
import { Icon } from "@iconify/react";
import ButtonHover from "./Shared/ButtonHover";

const focusCardData = [{
  title: "Focus",
  description:"tbsm" ,
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"Arijit singh",
  description:"wef",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"3", 
  description:"fei",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"4", 
  description:"efoij",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"5", 
  description:"feiw",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
]

const spotifyPlaylistCardData = [{
  title: "Focus",
  description:"tbsm" ,
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"Arijit singh",
  description:"wef",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"3", 
  description:"fei",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"4", 
  description:"efoij",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
},
{
  title:"5", 
  description:"feiw",
  imgUrl:"https://images.pexels.com/photos/22858681/pexels-photo-22858681/free-photo-of-a-street-light-and-a-bird-in-the-sky-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
]

function Homepage() {
  return (
    <div className="h-full w-full flex">
      <div className="w-1/5 bg-black h-full flex flex-col justify-between">
        <div>
          <div className="logodiv p-5">
            <img src={spotify_logo} alt="Spotify" width={125} />

            <div className="logo-and-name py-6">
              <div>
                <IconText
                  logo={"material-symbols:home"}
                  iconName={"Home"}
                  active
                />
              </div>

              <div>
                <IconText
                  logo={"material-symbols:search"}
                  iconName={"Search"}
                />
              </div>

              <div>
                <IconText
                  logo={"fluent:library-16-filled"}
                  iconName={"Library"}
                />
              </div>
            </div>

            <div className="pt-5">
              <IconText logo={"mdi:add-box"} iconName={"Create Playlist"} />

              <IconText logo={"mdi:heart"} iconName={"Liked Song"} />
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

            {/* <div className="w-3/5 flex justify-around items-center">
              <ButtonHover text={"Premium"}/>
              <ButtonHover text={"Support"}/>
              <ButtonHover text={"Download"}/>
              <div className="h-1/2 border-r border-white"></div>
            </div> */}
            
            <div className="w-2/5 flex justify-around h-full items-center">
              <a href="/signup"><ButtonHover text={"Sign up"}/></a>
              <div className="bg-white h-2/3 px-6 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                <a href="/login">LOG IN</a>
              </div>
            </div>

          </div>
        </div>

        <div className="content p-8 pt-0 overflow-auto">
          <Playlist titleText={"Focus"} cardsData={focusCardData}/>
          <Playlist titleText={"Sound of India"} cardsData={spotifyPlaylistCardData}/>
          <Playlist titleText={"Spotify Playlist"} cardsData={focusCardData}/>
        </div>
      </div>
    </div>
  );
}


const Playlist = ({titleText, cardsData}) => {
  return(
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
          //cards data should be an array
          cardsData.map(item => {
            return(
              <Card 
                title= {item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            )
          })

        }
      </div>
    </div>
  )
}

const Card = ({title, description, imgUrl}) => {
  return(
    <div className="bg-black bg-opacity-30 w-1/5 p-4 rounded-md">
      <div className="pb-4 ">
        <img className="w-full rounded-md" src={imgUrl} alt="label image" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  )
}

export default Homepage;
