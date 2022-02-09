export type AuthorProps = {
	name: string
	channelLink: string
	imageLink: string
}

type ReactionProps = Record<string, number>

export type CommentProps = {
	id: string
	body: string
	author: AuthorProps
	createdOn: string
	updatedOn: string
	authUserReaction: string[]
	reactions: ReactionProps[]
	parent: string | null
}
