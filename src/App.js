import React from "react";
import TopNav from "./navigation/components/TopNav";
import Footer from "./footer/Footer";
import Drawer from "./navigation/components/NavDrawer";
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
                <main className="main">
                    <Routes />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
