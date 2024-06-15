import { createContext } from "react";

const songContext = createContext({
  currentSong: null,                    //initially koi song play nahi hoga jab website load hogi,kuch bhi get nahi hai to bydefault value pass hongi jab tak koi value set nahi hoti
  setCurrentSong: (currentSong) => {},
  soundplay : null,
   setSoundplay : () => {},
  isPaused : null,
   setIsPaused : () => {},
  firstName : "firstName",
  lastName : "lastName"
});

export default songContext;