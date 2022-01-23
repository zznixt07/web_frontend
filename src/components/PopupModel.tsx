import * as React from 'react'
import styled from 'styled-components'
import { Flex } from './Structure'

type PopupModelProps = {
    open: boolean
}

const PopupModel = ({open}: PopupModelProps) => {
    return <dialog open={open}>
        {/*{children}*/}
        <h1>Heading</h1>
        <span>Sample text</span>
        <Flex>
            <button>Cancel</button>
            <button>Submit</button>
        </Flex>
    </dialog>
}

export default PopupModel
