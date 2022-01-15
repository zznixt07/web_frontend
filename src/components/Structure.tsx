import styled from 'styled-components';

export const Flex = styled.div<{ 
        direction?: 'row' | 'column',
        wrap?: 'wrap' | 'nowrap',
        justify?: string,
        align?: string,
        gap?: string }>`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    flex-wrap: ${props => props.wrap || 'nowrap'};
    justify-content: ${props => props.justify || 'center'};
    align-items: ${props => props.align || 'center'};
    gap: ${props => props.gap || '0.2rem'};
`

// grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
export const Grid = styled.div<{
        maxColumns: number,
        itemMaxWidth?: string,
        gap?: string}>`
    --w: ${props => props.itemMaxWidth || '400px'};
    --n: ${props => props.maxColumns};
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(
            clamp(100%/(var(--n) + 1) + 0.1%, var(--w), 100%),
            1fr)
    );
    grid-gap: ${props => props.gap || '0.2rem'};
`