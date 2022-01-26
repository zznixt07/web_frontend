// @ts-nocheck

import * as React from 'react'
import { Flex, Grid } from '../components/Structure'
import styled from 'styled-components'
import UploadSVG from 'assets/svg/UiwUpload'


const Upload = () => {
    return (
        <Flex style={{height: '100vh'}} $direction='column' gap='0.4rem'>
            <UploadSVG width="100" height="100" />
            <h1>Drag and drop files to upload.</h1>
            <span>Or Select Files by clicking below button.</span>
            <form method="POST" enctype="multipart/form-data" action="#">
                <input type="file" name="staticvideo" accept="video/*" capture="user"/>
            </form>
        </Flex>
    )
}

export default Upload