import * as React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

type PlayerProps = {
	src: string
	// poster: string;
	// title: string;
	// description: string;
	// vttUrl: string;
}

const OPTIONS = {
	controls: [
		'play',
		'play-large',
		'progress',
		'settings',
		'current-time',
		'fullscreen',
	],
	// settings: ["captions", "quality", "loop"],
	disableContextMenu: true,
	resetOnEnd: true,
	tooltips: { controls: true, seek: true },
	quality: { default: 720, options: [1440, 1080, 720, 480, 360] },
	ratio: '16:9',
	// previewThumbnails: {
	// 	enabled: true,
	// 	src: `${process.env.REACT_APP_BACKEND_ORIGIN}/static/qwerty/qwerty.vtt`,
	// },
}

const Player = React.forwardRef<
	HTMLVideoElement,
	PlayerProps & React.VideoHTMLAttributes<HTMLVideoElement>
>(({ src, ...fields }) => {
	return (
		<Plyr
			source={{
				type: 'video',
				title: 'Title',
				sources: [
					{ src: src, type: 'video/mp4', size: 720 },
					{ src: src, type: 'video/mp4', size: 480 },
				],
			}}
			options={OPTIONS}
			{...fields}
		/>
	)
})

export default Player;
