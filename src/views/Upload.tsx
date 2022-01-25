// @ts-nocheck

import * as React from 'react'
import { Flex, Grid } from '../components/Structure'
import styled from 'styled-components'
import UploadSVG from 'assets/svg/UiwUpload'


const Upload = () => {
    return (
        <div>
            <UploadSVG />
            <h6>Drag and drop files to upload.</h6>
            <span>Or Select Files by clicking below button.</span>
            <button>Select video</button>
        </div>
    )
}

export default Upload