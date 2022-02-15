import * as React from 'react'
import toast from 'react-hot-toast'
import styled, { css } from 'styled-components'
import { AuthorProps } from 'types/comment'
import { Flex } from '../Structure'

const FlexWrapAlign = styled(Flex)`
	flex-wrap: wrap;
	gap: 0.5rem;
	justify-content: flex-start;
`

const GeneralCommentContainer = styled.div`
	// border: 1px solid #eae6e6;
	background-color: var(--surface2);
	padding: 1rem 0.8rem;
	border-radius: 1.4rem;
	margin: 0.6rem 0;
`

const CommentContainer = styled(GeneralCommentContainer)<{ indent: number }>`
	margin-left: ${(props) => props.indent + 'rem'};
`

const CommentHead = styled(FlexWrapAlign)`
	justify-content: space-between;
`

const Author = styled(FlexWrapAlign)`
	font-weight: 400;
	gap: 0.4rem;
	flex: 1 1 0;
	& > ::before {
		content: '· ';
	}
	span:first-of-type::before {
		content: '';
	}
	.date {
		color: var(--text2);
		font-size: 0.82em;
	}
`

const OptionsContainer = styled.button`
	border-radius: 0 50% 0 0;
	position: relative;
`

const Options = styled.ul`
	position: absolute;
	top: 0;
	right: 110%;
	list-style: none;
	border-radius: 50% 0 0 0;
	li {
		padding: 0.5rem 2rem;
		background-color: var(--surface4);
		cursor: pointer;
	}
	li:hover {
		color: var(--surface1);
		background-color: var(--text1);
	}
`

const Edit = styled.button``

const AuthorImage = styled.img`
	object-fit: cover;
	border-radius: 50%;
`

const CommentText = styled.div`
	margin: 0.4rem 0.2rem 0.6rem 0.2rem;
`

const CommentEditText = styled.textarea`
	width: 100%;
`

const CommentBottomAction = styled(FlexWrapAlign)`
	justify-content: space-between;
	margin: 0.3rem;
`

const CommentAction = styled(FlexWrapAlign)`
	gap: 1rem;
`

const Reaction = styled(FlexWrapAlign)`
	position: relative;
	list-style-type: none;
	margin: 0;
	padding: 0;
`

const ReactionList = styled(FlexWrapAlign)<{ reacted?: boolean }>`
	gap: 0.2rem;
	cursor: pointer;
	padding: 0.1rem 0.4rem;
	outline: 1px solid var(--surface4);
	border-radius: 1rem;
	&::selection,
	& *::selection {
		background: #ffffff00;
	}
	&::-moz-selection,
	& *::-moz-selection {
		background: #ffffff00;
	}
	&:hover {
		background-color: #6c9ae227;
	}
	${(props) =>
		props.reacted &&
		css`
			background-color: #6c9ae247;
		`}
`

const EmojiChooser = styled.div`
	display: none;
	font-size: 1.2rem;
	position: absolute;
	top: -200%;
	left: -5px;
	gap: 0.2rem;
	outline: 2px solid #c47d1e;
	border-radius: 0.6rem;
	padding: 0.2rem;
	z-index: 1;
`

const AddEmoji = styled.span`
	position: relative;
	cursor: pointer;
	&:hover > ${EmojiChooser} {
		display: flex;
	}
`

const PopupEmoji = styled.span`
	padding: 0.2rem;
	border-radius: 1rem;
	&:hover {
		background-color: #d8dfea;
		outline: 1px solid;
		cursor: pointer;
	}
`

type ReactionItemProp = {
	emoji: string
	count: number
	reacted: boolean
	onClick: () => void
}

type CommentProp = {
	id: string
	author: AuthorProps
	content: string
	datetime: string
	wasEdited: boolean
	nestLevel: number
	replyIdSetter: any
	onCommentEdit: any
	isCurrentUser: boolean
	onCommentDelete: any
	reactionsArr: any[]
	onReactAsync: any
}

type ReactionProp = {
	id: string
	count: number
	reacted: boolean
}

const ReactionItem = ({ emoji, count, reacted, onClick }: ReactionItemProp) => {
	return (
		<ReactionList as='li' reacted={reacted} onClick={onClick} data-id={emoji}>
			<div>{emoji}</div>
			<div>{count}</div>
		</ReactionList>
	)
}

const SingleComment = ({
	id,
	author,
	content,
	datetime,
	wasEdited,
	nestLevel,
	replyIdSetter,
	onCommentEdit,
	isCurrentUser,
	onCommentDelete,
	reactionsArr,
	onReactAsync,
}: CommentProp) => {
	// console.log('rendering comment', id)
	const [reactions, setReactions] = React.useState(reactionsArr)
	const [isOptionsRevealed, setIsOptionsRevealed] = React.useState(false)
	const [isEditing, setIsEditing] = React.useState(false)

	const reactionClicked = async (reaction: any) => {
		const recs = []
		for (const r of reactions) {
			if (r.id === reaction.id) {
				// setLoadingIndicator(reactionId, true)
				const removeReactionNow = r.reacted

				const success = await onReactAsync(r.id, removeReactionNow)

				// setLoadingIndicator(reactionId, false)
				if (!success) {
					// showToast('failed')
				} else {
					if (removeReactionNow) {
						r.count--
					} else {
						r.count++
					}
					r.reacted = !r.reacted
				}
			}
			recs.push(r)
		}
		setReactions(recs)
	}

	const AddReaction = ({ hiddenReactions }: any) => {
		// console.log({ hiddenReactions })
		return (
			<>
				<AddEmoji>
					✨
					<EmojiChooser>
						{hiddenReactions.map((r: any) => (
							<PopupEmoji
								key={r.id}
								onClick={async () => await reactionClicked(r)}
							>
								{r.id}
							</PopupEmoji>
						))}
					</EmojiChooser>
				</AddEmoji>
			</>
		)
	}
	const unusedReactions = reactions.filter((r) => r.count === 0)
	return (
		<CommentContainer indent={nestLevel} data-id={id} id={id}>
			<CommentHead>
				<Author>
					<AuthorImage src={author.imageLink} width='32' height='32' />
					{<a href={''}>{author.name}</a>}
					<span className='date'>{new Date(datetime).toLocaleString()}</span>
					{wasEdited ? (
						<span>
							<i>{'edited'}</i>
						</span>
					) : null}
				</Author>
				<OptionsContainer onClick={() => setIsOptionsRevealed(true)}>
					<span>...</span>
					{isOptionsRevealed ? (
						<Options onMouseLeave={() => setIsOptionsRevealed(false)}>
							{/* <li onClick={() => onCommentEdit(id)}>edit</li> */}
							{isCurrentUser ? (
								<>
									<li onClick={() => setIsEditing(true)}>edit</li>
									<li onClick={onCommentDelete} className='danger'>
										delete
									</li>
								</>
							) : null}
						</Options>
					) : null}
				</OptionsContainer>
			</CommentHead>
			{isEditing ? (
				<form
					id='commentedit'
					onSubmit={async (e) => {
						console.log('submitting form')
						e.preventDefault()
						const fd = new FormData(e.currentTarget)
						const newComment = fd.get('content')
						if (!newComment) {
							toast.error('comment cannot be empty')
							return
						}
						if (newComment === content) {
							toast.error('no changes made')
							return
						}
						await onCommentEdit(newComment)
						setIsEditing(false)
					}}
				>
					<CommentEditText required name='content' defaultValue={content} />
				</form>
			) : (
				<CommentText>{content}</CommentText>
			)}
			<CommentBottomAction>
				<CommentAction>
					<Reaction as='ul'>
						{reactions.map((reaction) => {
							return reaction.count ? (
								<ReactionItem
									key={reaction.id}
									emoji={reaction.id}
									count={reaction.count}
									reacted={reaction.reacted}
									onClick={async () => await reactionClicked(reaction)}
								/>
							) : null
						})}
						<li>
							{unusedReactions.length > 0 ? (
								<AddReaction hiddenReactions={unusedReactions} />
							) : null}
						</li>
					</Reaction>
					<div className='reply'>
						<button
							// variant='outlined'
							onClick={() => replyIdSetter(id)}
						>
							Reply
						</button>
					</div>
				</CommentAction>
				<div className='expand-collapse'></div>
				{isEditing ? (
					<div>
						<button>Cancel</button>
						<Edit className='success' type='submit' form='commentedit'>
							Update
						</Edit>
					</div>
				) : null}
			</CommentBottomAction>
		</CommentContainer>
	)
}

export default SingleComment
export { ReactionProp }
