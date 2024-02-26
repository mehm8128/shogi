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
		>
			{board.board.map((pieces, y) =>
				pieces.map((piece, x) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: 座標がkeyに直結している
					<Square key={`${x}${y}`} piece={piece} coordinate={{ x, y }} />
				))
			)}
		</Grid>
	)
}
