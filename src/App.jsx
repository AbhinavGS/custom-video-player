import { useState } from "react";
import "./App.scss";
import Playlist from "./components/Playlist/Playlist";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingIdx, setCurrentPlayingIdx] = useState(0);
  return (
    <div className="container">
      <VideoPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentPlayingIdx={currentPlayingIdx}
        setCurrentPlayingIdx={setCurrentPlayingIdx}
      />
      <Playlist
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentPlayingIdx={currentPlayingIdx}
        setCurrentPlayingIdx={setCurrentPlayingIdx}
      />
    </div>
  );
}

export default App;
