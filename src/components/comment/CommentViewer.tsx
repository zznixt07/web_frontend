// @ts-nocheck
import * as React from 'react'
import SingleComment, { ReactionProp } from './SingleComment'
import CommentBox from './CommentBox'
import axios from 'axios'

type CommentRequest = {
	videoId: string
	body: string
	parent: string | null
}

export const createComment = async (
	content,
	pageUrl,
	parentCommentUrl = null
) => {
	const body: CommentRequest = {
		videoId: pageUrl,
		body: content,
		parent: parentCommentUrl,
	}
	console.log('posting comment', body)
	const resp = await axios.post(`/comments/${pageUrl}`, body)
	return resp
}

const createReactions = async (createEndpoint, payload) => {
	// dont optimize
	const fieldsDefault = Object.fromEntries(
		Object.entries(FIELD_EMOJI).map(([k, v]) => [k, 0])
	)
	const data = await ajax(createEndpoint, {
		method: 'POST',
		body: JSON.stringify({
			...fieldsDefault,
			...payload,
		}),
	})
	return data
}

const updateReactions = async (updateEndpoint, payload) => {
	const data = await ajax(updateEndpoint, {
		method: 'PATCH',
		body: JSON.stringify(payload),
	})
	return data
}

const onReact = async (
	commentUrl,
	userUrl,
	updateEndpoint,
	createEndpoint,
	reactionId,
	reactionRemoved
) => {
	const payload = {
		comment: commentUrl,
		user: userUrl,
	}
	console.log(userUrl, reactionId, { updateEndpoint }, { createEndpoint })
	payload[EMOJI_FIELD[reactionId]] = reactionRemoved ? 0 : 1
	let data
	if (updateEndpoint) {
		data = await updateReactions(updateEndpoint, payload)
	} else {
		data = await createReactions(createEndpoint, payload)
	}
	console.log('data.url', data.url)
	return [data, data.url]
}

type AuthorProps = {
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

type ProbabilyIndentedComment = CommentProps & { indent?: number }
type IndentedComment = CommentProps & { indent: number }
type FlatComment = Omit<IndentedComment, 'children'>

const insertIndents = (flattened, key, parentKey) => {
	let MAX_DEPTH = 100
	const context = {}
	flattened.forEach((item) => (context[item[key]] = item[parentKey]))

	const flattenedWithContext = []
	flattened.forEach((item) => {
		let id = item[key]
		let indent = 0
		while (true) {
			// even if parent key is not present, below will break the loop.
			if (!context[id]) break
			indent++
			id = context[id]
			if (indent > 100) break
		}
		item.indent = indent
		flattenedWithContext.push(item)
	})
	return flattenedWithContext
}

const insertIndentAndflatten = (comms: CommentProps[]): FlatComment[] => {
	const flattened: FlatComment[] = []
	const nextSiblingsLeft: CommentProps[] = []
	let arr = [...comms]
	let indent: number = 0
	while (true) {
		let broken = false
		for (let i = 0; i < arr.length; i++) {
			const item: ProbabilyIndentedComment = arr[i]
			const { children, ...rest } = item
			const indentValue =
				item.hasOwnProperty('indent') && item.indent !== undefined
					? item.indent
					: indent
			flattened.push({ ...rest, indent: indentValue })
			if (children.length === 0) {
				// # if no children, either go to item's next sibling or remaining siblings
				continue
			}
			// # if item has children, then keep track of the next sibling.
			// # if item was the last element then nothing to track. check for index error
			if (i + 1 < arr.length) {
				const sibling: ProbabilyIndentedComment = arr[i + 1]
				sibling.indent = indent
				nextSiblingsLeft.push(sibling)
			}

			// # prepare to iterate on children instead by breaking out.
			indent++
			arr = children
			broken = true
			break
		}
		if (!broken) {
			indent--
			const lastItem: CommentProps | undefined = nextSiblingsLeft.pop()
			if (lastItem === undefined) break
			arr = [lastItem]
		}
	}
	return flattened
}

const AllComments = ({
	pageUrl,
	comments,
}: {
	pageUrl: string
	comments: CommentProps[]
}) => {
	// const [nestedComments, setNestedComments] = useState([...comments]) // cannot use props directly in state
	const [nestedComments, setNestedComments] = React.useState<CommentProps[]>([
		...comments,
	])
	// const flatComments: FlatComment[] = insertIndentAndflatten(nestedComments)
	console.log('comments', comments)
	console.log('nestedComments', nestedComments)
	const flatComments: FlatComment[] = insertIndents(
		nestedComments,
		'id',
		'parent'
	)
	console.log('flatComments', flatComments)
	const [replyId, setReplyId] = React.useState(null)
	return (
		<>
			<CommentBox
				onComment={async (content: any) => {
					console.log('posting parent comment')
					const resp = await createComment(content, pageUrl, null)
					// nested reply is at top. should be at bottom
					// because comment follows cronological order.
					// but its-not-a-bug-its-a-feature
					setNestedComments((comms) => {
						const updatedComms = [...comms]
						updatedComms.splice(0, 0, resp.data)
						return updatedComms
					})
				}}
			/>
			{flatComments.map((comment: FlatComment, index) => {
				const reactions: ReactionProp = comment.reactions.map((o) => ({
					id: Object.keys(o)[0],
					count: Object.values(o)[0],
					reacted: comment.authUserReaction.includes(Object.keys(o)[0]),
				}))

				return (
					<React.Fragment key={comment.id}>
						<SingleComment
							// TODO remove unrequired kwargs
							id={comment.id}
							reactionUpdateEndpoint={''}
							author={comment.author}
							content={comment.body}
							datetime={comment.updatedOn}
							wasEdited={false} // if mongoose, be careful with created=updated logic.
							nestLevel={2 * comment.indent}
							replyIdSetter={setReplyId}
							reactionsArr={reactions}
							onReactAsync={async (
								reactionId: string,
								reactionRemoved: boolean
							) => {
								const data = await onReact(
									'comment.url',
									'CURR_USER',
									'thisUserReaction?.url',
									'/api/comment_like/',
									reactionId,
									reactionRemoved
								)
								setNestedComments((cs: CommentProps[]) =>
									cs.map((c: CommentProps, i) => {
										if (i === index) c.authUserReaction = data[1]
										// no need to add reaction count cuz
										// the count is internally managed in CommentProps
										return c
									})
								)
								return data
							}}
						/>
						{comment.id === replyId ? (
							<CommentBox
								onComment={async (content: any) => {
									const resp = await createComment(content, pageUrl, replyId)
									// nested reply is at top. should be at bottom
									// because comment follows cronological order.
									// but its-not-a-bug-its-a-feature
									setNestedComments((comms) => {
										const updatedComms = [...comms]
										updatedComms.splice(index + 1, 0, resp.data)
										return updatedComms
									})
								}}
							/>
						) : null}
					</React.Fragment>
				)
			})}
		</>
	)
}

export default AllComments
export { CommentProps, ReactionProps }
