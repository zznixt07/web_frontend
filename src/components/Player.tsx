import * as React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

type PlayerProps = {
    src: string;
    // poster: string;
    // title: string;
    // description: string;
};

const Player = ({src}: PlayerProps) => {
  return (
    <Plyr
      source={{
        type: "video",
        title: "Title",
        sources: [{ src: src, type: "video/mp4", size: 720 }],
      }}
      options={{
        controls: ["play", "progress", "settings", "fullscreen"],
        settings: ["captions", "quality", "loop"],
        disableContextMenu: true,
        resetOnEnd: true,
        tooltips: { controls: true, seek: true },
        quality: { default: 720, options: [1440, 1080, 720, 480, 360] },
      }}
    />
  );
};

export default Player;
