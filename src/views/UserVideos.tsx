import axios from 'axios'
import AspectRatioImg from 'components/AspectRatioImg'
import { Flex, Grid } from 'components/Structure'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { VideoDetail } from 'types/video'

const RowGrid = styled.div`
	display: grid;
	grid-template-columns: 2fr repeat(4, 1fr);
	justify-items: start;
	justify-content: center;
	font-size: 0.9em;
	gap: 0.2rem;
`

type RowProps = {
	id: string
	title: string
	views: number
	published: Date
	duration: number
	visible: string
	likes: number
	dislikes: number
	thumbnail: string
}

const HeaderRow = () => {
	return (
		<RowGrid>
			<div>Video</div>
			<div>Views</div>
			<div>Published</div>
			<div>Visible</div>
			<div>Likes / dislikes</div>
		</RowGrid>
	)
}

const Title = styled.span`
	font-size: 0.7em;
`

const Row = ({
	id,
	title,
	views,
	published,
	duration,
	visible,
	likes,
	dislikes,
	thumbnail,
}: RowProps) => {
	console.log(published)
	return (
		<RowGrid>
			<Flex align='flex-start'>
				<AspectRatioImg src={thumbnail} alt={title} width='100' height='60' />
				<Title>{title}</Title>
			</Flex>
			<div>{views}</div>
			<div>{published.toLocaleDateString()}</div>
			<div>{visible}</div>
			<div>
				{likes} / {dislikes}
			</div>
		</RowGrid>
	)
}

const TableContents = ({ username }: { username: string }) => {
	const [userVideos, setUserVideos] = React.useState<VideoDetail[]>([])

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`/users/videos/${username}`)
			let filteredVideos: VideoDetail[] = response.data.message
			setUserVideos(filteredVideos)
		}
		fetchData()
	}, [username])
	return (
		<div>
			<HeaderRow />
			{userVideos.map((video) => (
				<Row
					key={video.id}
					id={video.id}
					title={video.title}
					views={video.viewCount}
					published={new Date(video.published)}
					duration={video.duration}
					visible='Public'
					likes={video.likes}
					dislikes={video.dislikes}
					thumbnail={video.thumbnail}
				/>
			))}
		</div>
	)
}

const UserVideos = () => {
	const params = useParams()
	const username = params.username
	return (
		<div>
			<TableContents username={username!} />
		</div>
	)
}

export default UserVideos
