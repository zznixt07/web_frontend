import * as React from 'react'
import styled from 'styled-components'
import { Flex, Grid } from './Structure'
import logo from 'logo.svg'

const Top = styled(Flex)`
	background-color: transparent;
`

const Label = styled.label`
	width: inherit;
`

const LabelText = styled.span`
	font-size: 1.2rem;
	display: block;
`

const Middle = () => {
	const handleSubmit = async () => {}
	return (
		<div>
			<h2>Log in</h2>
			<Flex
				as='form'
				$direction='column'
				gap='1rem'
				onSubmit={handleSubmit}
				style={{ width: '100%' }}
			>
				<Label>
					<LabelText>Username</LabelText>
					<input type='text' />
				</Label>
				<Label>
					<LabelText>Password</LabelText>
					<input type='password' />
				</Label>
				<Flex justify='space-between' style={{ width: '100%' }}>
					<span>Forger Password?</span>
					<button type='submit'>Login</button>
				</Flex>
			</Flex>
		</div>
	)
}

const Bottom = () => {
	return (
		<Flex justify='center'>
			<span>Need an account?</span>
			<button>Register Now</button>
		</Flex>
	)
}

const FormContainer = styled(Grid)`
	max-width: 300px;
	margin: 0 auto;
	align-items: center;
	justify-content: center;
	align-content: center;
	gap: 1rem;
	padding: 1rem;
	border-radius: 0.5rem;
`

export const LoginForm = () => {
	return (
		// <FormContainer $direction='column'>
		<Flex style={{ height: 'inherit' }}>
			<FormContainer
				maxColumns={1}
				itemBaseWidth='500px'
				className='rad-shadow'
			>
				<Top>
					<img src={logo} width='64' height='64' />
					<h1>Framemotion</h1>
				</Top>
				<Middle />
				<Bottom />
			</FormContainer>
		</Flex>
	)
}
