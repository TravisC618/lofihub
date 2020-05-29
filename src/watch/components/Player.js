import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import BulletScreen, { StyledBullet } from "rc-bullets";
import { produce } from "immer";
import "../styles/player.scss";

const headUrl =
    "https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg";
const Player = ({ thumbnail, url, existedBullets }) => {
    const [isReady, setIsReady] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const [playedSec, setPlayedSec] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    // bullet screen
    const [screen, setScreen] = useState(null);
    // bullet content
    const [bullet, setBullet] = useState("");
    const [isBulletEnd, setIsBulletEnd] = useState(true);

    const [bulletsArr, setBulletsArr] = useState([]);

    useEffect(() => {
        // BulletScreen should be set up with a <div> element
        // [duration] of rolling
        let s = new BulletScreen(".player-wrapper", { duration: 20 });
        setScreen(s);

        if (existedBullets) {
            setIsBulletEnd(false);

            const shadowCopy = existedBullets;
            shadowCopy.map((b) => {
                b.isSent = true;
            });
            setBulletsArr(shadowCopy);
        }
    }, [existedBullets]);

    // handle user input of bullet
    const handleChange = ({ target: { value } }) => {
        setBullet(value);
    };

    // Send bullet
    const handleSend = () => {
        if (bullet) {
            // push plain text
            //  screen.push(bullet);
            // or using StyledBullet
            screen.push(
                <StyledBullet
                    head={headUrl}
                    msg={bullet}
                    backgroundColor={"#fff"}
                    size="small"
                />
            );
            console.log("bullet send time: ", playedSec);
            console.log("bullet content: ", bullet);
        }
    };

    const loadBullet = () => {
        if (bulletsArr[0].time > playedSec) return;
        console.log("rendering loadBullet");

        for (let index = 0; index < bulletsArr.length; index++) {
            // debugger;
            if (!bulletsArr[index].isSent) {
                const currentBullet = bulletsArr[index];
                console.log(currentBullet);

                // send bullet
                screen.push(
                    <StyledBullet
                        // head={headUrl}
                        msg={currentBullet.content}
                        backgroundColor={"#fff"}
                        size="small"
                    />
                );

                // set state - isSent to be true
                setBulletsArr((currentBullets) =>
                    produce(currentBullets, (b) => {
                        b[index].isSent = true;
                    })
                );
                return;
            }
        }
        setIsBulletEnd(true);
    };

    useEffect(() => {
        if (bulletsArr.length === 0 || isBulletEnd) return;
        loadBullet();
    }, [playedSec]);

    const handleOnReady = () => {
        setIsReady(true);
        console.log("ready");
    };

    const handleOnStart = () => {
        setIsStart(true);
        console.log("start");
    };

    const handleOnPlay = () => {
        console.log("onPlay");
        setIsPlay(true);
        screen.resume();
    };

    const handleOnPause = () => {
        console.log("onPause");
        setIsPlay(false);
        screen.pause();
    };

    const handleOnEnd = () => {
        setIsEnd(true);
        console.log("End");
    };

    const handleOnProgress = (e) => {
        console.log("onProgress", e);
        setPlayedSec(e.playedSeconds);
    };

    const handleOnDuration = (d) => {
        setVideoDuration(d);
        console.log("onDuration", d);
    };

    return (
        <>
            <div className="player-wrapper">
                <ReactPlayer
                    light={thumbnail && thumbnail} // place to set thumbnail
                    className="react-player"
                    height="100%"
                    width="100%"
                    pip={true} // TODO setup scrollbar detect to set pip true
                    controls
                    url={url}
                    onReady={handleOnReady}
                    onStart={handleOnStart}
                    onPlay={handleOnPlay}
                    onPause={handleOnPause}
                    onProgress={handleOnProgress}
                    onDuration={handleOnDuration}
                    onSeek={(s) => console.log("onSeek", s)} // Called when media seeks with seconds parameter
                    onEnded={handleOnEnd}
                />
            </div>
            <input value={bullet} onChange={handleChange} />
            <button onClick={handleSend} disabled={!isReady || !isStart}>
                Send
            </button>
        </>
    );
};

export default Player;
