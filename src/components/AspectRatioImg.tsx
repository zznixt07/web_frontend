import * as React from 'react'
import styled from 'styled-components'

// type AspectRatioImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
//     width: string
//     height: string
// }

// No $ infront of width and height cuz img element should be passed those attributes.
const AspectRatioImg = styled.img<{width: string, height: string}>`
    aspect-ratio: ${props => props.width} / ${props => props.height};
    object-fit: cover;
`

export default AspectRatioImg
