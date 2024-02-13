import "./VideoPlayer.scss";

const VideoPlayer = () => {
  return (
    <div className="video-player">
      <video
        controls
        poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        Your browser does not support HTML video.
      </video>
    </div>
  );
};

export default VideoPlayer;
