/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./Playlist.scss";

import mediaJSON from "../../data";

const videos = mediaJSON["categories"][0]["videos"];

const Playlist = ({
  isPlaying,
  setIsPlaying,
  currentPlayingIdx,
  setCurrentPlayingIdx,
}) => {
  return (
    <div className="playlist">
      {videos.map((video, index) => {
        return (
          <div
            className={
              index === currentPlayingIdx
                ? "playlist-card active"
                : "playlist-card"
            }
            key={video["title"]}
            onClick={() => {
              setCurrentPlayingIdx(index);
              setIsPlaying(true);
            }}
          >
            <div className="playlist-card-image">
              <img src={video.thumb} />
            </div>
            <div className="playlist-card-details">
              <h3>{video.title}</h3>
              <p>{video.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;

{
  /* <li className={index === currentPlayingIdx ? "active" : ""}>
  {video["title"]}
</li> */
}
