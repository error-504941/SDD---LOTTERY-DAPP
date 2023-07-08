import React from "react";
import ReactDOM from "react-dom/client";
import Lotteria from "./elements/Lotteria";
import { AuthContexProvider } from "./store/auth-context";
import "./styles.css";
import MetamaskProvider from "./store/MetamaskProvider";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
const getLibrary = (provider, connector) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

root.render(
    <AuthContexProvider>
        <Lotteria />
    </AuthContexProvider>
);
