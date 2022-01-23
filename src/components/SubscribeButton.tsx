import * as React from 'react'
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

type BellProp = {
    isNotificationOn: boolean
}

const Bell = (
    props: BellProp & React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
    const { isNotificationOn, ...rest } = props
    return <span {...rest}>{isNotificationOn ? 'ON' : 'OFF'}</span>
}

type SubscribeButtonProps = {
    isSubscribed: boolean
    isNotificationOn: boolean
    onSubscriptionChange: React.Dispatch<React.SetStateAction<boolean>>
    onNotificationChange: React.Dispatch<React.SetStateAction<boolean>>
}

const SubscribeButton = ({
    isSubscribed,
    isNotificationOn,
    onSubscriptionChange,
    onNotificationChange,
}: SubscribeButtonProps) => {
    return (
        <Flex gap='0.6rem'>
            {isSubscribed ? (
                <>
                    <UnSubscribe
                        onClick={() => onSubscriptionChange((s) => !s)}
                    >
                        Subscribed
                    </UnSubscribe>
                    <Bell
                        isNotificationOn={isNotificationOn}
                        style={{cursor: 'pointer'}}
                        onClick={() => onNotificationChange((s) => !s)}
                    />
                </>
            ) : (
                <Subscribe onClick={() => onSubscriptionChange((s) => !s)}>
                    Subscribe
                </Subscribe>
            )}
        </Flex>
    )
}

export default SubscribeButton
