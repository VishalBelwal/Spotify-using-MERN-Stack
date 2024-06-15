import React from "react";
import { useState } from "react";
import {useCookies} from "react-cookie";
import { Icon } from "@iconify/react";
// import spotify_white from "../components/assets/logo/spotify_white.svg";
import logo from '../../public/logo.png';
import Input from "./Shared/Input";
import PassInput from "./Shared/PassInput";
import { useNavigate } from "react-router-dom";
import {makeUnauthenticatedPOSTRequest} from "../utils/ServerHelper";
import './box_signin.scss';

function SignupPage() {

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email fields must match. Please check again");
      return;
    }
    const data = {email, password, userName, firstName, lastName};
    
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
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

  return (
    <div className="bg-app-black text-white flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center">
        <div className="darker box_shadow m-8 shadow bg-black rounded-3xl" style={{}}>
        <div className="logo p-4 w-full flex justify-center">
            <img src={logo} style={{width: 50}} />
        </div>
        <div className="inputRegion px-8 m-5 flex justify-center items-center flex-col">
            {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
            <div className="font-bold m-2 text-lg">
                Sign up for free to start listening.
            </div>
            <Input
                label="Email Address"
                placeholder="name@domain.com"
                className="my-3"
                value={email}
                setValue={setEmail}
            />
            <Input
                label="Confirm Email Address"
                placeholder="name@domain.com"
                className="mb-6"
                value={confirmEmail}
                setValue={setConfirmEmail}
            />
            <Input
                label="Username"
                placeholder="Enter your username"
                className="mb-3"
                value={userName}
                setValue={setUsername}
            />
            <PassInput
                label="Create Password"
                placeholder="Enter a strong password"
                value={password}
                setValue={setPassword}
            />
            
            <div className="w-full flex justify-between items-center space-x-8">
                <Input
                    label="First Name"
                    placeholder="Enter Your First Name"
                    className="my-3"
                    value={firstName}
                    setValue={setFirstName}
                />
                <Input
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    className="my-3"
                    value={lastName}
                    setValue={setLastName}
                />
            </div>
            <div className=" w-full flex items-center justify-center my-4">
                <button
                    className="bg-green-500 font-semibold p-3 px-10 rounded-full hover:bg-green-600"
                    onClick={(e) => {
                        e.preventDefault();
                        signUp();
                    }}
                >
                    Sign Up
                </button>
            </div>

            <div className="flex justify-center items-center">
                <span className="w-28 h-0 border border-solid border-gray-500" />
                  <div className="m-3 text-gray-500">or</div>
                <span className="w-28 h-0 border border-solid border-gray-500" />
            </div>

            <div className="my-3 font-semibold text-lg items-center">
                Already have an account?
            </div>
            <div className="text-gray-500 w-full flex items-center justify-center py-1 rounded-full font-bold">
                <a href="/login">LOG IN INSTEAD</a>
            </div>
        </div>
        </div>
    </div>
        
    </div>
);
}

export default SignupPage;
