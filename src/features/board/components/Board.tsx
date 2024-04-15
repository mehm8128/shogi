import Square from '@/features/board/components/Square'
import { currentBoardAtom } from '@/features/board/state'
import { bocchiModeAtom } from '@/features/game/state'
import { currentPlayerAtom } from '@/features/player/state'
import { Grid, css } from '@kuma-ui/core'
import { useAtomValue } from 'jotai'

export default function Board() {
	const board = useAtomValue(currentBoardAtom)
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const bocchiMode = useAtomValue(bocchiModeAtom)

	const isBoardInverted = bocchiMode && currentPlayer === 'white'

	return (
		<Grid
			gridTemplateColumns="repeat(9, 80px)"
			gridTemplateRows="repeat(9, 80px)"
			userSelect="none"
			className={
				isBoardInverted
					? css`
					transform: rotate(180deg);
					transition: transform 1s;
			`
					: css`
					transform: rotate(0deg);
					transition: transform 1s;
			`
			}
		>
			{board.board.map((pieces, y) =>
				pieces.map((piece, x) => (
					<Square key={piece.id} piece={piece} coordinate={{ x, y }} />
				))
			)}
		</Grid>
	)
}
