import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Link } from 'react-router-dom'
import { Flex, Grid } from 'components/Structure'
import AspectRatioImg, {ResponsiveImg} from 'components/AspectRatioImg'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import horiz from 'assets/vids/horizontal.mp4'
import AddImageRawSVG from 'assets/svg/BxBxsImageAdd.svg'

import UploadSVG from 'assets/svg/UiwUpload'
import img1 from 'assets/imgs/(5).jpg'
import img2 from 'assets/imgs/(6).jpg'
import img3 from 'assets/imgs/(7).jpg'

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

const UploadedVideo = () => {
    return (
        <div style={{flex: '1 1 400px'}}>
            <video src={horiz} controls={true}></video>
        </div>
    )
}



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

const SimpleGrid = styled(Grid)`
    min-height: 100px;
`

    // background-image: url("${AddImageSVG.src}");
const BgImg = styled.div`
    background-image: url("${AddImageRawSVG}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-color: var(--surface3);
    position: relative;
`

const ThumbnailText = styled(Flex)`
    height: 100%;
    font-size: 0.8rem;
`



const UploadThumbnail = () => {
    const uploadThumb = React.useRef(null)
    return (
        <>
            <input ref={uploadThumb} type="file" />
            <BgImg onClick={() => {}}>
                <ThumbnailText>Choose custom thumbnail.</ThumbnailText>

            </BgImg>
        </>
    )
}

const thumbImages: any = [img1, img2, img3]

const Thumbnails = () => {
    return (
        <SimpleGrid maxColumns={4} itemBaseWidth="150px">
            <UploadThumbnail />
            {thumbImages.map((thumb: any) => {
                return (
                    <ResponsiveImg src={thumb} key={thumb} />
                )
            })}
        </SimpleGrid>
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
