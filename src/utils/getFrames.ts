import { ImageAtPercentages } from 'types/frames'

const waitForSeek = async (videoElem: HTMLVideoElement) => {
	return new Promise((resolve: any) => {
		const handler = () => {
			console.log('seeked')
			videoElem.removeEventListener('seeked', handler)
			resolve()
		}
		videoElem.addEventListener('seeked', handler)
	})
}

const getFramesData = async (
	video: any,
	canvas: HTMLCanvasElement,
	stopPercentages: number[]
): Promise<ImageAtPercentages[]> => {
	const context = canvas.getContext('2d')
	if (context === null) {
		throw new Error('Could not get canvas context')
	}
	const videoElem = video.media
	// const videoElem = video.elements.original
	canvas.width = videoElem.videoWidth
	canvas.height = videoElem.videoHeight
	const images: ImageAtPercentages[] = []
	for (const i of stopPercentages) {
		const calcTime = Math.floor(video.duration * (i / 100))
		// videoElem.currentTime = Math.floor(video.duration * (i / 100))
		video.currentTime = calcTime
		await waitForSeek(videoElem)
		// await waitForSeekPlyr(video)
		console.log(calcTime)

		context.drawImage(videoElem, 0, 0, canvas.width, canvas.height)
		const base64Image = canvas.toDataURL('image/png', 0.2)
		images.push({ percent: i, image: base64Image })
	}
	return images
}

export default getFramesData
