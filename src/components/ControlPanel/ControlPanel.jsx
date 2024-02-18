import { useEffect } from "react";
import PropTypes from "prop-types";

import {
  PlayArrowRoundedIcon,
  PauseRoundedIcon,
  SkipNextRoundedIcon,
  VolumeUpRoundedIcon,
  VolumeOffRoundedIcon,
  VolumeDownRoundedIcon,
  PictureInPictureAltRoundedIcon,
  FullscreenRoundedIcon,
  FullscreenExitRoundedIcon,
} from "../../assets";

import "./ControlPanel.scss";

const ControlPanel = ({
  isPlaying,
  togglePlayPause,
  handleNextPlay,
  toggleMute,
  volume,
  handleVideoVolume,
  currentTime,
  totalTime,
  playbackRate,
  handlePlaybackSpeed,
  handlePIPMode,
  handleFullScreen,
  isFullscreen,
  timelineRef,
  handleTimelineUpdates,
  toggleScrubbing,
}) => {
  useEffect(() => {
    function handleKeyDown(e) {
      const event = e.key.toLowerCase();
      switch (event) {
        case "f":
          handleFullScreen();
          break;
        case "m":
          toggleMute();
          break;
        case "p":
          handlePIPMode();
          break;
        case "r":
          handlePlaybackSpeed();
          break;
        case " ":
          togglePlayPause();
          break;
        case "arrowright":
          handleNextPlay();
          break;

        default:
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFullScreen, handleNextPlay, handlePIPMode, handlePlaybackSpeed, toggleMute, togglePlayPause]);

  return (
    <div className="control-panel">
      <div
        ref={timelineRef}
        className="timeline-container"
        onMouseMove={(e) => handleTimelineUpdates(e)}
        onMouseDown={(e) => toggleScrubbing(e)}
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
        <button onClick={handleNextPlay}>
          <SkipNextRoundedIcon sx={{ fontSize: 30 }} />
        </button>
        <div className="volume-container">
          <button onClick={toggleMute}>
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
  );
};

ControlPanel.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  handleNextPlay: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  handleVideoVolume: PropTypes.func.isRequired,
  currentTime: PropTypes.string.isRequired,
  totalTime: PropTypes.string.isRequired,
  playbackRate: PropTypes.number.isRequired,
  handlePlaybackSpeed: PropTypes.func.isRequired,
  handlePIPMode: PropTypes.func.isRequired,
  handleFullScreen: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  timelineRef: PropTypes.any.isRequired,
  handleTimelineUpdates: PropTypes.func.isRequired,
  toggleScrubbing: PropTypes.func.isRequired,
};

export default ControlPanel;
