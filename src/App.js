import React from "react";
import TopNav from "./discover/navigation/components/TopNav";
import Drawer from "./discover/navigation/components/NavDrawer";
import Routes from "./routes/Routes";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.scss";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'Baloo Paaji 2'", "cursive"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <TopNav />
        <Drawer />
        <div className="main-page">
          <Routes />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
