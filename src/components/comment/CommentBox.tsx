import { Formik, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'

const TextArea = styled.textarea`
	display: block;
	width: 100%;
	margin: 1rem 0;
	padding: 0.5rem;
	border-radius: 0.5rem;
	box-shadow: 1px 1px 1px var(--surface3);
`

const CommentForm = styled.form`
	margin: 2rem auto;
	width: 95vw;
`

const validationSchema = yup.object({
	content: yup.string().max(800).required('Comment should not be Empty.'),
})

type CommentFields = {
	content: string
}

const CommentBox = ({ onComment }: any) => {
	const defaultValues: CommentFields = {
		content: '',
	}
	const onSubmit = async (
		values: CommentFields,
		{ setSubmitting, resetForm }: FormikHelpers<CommentFields>
	) => {
		setSubmitting(true)
		console.log('Submit:', values, values.content)
		await onComment(values.content)
		setSubmitting(false)
		resetForm()
	}
	return (
		<div>
			<Formik
				initialValues={defaultValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ isSubmitting }) => (
					<CommentForm>
						<Field
							component={TextArea}
							name='content'
							placeholder='Write a Comment'
							rows={7}
						/>
						<ErrorMessage name='content'></ErrorMessage>
						<button disabled={isSubmitting} type='submit'>
							Post Comment
						</button>
					</CommentForm>
				)}
			</Formik>
		</div>
	)
}

export default CommentBox
