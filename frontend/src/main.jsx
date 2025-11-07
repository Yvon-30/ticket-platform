import React from "react";
import ReactDOM from "react-dom/client";
import { StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyletronProvider>
  </React.StrictMode>
);
