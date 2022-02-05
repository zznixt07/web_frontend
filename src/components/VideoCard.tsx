import * as React from 'react'
import styled from 'styled-components'
import IcBaselinePeopleAlt from '../assets/svg/IcBaselinePeopleAlt'
import MiOptionsVertical from '../assets/svg/MiOptionsVertical'
import { Flex } from './Structure'
import AspectRatioImg from './AspectRatioImg'
import { prettyDate } from 'utils/utils'

const MyCard = styled(Flex)`
	padding: 0.3rem;
	position: relative;
	border-radius: 0.3rem;
	&:hover {
		box-shadow: 0 0 0.5rem 0 var(--surface4);
	}
`

// this anchor tag covers whole card. Which means the text inside the card are
// *NOT* selectable. Unfortunately, there seems to no way.
const CardLink = styled.a`
	width: 100%;
	&::after {
		content: '';
		position: absolute;
		inset: 0;
	}
`

const LenIndicator = styled(Flex)`
	padding: 0.2rem;
	border-radius: 0.2rem;
	background-color: #000;
	color: #fff;
`

const Thumb = styled.div`
	position: relative;
	& > ${LenIndicator} {
		position: absolute;
		bottom: 4px;
		right: 4px;
	}
`

const ThumbImage = styled(AspectRatioImg)``

const Info = styled.div`
	color: var(--text2);
`

const VideoTitle = styled.span`
	font-weight: bold;
	font-size: 1rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`

const ChannelInfo = styled(Flex)`
	& > .channel-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	justify-content: flex-start;
	flex-wrap: nowrap;
`

const VideoInfo = styled(Flex)`
	& > span::after {
		content: '•';
		margin: 0 0.2rem;
	}
	& > span:last-child::after {
		content: '';
	}
`

type ThumbProp = {
	src: string
	duration: string
	viewersCount: number
	isLive?: boolean
}

const Thumbnail = ({
	src,
	duration,
	viewersCount,
	isLive = false,
}: ThumbProp): JSX.Element => {
	return (
		<Thumb>
			<ThumbImage loading='lazy' src={src} width='350' height='200' />
			<LenIndicator>
				{isLive ? (
					<>
						<IcBaselinePeopleAlt />
						viewersCount
					</>
				) : (
					duration
				)}
			</LenIndicator>
		</Thumb>
	)
}

const secToHumanReadable = (seconds: number): string => {
	const rem = seconds % 3600
	let HH = Math.floor(seconds / 3600).toString()
	let MM = Math.floor(rem / 60).toString()
	let SS = (rem % 60).toString()

	// precede with 0s if width < 2
	if (HH.length < 2) HH = '0' + HH
	if (MM.length < 2) MM = '0' + MM
	if (SS.length < 2) SS = '0' + SS
	return HH === '00' ? `${MM}:${SS}` : `${HH}:${MM}:${SS}`
}

const VideoCard = ({ video, cardFlow = 'column' }: any) => {
	return (
		/*position: relative for capturing CardLink's position: absolute*/
		<MyCard
			$direction={cardFlow}
			align='flex-start'
			justify='flex-start'
			$wrap='wrap'
		>
			{/* If content jumps set aspect-ratio on videocard*/}
			<CardLink href={`/videos/${video.id}`} style={{ flex: '1 1 40px' }}>
				<Thumbnail
					src={video.thumbSrc}
					duration={secToHumanReadable(video.durationSecs)}
					viewersCount={video.views}
					isLive={video.isLive}
				/>
			</CardLink>
			{/* width is needed for truncate and stop overflow */}
			<div style={{ maxWidth: '100%', minWidth: '0', flex: '1 1 100px' }}>
				<Flex justify='space-between' $wrap='nowrap' align='baseline'>
					<VideoTitle>{video.title}</VideoTitle>
					<MiOptionsVertical style={{ flexShrink: '0' }} />
				</Flex>
				<Info>
					<ChannelInfo>
						<AspectRatioImg
							loading='lazy'
							src={video.thumbSrc}
							width='20'
							height='20'
							className='rounded'
						/>
						{/* to make inner links clickable without setting z-index, make position: relative*/}
						<a
							href='/channel'
							className='channel-name'
							style={{ position: 'relative' }}
						>
							{video.channel}
						</a>
					</ChannelInfo>
					<VideoInfo justify='flex-start' $wrap='wrap'>
						<span>{video.views} views</span>
						<span>{prettyDate(video.uploaded)}</span>
					</VideoInfo>
				</Info>
			</div>
		</MyCard>
	)
}

export default VideoCard
