import * as React from 'react'
import styled from 'styled-components'
import { Flex } from 'components/Structure'

type PlaylistProps = {
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
        <div>
            <Flex as='label' justify='flex-start'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleChange}
                />
                <span>{name}</span>
                <span>{privacy}</span>
            </Flex >
        </div>
    )
}

const AddToPaylistDialog = ({ playlists }: AddToPaylistDialogProps) => {
    return (
        <Playlists $direction='column' align='flex-start' gap='0.5rem'>
            <span>Add to...</span>
            <div>
                {playlists.map((playlist) => {
                    return <PlaylistSelector key={playlist.id} {...playlist} />
                })}
            </div>
        </Playlists>
    )
}

export { AddToPaylistDialog }
