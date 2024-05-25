import React from "react";
import { useState } from "react";
import {useCookies} from "react-cookie";
import { Icon } from "@iconify/react";
import Input from "./Shared/Input";
import PassInput from "./Shared/PassInput";
import { useNavigate } from "react-router-dom";
import {makeUnauthenticatedPOSTRequest} from "../utils/ServerHelper";

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
    <div className="w-full h-full flex flex-col items-center">
        <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
            <Icon icon="logos:spotify" width={170} />
        </div>
        <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
            {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
            <div className="font-bold mb-4 text-2xl">
                Sign up for free to start listening.
            </div>
            <Input
                label="Email address"
                placeholder="Enter your email"
                className="my-6"
                value={email}
                setValue={setEmail}
            />
            <Input
                label="Confirm Email Address"
                placeholder="Enter your email again"
                className="mb-6"
                value={confirmEmail}
                setValue={setConfirmEmail}
            />
            <Input
                label="Username"
                placeholder="Enter your username"
                className="mb-6"
                value={userName}
                setValue={setUsername}
            />
            <PassInput
                label="Create Password"
                placeholder="Enter a strong password here"
                value={password}
                setValue={setPassword}
            />
            <div className="w-full flex justify-between items-center space-x-8">
                <Input
                    label="First Name"
                    placeholder="Enter Your First Name"
                    className="my-6"
                    value={firstName}
                    setValue={setFirstName}
                />
                <Input
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    className="my-6"
                    value={lastName}
                    setValue={setLastName}
                />
            </div>
            <div className=" w-full flex items-center justify-center     my-8">
                <button
                    className="bg-green-400 font-semibold p-3 px-10 rounded-full"
                    onClick={(e) => {
                        e.preventDefault();
                        signUp();
                    }}
                >
                    Sign Up
                </button>
            </div>
            <div className="w-full border border-solid border-gray-300"></div>
            <div className="my-6 font-semibold text-lg">
                Already have an account?
            </div>
            <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                <a href="/login">LOG IN INSTEAD</a>
            </div>
        </div>
    </div>
);
}

export default SignupPage;
