import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import VideoModule from "../videoModule/VideoModule";
import HeroCarousel from "../heroCarousel/components/HeroCarousel";
import Divider from "@material-ui/core/Divider";

export default function Discover() {
    const videoCat = [
        "Covid-19 - Trending",
        "Comedy",
        "Sports",
        "Music",
        "Travel",
    ];
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <HeroCarousel />
                {videoCat.map((category, index) => (
                    <>
                        <VideoModule category={category} />
                        {index < videoCat.length - 1 && <Divider />}
                    </>
                ))}
            </main>
        </React.Fragment>
    );
}
