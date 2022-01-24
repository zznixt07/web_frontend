import * as React from 'react'

// store the set.... callback so that it can be executed from dispatch
type SetState = (elem: JSX.Element) => void
let listener: SetState = () => {}
let memory: JSX.Element | null = null

export const useStore = (): JSX.Element | null => {
    const [state, setState] = React.useState<JSX.Element | null>(null)
    React.useEffect(() => {
        listener = setState
    }, [state])
    return memory
}

export const dispatch = (elem: JSX.Element) => {
    memory = elem
    listener(memory)
}