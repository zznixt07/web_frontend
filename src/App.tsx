import * as React from 'react'

import { Flex } from './components/Structure'
import Browse from './views/Browse'
import styled from 'styled-components'

import NavBar from './components/NavBar'
import logo from './logo.svg'

import FeatherHome from './assets/svg/FeatherHome'
import FeatherCompass from './assets/svg/FeatherCompass'
import EosIconsSubscriptionsCreatedOutlined from './assets/svg/EosIconsSubscriptionsCreatedOutlined'
import MdiPlaylistPlay from './assets/svg/MdiPlaylistPlay'


const Aside = styled.aside`
    text-align: center;
`

const IconLabel = styled.div`
    & > *:first-child {
        margin: auto;
    }
`



const App = (): JSX.Element => {
    return (
        <div className='App'>
            <NavBar />

            <Flex align='flex-start'>
                <Aside>
                    <IconLabel>
                        <FeatherHome />
                        <h4>Home</h4>
                    </IconLabel>
                    <IconLabel>
                        <FeatherCompass />
                        <h4>Explore</h4>
                    </IconLabel>
                    <IconLabel>
                        <EosIconsSubscriptionsCreatedOutlined />
                        <h4>Subscription</h4>
                    </IconLabel>
                    <IconLabel>
                        <MdiPlaylistPlay />
                        <h4>Playlist</h4>
                    </IconLabel>
                </Aside>
                <main style={{ flex: 1 }}>
                    <Browse />
                </main>
            </Flex>
        </div>
    )
}

export default App
