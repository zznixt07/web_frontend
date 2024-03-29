import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

const Front = styled.span`
	display: block;
	position: relative;
	padding: 4px 28px;
	border-radius: 12px;
	font-size: 1.25rem;
	color: white;
	background: hsl(345deg 100% 47%);
	will-change: transform;
	transform: translateY(-4px);
	transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`

const Shadow = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 12px;
	background: hsl(0deg 0% 0% / 0.25);
	will-change: transform;
	transform: translateY(2px);
	transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`

const Edge = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 12px;
	background: linear-gradient(
		to left,
		hsl(340deg 100% 16%) 0%,
		hsl(340deg 100% 32%) 8%,
		hsl(340deg 100% 32%) 92%,
		hsl(340deg 100% 16%) 100%
	);
`

const Pushable = styled.button`
	position: relative;
	border: none;
	background: transparent;
	padding: 0;
	cursor: pointer;
	outline-offset: 4px;
	transition: filter 250ms;

	&:hover {
		filter: brightness(110%);
	}
	&:hover ${Front} {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	&:active ${Front} {
		transform: translateY(-2px);
		transition: transform 34ms;
	}
	&:hover ${Shadow} {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	&:active ${Shadow} {
		transform: translateY(1px);
		transition: transform 34ms;
	}
	&:focus:not(:focus-visible) {
		outline: none;
	}
`

const MyButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<Pushable {...props}>
			<Shadow />
			<Edge />
			<Front>{props.children}</Front>
		</Pushable>
	)
}

export default MyButton
