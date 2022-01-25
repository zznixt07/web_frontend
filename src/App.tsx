import * as React from 'react'

import { Flex } from './components/Structure'
import Browse from './views/Browse'
import styled from 'styled-components'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

const App = (): JSX.Element => {
    return (
        <div className='App'>
            <NavBar />

            <Flex align='flex-start'>
                <SideBar />
                <main style={{ flex: 1 }}>
                    <Browse />
                </main>
            </Flex>
        </div>
    )
}

export default App
