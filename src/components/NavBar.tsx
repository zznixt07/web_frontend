import * as React from 'react'
import styled from 'styled-components'
import { Flex } from './Structure'
import logo from '../logo.svg'
import FeatherMenu from '../assets/svg/FeatherMenu'
import FeatherBell from '../assets/svg/FeatherBell'

const Profile = (): JSX.Element => {
    return (
        <span>
            <img src={logo} alt='logo' width='50' height='50' />
        </span>
    )
}

const Search = (): JSX.Element => {
    return (
        <Flex>
            <input type='text' placeholder='Search...' />
            <div>
                <button>Search</button>
            </div>
        </Flex>
    )
}


const NavBar = () => {
    return (
        <Flex as='nav' justify='space-between'>
            <Flex as='a' href="/">
                <FeatherMenu />
                <img
                    src={logo}
                    className='App-logo'
                    alt='logo'
                    width='50'
                    height='50'
                />
                <h1>FramaMotion</h1>
            </Flex>
            <section>
                <Search />
            </section>
            <Flex as='section'>
                <span>Upload</span>
                <FeatherBell />
                <Profile />
            </Flex>
        </Flex>
    )
}
export default NavBar
