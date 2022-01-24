import * as React from 'react'
import styled from 'styled-components'
import { Flex } from './Structure'

import { useStore } from './Store'


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

const PopupModelContainer = () => {
    const popup = useStore()
    const popupRef = React.useRef(null)
    return (
        <div>
            {popup}
        </div>
    )
}

const PopupModel = (props: any) => {
    // on next render the useState does not use props.style. instead it uses
    const [isOpen, setIsOpen] = React.useState<boolean>(true);

    React.useEffect(() => {
        setIsOpen(s => !s)
    }, [props])

    const handleClose = () => {
        setIsOpen(false)
   }
    return (
        <Dialog
            open={isOpen}
            onClick={handleClose}
        >
            {/*{props.children}*/}
            <h1>Heading</h1>
        </Dialog>
    )
}

export default PopupModel
export { PopupModelContainer }
