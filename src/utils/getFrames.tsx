const waitForSeek = async (videoElem: HTMLVideoElement) => {
	return new Promise((resolve: any) => {
		const handler = () => {
			videoElem.removeEventListener('seeked', handler)
			resolve()
		}
		videoElem.addEventListener('seeked', handler)
	})
}

const getFramesData = async (
	video: HTMLVideoElement,
	canvas: HTMLCanvasElement,
	stopPercentages: number[]
): Promise<string[]> => {
	const context = canvas.getContext('2d')
	if (context === null) {
		throw new Error('Could not get canvas context')
	}
	canvas.width = video.videoWidth
	canvas.height = video.videoHeight
	const images: string[] = []

	for (const i of stopPercentages) {
		video.currentTime = Math.floor(video.duration * (i / 100))
		await waitForSeek(video)
		context.drawImage(video, 0, 0, canvas.width, canvas.height)
		const base64Image = canvas.toDataURL('image/png', 0.2)
		images.push(base64Image)
	}
	return images
}

export default getFramesData
