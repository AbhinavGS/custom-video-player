import { useContext } from "react";
import PlayerContext from "../../context";
import "./CurrentPlayingVideoCard.scss";

const CurrentPlayingVideoCard = () => {
  const { videos, currentPlayingIdx } = useContext(PlayerContext);

  return (
    <div className="current-playing-video-card">
      <span>Now playing...</span>
      <div>
        <marquee>{`${videos[currentPlayingIdx].title} by ${videos[currentPlayingIdx].subtitle}`}</marquee>
      </div>
    </div>
  );
};

export default CurrentPlayingVideoCard;
