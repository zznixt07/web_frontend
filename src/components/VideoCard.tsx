
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
    duration: string;
    viewersCount: number;
    isLive?: boolean;
}

const Thumbnail = ({src, duration, viewersCount, isLive = false}: ThumbProp): JSX.Element => {
    return (
        <Thumb>
            <img loading="lazy" src={src} />
            <LenIndicator>
                {isLive ? <>
                    <IcBaselinePeopleAlt />
                    viewersCount
                    </> :
                    duration
                }
            </LenIndicator>
        </Thumb>
    )
}

const Info = styled(Flex)`

`

const secToHumanReadable = (seconds: number): string => {
    const rem = seconds % 3600
    let HH = Math.floor(seconds / 3600).toString()
    let MM = Math.floor(rem / 60).toString()
    let SS = (rem % 60).toString()

    // precede with 0s if width < 2
    if (HH.length < 2) HH = '0' + HH
    if (MM.length < 2) MM = '0' + MM
    if (SS.length < 2) SS = '0' + SS
    return HH === '00' ? `${MM}:${SS}` : `${HH}:${MM}:${SS}`
}


const VideoCard = ({
    video
}: any) => {
    return (
        <Flex wrap="wrap" justify="flex-start">
            <Thumbnail src={video.thumbSrc} duration={secToHumanReadable(video.durationSecs)} viewersCount={video.views} isLive={video.isLive}/>
            <div>
                <div>
                    <span>{video.title}</span>
                    <MiOptionsVertical />
                </div>
                <Info>
                    <img loading="lazy" src={video.thumbSrc} width="20" height="20" />
                    <span>{video.channel}</span>
                    <span>{video.views}</span>
                    <span>2 weeks ago</span>
                </Info>
            </div>
        </Flex>
    );
};

export default VideoCard;