import React from "react";
import ReactDOM from "react-dom/client";
// 💡 CORRECTION : On importe 'Provider' et on le renomme 'StyletronProvider'
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BrowserRouter } from "react-router-dom";
// 💡 IMPORTANT : Importer ThemeProvider d'Atomize
import { ThemeProvider } from "atomize"; 
import App from "./App";

const engine = new Styletron();
const theme = {}; // Vous pouvez laisser vide pour utiliser le thème par défaut d'Atomize

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      {/* 💡 ENVELOPPER AVEC ThemeProvider */}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
      
    </StyletronProvider>
  </React.StrictMode>
);