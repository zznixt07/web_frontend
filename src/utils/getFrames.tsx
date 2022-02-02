const getFrames = () => {
	const video = document.querySelector('video')
	const canvas = document.getElementById('imageCanvas')
	const context = canvas.getContext('2d')
	const images = []

	video.addEventListener(
		'loadeddata',
		async () => {
			canvas.width = video.videoWidth
			canvas.height = video.videoHeight
			console.log(video.width)
			for (const i of [5, 50, 80]) {
				video.currentTime = Math.floor(video.duration * (i / 100))
				await waitForSeek(video)
				context.drawImage(video, 0, 0, canvas.width, canvas.height)
				const base64Image = canvas.toDataURL()
				images.push(base64Image)
				const imgElem = document.createElement('img')
				imgElem.src = base64Image
				document.body.append(imgElem)
			}
			// images.forEach((image) => {})
		},
		false
	)

	const waitForSeek = async (videoElem) => {
		return new Promise((resolve) => {
			const handler = () => {
				videoElem.removeEventListener('seeked', handler)
				resolve()
			}
			videoElem.addEventListener('seeked', handler)
		})
	}

	var playSelectedFile = function (event) {
		const file = this.files[0]
		const fileURL = URL.createObjectURL(file)
		video.volume = 0
		video.muted = true
		video.autoplay = true
		video.setAttribute('crossOrigin', 'anonymous')
		video.src = fileURL
	}

	var input = document.querySelector('input')
	input.addEventListener('change', playSelectedFile, false)
}
