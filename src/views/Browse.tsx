import axios from 'axios'
import * as React from 'react'
import { VideoCardProps } from 'types/video'
import { Grid } from '../components/Structure'
import VideoCard from '../components/VideoCard'

const Browse = ({ cardFlow = 'column' }: any) => {
	const [videos, setVideos] = React.useState<VideoCardProps[]>([])
	React.useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get('/videos')
			setVideos(response.data)
		}
		fetchData()
	}, [])
	return (
		<Grid maxColumns={10} itemBaseWidth='310px' gap='0.2rem' fill='auto-fill'>
			{videos.map((video) => (
				<VideoCard
					key={video.id}
					video={{
						id: video.id,
						thumbSrc: video.thumbnail,
						title: video.title,
						views: video.viewCount,
						channel: video.channel,
						published: video.published,
						durationSecs: video.duration,
						isLive: video.isLive,
					}}
					// style={{ height: '310px' }}
					cardFlow={cardFlow}
				/>
			))}
		</Grid>
	)
}

export default Browse
