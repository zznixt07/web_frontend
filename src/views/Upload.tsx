import * as React from 'react'
import {Link} from 'react-router-dom'
import { Flex, Grid } from '../components/Structure'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import UploadSVG from 'assets/svg/UiwUpload'

const FileChooserBtn = styled.div`
    margin: 1rem;
    padding: 0.8rem;
    background-color: var(--brand);
    font-weight: 500;
    color: var(--surface1);
`

const VideoDetails = styled.div`
    flex: 1 1 600px;
`

const UploadedVideo = styled.div`
    flex: 1 1 400px;
`

const validator = Yup.object({
    title: Yup.string()
        .max(30, 'Title must be 30 characters or less.')
        .required('Required'),
    description: Yup.string().max(
        1000,
        'Title must be 1000 characters or less.',
    ),
})

const DraftVideo = () => {
    const onSubmit = () => {}
    const defaultValues = {
        title: 'Use the file name as title here.',
        description: 'Desc..',
    }
    return (
        <Flex>
            <VideoDetails>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={validator}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type='text' name='title' />
                            <ErrorMessage name='title' component='div' />
                            <Field type='text' name='description' />
                            <ErrorMessage name='description' component='div' />
                            <button type='submit' disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </VideoDetails>
            <UploadedVideo></UploadedVideo>
        </Flex>
    )
}

const Upload = () => {
    const fileInput = React.useRef<HTMLInputElement>(null)
    const handleSelectedFile = (e: any) => {
        if (fileInput.current) {
            console.log(fileInput.current.files)
        }
    }

    return (
        <Flex style={{ height: '100vh' }} $direction='column' gap='0.4rem'>
            <UploadSVG width='100' height='100' />
            <h1>Drag and drop files to upload.</h1>
            <span style={{ color: 'var(--text2)' }}>
                Or Select Files by clicking below button.
            </span>
            <label>
                <FileChooserBtn>Choose files</FileChooserBtn>
                <input
                    type='file'
                    name='staticvideo'
                    accept='video/*'
                    capture='user'
                    style={{ opacity: 0, width: 0 }}
                    ref={fileInput}
                    onChange={handleSelectedFile}
                />
            </label>
            {/*{fileInput.current?.files ? <Link to='/draft' /> : null}*/}
            <Link to='/draft'>Next Page</Link>
        </Flex>
    )
}

export default Upload
export {DraftVideo}