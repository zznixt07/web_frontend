import * as React from 'react'
import styled from 'styled-components'
import { Flex } from './Structure'

import { useStore } from './Store'
import Close from 'assets/svg/MdiClose'
import {ReactProp} from 'types/ReactProp'

const CloseButton = styled.span`
    padding: 1rem;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--surface1);

    &:hover {
        background-color: var(--surface2);
    }
`

const Dialog = styled.dialog`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    z-index: 2;
    background-color: #00000090;
    border: none;
`

const Container = styled.div`
    // position: relative;
`

const PopupModelContainer = () => {
    const popup = useStore()
    const popupRef = React.useRef(null)
    return <div>{popup}</div>
}

const PopupModel = (props: ReactProp) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    // dependency array has props so that this component renders each time its called.
    React.useEffect(() => {
        setIsOpen(true)
    }, [props])

    const handleClose = (e: React.MouseEvent<HTMLDialogElement>) => {
        // only close form if its directly clicked.
        if (e.target === e.currentTarget) {
            setIsOpen(false)
       }
    }
    return (
        <Dialog open={isOpen} onClick={handleClose}>
            <Container >
                {props.children}
            </Container>
            <CloseButton onClick={handleClose}>
                <Close />
            </CloseButton>
        </Dialog>
    )
}

export default PopupModel
export { PopupModelContainer }
