import styled from 'styled-components';

// direction is prefixed with $ to prevent it from being passed to
// the underlying div (cuz direction is a CSS attribute. "rtl | ltr")
export const Flex = styled.div<{ 
        $direction?: 'row' | 'column',
        $wrap?: 'wrap' | 'nowrap',
        justify?: string,
        align?: string,
        gap?: string }>`
    display: flex;
    flex-direction: ${props => props.$direction || 'row'};
    flex-wrap: ${props => props.$wrap || 'nowrap'};
    justify-content: ${props => props.justify || 'center'};
    align-items: ${props => props.align || 'center'};
    gap: ${props => props.gap || '0.2rem'};
`

/* itemBaseWidth is like flex-basis */
export const Grid = styled.div<{
	maxColumns: number
	itemBaseWidth?: string
	fill?: 'auto-fit' | 'auto-fill'
	gap?: string
}>`
	--w: ${(props) => props.itemBaseWidth || '400px'};
	--n: ${(props) => props.maxColumns};
	display: grid;
	grid-template-columns: repeat(
		${(props) => props.fill || 'auto-fit'},
		minmax(clamp(100%/ (var(--n) + 1) + 0.1%, var(--w), 100%), 1fr)
	);
	grid-gap: ${(props) => props.gap || '0.2rem'};
`
    // grid-auto-rows: 150px;