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

const SmallDropDown = styled.ul`
	position: absolute;
	top: 100%;
	right: 0px;
	border-radius: 5px;
	width: max-content;
	box-shadow: 0px 0px 5px #000;
	list-style: none;
	margin: 0;
	padding: 0;
	& > li {
		padding: 1rem;
		cursor: pointer;
	}
	& > li:hover {
		color: var(--surface1);
		background-color: var(--text1);
	}
`

const Profile = React.memo(
	({ avatar, id, username }: ProfileProps): JSX.Element => {
		const [showMore, setShowMore] = React.useState(false)
		return (
			<span
				onMouseEnter={() => setShowMore(true)}
				style={{ position: 'relative' }}
			>
				<Avatar style={{ width: '50px', height: '50px', id: id }} {...config} />
				{showMore && (
					<SmallDropDown onMouseLeave={() => setShowMore(false)}>
						<li>{username}</li>
						<li>
							<Link to={'/user/videos/' + username}>My videos</Link>
						</li>
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
				<input type='text' ref={searchBox} placeholder='Search...' />
			) : null}
			<animated.div onMouseEnter={trigger} style={style}>
				<button onClick={handleSearch}>Search</button>
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

const NavBar = ({onSearch = null}: any) => {
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
		<Flex as='nav' justify='space-between' style={{ margin: '0.2rem 1rem' }}>
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
				<Link to='/upload'>
					<MyButton>Upload</MyButton>
				</Link>
				<FeatherBell />
				{userInfo ? (
					<Profile
						avatar={userInfo.avatar}
						id={userInfo.id}
						username={userInfo.username}
					/>
				) : (
					<Login />
				)}
			</Flex>
		</Flex>
	)
}
export default NavBar
