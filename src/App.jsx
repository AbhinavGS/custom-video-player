import { useState } from "react";
import "./App.scss";
import Playlist from "./components/Playlist/Playlist";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import PlayerContext from "./context";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingIdx, setCurrentPlayingIdx] = useState(0);
  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentPlayingIdx,
        setCurrentPlayingIdx,
      }}
    >
      <div className="container">
        <VideoPlayer />
        <Playlist />
      </div>
    </PlayerContext.Provider>
  );
}

export default App;
