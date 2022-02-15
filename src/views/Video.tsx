import * as React from 'react'
import { Flex, Grid } from '../components/Structure'
import VideoCard from '../components/VideoCard'
import styled from 'styled-components'
import SubscribeButton from '../components/SubscribeButton'
import AllComments from '../components/comment/CommentViewer'
import NavBar from '../components/NavBar'
import PopupModel, { PopupModelContainer } from '../components/PopupModel'
import { PlaylistProps, AddToPaylistDialog } from 'components/AddToPlaylist'

import Like from '../assets/svg/LikeOutlined'
import Liked from '../assets/svg/LikeFilled'
import DisLike from '../assets/svg/DislikeOutlined'
import DisLiked from '../assets/svg/DislikeFilled'
import Share from '../assets/svg/Share'
import AddToPlaylist from '../assets/svg/PlaylistAdd'
import Flag from '../assets/svg/FlagOutlined'

import { provide } from '../components/Provider'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { VideoCardProps, VideoDetailResponse } from 'types/video'
import Player from 'components/Player'
import { CommentProps } from 'types/comment'
import { useMediaQuery } from 'CustomHooks'
import toast from 'react-hot-toast'

const ActionButton = styled(Flex)`
	cursor: pointer;
`

const Related = styled.div`
	// flex: 30%;
`

// const countLines = (contents: string): number => contents.split('\n').length

// const splitOnLine = (contents: string, lineNum: number): string[] => {
//     let firsthalf: string = ''
//     let lastHalf: string = ''
//     let newlineCount = 0
//     for (const character of contents) {
//         firsthalf += character
//         if (character === '\n') newlineCount++
//         if (newlineCount >= lineNum)
//     }
// }

const Desc = styled.div<{ isExpanded: boolean }>`
    width: 100%;
    word-break: break-word;
    overflow: hidden;
    line-height: 1.6;
    max-height: ${(props) => (props.isExpanded ? '30rem' : '3rem')};
    transition: max-height 350ms linear;
}
`

const MoreLessBtn = styled.span`
	display: block;
	cursor: pointer;
	margin: 0.5rem 0;
`

const playlists: PlaylistProps[] = [
	{
		id: '235423432facd',
		name: 'Songs',
		privacy: 'public',
		hasCurrentVideo: false,
	},
	{
		id: '235423432facdwe',
		name: 'Favourites',
		privacy: 'private',
		hasCurrentVideo: true,
	},
	{
		id: '2354234234abbc',
		name: 'Study Materials',
		privacy: 'unlisted',
		hasCurrentVideo: false,
	},
]

const Description = (props: { children?: React.ReactNode }) => {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false)
	const expandOrContract = (event: any) => {
		if (isExpanded) {
			// currently expanded. contract it.
			setIsExpanded(false)
		} else {
			setIsExpanded(true)
		}
	}
	return (
		<div style={{ margin: '1rem 3vw' }}>
			<Desc isExpanded={isExpanded}>{props.children}</Desc>
			<MoreLessBtn onClick={expandOrContract}>
				{isExpanded ? 'Show Less' : 'Show More'}
			</MoreLessBtn>
		</div>
	)
}

const Hr = styled.div`
	margin: 0.5rem 0;
	border-top: 1px solid var(--text2);
`

const MemoizedPlayer = React.memo(({ src }: any) => (
	<Player muted={false} src={src} width='1200' height='600' />
))

type CurrentVideoProps = {
	videoId: string
}

const CurrentVideo = ({ videoId }: CurrentVideoProps) => {
	const [channelSubscription, setChannelSubscription] =
		React.useState<boolean>(false)
	const [channelNotification, setChannelNotification] =
		React.useState<boolean>(false)
	const [isLiked, setIsLiked] = React.useState<boolean>(false)
	const [isDisliked, setIsDisliked] = React.useState<boolean>(false)
	const [isPlaylistClicked, setIsPlaylistClicked] =
		React.useState<boolean>(false)
	const [videoInfo, setVideoInfo] = React.useState<VideoDetailResponse | null>(
		null
	)

	React.useEffect(() => {
		const fetchVideoInfo = async () => {
			const resp = await axios.get('/videos/' + videoId)
			if (!resp.data.success) {
				toast.error('Error fetching video:' + resp.data.message)
				return
			}
			const fetchedVideoInfo: VideoDetailResponse = resp.data.message
			setVideoInfo(fetchedVideoInfo)
			setIsLiked(fetchedVideoInfo.authUser.likedVideo)
			setIsDisliked(fetchedVideoInfo.authUser.dislikedVideo)
		}
		console.log('fetching video info')
		fetchVideoInfo()
	}, [videoId])

	// const [perception, setPerception] = React.useState<boolean | null>(null)
	// React.useEffect(() => {
	// 	if (isLiked) {
	// 		setPerception(true)
	// 	}
	// 	if (isDisliked) {
	// 		setPerception(false)
	// 	}
	// 	if (isLiked === isDisliked) {
	// 		setPerception(null)
	// 	}
	// }, [isLiked, isDisliked])

	const handleLike = async () => {
		// in backend set a field called
		// `perception`: true(like) | false(dislike) | null(neither liked nor disliked.)
		const prevState = isLiked
		const newState = !prevState
		setIsLiked((s) => {
			if (!s === isDisliked && !s === true) setIsDisliked(s)
			return !s
		})
		const resp = await axios.post('/videos/actions/' + videoId, {
			likes: newState,
		})
		if (!resp.data?.success) {
			toast.error('Something went wrong! Try again.')
			setIsLiked(prevState)
		}
	}
	const handleDisLike = async () => {
		const prevState = isDisliked
		const newState = !prevState
		setIsDisliked((s) => {
			if (!s === isLiked && !s === true) setIsLiked(s)
			return !s
		})
		const resp = await axios.post('/videos/actions/' + videoId, {
			dislikes: newState,
		})
		if (!resp.data?.success) {
			toast.error('Something went wrong! Try again.')
			setIsDisliked(prevState)
		}
	}

	const handlePlaylist = () => {
		console.log('addtoplaylist button clicked')
		provide(
			<PopupModel>
				<AddToPaylistDialog playlists={playlists} />
			</PopupModel>
		)
		setIsPlaylistClicked((s) => !s)
	}

	React.useEffect(() => {
		// channel's subscription status changed.
		// console.log('subscribed to curr videos channel', channelSubscription)
	}, [channelSubscription])

	React.useEffect(() => {
		// channel's notification status changed.
		// console.log('notif to curr videos channel', channelNotification)
	}, [channelNotification])
	if (!videoInfo) {
		return <div>Loading...</div>
	}

	return (
		<div style={{ padding: '0 0.4rem' }}>
			<PopupModelContainer />
			<MemoizedPlayer src={videoInfo.video.path} />
			<h3>{videoInfo.video.title}</h3>
			<Flex justify='space-between' $wrap='wrap' gap='2rem'>
				<Flex gap='1rem' $wrap='wrap' style={{ fontSize: '0.85em' }}>
					<span>{videoInfo.video.viewCount} views</span>
					<span>{new Date(videoInfo.video.published!).toLocaleString()}</span>
				</Flex>
				<Flex justify='flex-start' gap='1rem'>
					<ActionButton onClick={handleLike}>
						{isLiked ? <Liked /> : <Like />}
						{videoInfo.video.likes + (isLiked ? 1 : 0)}
					</ActionButton>
					<ActionButton onClick={handleDisLike}>
						{isDisliked ? <DisLiked /> : <DisLike />}
						{videoInfo.video.dislikes + (isDisliked ? 1 : 0)}
					</ActionButton>
					<ActionButton>
						<Share />
						Share
					</ActionButton>
					<ActionButton onClick={handlePlaylist}>
						<AddToPlaylist />
						Add
					</ActionButton>
					<ActionButton>
						<Flag />
						Flag
					</ActionButton>
				</Flex>
			</Flex>
			<Hr />
			<Flex justify='space-between'>
				<Flex justify='flex-start'>
					<img
						src={videoInfo.channel.pp}
						width='40'
						height='40'
						className='rounded'
						alt='channel profile pic'
					/>
					<Link to={`/users/${videoInfo.channel.id}`}>
						<span>{videoInfo.channel.name}</span>
					</Link>
				</Flex>
				<SubscribeButton
					isSubscribed={channelSubscription}
					isNotificationOn={channelNotification}
					onSubscriptionChange={setChannelSubscription}
					onNotificationChange={setChannelNotification}
				/>
			</Flex>
			<Description>{videoInfo.video.description}</Description>
		</div>
	)
}

const RelatedVideos = () => {
	const [videos, setVideos] = React.useState<VideoCardProps[]>([])
	React.useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get('/videos')
			setVideos(response.data)
		}
		fetchData()
	}, [])
	return (
		<Related>
			<Grid maxColumns={1} itemBaseWidth='350px' gap='1rem'>
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
						cardFlow={'row'}
						style={{ maxHeight: '100px' }}
					/>
				))}
			</Grid>
		</Related>
	)
}

const Video = () => {
	const params = useParams<{ id: string }>()
	const videoId = params.id!
	let username = null
	try {
		username = JSON.parse(localStorage.getItem('auth') as string).username
	} catch (e) {}
	const isSmall = useMediaQuery('(max-width: 950px)')
	const [sampleComments, setSampleComments] = React.useState<CommentProps[]>([])
	React.useEffect(() => {
		const fetchComments = async () => {
			const fetchedComments = await axios.get('/comments/' + videoId)
			setSampleComments(fetchedComments.data.comments)
		}
		fetchComments()
	}, [videoId])
	return (
		<>
			<NavBar />
			<div>
				<div
					style={{
						padding: '1rem',
						display: 'grid',
						gridTemplateColumns: isSmall ? '1fr' : '7fr 3fr',
					}}
				>
					<CurrentVideo videoId={videoId} />
					<RelatedVideos />
				</div>
				<section style={{ padding: '0.5rem' }}>
					<AllComments
						pageUrl={videoId}
						comments={sampleComments}
						username={username}
					/>
				</section>
			</div>
		</>
	)
}

export default Video
