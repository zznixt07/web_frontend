// @ts-nocheck

import { Formik, useField } from 'formik'
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
    content: yup
        .string()
        .max(800)
        .required('Comment should not be Empty.'),
})

const ValidatingComment = ({ ...props }: any) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
        <TextArea
            {...field}
            {...props}
            helperText={errorText}
            error={!!errorText}
        />
    )
}

const CommentBox = ({onComment}: any) => {
    return (
        <div>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{ content: '' }}
                validationSchema={validationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    // validate(data)
                    setSubmitting(true)
                    console.log('Submit:', data, data.content)
                    //make async call
                    await onComment(data.content)
                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    // handleChange,
                    // handleBlur,
                    // handleSubmit,
                }) => (
                    <CommentForm>
                        <ValidatingComment
                            // variant='outlined'
                            name='content'
                            placeholder='Write a Comment'
                            multiline={true}
                            rows={7}
                            rowsmax={10}
                            required
                            value={values.content}
                        />
                        <button
                            disabled={isSubmitting}
                            type='submit'
                        >
                            Post Comment
                        </button>
                    </CommentForm>
                )}
            </Formik>
        </div>
    )
}

export default CommentBox