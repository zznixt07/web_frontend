// @ts-nocheck
import toast from 'react-hot-toast'
import * as React from 'react'
import SingleComment, { ReactionProp } from './SingleComment'
import CommentBox from './CommentBox'
import axios from 'axios'
import { insertIndents, FlatComment } from '../../utils/utils'

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

const editComment = async (commentId, content) => {
	const payload = {
		comment: content,
	}
	const resp = await axios.put('/comments/' + commentId, payload)
	return resp
}

const deleteComment = async (commentId) => {
	const resp = await axios.delete('/comments/' + commentId)

	return resp
}

const onReact = async (commentId, reaction, removeReactionNow) => {
	const payload = {
		reaction: {
			emoji: reaction,
			value: !removeReactionNow,
		},
	}
	const resp = await axios.put('/comments/' + commentId, payload)
	return resp
}

const AllComments = ({
	pageUrl,
	comments,
	username,
}: {
	pageUrl: string
	comments: CommentProps[]
	username: string
}) => {
	// const [nestedComments, setNestedComments] = useState([...comments]) // cannot use props directly in state
	const [nestedComments, setNestedComments] = React.useState<CommentProps[]>([])
	React.useEffect(() => setNestedComments([...comments]), [comments])
	// const flatComments: FlatComment[] = insertIndentAndflatten(nestedComments)
	// console.log('comments', comments)
	// console.log('nestedComments', nestedComments)
	const flatComments: FlatComment[] = insertIndents(
		nestedComments,
		'id',
		'parent'
	)
	// console.log('flatComments', flatComments)
	const [replyId, setReplyId] = React.useState<string | null>(null)
	const handleCommentEdit = async (
		comment: FlatComment,
		index: number,
		newContent: string
	) => {
		const resp = await editComment(comment.id, newContent)
		if (resp.data.success) {
			setNestedComments((comments) => {
				const updatedComments = [...comments]
				const updatedComment = {
					...comment,
					body: newContent,
					updatedAt: new Date(),
				}
				updatedComments.splice(index, 1, updatedComment)
				return updatedComments
			})
			toast.success('Comment edited!')
		} else {
			toast.error('Failed to edit comment')
		}
	}

	const handleCommentRemove = async (id: string, index: number) => {
		const resp = await deleteComment(id)
		if (resp.data.success) {
			setNestedComments((comments) => {
				const updatedComments = [...comments]
				delete updatedComments[index]
				return updatedComments
			})
			toast.success('Comment deleted')
		} else {
			toast.error(resp.data.message)
		}
	}

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
				// console.log(comment)
				return (
					<React.Fragment key={comment.id}>
						<SingleComment
							// TODO remove unrequired kwargs
							id={comment.id}
							author={comment.author}
							content={comment.body}
							datetime={comment.updatedAt}
							wasEdited={comment.createdAt !== comment.updatedAt}
							nestLevel={2 * comment.indent}
							replyIdSetter={setReplyId}
							onCommentEdit={async (content: string) =>
								await handleCommentEdit(comment, index, content)
							}
							onCommentDelete={async () => {
								await handleCommentRemove(comment.id, index)
							}}
							isCurrentUser={comment.author.name === username}
							reactionsArr={reactions}
							onReactAsync={async (
								reactionId: string,
								removeReaction: boolean
							) => {
								const resp = await onReact(
									comment.id,
									reactionId,
									removeReaction
								)
								setNestedComments((cs: CommentProps[]) =>
									cs.map((c: CommentProps, i) => {
										if (i === index)
											c.authUserReaction = resp.data.authUserReaction
										// no need to add reaction count cuz
										// the count is internally managed in CommentProps
										return c
									})
								)
								return resp.data.success
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
