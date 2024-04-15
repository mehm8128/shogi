import { numberToKanjiMapping } from '@/features/game/schema'
import { historiesAtom } from '@/features/game/state'
import { useAtomValue } from 'jotai'

export const useHistoryToKif = () => {
	const histories = useAtomValue(historiesAtom)

	const getKif = () => {
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
		// const result = `${histories.length + 1} 投了` TODO: 投了したら追加

		return `先手: 先手\n後手: 後手\n\n${procedure}\n`
	}

	return { getKif }
}
