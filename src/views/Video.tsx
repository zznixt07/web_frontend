// @ts-nocheck

import * as React from 'react'
import { Flex, Grid } from '../components/Structure'
import VideoCard from '../components/VideoCard'
import styled from 'styled-components'
import horiz from '../assets/vids/horizontal.mp4'
import vert from '../assets/vids/vertical.mp4'
import SubscribeButton from '../components/SubscribeButton'
import AllComments from '../components/comment/CommentViewer'

import img1 from '../assets/imgs/(1).jpg'
import img2 from '../assets/imgs/(2).jpg'
import img3 from '../assets/imgs/(3).jpg'
import img4 from '../assets/imgs/(4).jpg'
import img5 from '../assets/imgs/(5).jpg'
import img6 from '../assets/imgs/(6).jpg'
import img7 from '../assets/imgs/(7).jpg'
import img8 from '../assets/imgs/(8).jpg'
const thumbs = [img1, img2, img3, img4, img5, img6, img7, img8]
const randomName = (): string => {
    const names = [
        '10 hour meme song loop',
        'Amogus night 3am SUS challenge. OMG!!! Pranking ghost in the after life. Family vlogs video insert text 1 inster line five.',
    ]
    return names[Math.floor(Math.random() * names.length)]
}

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

const CurrentVideo = () => {
    const [channelSubscription, setChannelSubscription] =
        React.useState<boolean>(false)
    const [channelNotification, setChannelNotification] =
        React.useState<boolean>(false)

    React.useEffect(() => {
        // channel's subscription status changed.
        console.log('subscribed to curr videos channel', channelSubscription)
    }, [channelSubscription])

    React.useEffect(() => {
        // channel's notification status changed.
        console.log('notif to curr videos channel', channelNotification)
    }, [channelNotification])

    return (
        <div style={{}}>
            <video
                src={vert}
                controls
                width='1200'
                height='600'
                style={{}}
            ></video>
            <h3>Raw Run</h3>
            <Flex justify='space-between'>
                <div>
                    <span>1,234,325 views</span>
                    <span>Dec 4, 2022</span>
                </div>
                <div>
                    <span>Like 97K</span>
                    <span>Dislike 1.1K</span>
                    <span>Share</span>
                    <span>Add</span>
                    <span>Flag</span>
                </div>
            </Flex>
            <hr />
            <Flex justify='space-between'>
                <Flex justify='flex-start'>
                    <img src={img1} width='20' height='20' />
                    <span>Very long channel name and this name is long.</span>
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
            <Grid maxColumns={1} itemBaseWidth='350px' gap='0.2rem'>
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

const sampleComments = [
    {
        id: '387324abc2214fff',
        body: 'This is a comment. Video is lit',
        author: {
            name: 'Jefferey Bezos',
            channelLink: 'http://127.0.0.1:8000/api/user/1/',
            imageLink: img3,
        },
        createdOn: '2021-09-02T16:56:23.227201Z',
        updatedOn: '2021-09-02T16:56:23.227201Z',
        authUserReaction: [],
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
                    imageLink: img3,
                },
                createdOn: '2021-09-02T16:56:23.227201Z',
                updatedOn: '2021-09-02T16:56:23.227201Z',
                authUserReaction: [],
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
                    imageLink: img3,
                },
                createdOn: '2021-09-02T16:56:23.227201Z',
                updatedOn: '2021-09-02T16:56:23.227201Z',
                authUserReaction: [],
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
                            imageLink: img3,
                        },
                        createdOn: '2021-09-02T16:56:23.227201Z',
                        updatedOn: '2021-09-02T16:56:23.227201Z',
                        authUserReaction: [],
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
                                    imageLink: img3,
                                },
                                createdOn: '2021-09-02T16:56:23.227201Z',
                                updatedOn: '2021-09-02T16:56:23.227201Z',
                                authUserReaction: [],
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
                                    imageLink: img3,
                                },
                                createdOn: '2021-09-02T16:56:23.227201Z',
                                updatedOn: '2021-09-02T16:56:23.227201Z',
                                authUserReaction: [],
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
            imageLink: img3,
        },
        createdOn: '2021-09-02T16:56:23.227201Z',
        updatedOn: '2021-09-02T16:56:23.227201Z',
        authUserReaction: [],
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

const Video = () => {
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                <CurrentVideo />
                <RelatedVideos />
            </div>
            <section style={{margin: '0.5rem'}}>
                <AllComments pageUrl='' comments={sampleComments} />
            </section>
        </div>
    )
}

export default Video
