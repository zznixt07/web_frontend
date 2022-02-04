import * as React from 'react'
import styled from 'styled-components'

let progressSetter: any = null

export const useProgress = () => {
	console.log('running use progress')
	// const [progress, progressSetter] = React.useState(0)
	return progressSetter
}

const ProgressContainer = styled.div`
	position: relative;
	width: 100%;
	height: 4px;
	background-color: var(--surface2);
	border-radius: 0.5rem;
	box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`

const ProgressDiv = styled.div<{ $width: number }>`
	// position: absolute;
	// top: 0;
	// left: 0;
	background-color: var(--text1);
	height: 100%;
	width: ${(props) => props.$width}%;
`

export const ProgressBar = () => {
	const [progressPercent, progressSetter] = React.useState(0)
	console.log('width%', progressPercent)
	return (
		<ProgressContainer>
			<ProgressDiv $width={progressPercent} />
		</ProgressContainer>
	)
}

export const ProgressBarComponent = ({ progressPercent }: any) => {
	console.log('width%', progressPercent)
	return (
		<ProgressContainer>
			<ProgressDiv $width={progressPercent} />
		</ProgressContainer>
	)
}
