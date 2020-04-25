import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "../footer/Footer";
import VideoModule from "../videoModule/VideoModule";
import HeroCarousel from "../heroCarousel/components/HeroCarousel";

export default function Discover() {
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <HeroCarousel />
        <VideoModule />
      </main>
      <Footer />
    </React.Fragment>
  );
}
