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

const Upload = () => {
    return (
        <Flex style={{ height: '100vh' }} $direction='column' gap='0.4rem'>
            <UploadSVG width='100' height='100' />
            <h1>Drag and drop files to upload.</h1>
            <span style={{color: 'var(--text2)'}}>Or Select Files by clicking below button.</span>
            <form method='POST' encType='multipart/form-data' action='#'>
                <label>
                    <FileChooserBtn>Choose files</FileChooserBtn>
                    <input
                        type='file'
                        name='staticvideo'
                        accept='video/*'
                        capture='user'
                        style={{ opacity: 0, width: 0 }}
                    />
                </label>
            </form>
        </Flex>
    )
}

export default Upload
