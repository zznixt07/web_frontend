import * as React from 'react'
import { Flex, Grid } from '../components/Structure'
import VideoCard from '../components/VideoCard'
import styled from 'styled-components'
import horiz from '../assets/vids/horizontal.mp4'
import vert from '../assets/vids/vertical.mp4'
import SubscribeButton from '../components/SubscribeButton'
import AllComments, {CommentProps} from '../components/comment/CommentViewer'
import NavBar from '../components/NavBar'
import PopupModel, { PopupModelContainer } from '../components/PopupModel'
import {PlaylistProps, AddToPaylistDialog} from 'components/AddToPlaylist'

import Like from '../assets/svg/LikeOutlined'
import Liked from '../assets/svg/LikeFilled'
import DisLike from '../assets/svg/DislikeOutlined'
import DisLiked from '../assets/svg/DislikeFilled'
import Share from '../assets/svg/Share'
import AddToPlaylist from '../assets/svg/PlaylistAdd'
import Flag from '../assets/svg/FlagOutlined'

import img1 from '../assets/imgs/(1).jpg'
import img2 from '../assets/imgs/(2).jpg'
import img3 from '../assets/imgs/(3).jpg'
import img4 from '../assets/imgs/(4).jpg'
import img5 from '../assets/imgs/(5).jpg'
import img6 from '../assets/imgs/(6).jpg'
import img7 from '../assets/imgs/(7).jpg'
import img8 from '../assets/imgs/(8).jpg'
import { provide } from '../components/Provider'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { VideoDetailResponse } from 'types/video'
import Player from 'components/Player'

const thumbs = [img1, img2, img3, img4, img5, img6, img7, img8]
const randomName = (): string => {
	const names = [
		'10 hour meme song loop',
		'Amogus night 3am SUS challenge. OMG!!! Pranking ghost in the after life. Family vlogs video insert text 1 inster line five.',
	]
	return names[Math.floor(Math.random() * names.length)]
}

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

const sampledesc =
	'This is the greatest description of all time. Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil. Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil. Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil. Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil. Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.Lorem ipsum dolor sit amet consectetur adipisicing, elit. Ducimus, saepe incidunt fugiat consequuntur sequi error a debitis cupiditate distinctio harum at magnam reprehenderit id omnis ipsa nam quisquam nisi nihil.'

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

const MemoizedPlayer = React.memo(({ src }: any) => (
	<Player src={src} width='1200' height='600' />
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
	const [isDisLiked, setIsDisLiked] = React.useState<boolean>(false)
	const [isPlaylistClicked, setIsPlaylistClicked] =
		React.useState<boolean>(false)
	const [videoInfo, setVideoInfo] = React.useState<VideoDetailResponse | null>(
		null
	)

	React.useEffect(() => {
		const fetchVideoInfo = async () => {
			const fetchedVideoInfo = await axios.get('/videos/' + videoId)
			setVideoInfo(fetchedVideoInfo.data as VideoDetailResponse)
		}
		console.log('fetching video info')
		fetchVideoInfo()
	}, [videoId])

	const handleLike = () => {
		// in backend set a field called
		// `perception`: true(like) | false(dislike) | null(neither liked nor disliked.)
		setIsLiked((s) => {
			if (!s === isDisLiked && !s === true) setIsDisLiked(s)
			return !s
		})
	}
	const handleDisLike = () => {
		setIsDisLiked((s) => {
			if (!s === isLiked && !s === true) setIsLiked(s)
			return !s
		})
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
		<div>
			<PopupModelContainer />
			<MemoizedPlayer src={videoInfo.video.path} />
			<h3>{videoInfo.video.title}</h3>
			<Flex justify='space-between'>
				<div>
					<span>{videoInfo.video.viewCount} views</span>
					<span>{new Date(videoInfo.video.published!).toLocaleString()}</span>
				</div>
				<Flex justify='flex-start' gap='1rem'>
					<ActionButton onClick={handleLike}>
						{isLiked ? <Liked /> : <Like />}
						{videoInfo.video.likes}
					</ActionButton>
					<ActionButton onClick={handleDisLike}>
						{isDisLiked ? <DisLiked /> : <DisLike />}
						{videoInfo.video.dislikes}
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
			<hr />
			<Flex justify='space-between'>
				<Flex justify='flex-start'>
					<img
						src={videoInfo.channel.pp}
						width='20'
						height='20'
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
			<Description>{sampledesc}</Description>
			<hr />
		</div>
	)
}

const RelatedVideos = () => {
	return (
		<Related>
			<Grid maxColumns={1} itemBaseWidth='350px' gap='1rem'>
				{thumbs.map((i, j) => (
					<VideoCard
						key={j}
						video={{
							thumbSrc: i,
							title: randomName(),
							views: '1.2M',
							channel: randomName(),
							durationSecs: 101,
							isLive: false,
						}}
						cardFlow='row'
					/>
				))}
			</Grid>
		</Related>
	)
}

const sampleComments: CommentProps[] = [
	
]

const Video = () => {
	const params = useParams<{ id: string }>()
	console.log(params)
	return (
		<>
			<NavBar />
			<div>
				<div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
					<CurrentVideo videoId={params.id!} />
					<RelatedVideos />
				</div>
				<section style={{ margin: '0.5rem' }}>
					<AllComments pageUrl='' comments={sampleComments} />
				</section>
			</div>
		</>
	)
}

export default Video
