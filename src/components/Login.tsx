import * as React from 'react'
import styled from 'styled-components'
import { Flex, Grid } from './Structure'
import logo from 'logo.svg'
import {
	Formik,
	Form,
	FormikHelpers,
	Field,
	ErrorMessage,
	ErrorMessageProps,
} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import MyButton from './MyButton'
import RiEyeCloseLine from 'assets/svg/RiEyeCloseLine'
import IconParkOutlineEyes from 'assets/svg/IconParkOutlineEyes'

const Top = styled(Flex)`
	background-color: transparent;
`

const Label = styled.label`
	width: inherit;
	position: relative;
`

const LabelText = styled.span`
	font-size: 1.2rem;
	display: block;
`

const Err = styled.div`
	padding: 0 2px;
	margin-top: -6px;
	color: #fff;
	font-size: 0.7em;
	color: #883a00;
`

const PasswordField = styled.div`
	position: relative;
	width: 100%;
`
const Eye = styled.div`
	position: absolute;
	right: 5px;
	top: 50%;
	transform: translateY(-50%);
`

const ErrorContainer = (props: ErrorMessageProps) => (
	<ErrorMessage {...props}>{(msg) => <Err>{msg}</Err>}</ErrorMessage>
)

const loginValidator = Yup.object({
	username: Yup.string()
		.required('Required')
		.min(5, 'Username must be 5 characters or more')
		.max(32, 'Must be 32 characters or less'),
	password: Yup.string()
		.required('Required')
		.min(5, 'Password must be 5 characters or more')
		.max(32, 'Must be 32 characters or less'),
})

type LoginFields = {
	username: string
	password: string
}

const Middle = () => {
	const navigate = useNavigate()
	const handleSubmit = async (
		values: LoginFields,
		{ setSubmitting }: FormikHelpers<LoginFields>
	) => {
		setSubmitting(true)
		const res = await axios.post('/users/login', {
			username: values.username,
			password: values.password,
		})

		if (res.data.success) {
			toast.success('Successfully logged in!')
			navigate('/')
		} else {
			toast.error('Login failed: ' + res.data.message)
		}
		const token = res.data.token
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		window.localStorage.setItem('auth', JSON.stringify(res.data))
		setSubmitting(false)
	}
	const defaultValues = {
		username: '',
		password: '',
	}
	const [showPass, setShowPass] = React.useState(false)

	return (
		<div>
			<h3>Log in</h3>
			<Formik
				initialValues={defaultValues}
				onSubmit={handleSubmit}
				validationSchema={loginValidator}
			>
				{({ isSubmitting }) => (
					<Flex
						as={Form}
						$direction='column'
						gap='1rem'
						style={{ width: '100%' }}
					>
						<Label>
							<LabelText>Username</LabelText>
							<Field name='username' type='text' />
							<ErrorContainer name='username' />
						</Label>
						<Label>
							<LabelText>Password</LabelText>
							<PasswordField>
								<Field name='password' type={showPass ? 'text' : 'password'} />
								<Eye onClick={() => setShowPass((s) => !s)}>
									{showPass ? <RiEyeCloseLine /> : <IconParkOutlineEyes />}
								</Eye>
							</PasswordField>
							<ErrorContainer name='password' />
						</Label>
						<Flex justify='space-between' style={{ width: '100%' }}>
							<span>Forger Password?</span>
							<MyButton disabled={isSubmitting} type='submit'>
								Login
							</MyButton>
						</Flex>
					</Flex>
				)}
			</Formik>
		</div>
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
	return (
		// <FormContainer $direction='column'>
		<Flex style={{ height: 'inherit' }}>
			<FormContainer maxColumns={1} itemBaseWidth='500px'>
				<Top as='a' href='/'>
					<img src={logo} width='64' height='64' alt='logo' />
					<h1>Framemotion</h1>
				</Top>
				<Middle />
				<Flex as={Link} to='/register' justify='center' gap='1rem'>
					<span>Need an account?</span>
					<button>Register Now</button>
				</Flex>
			</FormContainer>
		</Flex>
	)
}
