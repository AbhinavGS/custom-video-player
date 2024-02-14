import "./VideoPlayer.scss";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { useState, useRef } from "react";

import mediaJSON from "../../data";

const videos = mediaJSON["categories"][0]["videos"];
const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState("false");
  const [currentPlayingIdx, setCurrentPlayingIdx] = useState(0);
  const videoRef = useRef(null);

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
            <PlayArrowRoundedIcon sx={{ fontSize: 30 }} />
          ) : (
            <PauseRoundedIcon sx={{ fontSize: 30 }} />
          )}
        </button>
        <button onClick={handleNextButton}>
          <SkipNextRoundedIcon sx={{ fontSize: 30 }} />
        </button>
        <button>
          <VolumeUpRoundedIcon sx={{ fontSize: 30 }} />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
