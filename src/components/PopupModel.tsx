import * as React from 'react'
import styled from 'styled-components'
import { Flex } from './Structure'

import { useStore } from './Store'

const PopupModelContainer = () => {
    const popup = useStore()
    const popupRef = React.useRef(null)
    return (
        <div>
            <div ref={popupRef}>{popup}</div>
        </div>
    )
}

type PopupModelProps = {
    open: boolean
}

const Dialog = styled.dialog`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    z-index: 1;
    &::backdrop {
        background: red;
    }
`

const PopupModel = ({ open }: PopupModelProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true)
    return (
        <Dialog
            open={isOpen}
            onClick={() => setIsOpen(s => !s)}
        >
            {/*{children}*/}
            <h1>Heading</h1>
        </Dialog>
    )
}

export default PopupModel
export { PopupModelContainer }
