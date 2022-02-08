import styled from 'styled-components'

import HomeSVG from 'assets/svg/FeatherHome'
import CompassSVG from 'assets/svg/FeatherCompass'
import SubscriptionsSVG from 'assets/svg/EosIconsSubscriptionsCreatedOutlined'
import PlaylistPlaySVG from 'assets/svg/MdiPlaylistPlay'

const Aside = styled.aside`
	text-align: center;
	font-size: 0.9em;
`

const IconLabel = styled.div`
	& > *:first-child {
		margin: auto;
	}
`

const LabelText = styled.span``

const SideBar = () => (
	<Aside>
		<IconLabel>
			<HomeSVG />
			<LabelText>Home</LabelText>
		</IconLabel>
		<IconLabel>
			<CompassSVG />
			<LabelText>Explore</LabelText>
		</IconLabel>
		<IconLabel>
			<SubscriptionsSVG />
			<LabelText>Subscription</LabelText>
		</IconLabel>
		<IconLabel>
			<PlaylistPlaySVG />
			<LabelText>Playlist</LabelText>
		</IconLabel>
	</Aside>
)

export default SideBar
