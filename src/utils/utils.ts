import { CommentProps } from 'types/comment'

export const randomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const prettyDate = (time: string) => {
	// const date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' ')),
	const date = new Date(time || ''),
		diff = (new Date().getTime() - date.getTime()) / 1000,
		day_diff = Math.floor(diff / 86400)
	const year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate()

	if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
		return (
			year.toString() +
			'-' +
			(month < 10 ? '0' + month.toString() : month.toString()) +
			'-' +
			(day < 10 ? '0' + day.toString() : day.toString())
		)

	const r =
		(day_diff === 0 &&
			((diff < 60 && 'just now') ||
				(diff < 120 && '1 minute ago') ||
				(diff < 3600 && Math.floor(diff / 60) + ' minutes ago') ||
				(diff < 7200 && '1 hour ago') ||
				(diff < 86400 && Math.floor(diff / 3600) + ' hours ago'))) ||
		(day_diff === 1 && 'Yesterday') ||
		(day_diff < 7 && day_diff + ' days ago') ||
		(day_diff < 31 && Math.ceil(day_diff / 7) + ' weeks ago')
	return r
}


export const insertIndents = (
	flattened: CommentProps[],
	key: string,
	parentKey: string
) => {
	let MAX_DEPTH = 100
	const context: any = {}
	// @ts-ignore
	flattened.forEach((item) => (context[item[key]] = item[parentKey]))

	const flattenedWithContext: any[] = []
	flattened.forEach((item) => {
		// @ts-ignore
		let id = item[key]
		let indent = 0
		while (true) {
			// even if parent key is not present, below will break the loop.
			if (!context[id]) break
			indent++
			id = context[id]
			if (indent > MAX_DEPTH) break
		}
		// @ts-ignore
		item.indent = indent
		flattenedWithContext.push(item)
	})
	return flattenedWithContext
}

// type ProbabilyIndentedComment = CommentProps & { indent?: number }
// type IndentedComment = CommentProps & { indent: number }
// type FlatComment = Omit<IndentedComment, 'children'>

// const insertIndentAndflatten = (comms: CommentProps[]): FlatComment[] => {
// 	const flattened: FlatComment[] = []
// 	const nextSiblingsLeft: CommentProps[] = []
// 	let arr = [...comms]
// 	let indent: number = 0
// 	while (true) {
// 		let broken = false
// 		for (let i = 0; i < arr.length; i++) {
// 			const item: ProbabilyIndentedComment = arr[i]
// 			const { children, ...rest } = item
// 			const indentValue =
// 				item.hasOwnProperty('indent') && item.indent !== undefined
// 					? item.indent
// 					: indent
// 			flattened.push({ ...rest, indent: indentValue })
// 			if (children.length === 0) {
// 				// # if no children, either go to item's next sibling or remaining siblings
// 				continue
// 			}
// 			// # if item has children, then keep track of the next sibling.
// 			// # if item was the last element then nothing to track. check for index error
// 			if (i + 1 < arr.length) {
// 				const sibling: ProbabilyIndentedComment = arr[i + 1]
// 				sibling.indent = indent
// 				nextSiblingsLeft.push(sibling)
// 			}

// 			// # prepare to iterate on children instead by breaking out.
// 			indent++
// 			arr = children
// 			broken = true
// 			break
// 		}
// 		if (!broken) {
// 			indent--
// 			const lastItem: CommentProps | undefined = nextSiblingsLeft.pop()
// 			if (lastItem === undefined) break
// 			arr = [lastItem]
// 		}
// 	}
// 	return flattened
// }
