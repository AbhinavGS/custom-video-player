import { createContext } from "react";

const PlayerContext = createContext({
  videos: [],
  setVideos: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  currentPlayingIdx: 0,
  setCurrentPlayingIdx: () => {},
});

export default PlayerContext;
