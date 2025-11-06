import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.withCredentials = true;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <Toaster
    toastOptions={{
      style:{
        color: "#203b6c",
        fontWeight: "600",
      }
    }}
      position="top-center"
      reverseOrder={false}
    />
    <App />
  </>
);

