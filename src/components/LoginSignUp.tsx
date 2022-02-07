import * as React from 'react'
import styled from 'styled-components'
import { Flex, Grid } from './Structure'
import logo from 'logo.svg'
import { Formik } from 'formik'
import * as Yup from 'yup'

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

const validator = Yup.object({
	email: Yup.string()
		.required('Required')
		.max(255, 'Must be 255 characters or less'),
	password: Yup.string()
		.required('Required')
		.max(255, 'Must be 255 characters or less'),
})

const Middle = () => {
	const handleSubmit = async () => {}
	return (
		<div>
			<h3>Log in</h3>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={handleSubmit}
				validationSchema={validator}
			>
				{() => (
					<Flex
						as='form'
						$direction='column'
						gap='1rem'
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
				)}
			</Formik>
		</div>
	)
}

const Bottom = ({ handleClick }: any) => {
	return (
		<Flex justify='center' gap='1rem'>
			<span>Need an account?</span>
			<button>Register Now</button>
		</Flex>
	)
}

const FormContainer = styled(Grid)`
	max-width: 400px;
	margin: 0 auto;
	align-items: center;
	justify-content: center;
	align-content: center;
	gap: 2rem;
	padding: 2rem;
	border-radius: 0.5rem;
	box-shadow: 2px 3px 5px 2px var(--surface2);
	font-size: 1.2em;
`

export const LoginForm = () => {
	const [isSignUp, setIsSignUp] = React.useState(false)

	return (
		// <FormContainer $direction='column'>
		<Flex style={{ height: 'inherit' }}>
			<FormContainer maxColumns={1} itemBaseWidth='500px'>
				<Top>
					<img src={logo} width='64' height='64' />
					<h1>Framemotion</h1>
				</Top>
				<Middle />
				<Bottom handleClick={setIsSignUp} />
			</FormContainer>
		</Flex>
	)
}
