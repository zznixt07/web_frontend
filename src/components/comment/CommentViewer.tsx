import * as React from 'react'
import Comment from './Comment'
import { CommentForm } from './CommentForm'

const sampleComments = [
    {
        id: '387324abc2214fff',
        body: 'This is a comment. Video is lit',
        author: {
            name: 'Jefferey Bezos',
            channelLink: 'http://127.0.0.1:8000/api/user/1/',
            imageLink:
                'http://127.0.0.1:8000/media/profiles/default_profile.png',
        },
        created_on: '2021-09-02T16:56:23.227201Z',
        updated_on: '2021-09-02T16:56:23.227201Z',
        reactions: [
            { '😍': 2 },
            { '👍': 3 },
            { '👎': 0 },
            { '😎': 1 },
            { '🚀': 10 },
        ],
        children: [
            {
                id: '387324abc22914fff',
                body: 'This is a deep comment. Video is lit',
                author: {
                    name: 'Jefferey Bezos Son',
                    channelLink: 'http://127.0.0.1:8000/api/user/2/',
                    imageLink:
                        'http://127.0.0.1:8000/media/profiles/default_profile.png',
                },
                created_on: '2021-09-02T16:56:23.227201Z',
                updated_on: '2021-09-02T16:56:23.227201Z',
                reactions: [
                    { '😍': 0 },
                    { '👍': 0 },
                    { '👎': 0 },
                    { '😎': 1 },
                    { '🚀': 10 },
                ],
                children: [],
            },
            {
                id: '387324abc245214fff',
                body: 'This is a deeper comment. Video is lit',
                author: {
                    name: 'Jefferey Bezos grandson',
                    channelLink: 'http://127.0.0.1:8000/api/user/3/',
                    imageLink:
                        'http://127.0.0.1:8000/media/profiles/default_profile.png',
                },
                created_on: '2021-09-02T16:56:23.227201Z',
                updated_on: '2021-09-02T16:56:23.227201Z',
                reactions: [
                    { '😍': 0 },
                    { '👍': 0 },
                    { '👎': 0 },
                    { '😎': 0 },
                    { '🚀': 0 },
                ],
                children: [
                    {
                        id: '387324abc2214fff43',
                        body: 'This is more deeper comment. Video is lit',
                        author: {
                            name: 'Jefferey Bezos GenZ',
                            channelLink: 'http://127.0.0.1:8000/api/user/5/',
                            imageLink:
                                'http://127.0.0.1:8000/media/profiles/default_profile.png',
                        },
                        created_on: '2021-09-02T16:56:23.227201Z',
                        updated_on: '2021-09-02T16:56:23.227201Z',
                        reactions: [
                            { '😍': 2 },
                            { '👍': 3 },
                            { '👎': 0 },
                            { '😎': 1 },
                            { '🚀': 10 },
                        ],
                        children: [
                            {
                                id: '387324abchth2214fff',
                                body: 'This is the deepest comment 1. Video is lit',
                                author: {
                                    name: 'Jefferey Bezoszzz',
                                    channelLink:
                                        'http://127.0.0.1:8000/api/user/7/',
                                    imageLink:
                                        'http://127.0.0.1:8000/media/profiles/default_profile.png',
                                },
                                created_on: '2021-09-02T16:56:23.227201Z',
                                updated_on: '2021-09-02T16:56:23.227201Z',
                                reactions: [
                                    { '😍': 2 },
                                    { '👍': 3 },
                                    { '👎': 0 },
                                    { '😎': 1 },
                                    { '🚀': 10 },
                                ],
                                children: [],
                            },
                            {
                                id: '387324abc3241114fff',
                                body: 'This is a deepest comment 2. Video is lit',
                                author: {
                                    name: 'Jefferey Bezos',
                                    channelLink:
                                        'http://127.0.0.1:8000/api/user/1/',
                                    imageLink:
                                        'http://127.0.0.1:8000/media/profiles/default_profile.png',
                                },
                                created_on: '2021-09-02T16:56:23.227201Z',
                                updated_on: '2021-09-02T16:56:23.227201Z',
                                reactions: [
                                    { '😍': 2 },
                                    { '👍': 3 },
                                    { '👎': 0 },
                                    { '😎': 1 },
                                    { '🚀': 10 },
                                ],
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: '387324abc212393214fff',
        body: 'This is a human comment. Video is fire.',
        author: {
            name: 'Zucc',
            channelLink: 'http://127.0.0.1:8000/api/user/10/',
            imageLink:
                'http://127.0.0.1:8000/media/profiles/default_profile.png',
        },
        created_on: '2021-09-02T16:56:23.227201Z',
        updated_on: '2021-09-02T16:56:23.227201Z',
        reactions: [
            { '😍': 2 },
            { '👍': 3 },
            { '👎': 0 },
            { '😎': 1 },
            { '🚀': 10 },
        ],
        children: [],
    },
]


export const createComment = async (
    content,
    userUrl,
    blogUrl,
    parentCommentUrl = null,
) => {
    const data = await ajax('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({
            body: content,
            user: userUrl,
            blog: blogUrl,
            parent: parentCommentUrl,
        }),
    })
    return data
}

const createReactions = async (createEndpoint, payload) => {
    // dont optimize
    const fieldsDefault = Object.fromEntries(
        Object.entries(FIELD_EMOJI).map(([k, v]) => [k, 0]),
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
    reactionRemoved,
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

type Author = {
    name: string
    channelLink: string
    imageLink: string
}

type Reaction = Record<string, number>

type Comment = {
    id: string
    body: string
    author: Author
    createdOn: string
    updatedOn: string
    reactions: Reaction[]
    children: Comment[]
}

const insertIndentAndflatten = (comms: Comment[]) => {
    type ProbabilyIndentedComment = Comment & {indent?: number}
    type IndentedCommentWithNoChildren = Omit<Comment, "children">

    const flattened: IndentedCommentWithNoChildren[] = []
    const nextSiblingsLeft: Comment[] = []
    let arr = [...comms]
    let indent: number = 0
    while (true) {
        let broken = false
        for (let i=0; i<arr.length; i++) {
            const item: ProbabilyIndentedComment = arr[i]
            const {children, ...rest} = item
            flattened.push({...rest, indent: item.hasOwnProperty('indent') ? item.indent : indent})
            if (children.length === 0) {
                // # if no children, either go to item's next sibling or remaining siblings
                continue
            }
            // # if item has children, then keep track of the next sibling.
            // # if item was the last element then nothing to track. check for index error
            if (i + 1 < arr.length) {
                const sibling = arr[i+1]
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
            if (nextSiblingsLeft.length === 0)
                break
            arr = [nextSiblingsLeft.pop()]
        }
    }
    return flattened
}


const AllComments = ({ blogUrl, comments }: {blogUrl: string, comments: Comment[]}) => {
    // const [nestedComments, setNestedComments] = useState([...comments]) // cannot use props directly in state
    const [nestedComments, setNestedComments] = React.useState<Comment[]>(comments)
    const flatComments = insertIndentAndflatten(nestedComments)
    const [replyId, setReplyId] = React.useState(null)
    return (
        <>
            {flatComments.map((comment, index) => {
                const thisUserReaction = comment.user_reaction
                const reactions = Object.entries(FIELD_EMOJI).map(
                    ([k, v]) => ({
                        id: v,
                        count: comment[k] || 0,
                        reacted: thisUserReaction
                            ? thisUserReaction[k] > 0
                            : false,
                    }),
                )

                return (
                    <React.Fragment key={comment.id}>
                        <Comment
                            // TODO remove unrequired kwargs
                            id={comment.id}
                            reactionUpdateEndpoint={thisUserReaction?.url}
                            by={comment.author.name}
                            profileImg={comment.author.profile_pic}
                            text={comment.body}
                            time={comment.updated_on}
                            edited={
                                !(comment.updated_on === comment.created_on)
                            }
                            indent={2 * comment.indent}
                            replyIdSetter={setReplyId}
                            reactionsArr={reactions}
                            onReactAsync={async (
                                reactionId,
                                reactionRemoved,
                            ) => {
                                const data = await onReact(
                                    comment.url,
                                    CURR_USER,
                                    thisUserReaction?.url,
                                    '/api/comment_like/',
                                    reactionId,
                                    reactionRemoved,
                                )
                                setNestedComments((cs) =>
                                    cs.map((c, i) => {
                                        if (i === index)
                                            c.user_reaction = { url: data[1] }
                                        // no need to add reaction count cuz
                                        // the count is internally managed in Comment
                                        return c
                                    }),
                                )
                                return data
                            }}
                        />
                        {comment.id === replyId ? (
                            <CommentForm
                                onComment={async (content) => {
                                    const data = await createComment(
                                        content,
                                        CURR_USER,
                                        comment.blog,
                                        comment.url,
                                    )
                                    // nested reply is at top. should be at bottom
                                    // because comment follows cronological order.
                                    // but its-not-a-bug-its-a-feature
                                    setNestedComments((comms) => {
                                        const updatedComms = [...comms]
                                        updatedComms.splice(index + 1, 0, data)
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
