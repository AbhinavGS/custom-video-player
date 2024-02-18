# Custom video player

## **How to install and run locally ?**

```
$ git clone https://github.com/AbhinavGS/custom-video-player
$ cd custom-video-player
$ npm install
$ npm run dev
```
## **Features -**

- Custom video player from scratch without any package/library
- Custom playlist from scratch without any package/library
- Draggable playlist (re-arrange using drag and drop)
- State management without using an external library
- All basic functionality with fullscreen, PIP, Playback rate change support
- Autoplay next video functionality
- Keyboard shortcuts for keyboard Ninjas:
  - f: toggle fullscreen
  - m: toggle mute
  - p: toggle PIP (Picture In Picture) mode
  - r: change video playback speed
  - spacebar: toggle play/pause
  - arrow right: play next
 - Fully Responsive

## **Built with -**

- Vite.js + React JS
- SASS

## **Folder structure**
<pre>
|-- src  
    |-- assets  
      |-- index.js  
    |-- components  
      |-- ControlPanel  
        |-- ControlPanel.jsx  
        |-- ControlPanel.scss  
      |-- CurrentPlayingVideoCard  
        |-- CurrentPlayingVideoCard.jsx  
        |-- CurrentPlayingVideoCard.scss  
      |-- Playlist  
        |-- Playlist.jsx  
        |-- Playlist.scss  
      |-- PlaylistCard  
        |-- PlaylistCard.jsx  
        |-- PlaylistCard.scss  
      |-- VideoPlayer  
        |-- VideoPlayer.jsx  
        |-- VideoPlayer.scss  
    |-- App.jsx  
    |-- App.scss  
    |-- context.js  
    |-- data.js  
    |-- index.css  
    |-- main.jsx  
    |-- utils.js  
|-- index.html  
</pre>
