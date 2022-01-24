import * as React from 'react'
import styled from 'styled-components'
import { Flex } from './Structure'

import { useStore } from './Store'
import Close from 'assets/svg/MdiClose'
import {ReactProp} from 'types/ReactProp'

const CloseButton = styled.button`
    border-width: 0;
    padding: 0.6rem;
    cursor: pointer;
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

    const handleClose = (e: React.MouseEvent) => {
        // only close dialog if its directly clicked in the backdrop or the cross button
        if (e.target === e.currentTarget) {
            setIsOpen(false)
            console.log('closed dialog')
       }
    }

    return (
        <Dialog open={isOpen} onClick={handleClose}>
            <Container >
                {props.children}
                <CloseButton className="rounded" onClick={handleClose}>
                    {/*pointer-events so that the SVG will not pick up clicks*/}
                    <Close style={{pointerEvents: 'none'}} />
                </CloseButton>
            </Container>
        </Dialog>
    )
}

export default PopupModel
export { PopupModelContainer }
