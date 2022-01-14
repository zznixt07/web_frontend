import Styled from 'styled-components';

export const Flex = Styled.div<{ direction?: 'row' | 'column', wrap?: 'wrap' | 'nowrap', justify?: string, align?: string }>`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    flex-wrap: ${props => props.wrap || 'nowrap'};
    justify-content: ${props => props.justify || 'center'};
    align-items: ${props => props.align || 'center'};
`
