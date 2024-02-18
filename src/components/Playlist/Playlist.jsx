import { useRef, useContext } from "react";
import { PlaylistCard } from "../../components";
import PlayerContext from "../../context";

import "./Playlist.scss";

const Playlist = () => {
  const { videos, setVideos } = useContext(PlayerContext);

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
