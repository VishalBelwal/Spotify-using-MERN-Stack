import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
// import spotify_white from "../components/assets/logo/spotify_white.svg";
import logo from '../../public/logo.png';
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
    
    const data = {firstName, lastName, email, password};
    
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
    <div className="bg-app-black text-white w-full h-full overflow-x-hidden ">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="login box_shadow m-8 shadow bg-black rounded-3xl ">
          <div className="logo p-3 border-gray-300 w-full flex justify-center">
            <img src={logo} style={{ width: 50 }} />
          </div>

          <div className="inputRegion px-8 m-5 flex items-center justify-center flex-col">
            <div className="inputField font-bold m-2 text-lg">
              <div className="font-bold mt-3 flex flex-col items-center text-lg">
                To Continue, Login to Spotify
              </div>

              <div>
                <button
                  className="bg-black border text-sm border-gray-400 text-white font-bold w-full flex items-center justify-center p-2 rounded-full my-5"
                  onClick={(e) => {
                    e.preventDefault();
                    logIn();
                  }}
                >
                  <Icon icon="ic:baseline-apple" width="40" height="30" />
                  CONTINUE WITH APPLE
                </button>
              </div>

              <div>
                <button
                  className="border border-gray-400 text-sm text-gray-600 font-bold w-full flex items-center justify-center p-2 rounded-full my-5"
                  onClick={(e) => {
                    e.preventDefault();
                    logIn();
                  }}
                >
                  <Icon icon="flat-color-icons:google" width="40" height="30" />
                  SIGN IN WITH GOOGLE
                </button>
              </div>

              <div className="flex justify-center items-center">
                <span className="w-full h-0 border border-solid mb-4 border-gray-500" />
              </div>

              <Input
                label="Email address or userame"
                placeholder="Email address or username"
                className="my-2"
                value={email}
                setValue={setEmail}
              />
              <PassInput
                label="Password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
              />

              <div className="flex items-center justify-center my-6  ">
                <button
                  className="bg-green-500 rounded-full font-semibold p-3 px-7 hover:bg-green-600"
                  onClick={(e) => {
                    e.preventDefault();
                    login();
                  }}
                >
                  LOG IN
                </button>
              </div>

              <div className="flex justify-center items-center">
                <span className="w-20 h-0 border border-solid border-gray-500" />
                  <div className="m-3 text-gray-300">or</div>
                <span className="w-20 h-0 border border-solid border-gray-500" />
              </div>

              <div className="m-2 font-bold mb-4 flex flex-col items-center text-lg">
                Don't have an account?
              </div>

              <div className="text-gray-500 w-full flex items-center justify-center rounded-full font-bold">
                <a href="/signup">SIGNUP FOR SPOTIFY</a>
              </div>

              {/* <div className="border border-gray-400 text-gray-600 font-bold w-full flex items-center justify-center p-2 rounded-full">
                
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;