import styled from 'styled-components'
import { Flex } from './Structure'

const Subscribe = styled.button`
    background-color: red;
    color: var(--text1);
`

const UnSubscribe = styled.button`
    background-color: var(--surface2);
    color: var(--text1);
`

const Bell = ({isNotificationOn = false}: {isNotificationOn?: boolean}) => {
    return (
        isNotificationOn ? <span>On</span> : <span>Off</span>
    )
}

const SubscribeButton = ({
    isSubscribed = false,
    isNotificationOn = false
}: {
    isSubscribed?: boolean, isNotificationOn?: boolean
}) => {
    return (
        <Flex gap='0.6rem'>
            {isSubscribed ? (
                <><UnSubscribe>Subscribed</UnSubscribe><Bell isNotificationOn={isNotificationOn}/></>
            ) : (
                <Subscribe>Subscribe</Subscribe>
            )}
        </Flex>
    )
}

export default SubscribeButton
