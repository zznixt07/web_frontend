export type Channel = {
	id: string
	name: string
	pp: string
}

export interface VideoCardProps {
	id: string
	title: string
	viewCount: number
	thumbnail: string
	duration: number
	published: Date
	isLive: boolean
	channel: string
	categories: string[]
}

export interface VideoDetail extends VideoCardProps {
	description: string
	path: string
	likes: number
	dislikes: number
	isOwnerViewing: boolean
}

export type VideoDetailResponse = {
	elements: any[]
	channel: Channel
	video: Omit<VideoDetail, 'thumbnail' | 'channel'>
	authUser: {
		likedVideo: boolean
		dislikedVideo: boolean
	}
}
