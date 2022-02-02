import Plyr from 'plyr-react'

const waitForSeek = async (videoElem: any) => {
	return new Promise((resolve: any) => {
		const handler = () => {
			console.log('seeked')
			videoElem.removeEventListener('seeked', handler)
			// videoElem.off('seeked', handler)
			resolve()
		}
		videoElem.addEventListener('seeked', handler)
		// videoElem.on('seeked', handler)
	})
}

type ImageAtPercentages = {
    percent: number
    image: string
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
	canvas.width = videoElem.videoWidth
	canvas.height = videoElem.videoHeight
	const images: ImageAtPercentages[] = []
	for (const i of stopPercentages) {
		console.log(videoElem.currentTime)
		// videoElem.currentTime = Math.floor(video.duration * (i / 100))
		video.currentTime = Math.floor(video.duration * (i / 100))
		console.log(videoElem.currentTime)
		await waitForSeek(videoElem)

		context.drawImage(videoElem, 0, 0, canvas.width, canvas.height)
		const base64Image = canvas.toDataURL('image/png', 0.2)
		images.push({percent: i, image: base64Image})
	}
	return images
}

export default getFramesData
