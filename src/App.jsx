import "./App.scss";
import Playlist from "./components/Playlist/Playlist";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
  return (
    <div className="container">
      <VideoPlayer />
      <Playlist />
    </div>
  );
}

export default App;
