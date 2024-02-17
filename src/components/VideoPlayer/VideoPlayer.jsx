/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./VideoPlayer.scss";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import PictureInPictureAltRoundedIcon from "@mui/icons-material/PictureInPictureAltRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import { formatDuration } from "../../utils";
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
  const timelineRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [initialRender, setInitialRender] = useState(true);

  const [totalTime, setTotalTime] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");

  const [percentageCompletion, setPercentageCompletion] = useState(0);
  const [previewPercentage, setPreviewPercentage] = useState(0);

  const [isScrubbing, setIsScrubbing] = useState(false);
  const [wasPaused, setWasPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullScreen] = useState(false);
  const [isPIPMode, setIsPIPMode] = useState(false);

  useEffect(() => {
    if (!initialRender && videoRef.current) {
      videoRef.current.load();
      // videoRef.current.play();
    } else {
      setInitialRender(false);
    }
  }, [currentPlayingIdx, initialRender]);

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
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      videoRef.current.muted = true;
      setVolume(0);
    }
  };

  const handleVideoVolume = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
    if (e.target.value > 0) {
      setPreviousVolume(e.target.value);
      videoRef.current.muted = false;
    } else setPreviousVolume(1);
  };

  const handleLoadedData = () => {
    setTotalTime(formatDuration(videoRef.current.duration));
  };

  function toggleScrubbing(e) {
    const rect = timelineRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    setPercentageCompletion(percent);
    setIsScrubbing((e.buttons & 1) === 1);
    videoPlayerRef.current.classList.toggle("scrubbing", isScrubbing);
    if (!isScrubbing) {
      setWasPaused(videoRef.current.paused);
      videoRef.current.pause();
    } else {
      if (!wasPaused) videoRef.current.play();
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  }

  const handleTimelineUpdates = (e) => {
    const rect = timelineRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    setPreviewPercentage(percent);

    timelineRef.current.style.setProperty(
      "--preview-position",
      previewPercentage
    );
    setCurrentTime(formatDuration(videoRef.current.currentTime));

    timelineRef.current.style.setProperty(
      "--progress-position",
      percentageCompletion
    );

    // scrubbing logic
    if (isScrubbing) {
      setPercentageCompletion(percent);
      e.preventDefault();
      timelineRef.current.style.setProperty(
        "--progress-position",
        percentageCompletion
      );
    }
  };

  function handlePlaybackSpeed() {
    let newPlaybackRate = videoRef.current.playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    videoRef.current.playbackRate = newPlaybackRate;
    setPlaybackRate(newPlaybackRate);
  }

  function handleFullScreen() {
    if (!isFullscreen) {
      videoPlayerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setIsFullScreen(!isFullscreen);
  }

  function handlePIPMode() {
    if (!isPIPMode) {
      videoRef.current.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
    setIsPIPMode(!isPIPMode);
  }

  function handleNextPlay() {
    setCurrentPlayingIdx((idx) => idx + 1);
  }

  return (
    <div
      className="video-player"
      ref={videoPlayerRef}
      onMouseUp={(e) => {
        if (isScrubbing) toggleScrubbing(e);
      }}
      onMouseMove={(e) => {
        if (isScrubbing) handleTimelineUpdates(e);
      }}
    >
      <video
        ref={videoRef}
        poster={videos[currentPlayingIdx]["thumb"]}
        onLoadedData={handleLoadedData}
        onTimeUpdate={(e) => {
          handleTimelineUpdates(e);
          const percent =
            videoRef.current.currentTime / videoRef.current.duration;
          setPercentageCompletion(percent);
        }}
        onEnded={handleNextPlay}
      >
        <source
          src={videos[currentPlayingIdx]["sources"][0]}
          type="video/mp4"
        />
        Your browser does not support HTML video.
      </video>
      <div className="control-panel">
        <div
          ref={timelineRef}
          className="timeline-container"
          onMouseMove={handleTimelineUpdates}
          onMouseDown={toggleScrubbing}
        >
          <div className="timeline">
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
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
          <div className="volume-container">
            <button onClick={toggleMute} className="mute-btn">
              {volume == 0 ? (
                <VolumeOffRoundedIcon sx={{ fontSize: 30 }} />
              ) : volume < 0.3 ? (
                <VolumeDownRoundedIcon sx={{ fontSize: 30 }} />
              ) : (
                <VolumeUpRoundedIcon sx={{ fontSize: 30 }} />
              )}
            </button>
            <input
              className="volume-slider"
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVideoVolume}
            ></input>
          </div>
          <div className="duration-container">
            <div className="current-time">{currentTime}</div>/
            <div className="total-time">{totalTime}</div>
          </div>
          <button className="speed-btn wide-btn" onClick={handlePlaybackSpeed}>
            {playbackRate}x
          </button>
          <button className="mini-player-btn" onClick={handlePIPMode}>
            <PictureInPictureAltRoundedIcon />
          </button>

          <button className="full-screen-btn" onClick={handleFullScreen}>
            {isFullscreen ? (
              <FullscreenExitRoundedIcon />
            ) : (
              <FullscreenRoundedIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
