import { Flex } from '../components/Structure'
import styled from 'styled-components'
import horiz from '../assets/vids/horizontal.mp4'
import vert from '../assets/vids/vertical.mp4'

import Browse from './Browse'

const Related = styled.div`
    flex: 1 1 200px;
`

const CurrentVideo = () => {
    return (
        <div style={{flex: '1 1 900px'}}>
            <video src={vert} controls width="600" height="250"></video>
            <h3>Raw Run</h3>
        </div>
    )
}

const RelatedVideos = () => {
    return (
        <Related>
            <Browse cardFlow="row" />
        </Related>
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