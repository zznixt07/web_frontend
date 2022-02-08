import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Flex } from './Structure'
import logo from '../logo.svg'
import FeatherMenu from '../assets/svg/FeatherMenu'
import FeatherBell from '../assets/svg/FeatherBell'
import MyButton from './MyButton'
import { useBoop } from 'AnimationHooks'
import { animated } from '@react-spring/web'
import { useMediaQuery } from 'CustomHooks'

type ProfileProps = {
	avatar: string
}

const Profile = React.memo(({ avatar }: ProfileProps): JSX.Element => {
	return (
		<span>
			<img src={avatar} alt='logo' width='50' height='50' />
		</span>
	)
})

const Search = () => {
	const [style, trigger] = useBoop({ y: 2 })
	const isSmall = useMediaQuery('(min-width: 800px)')
	return (
		<Flex>
			{isSmall ? <input type='text' placeholder='Search...' /> : null}
			<animated.div onMouseEnter={trigger} style={style}>
				<button>Search</button>
			</animated.div>
		</Flex>
	)
}

const Login = () => {
	return (
		<Flex>
			<Link to='/login'>
				<button>Login</button>
			</Link>
		</Flex>
	)
}

const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false)
	const isSmall = useMediaQuery('(min-width: 800px)')
	React.useEffect(() => {}, [])
	return (
		<Flex as='nav' justify='space-between' style={{ margin: '0 1rem' }}>
			<Flex>
				<FeatherMenu />
				<Flex as='a' href='/'>
					<img
						src={logo}
						className='App-logo'
						alt='logo'
						width='50'
						height='50'
					/>
					{isSmall ? <h2>FramaMotion</h2> : null}
				</Flex>
			</Flex>
			<section>
				<Search />
			</section>
			<Flex as='section' gap='1rem'>
				<Link to='/upload'>
					<MyButton>Upload</MyButton>
				</Link>
				<FeatherBell />
				{isLoggedIn ? <Profile avatar={''} /> : <Login />}
			</Flex>
		</Flex>
	)
}
export default NavBar
