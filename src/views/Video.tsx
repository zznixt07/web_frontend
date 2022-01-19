import { Flex, Grid } from '../components/Structure'
import VideoCard from '../components/VideoCard'
import styled from 'styled-components'
import horiz from '../assets/vids/horizontal.mp4'
import vert from '../assets/vids/vertical.mp4'
import SubscribeButton from '../components/SubscribeButton'

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

const CurrentVideo = () => {
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
            <hr/>
            <Flex justify="space-between">
                <Flex justify="flex-start">
                    <img src={img1} width="20" height="20" />
                    <span>Very long channel name and this name is long.</span>
                </Flex>
                <SubscribeButton isSubscribed={true} isNotificationOn={false}/>
            </Flex>
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

const Video = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
            <CurrentVideo />
            <RelatedVideos />
        </div>
    )
}

export default Video
