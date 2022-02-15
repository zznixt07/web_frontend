import DeleteBin from 'assets/svg/DeleteBin'
import IcRoundEdit from 'assets/svg/IcRoundEdit'
import MdiOpenInApp from 'assets/svg/MdiOpenInApp'
import axios from 'axios'
import AspectRatioImg from 'components/AspectRatioImg'
import NavBar from 'components/NavBar'
import { Flex, Grid } from 'components/Structure'
import * as React from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { VideoDetail } from 'types/video'

const RowGrid = styled.div`
	display: grid;
	grid-template-columns: 2fr repeat(5, 1fr);
	justify-items: start;
	justify-content: center;
	font-size: 0.9em;
	gap: 0.2rem;
	padding: 0.5rem 0;
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
	onDelete: any
}

const HeaderRow = () => {
	return (
		<RowGrid>
			<div>Video</div>
			<div>Views</div>
			<div>Published</div>
			<div>Visible</div>
			<div>Likes / dislikes</div>
			<div style={{ justifySelf: 'center' }}>Action</div>
		</RowGrid>
	)
}

const Title = styled.span`
	font-size: 0.76em;
`

const DelBtn = styled.button`
	background-color: transparent;
	padding: 0.4rem;
	&:hover > * {
		transform: rotate(-45deg);
	}
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
	onDelete,
}: RowProps) => {
	return (
		<RowGrid>
			<Flex align='flex-start'>
				<div style={{ flexShrink: '0' }}>
					<AspectRatioImg src={thumbnail} alt={title} width='100' height='60' />
				</div>
				<Flex
					$direction='column'
					align='flex-start'
					justify='space-between'
					style={{ height: '100%' }}
				>
					<Title>{title}</Title>
					<Flex>
						<Link to={'/videos/' + id} title='Open video'>
							<MdiOpenInApp />
						</Link>
						<Link to={'/videos/edit/' + id} title='Edit video'>
							<IcRoundEdit />
						</Link>
					</Flex>
				</Flex>
			</Flex>
			<div>{views}</div>
			<div>{published.toLocaleString()}</div>
			<div>{visible}</div>
			<div>
				{likes} / {dislikes}
			</div>
			<div style={{ justifySelf: 'center' }}>
				<DelBtn onClick={() => onDelete(id)} className='danger'>
					<DeleteBin className='no-evt' />
				</DelBtn>
			</div>
		</RowGrid>
	)
}

const TableContents = ({ username }: { username: string }) => {
	const [userVideos, setUserVideos] = React.useState<VideoDetail[]>([])
	const deleteVideo = async (id: string) => {
		const resp = await axios.delete(`/videos/${id}`)
		if (resp.data.success) {
			toast.success('Video deleted')
			setUserVideos(userVideos.filter((video: any) => video.id !== id))
		} else {
			toast.error('Video could not be deleted. Try again.')
		}
	}

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`/users/videos/${username}`)
			let filteredVideos: VideoDetail[] = response.data.message
			setUserVideos(filteredVideos)
		}
		fetchData()
	}, [username])
	return (
		<div className='p-md'>
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
					onDelete={deleteVideo}
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
			<NavBar />
			<h3>Your videos</h3>
			<TableContents username={username!} />
		</div>
	)
}

export default UserVideos
