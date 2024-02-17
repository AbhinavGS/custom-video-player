import { useState } from "react";
import PlayerContext from "./context";

import { VideoPlayer, Playlist } from "./components";

import "./App.scss";

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
