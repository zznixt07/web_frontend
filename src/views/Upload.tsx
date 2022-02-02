import * as React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Flex, Grid } from 'components/Structure'
import AspectRatioImg, { ResponsiveImg } from 'components/AspectRatioImg'

import horiz from 'assets/vids/horizontal.mp4'
import AddImageRawSVG from 'assets/svg/BxBxsImageAdd.svg'

import UploadSVG from 'assets/svg/UiwUpload'
import img1 from 'assets/imgs/(6).jpg'
import img2 from 'assets/imgs/(7).jpg'
import img3 from 'assets/imgs/(8).jpg'
import Player from 'components/Player'
import getFramesData from 'utils/getFrames'
import { HTMLPlyrVideoElement } from 'plyr-react'

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
	min-height: 10rem;
`

const SimpleGrid = styled(Grid)`
	min-height: 120px;
	justify-items: stretch;
	align-items: stretch;
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
			<input type='file' className='sr-only' onChange={handleSelectedFile} />
			<BgImg tabIndex={0}>
				<ThumbnailText align='flex-end'>Choose custom thumbnail</ThumbnailText>
			</BgImg>
		</label>
	)
}

type FieldValueSetter = (file: File) => void

type ThumbnailsProps = {
	images: { percent: number; image: string }[]
	onChangeThumbnail: FieldValueSetter
}

const Thumbnails = ({ images, onChangeThumbnail }: ThumbnailsProps) => {
	return (
		<SimpleGrid maxColumns={4} itemBaseWidth='150px'>
			<UploadThumbnail onChangeThumbnail={onChangeThumbnail} />
			{images.map((thumb) => {
				return (
					<ResponsiveImg
						key={thumb.percent}
						src={thumb.image}
						style={{ aspectRatio: '16/9' }}
					/>
				)
			})}
		</SimpleGrid>
	)
}

const validator = Yup.object({
	title: Yup.string()
		.max(30, 'Title must be 30 characters or less.')
		.required('Required'),
	description: Yup.string().max(1000, 'Title must be 1000 characters or less.'),
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

type UploadedVideoProps = {
	src: string
	setImages: (images: { percent: number; image: string }[]) => void
}

const UploadedVideo = ({ src, setImages }: UploadedVideoProps) => {
	const canvasRef = React.useRef<HTMLCanvasElement>(null)
	const videoRef = React.useRef<HTMLPlyrVideoElement>(null)
	// const [images, setImages] = React.useState<string[]>([])
	const videoLoaded = async () => {
		if (canvasRef.current === null || videoRef.current === null) {
			return
		}
		if (videoRef.current.plyr === undefined) {
			return
		}
		videoRef.current.plyr.muted = true
		const imagesData = await getFramesData(
			videoRef.current.plyr,
			canvasRef.current,
			[5, 50, 80] // should be unique, will be used for key later. cuz 2 frames can be same
		)
		console.log({ imagesData })
		setImages(imagesData)
	}
	// React.useEffect(() => {
	// 	if (videoRef.current === null) {
	// 		return
	// 	}
	// 	if (videoRef.current.plyr === undefined) {
	// 		return
	// 	}
	// 	if (!videoRef.current.plyr.source) {
	// 		return
	// 	}

	// 	videoRef.current.plyr.on('loadeddata', videoLoaded)
	// 	return videoRef.current.plyr.off('loadeddata', videoLoaded)
	// })
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
			<Player
				autoPlay={true}
				src={src}
				// onLoadedData={videoLoaded}
				onCanPlay={videoLoaded}
				ref={videoRef}
			/>
		</div>
	)
}

type DraftFields = {
	title: string
	description: string
	category: string
	thumbnail: any
	staticvideo: File
}

const DraftVideo = ({ file }: { file: File }) => {
	const [categories, setCategories] = React.useState<Category[] | null>([
		{ name: 'Fun', value: 'fun' },
		{ name: 'Action', value: 'action' },
		{ name: 'Comedy', value: 'comedy' },
		{ name: 'Drama', value: 'drama' },
		{ name: 'Gaming', value: 'gaming' },
		{ name: 'Beauty', value: 'beauty' },
		{ name: 'Sci-Fi', value: 'scifi' },
	])
	const [images, setImages] = React.useState<
		{ percent: number; image: string }[]
	>([])

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
		const response = await axios.post('/video', formData)
		console.log(response)
		setSubmitting(false)
	}
	React.useEffect(() => {
		// settings categories here wont take the default value in formik
		// setCategories([
		// 	{ name: 'Fun', value: 'fun' },
		// 	{ name: 'Action', value: 'action' },
		// 	{ name: 'Comedy', value: 'comedy' },
		// 	{ name: 'Drama', value: 'drama' },
		// 	{ name: 'Gaming', value: 'gaming' },
		// 	{ name: 'Beauty', value: 'beauty' },
		// 	{ name: 'Sci-Fi', value: 'scifi' },
		// ])
	}, [])

	const defaultValues: DraftFields = {
		title: file.name,
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
									as='textarea'
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
									onChangeThumbnail={(file: File) =>
										setFieldValue('thumbnail', file)
									}
								/>
							</Label>
							<Label>
								<LabelText>Categories</LabelText>
								<Categories name='category' categories={categories || []} />
								{/* <Field as='select' name='category'>
									<option value='comedy'>Comedy</option>
									<option value='fun'>Fun</option>
									<option value='action'>Action</option>
								</Field> */}
							</Label>
							<button type='submit' disabled={isSubmitting}>
								Submit
							</button>
						</Flex>
					)}
				</Formik>
			</VideoDetails>
			<UploadedVideo src={URL.createObjectURL(file)} setImages={setImages} />
		</Draft>
	)
}

type SelectedVideoProps = {
	name: string
	mimeType: string
	size: number
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
					Or Select Files by clicking below button.
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
