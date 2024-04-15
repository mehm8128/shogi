import { numberToKanjiMapping } from '@/features/game/schema'
import { History } from '@/features/game/schema'

export const getKif = (histories: History[], finished: boolean) => {
	const procedure = histories
		.map((history, i) => {
			const before =
				history.before !== null
					? `(${10 - (history.before.x + 1)}${history.before.y + 1})`
					: ''
			return `${i + 1} ${10 - (history.after.x + 1)}${
				numberToKanjiMapping[history.after.y + 1]
			}${history.pieceType}${history.decorator}${before}`
		})
		.join('\n')
	const result = finished ? `${histories.length + 1} 投了\n` : ''

	return `先手: 先手\n後手: 後手\n\n${procedure}\n${result}`
}
