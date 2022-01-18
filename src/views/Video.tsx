import { Flex } from '../components/Structure'
import horiz from '../assets/vids/horizontal.mp4'
import vert from '../assets/vids/vertical.mp4'

const CurrentVideo = () => {
    return (
        <>
            <video src={horiz}></video>
            <h3>Raw Run</h3>
        </>
    )
}

const RelatedVideos = () => {
    return (
        <Flex></Flex>
    )
}

const Video = () => {
    return (
        <Flex>
            <CurrentVideo />
            <RelatedVideos />
        </Flex>
    )
}

export default Video