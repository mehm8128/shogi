import Square from '@/features/board/components/Square'
import { currentBoardAtom } from '@/features/board/state'
import { Grid } from '@kuma-ui/core'
import { useAtomValue } from 'jotai'

export default function Board() {
	const board = useAtomValue(currentBoardAtom)

	return (
		<Grid
			gridTemplateColumns="repeat(9, 80px)"
			gridTemplateRows="repeat(9, 80px)"
			userSelect="none"
		>
			{board.board.map((pieces, y) =>
				pieces.map((piece, x) => (
					<Square key={piece.id} piece={piece} coordinate={{ x, y }} />
				))
			)}
		</Grid>
	)
}
