import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Input from "./Shared/Input";
import PassInput from "./Shared/PassInput";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { makeUnauthenticatedPOSTRequest } from "../utils/ServerHelper";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cookie, setCookie] = useCookies(["token"])
  const navigate = useNavigate()


  const login = async () => {
    
    const data = {email, password};
    
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if(response && !response.err){
      console.log(response)
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, {path: "/", expires: date});
      navigate("/homepage");
    } else {
      alert("Failure");
  }
}


  const logIn = useGoogleLogin({
    onSuccess: async (response) => {
      try{
        const res = await axios.get(
          "https://www.gmail.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorisation: `bearer ${response.access_token}`
            },
          }
        );
        console.log(res);
      } catch(err){
        console.log(err);
      }
    },
  });

  return (
    <div className=" h-full flex flex-col items-center">
      <div className="logo p-3 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width={170} />
      </div>

      <div className="inputField w-1/3 py-1 ">
        <div className="font-bold mt-3 flex flex-col items-center text-lg">
          To Continue, Login to Spotify
        </div>

        <div>
        <button className="bg-black text-white font-bold w-full flex items-center justify-center p-2 rounded-full my-5" onClick={(e) => {e.preventDefault(); logIn()}}>
        <Icon icon="ic:baseline-apple" width="45" height="30"  />CONTINUE WITH APPLE
        </button>
      </div>

        <div>
        <button className="border border-gray-400 text-gray-600 font-bold w-full flex items-center justify-center p-2 rounded-full my-5" onClick={(e) => {e.preventDefault(); logIn()}}>
        <Icon icon="flat-color-icons:google" width="45" height="30" />SIGN IN WITH GOOGLE
        </button>
      </div>

      <div>
        <button className="border border-gray-400 text-gray-600 font-bold w-full flex items-center justify-center p-2 rounded-full" onClick={(e) => {e.preventDefault(); logIn()}}>
          CONTINUE WITH PHONE NUMBER
        </button>
      </div>

        <Input
          label="Email address or userame"
          placeholder="Email address or username"
          className="my-2"
          value={email}
          setValue={setEmail}
        />
        <PassInput label="Password" placeholder="Password" value={password} setValue={setPassword}/>

        <div className="flex items-center justify-end my-6 ">
          <button className="bg-green-500 rounded-full font-semibold p-3 px-7"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}>LOG IN</button>
        </div>

        <div className="w-full border border-solid border-gray-300"></div>

        <div className="m-2 font-bold mb-9 flex flex-col items-center text-lg">
          Don"t have an account?
        </div>

        <div className="border border-gray-400 text-gray-600 font-bold w-full flex items-center justify-center p-2 rounded-full">
          <a href="/signup">SIGNUP FOR SPOTIFY</a>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
