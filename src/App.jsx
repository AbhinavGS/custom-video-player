import { useState } from "react";
import PlayerContext from "./context";

import { VideoPlayer, Playlist } from "./components";
import mediaJSON from "./data";
const videosData = mediaJSON["categories"][0]["videos"];

import "./App.scss";

function App() {
  const [videos, setVideos] = useState(videosData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingIdx, setCurrentPlayingIdx] = useState(0);
  return (
    <PlayerContext.Provider
      value={{
        videos,
        setVideos,
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
