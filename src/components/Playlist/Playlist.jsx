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
      <ul>
        {videos.map((video, index) => {
          return (
            <div
              key={video["title"]}
              onClick={() => {
                setCurrentPlayingIdx(index);
                setIsPlaying(true);
              }}
            >
              <li className={index === currentPlayingIdx ? "active" : ""}>
                {video["title"]}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Playlist;
