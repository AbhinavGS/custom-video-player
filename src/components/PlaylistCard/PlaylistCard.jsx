import "./PlaylistCard.scss";

import { useContext } from "react";
import PropTypes from "prop-types";
import PlayerContext from "../../context";

const PlaylistCard = ({
  video,
  index,
  handleSort,
  dragVideo,
  draggedOverVideo,
}) => {
  const { videos, setIsPlaying, currentPlayingIdx, setCurrentPlayingIdx } =
    useContext(PlayerContext);

  return (
    <div
      className={
        videos[currentPlayingIdx].title == video.title
          ? "playlist-card active"
          : "playlist-card"
      }
      onClick={() => {
        setCurrentPlayingIdx(index);
        setIsPlaying(true);
      }}
      draggable
      onDragStart={() => (dragVideo.current = index)}
      onDragEnter={() => (draggedOverVideo.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="playlist-card-image">
        <img src={video.thumb} />
      </div>
      <div className="playlist-card-details">
        <h3>{video.title}</h3>
        <p>{video.subtitle}</p>
      </div>
      <span className="drag-handle" />
    </div>
  );
};

PlaylistCard.propTypes = {
  video: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleSort: PropTypes.func.isRequired,
  dragVideo: PropTypes.object.isRequired,
  draggedOverVideo: PropTypes.object.isRequired,
};

export default PlaylistCard;
