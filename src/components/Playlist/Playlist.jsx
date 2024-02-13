import "./Playlist.scss";

import mediaJSON from "../../data";

const videos = mediaJSON["categories"][0]["videos"];

const Playlist = () => {
  return (
    <div className="playlist">
      <ul>
        {videos.map((video) => {
          return <li key={video["title"]}>{video["title"]}</li>;
        })}
      </ul>
    </div>
  );
};

export default Playlist;
