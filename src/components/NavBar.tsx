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
import Avatar, { genConfig } from 'react-nice-avatar'
import axios from 'axios'
import RiSearchLine from 'assets/svg/RiSearchLine'

type ProfileProps = {
	avatar: string
	id: string
	username: string
}

const config = genConfig({
	sex: 'man',
	faceColor: '#F9C9B6',
	earSize: 'small',
	eyeStyle: 'smile',
	noseStyle: 'long',
	mouthStyle: 'smile',
	shirtStyle: 'polo',
	glassesStyle: 'none',
	hairColor: '#000',
	hairStyle: 'normal',
	hatStyle: 'beanie',
	hatColor: '#fff',
	eyeBrowStyle: 'up',
	shirtColor: '#77311D',
	bgColor: 'linear-gradient(45deg, #178bff 0%, #ff6868 100%)',
})

const Nav = styled(Flex)`
	padding: 0.2rem 1rem;
	font-size: 1.15em;
	position: sticky;
	top: 0;
	background-color: var(--surface3);
	z-index: 1;
`

const SmallDropDown = styled.ul`
	position: absolute;
	top: 100%;
	right: 0px;
	border-radius: 1rem;
	width: max-content;
	box-shadow: 0px 0px 5px #000;
	list-style: none;
	margin: 0;
	padding: 0;
	background-color: var(--surface3);
	& > li {
		padding: 1rem;
		cursor: pointer;
		border-radius: 1rem 1rem 1rem 0;
	}
	& > li:hover {
		color: var(--surface1);
		background-color: var(--text1);
	}
	z-index: 1;
`

const Profile = React.memo(
	({ avatar, id, username }: ProfileProps): JSX.Element => {
		const [showMore, setShowMore] = React.useState(false)
		const handleLogout = () => {
			window.localStorage.removeItem('auth')
			//  remove authorization header from default axios config
			delete axios.defaults.headers.common['Authorization']
			window.location.reload()
		}
		return (
			<span
				onMouseEnter={() => setShowMore(true)}
				style={{
					position: 'relative',
					cursor: 'pointer',
					opacity: '0.99',
				}}
			>
				<Avatar style={{ width: '50px', height: '50px', id: id }} {...config} />
				{showMore && (
					<SmallDropDown onMouseLeave={() => setShowMore(false)}>
						<li>{username}</li>
						<li>
							<Link to={'/user/videos/' + username}>My videos</Link>
						</li>
						<li onClick={handleLogout}>Logout</li>
					</SmallDropDown>
				)}
			</span>
		)
	}
)

const Search = ({ onSearch }: any) => {
	const [style, trigger] = useBoop({ y: 2 })
	const isSmall = useMediaQuery('(min-width: 800px)')
	const handleSearch = () => {
		if (searchBox.current) {
			const searchFor = searchBox.current.value
			onSearch({ q: searchFor })
		}
	}
	const searchBox = React.useRef<HTMLInputElement>(null)
	return (
		<Flex>
			{isSmall ? (
				<>
					<input type='text' ref={searchBox} placeholder='Search...' />
				</>
			) : null}
			<animated.div
				onClick={handleSearch}
				title='Search'
				onMouseEnter={trigger}
				style={style}
			>
				<RiSearchLine className='no-evt' />
			</animated.div>
		</Flex>
	)
}

const Login = () => {
	return (
		<Flex>
			<Link to='/login'>
				<MyButton>Login</MyButton>
			</Link>
		</Flex>
	)
}

const NavBar = ({ onSearch = null }: any) => {
	const [userInfo, setUserInfo] = React.useState<ProfileProps | null>(null)
	React.useEffect(() => {
		const auth = localStorage.getItem('auth')
		if (auth) {
			const data = JSON.parse(auth)
			setUserInfo(data)
		} else {
			setUserInfo(null)
		}
	}, [])
	const isSmall = useMediaQuery('(min-width: 800px)')
	React.useEffect(() => {}, [])
	return (
		<Nav as='nav' justify='space-between'>
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
				<Search onSearch={onSearch} />
			</section>
			<Flex as='section' gap='1rem'>
				{userInfo ? (
					<>
						<Link to='/upload'>
							<MyButton>Upload</MyButton>
						</Link>
						<FeatherBell />
						<Profile
							avatar={userInfo.avatar}
							id={userInfo.id}
							username={userInfo.username}
						/>
					</>
				) : (
					<Login />
				)}
			</Flex>
		</Nav>
	)
}
export default NavBar
