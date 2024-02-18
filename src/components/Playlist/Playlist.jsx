import { useRef, useContext } from "react";
import { PlaylistCard, CurrentPlayingVideoCard } from "../../components";
import PlayerContext from "../../context";

import "./Playlist.scss";

const Playlist = () => {
  const { videos, setVideos, currentPlayingIdx } = useContext(PlayerContext);

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
      <CurrentPlayingVideoCard />
      {videos.map((video, index) => {
        if (videos[currentPlayingIdx].title !== video.title) {
          return (
            <PlaylistCard
              key={video["title"]}
              video={video}
              index={index}
              handleSort={handleSort}
              dragVideo={dragVideo}
              draggedOverVideo={draggedOverVideo}
            />
          );
        }
      })}
    </div>
  );
};

export default Playlist;
