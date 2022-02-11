import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Flex, Grid } from 'components/Structure'
import AspectRatioImg, { ResponsiveImg } from 'components/AspectRatioImg'
import AddImageRawSVG from 'assets/svg/BxBxsImageAdd.svg'

import UploadSVG from 'assets/svg/UiwUpload'

import Player from 'components/Player'
import getFramesData from 'utils/getFrames'
import { HTMLPlyrVideoElement } from 'plyr-react'
import imgToFile from 'utils/imgToFile'
import { ImageAtPercentages } from 'types/frames'
import { randomInt } from 'utils/utils'
import { ProgressBarComponent, useProgress } from 'components/ProgressViewer'
import ProgressBar from '@ramonak/react-progress-bar'
const FileChooserBtn = styled.div`
	margin: 1rem;
	padding: 0.8rem;
	background-color: var(--brand);
	font-weight: 500;
	color: var(--surface1);
`

const VideoDetails = styled.div`
	flex: 1 1 600px;
`

// const Label = styled(Field)`
const Label = styled.label`
	padding: 0.4rem;
	margin: 0.2rem;
	width: 100%;
	outline: 1px solid var(--surface4);
	border-radius: 0.2rem;
`

const ErrorContainer = styled.div`
	color: #dd5145;
	font-size: 0.8em;
`

const LabelText = styled.span`
	display: block;
	margin-bottom: 0.3rem;
`

const CommonField = styled(Field)`
	width: inherit;
	border: none;
	border-radius: inherit;
	padding: 0.4rem;
`

const TitleField = styled(CommonField)``
const DescriptionField = styled(CommonField)`
	resize: vertical;
`

const SimpleGrid = styled(Grid)`
	min-height: 120px;
	justify-items: stretch;
	// justify-items: center;
	align-items: stretch;
	& > * {
		outline: 1px solid var(--surface3);
		cursor: pointer;
	}
	& > *:hover {
		outline: 1px solid var(--text1);
	}
`

const BgImg = styled.div`
	background-image: url('${AddImageRawSVG}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	background-color: var(--surface3);
	height: 100%;
	cursor: pointer;
`

const ThumbnailText = styled(Flex)`
	height: 100%;
	font-size: 0.8rem;
`

const Draft = styled(Flex)`
	margin: 2rem auto;
	padding: 1% 10%;
`

const UploadThumbnail = ({
	onChangeThumbnail,
}: {
	onChangeThumbnail: FieldValueSetter
}) => {
	const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		for (const file of e.currentTarget.files || []) {
			onChangeThumbnail(file)
			break
		}
	}
	return (
		<label>
			<input
				type='file'
				accept='image/*'
				className='sr-only'
				onChange={handleSelectedFile}
			/>
			<BgImg tabIndex={0}>
				<ThumbnailText align='flex-end'>Choose custom thumbnail</ThumbnailText>
			</BgImg>
		</label>
	)
}

const ThumbImage = styled(ResponsiveImg)<{ selected?: boolean }>`
	object-fit: contain;
	aspect-ratio: 16/9;
	${(props) => props.selected && `outline: 3px solid var(--brand);`}
`

type FieldValueSetter = (file: File) => void

type ThumbnailsProps = {
	images: { percent: number; image: string }[]
	onChangeThumbnail: FieldValueSetter
	setImages: ImageSetter
}

const Thumbnails = ({
	images,
	setImages,
	onChangeThumbnail,
}: ThumbnailsProps) => {
	const [clickedId, setClickedId] = React.useState<number>(0)
	const [uploadedImage, setUploadedImage] = React.useState<string>('')
	const handleClick = async (thumb: { percent: number; image: string }) => {
		console.log('clicked on image')
		setClickedId(thumb.percent)
		const file = await imgToFile(thumb.image, `${thumb.percent}.png`)
		onChangeThumbnail(file)
	}
	return (
		<SimpleGrid maxColumns={4} itemBaseWidth='150px'>
			<UploadThumbnail
				onChangeThumbnail={(file) => {
					// setImages((p: ImageAtPercentages[]) => [
					// 	...p,
					// 	{ percent: 0, image: URL.createObjectURL(file) },
					// ])
					setUploadedImage(URL.createObjectURL(file))
					setClickedId(0)
					onChangeThumbnail(file)
				}}
			/>
			{images.map((thumb) => {
				return (
					<ThumbImage
						key={thumb.percent}
						selected={thumb.percent === clickedId}
						src={thumb.image}
						onClick={() => handleClick(thumb)}
					/>
				)
			})}
			{uploadedImage !== '' ? (
				<ThumbImage
					selected={0 === clickedId}
					src={uploadedImage}
					onClick={() => handleClick({ percent: 0, image: uploadedImage })}
				/>
			) : null}
		</SimpleGrid>
	)
}

const validator = Yup.object({
	title: Yup.string()
		.max(50, 'Title must be 50 characters or less.')
		.required('Required'),
	description: Yup.string().max(1000, 'Title must be 1000 characters or less.'),
	thumbnail: Yup.mixed().required('Choose aThumbnail'),
	category: Yup.string().required('Choose category'),
})

type Category = {
	name: string
	value: string
	// selected: boolean
}

type CategoriesProps = {
	name: string
	categories: Category[]
}

const Categories = ({ name, categories }: CategoriesProps) => {
	return (
		<Field as='select' name={name} id='category'>
			{categories.map((category) => {
				return (
					<option key={category.value} value={category.value}>
						{category.name}
					</option>
				)
			})}
		</Field>
	)
}

type ImageSetter = React.Dispatch<React.SetStateAction<ImageAtPercentages[]>>

type UploadedVideoProps = {
	src: string
	setImages: ImageSetter
	setDuration: (duration: number) => void
}

const UploadedVideo = React.memo(
	({ src, setImages, setDuration }: UploadedVideoProps) => {
		const canvasRef = React.useRef<HTMLCanvasElement>(null)
		const videoRef = React.useRef<any>(null)
		console.log('rendering uploaded video')
		// const [images, setImages] = React.useState<string[]>([])
		const videoLoaded = async () => {
			if (canvasRef.current === null || videoRef.current === null) {
				return
			}
			if (videoRef.current.plyr === undefined) {
				return
			}

			videoRef.current.plyr.muted = true
			videoRef.current.plyr.volume = 0
			videoRef.current.plyr.pause()
			const imagesData = await getFramesData(
				videoRef.current.plyr,
				canvasRef.current,
				[randomInt(2, 6), randomInt(40, 60), randomInt(80, 95)] // should be unique, will be used for key later. cuz 2 frames can be same
			)
			console.log(imagesData)
			setImages(imagesData)
			console.log('duration', videoRef.current.plyr.duration)
			console.log('duration', videoRef.current.plyr.media.duration)
			setDuration(Math.ceil(videoRef.current.plyr.duration))
		}

		// const MemoizedPlayer = () => (
		// const MemoizedPlayer = React.memo(({ videoRef, src }: any) => (
		const MemoizedPlayer = React.memo(() => (
			<Player
				autoPlay={false}
				muted={true}
				src={src}
				crossOrigin='anonymous'
				// onLoadedData={videoLoaded}
				ref={videoRef}
			/>
		))
		// )
		// console.log()
		return (
			// sticky wont work without alignSelf on flex-child see:
			// https://gist.github.com/brandonjp/478cf6e32d90ab9cb2cd8cbb0799c7a7
			<div
				style={{
					flex: '1 1 200px',
					position: 'sticky',
					top: '30px',
					alignSelf: 'flex-start',
				}}
			>
				<canvas className='sr-only' ref={canvasRef} />
				{/* <MemoizedPlayer /> */}
				<Player
					autoPlay={false}
					muted={true}
					src={src}
					crossOrigin='anonymous'
					// onLoadedData={videoLoaded}
					ref={videoRef}
				/>
				<button onClick={videoLoaded}>Generate Thumbnail</button>
			</div>
		)
	}
)

type DraftFields = {
	title: string
	description: string
	category: string
	thumbnail: any
	staticvideo: File
}

const DraftVideo = ({ file }: { file: File }) => {
	console.log('drafting video')
	const navigate = useNavigate()
	const [categories, setCategories] = React.useState<Category[] | null>([
		{ name: 'Fun', value: 'fun' },
		{ name: 'Action', value: 'action' },
		{ name: 'Comedy', value: 'comedy' },
		{ name: 'Drama', value: 'drama' },
		{ name: 'Gaming', value: 'gaming' },
		{ name: 'Beauty', value: 'beauty' },
		{ name: 'Sci-Fi', value: 'scifi' },
	])
	// const setProgress = useProgress()
	// console.log({ setProgress })
	const [progressPercent, setProgressPercent] = React.useState(0)
	const [images, setImages] = React.useState<ImageAtPercentages[]>([])
	const src = React.useState<string>(URL.createObjectURL(file))[0]
	const [duration, setDuration] = React.useState<number>(0)
	console.log(duration)
	const onSubmit = async (
		values: DraftFields,
		{ setSubmitting }: FormikHelpers<DraftFields>
	) => {
		setSubmitting(true)
		const formData = new FormData()
		formData.append('title', values.title)
		formData.append('description', values.description)
		formData.append('category', values.category)
		formData.append('thumbnail', values.thumbnail, values.thumbnail.name)
		formData.append('staticvideo', values.staticvideo, values.staticvideo.name)
		formData.append('duration', `${duration}`)

		const response = await axios.post('/videos', formData, {
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				)
				console.log('percentCompleted', percentCompleted)
				// if (setProgress) setProgress(percentCompleted)
				setProgressPercent(percentCompleted)
			},
		})
		if (!response.data.error) {
			navigate('/')
		}
		setSubmitting(false)
	}
	// React.useEffect(() => {
	// 	// settings categories here wont take the default value in formik
	// }, [])
	console.log(src)

	const defaultValues: DraftFields = {
		title: file.name.split('.')[0], // remove extension more thoroughly
		description: '',
		category: categories?.[0]?.value || '',
		thumbnail: null,
		staticvideo: file,
	}
	return (
		<Draft gap='1rem'>
			<VideoDetails>
				<Formik
					initialValues={defaultValues}
					validationSchema={validator}
					onSubmit={onSubmit}
				>
					{({ isSubmitting, setFieldValue }) => (
						<Flex as={Form} $direction='column'>
							<Label>
								<LabelText>Title</LabelText>
								<TitleField type='text' name='title' />
								<ErrorMessage name='title'>
									{(msg) => <ErrorContainer>{msg}</ErrorContainer>}
								</ErrorMessage>
							</Label>
							<Label>
								<LabelText>Description</LabelText>
								<DescriptionField
									component='textarea'
									rows={9}
									name='description'
									placeholder='Describe your video...'
								/>
								<ErrorMessage name='description'>
									{(msg) => <ErrorContainer>{msg}</ErrorContainer>}
								</ErrorMessage>
							</Label>
							{/*Whenever anything inside a label is clicked, its corresponding
                        input element is selected. Since below thumnail consists of
                        a input file element as well as other elments, clicking on the other
                        elements would select the input elem and the file chooser dialog would open.
                        which is not what we want. Hence, dont use label(as="div") */}
							<Label as='div'>
								<LabelText>Thumbnail</LabelText>
								<Thumbnails
									images={images}
									setImages={setImages}
									onChangeThumbnail={(file: File) =>
										setFieldValue('thumbnail', file)
									}
								/>
								<ErrorMessage name='thumbnail'>
									{(msg) => <ErrorContainer>{msg}</ErrorContainer>}
								</ErrorMessage>
							</Label>
							<Label>
								<LabelText>Categories</LabelText>
								<Categories name='category' categories={categories || []} />
								<ErrorMessage name='category'>
									{(msg) => <ErrorContainer>{msg}</ErrorContainer>}
								</ErrorMessage>
							</Label>
							<button type='submit' disabled={isSubmitting}>
								Submit
							</button>
							{/* <ProgressBarComponent progressPercent={progressPercent} /> */}
							<div style={{ width: '100%' }}>
								<ProgressBar completed={progressPercent} />
							</div>
						</Flex>
					)}
				</Formik>
			</VideoDetails>
			<UploadedVideo
				src={src}
				setImages={setImages}
				setDuration={setDuration}
			/>
		</Draft>
	)
}

const Upload = () => {
	const [chosenVideo, setIsChosenVideo] = React.useState<File | null>(null)
	const fileInput = React.useRef<HTMLInputElement>(null)
	const handleSelectedFile = (e: any) => {
		if (fileInput.current) {
			const files: FileList | null = fileInput.current?.files
			for (const file of files || []) {
				setIsChosenVideo(file)
				break
			}
		}
	}
	if (chosenVideo === null) {
		return (
			<Flex style={{ height: '100vh' }} $direction='column' gap='0.4rem'>
				<UploadSVG width='100' height='100' />
				<h1>Drag and drop files to upload.</h1>
				<span style={{ color: 'var(--text2)' }}>
					Or Select Files by clicking below button
				</span>
				<label>
					<FileChooserBtn>Choose files</FileChooserBtn>
					<input
						type='file'
						accept='video/*'
						capture='user'
						className='sr-only'
						ref={fileInput}
						onChange={handleSelectedFile}
					/>
				</label>
			</Flex>
		)
	}

	return <DraftVideo file={chosenVideo} />
}

export default Upload
export { DraftVideo }
