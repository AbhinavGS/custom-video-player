import { useRef, useState } from "react";
import { PlaylistCard } from "../../components";

import "./Playlist.scss";

import mediaJSON from "../../data";
const videosData = mediaJSON["categories"][0]["videos"];

const Playlist = () => {
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
      {videos.map((video, index) => (
        <PlaylistCard
          key={video["title"]}
          video={video}
          index={index}
          handleSort={handleSort}
          dragVideo={dragVideo}
          draggedOverVideo={draggedOverVideo}
        />
      ))}
    </div>
  );
};

export default Playlist;
