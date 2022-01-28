import * as React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Grid } from 'components/Structure'
import AspectRatioImg from 'components/AspectRatioImg'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import UploadSVG from 'assets/svg/UiwUpload'
import img1 from '../assets/imgs/(1).jpg'
import img2 from '../assets/imgs/(2).jpg'
import img3 from '../assets/imgs/(3).jpg'

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
const Label = styled.label`
    padding: 0.4rem;
    width: 100%;
    border: 1px solid var(--surface4);
    border-radius: 0.4rem;
`

const ErrorContainer = styled.div`
    color: #dd5145;
`

const LabelText = styled.span`
    display: block;
`

const CommonField = styled(Field)`
    width: inherit;
    border: none;
    border-radius: inherit;
    padding: 0.4rem;
`

const TitleField = styled(CommonField)`
`
const DescriptionField = styled(CommonField)`
    resize: vertical;
    min-height: 10rem;
`

const thumbImages: any = [img1, img2, img3]

const Thumbnails = () => {
    return (
        <Flex style={{maxHeight: '100px'}}>
            {thumbImages.map((thumb: any) => {
                return (
                    <AspectRatioImg src={thumb} key={thumb} width="100" height="80" />
                )
            })}
        </Flex>
    )
}

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
                        <Flex as={Form} $direction='column'>
                            <Label>
                                <LabelText>Title</LabelText>
                                <TitleField type='text' name='title' />
                                <ErrorMessage name='title'>
                                    {msg => <ErrorContainer>{msg}</ErrorContainer>}
                                </ErrorMessage>
                            </Label>
                            <Label>
                                <LabelText>Description</LabelText>
                                <DescriptionField
                                    as="textarea"
                                    name='description'
                                />
                                <ErrorMessage
                                    name='description'
                                >
                                    {msg => <ErrorContainer>{msg}</ErrorContainer>}
                                   </ErrorMessage>
                            </Label>
                            <Label>
                                <LabelText>Thumbnail</LabelText>
                                <Thumbnails />

                            </Label>
                            <button type='submit' disabled={isSubmitting}>
                                Submit
                            </button>
                        </Flex>
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
export { DraftVideo }
