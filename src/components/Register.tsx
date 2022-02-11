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
import { Link, Navigate, useNavigate } from 'react-router-dom'
import MyButton from './MyButton'

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

const ErrorContainer = (props: ErrorMessageProps) => (
	<ErrorMessage {...props}>{(msg) => <Err>{msg}</Err>}</ErrorMessage>
)

const signupValidator = Yup.object({
	username: Yup.string()
		.required('Required')
		.min(5, 'Username must be 5 characters or more')
		.max(32, 'Must be 32 characters or less'),
	password: Yup.string()
		.required('Required')
		.min(5, 'Password must be 5 characters or more')
		.max(32, 'Must be 32 characters or less'),
	email: Yup.string()
		.required('Required')
		.max(255, 'Must be 255 characters or less')
		.email('Must be a valid email address'),
	fullname: Yup.string()
		.required('Required')
		.max(255, 'Must be 255 characters or less'),
})

type SignupFields = {
	username: string
	password: string
	email: string
	fullname: string
}

const Middle = () => {
	const navigate = useNavigate()
	const handleSubmit = async (
		values: SignupFields,
		{ setSubmitting }: FormikHelpers<SignupFields>
	) => {
		setSubmitting(true)
		const res = await axios.post('/users/register', {
			username: values.username,
			password: values.password,
			email: values.email,
			fullname: values.fullname,
		})
		if (res.data.success) {
			toast.success('Successfully Registerd!')
			navigate('/login')
		} else {
			toast.error('Registration failed! ' + res.data.message)
		}
		setSubmitting(false)
	}
	const defaultValues = {
		username: '',
		password: '',
		email: '',
		fullname: '',
	}

	return (
		<div>
			<h3>Sign up</h3>
			<Formik
				initialValues={defaultValues}
				onSubmit={handleSubmit}
				validationSchema={signupValidator}
			>
				{({ isSubmitting }) => (
					<Flex
						as={Form}
						$direction='column'
						gap='1rem'
						style={{ width: '100%' }}
					>
						<Label>
							<LabelText>Full Name</LabelText>
							<Field name='fullname' type='text' />
							<ErrorContainer name='fullname' />
						</Label>
						<Label>
							<LabelText>Username</LabelText>
							<Field name='username' type='text' />
							<ErrorContainer name='username' />
						</Label>

						<Label>
							<LabelText>Email</LabelText>
							<Field name='email' type='email' />
							<ErrorContainer name='email' />
						</Label>

						<Label>
							<LabelText>Password</LabelText>
							<Field name='password' type='password' />
							<ErrorContainer name='password' />
						</Label>

						<Flex justify='center' style={{ width: '100%' }}>
							<MyButton disabled={isSubmitting} type='submit'>
								Register
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

export const Register = () => {
	return (
		// <FormContainer $direction='column'>
		<Flex style={{ height: 'inherit' }}>
			<FormContainer maxColumns={1} itemBaseWidth='500px'>
				<Top as='a' href='/'>
					<img src={logo} width='64' height='64' alt='logo' />
					<h1>Framemotion</h1>
				</Top>
				<Middle />
				<Flex as={Link} to='/login' justify='center' gap='1rem'>
					<span>Already have an account?</span>
					<button>Login</button>
				</Flex>
			</FormContainer>
		</Flex>
	)
}
