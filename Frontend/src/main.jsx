import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.createRoot(document.getElementById("root")).render(
  
    <GoogleOAuthProvider clientId="224366729506-ameef8mugilqramrk33ec28arj8tl9m7.apps.googleusercontent.com">
      <App />  
    </GoogleOAuthProvider>
     
    // development environment me hamara coe 2 baar re-render hota hai,isko off karke hamara product production environment me re-render hoga
)
