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
	return (
		<Flex>
			<input type='text' placeholder='Search...' />
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
					<h2>FramaMotion</h2>
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
