import { Grid } from '../components/Structure'
import VideoCard from '../components/VideoCard'
import img1 from '../assets/imgs/(1).jpg'
import img2 from '../assets/imgs/(2).jpg'
import img3 from '../assets/imgs/(3).jpg'
import img4 from '../assets/imgs/(4).jpg'
import img5 from '../assets/imgs/(5).jpg'
import img6 from '../assets/imgs/(6).jpg'
import img7 from '../assets/imgs/(7).jpg'
import img8 from '../assets/imgs/(8).jpg'
import axios from 'axios'
import * as React from 'react'
// import {provide} from '../components/Provider'

const thumbs = [img1, img2, img3, img4, img5, img6, img7, img8]
// const thumbs = [img7, img7, img7, img7, img7, img7, img7]
// const thumbs = [img8, img8, img8, img8, img8, img8, img8]

const randomName = (): string => {
	const names = [
		'10 hour meme song loop',
		'Amogus night 3am SUS challenge. OMG!!! Pranking ghost in the after life. Family vlogs video insert text 1 inster line five.',
	]
	return names[Math.floor(Math.random() * names.length)]
}

type VideoProps = {
	id: string
	title: string
	viewCount: number
	thumbnail: string
	duration: number
	uploaded: Date
	channel: string
	isLive: boolean
}

const Browse = ({ cardFlow = 'column' }: any) => {
	const [videos, setVideos] = React.useState<VideoProps[]>([])
	React.useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get('/videos')
			setVideos(response.data)
		}
		fetchData()
	}, [])
	return (
		<Grid maxColumns={10} itemBaseWidth='350px' gap='0.2rem'>
			{videos.map((video) => (
				<VideoCard
					key={video.id}
					video={{
						id: video.id,
						thumbSrc: video.thumbnail,
						title: video.title,
						views: video.viewCount,
						channel: video.channel,
						uploaded: video.uploaded,
						durationSecs: video.duration,
						isLive: video.isLive,
					}}
					cardFlow={cardFlow}
				/>
			))}
		</Grid>
	)
}

export default Browse
