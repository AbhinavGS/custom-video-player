/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState, useContext } from "react";
import PlayerContext from "../../context";

import "./Playlist.scss";

import mediaJSON from "../../data";
const videosData = mediaJSON["categories"][0]["videos"];

const Playlist = () => {
  const { isPlaying, setIsPlaying, currentPlayingIdx, setCurrentPlayingIdx } =
    useContext(PlayerContext);

  const dragVideo = useRef(0);
  const draggedOverVideo = useRef(0);
  
  const [videos, setVideos] = useState(videosData);

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
              videosData[currentPlayingIdx].title == video.title
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
            <span className="drag-handle" />
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
