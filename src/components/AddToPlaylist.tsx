import * as React from 'react'
import styled from 'styled-components'
import { Flex } from 'components/Structure'
import Globe from 'assets/svg/IcBaselinePublic'
import LinkChain from 'assets/svg/AkarIconsLinkChain'
import Private from 'assets/svg/IcBaselinePrivateConnectivity'

export type PlaylistProps = {
    id: string
    name: string
    privacy: 'public' | 'private' | 'unlisted'
    hasCurrentVideo: boolean
}

type AddToPaylistDialogProps = {
    playlists: PlaylistProps[]
}

const Playlists = styled(Flex)`
    background-color: var(--surface1);
    padding: 1rem;
    border-radius: 1rem;
`

const Playlist = styled.div`
    max-height: 80vh;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-right: 1rem;
`

const LABELSVG: Record<string, JSX.Element> = {
    'public': <Globe />,
    'unlisted': <LinkChain />,
    'private': <Private />
}

const PlaylistSelector = ({
    id,
    name,
    privacy,
    hasCurrentVideo,
}: PlaylistProps) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(hasCurrentVideo)
    const handleChange = () => {
        setIsChecked((s) => !s)
    }
    return (
            <Flex as='label' justify='flex-start' gap="1.5rem">
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleChange}
                />
                <span style={{width: '15ch'}}>{name}</span>
                <span title={privacy}>{LABELSVG[privacy]}</span>
            </Flex >
    )
}

const AddToPaylistDialog = ({ playlists }: AddToPaylistDialogProps) => {
    return (
        <Playlists $direction='column' align='flex-start' gap='0.5rem'>
            <span>Add to...</span>
            <Playlist>
                {playlists.map((playlist) => {
                    return <PlaylistSelector key={playlist.id} {...playlist} />
                })}
            </Playlist>
        </Playlists>
    )
}

export { AddToPaylistDialog }
