import * as React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

type PlayerProps = {
    src: string;
    // poster: string;
    // title: string;
    // description: string;
};

const OPTIONS = {
  controls: [
    "play",
    "play-large",
    "progress",
    "settings",
    "current-time",
    "fullscreen",
  ],
  // settings: ["captions", "quality", "loop"],
  disableContextMenu: true,
  resetOnEnd: true,
  tooltips: { controls: true, seek: true },
  quality: { default: 720, options: [1440, 1080, 720, 480, 360] },
  ratio: "16:9",
  previewThumbnails: {
    enabled: true,
    src: "https://portal-everywhere.herokuapp.com/proxy/https://zznixt07-web-backend-rx4p4wjvf59x7-8000.githubpreview.dev/static/720p.vtt",
  },
};

const Player = ({ src }: PlayerProps) => {
  return (
    <Plyr
      source={{
        type: "video",
        title: "Title",
        sources: [
          { src: src, type: "video/mp4", size: 720 },
          { src: src, type: "video/mp4", size: 480 },
        ],
      }}
      options={OPTIONS}
    />
  );
};

export default Player;
