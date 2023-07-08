import React from "react";
import ReactDOM from "react-dom/client";
import Lotteria from "./elements/Lotteria";
import { AuthContexProvider } from "./store/auth-context";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContexProvider>
        <Lotteria />
    </AuthContexProvider>
);
