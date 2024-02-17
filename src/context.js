import { createContext } from "react";

const PlayerContext = createContext({
  isPlaying: false,
  setIsPlaying: () => {},
  currentPlayingIdx: 0,
  setCurrentPlayingIdx: () => {},
});

export default PlayerContext;
