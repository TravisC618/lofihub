import React from "react";
import Album from "./demo/Album";
import TopNav from "./navigation/components/TopNav";
import Drawer from "./navigation/components/NavDrawer";
import Routes from "./routes/Routes";

function App() {
  return (
    <div>
      <TopNav />
      <Drawer />
      <div className="container">
        <Routes />
      </div>
    </div>
  );
}

export default App;
