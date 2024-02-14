/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./VideoPlayer.scss";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import { useRef, useEffect, useState } from "react";

import mediaJSON from "../../data";

const videos = mediaJSON["categories"][0]["videos"];
const VideoPlayer = ({
  isPlaying,
  setIsPlaying,
  currentPlayingIdx,
  setCurrentPlayingIdx,
}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentPlayingIdx]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextButton = () => {
    const lastIdx = videos.length - 1;
    setCurrentPlayingIdx((idx) => {
      if (idx == lastIdx) return 0;
      else return idx + 1;
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.volume = isMuted;
    videoRef.muted = isMuted === true;
  };

  return (
    <div className="video-player">
      <video ref={videoRef} poster={videos[currentPlayingIdx]["thumb"]}>
        <source
          src={videos[currentPlayingIdx]["sources"][0]}
          type="video/mp4"
        />
        Your browser does not support HTML video.
      </video>
      <div className="control-panel">
        <button className="btn-play-pause" onClick={togglePlayPause}>
          {isPlaying ? (
            <PauseRoundedIcon sx={{ fontSize: 30 }} />
          ) : (
            <PlayArrowRoundedIcon sx={{ fontSize: 30 }} />
          )}
        </button>
        <button onClick={handleNextButton}>
          <SkipNextRoundedIcon sx={{ fontSize: 30 }} />
        </button>
        <button onClick={toggleMute}>
          {isMuted ? (
            <VolumeOffRoundedIcon sx={{ fontSize: 30 }} />
          ) : (
            <VolumeDownRoundedIcon sx={{ fontSize: 30 }} />
          )}
        </button>
        <input
          className="volume-slider"
          type="range"
          min="0"
          max="1"
          step="any"
          // value="1"
        ></input>
      </div>
    </div>
  );
};

export default VideoPlayer;
