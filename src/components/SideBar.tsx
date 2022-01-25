import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Flex } from './Structure'
import FeatherMenu from 'assets/svg/FeatherMenu'
import FeatherBell from 'assets/svg/FeatherBell'

import logo from 'logo.svg'

import HomeSVG from 'assets/svg/FeatherHome'
import CompassSVG from 'assets/svg/FeatherCompass'
import SubscriptionsSVG from  'assets/svg/EosIconsSubscriptionsCreatedOutlined'
import PlaylistPlaySVG from 'assets/svg/MdiPlaylistPlay'


const Aside = styled.aside`
    text-align: center;
`

const IconLabel = styled.div`
    & > *:first-child {
        margin: auto;
    }
`

const SideBar = () => (
    <Aside>
        <IconLabel>
            <HomeSVG />
            <h4>Home</h4>
        </IconLabel>
        <IconLabel>
            <CompassSVG />
            <h4>Explore</h4>
        </IconLabel>
        <IconLabel>
            <SubscriptionsSVG />
            <h4>Subscription</h4>
        </IconLabel>
        <IconLabel>
            <PlaylistPlaySVG />
            <h4>Playlist</h4>
        </IconLabel>
    </Aside>
)

export default SideBar