const imgToFile = async (src: string, name: string) => {
	const response = await fetch(src)
	const blob = await response.blob()
	return new File([blob], name, blob)
}

export default imgToFile
