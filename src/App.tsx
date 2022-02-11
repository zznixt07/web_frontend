import * as React from 'react'

import { Flex } from './components/Structure'
import Browse from './views/Browse'

import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { useSearchParams } from 'react-router-dom'

const App = (): JSX.Element => {
	const [searchParams, setSearchParams] = useSearchParams()
	const searchFor = searchParams.get('q')
	// console.log({ searchFor })

	return (
		<div className='App'>
			<NavBar onSearch={setSearchParams} />
			<Flex align='flex-start'>
				<SideBar />
				<main style={{ flex: 1 }}>
					<Browse searchFor={searchFor} />
				</main>
			</Flex>
		</div>
	)
}

export default App
