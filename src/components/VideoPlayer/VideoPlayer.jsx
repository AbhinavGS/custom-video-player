import "./VideoPlayer.scss";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { useState, useRef } from "react";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState("false");
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
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
        <button>
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
