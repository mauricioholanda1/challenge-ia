import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {Routes} from "./routes";
import "./global.css";
import {theme} from "./styles/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
