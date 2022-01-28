import * as React from 'react'
import styled from 'styled-components'

// type AspectRatioImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
//     width: string
//     height: string
// }

export const ResponsiveImg = styled.img`
    max-width: 100%;
    height: 100px;
    aspect-ratio: 16/9;
    object-fit: cover;
`

// No $ infront of width and height cuz img element should be passed those attributes.
const AspectRatioImg = styled.img<{width: string, height: string}>`
    aspect-ratio: ${props => props.width} / ${props => props.height};
    object-fit: cover;
`

export default AspectRatioImg
