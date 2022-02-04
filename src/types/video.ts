export type Channel = {
	id: string
	name: string
	pp: string
}

export interface VideoCard {
	id: string
	title: string
	description: string
	duration: number
	viewCount: number
	created: Date
	published: Date | null
	categories: string[]
}

export interface VideoDetail extends VideoCard {
	path: string
	likes: number
	dislikes: number
	comments: any[]
	isLive: boolean
	isOwnerViewing: boolean
}

export type VideoDetailResponse = {
	elements: any[]
	channel: Channel
	video: VideoDetail
}
