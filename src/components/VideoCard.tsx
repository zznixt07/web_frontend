
import * as React from 'react';
import styled from 'styled-components';
import IcBaselinePeopleAlt from '../assets/svg/IcBaselinePeopleAlt';
import MiOptionsVertical from '../assets/svg/MiOptionsVertical';
import { Flex } from "./Structure";

type Props = {
    children: React.ReactNode;
}
  
const LenIndicator = styled(Flex)`
    padding: 0.2rem;
    border-radius: 0.2rem;
    background-color: #000;
    color: #fff;
`

const Thumb = styled.div`
    position: relative;
    & > ${LenIndicator} {
        position: absolute;
        bottom: 4px;
        right: 4px;
    }
`

type ThumbProp = {
    src: string;
    viewersCount: number;
    isLive?: boolean;
}

const Thumbnail = ({src, viewersCount, isLive = false}: ThumbProp): JSX.Element => {
    return (
        <Thumb>
            <img src={src} />
            <LenIndicator>
                {isLive ? <IcBaselinePeopleAlt /> : ''} {viewersCount}
            </LenIndicator>
        </Thumb>
    )
}

const Info = styled(Flex)`

`

const VideoCard = ({
    video
}: any) => {
    return (
        <Flex wrap="wrap">
            <Thumbnail src={video.thumbSrc} viewersCount={video.views} isLive={video.isLive}/>
            <div>
                <div>
                    <span>{video.title}</span>
                    <MiOptionsVertical />
                </div>
                <Info>
                    <img src={video.thumbSrc} width="20" height="20" />
                    <span>{video.channel}</span>
                    <span>{video.views}</span>
                    <span>2 weeks ago</span>
                </Info>
            </div>
        </Flex>
    );
};

export default VideoCard;