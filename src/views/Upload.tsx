import * as React from 'react'
import { Flex, Grid } from '../components/Structure'
import styled from 'styled-components'
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



const DraftVideo = () => {
    return (
        <Flex>
            <VideoDetails></VideoDetails>
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
            <span style={{color: 'var(--text2)'}}>Or Select Files by clicking below button.</span>
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
            
        </Flex>
    )
}

export default Upload
