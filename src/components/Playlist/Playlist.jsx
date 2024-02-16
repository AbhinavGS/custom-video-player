/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./Playlist.scss";

import mediaJSON from "../../data";
import { useRef, useState } from "react";

const videosData = mediaJSON["categories"][0]["videos"];

const Playlist = ({
  isPlaying,
  setIsPlaying,
  currentPlayingIdx,
  setCurrentPlayingIdx,
}) => {
  const [videos, setVideos] = useState(videosData);
  const dragVideo = useRef(0);
  const draggedOverVideo = useRef(0);

  function handleSort() {
    const videoClone = [...videos];
    const temp = videoClone.splice(dragVideo.current, 1)[0];
    videoClone.splice(draggedOverVideo.current, 0, temp);
    setVideos(videoClone);
  }
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
