import * as React from 'react'
import {dispatch} from './Store'

export const provide = (elem: JSX.Element) => {
    dispatch(elem)
}