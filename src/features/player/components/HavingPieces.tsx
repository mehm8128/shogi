import {
	selectedHavingPieceAtom,
	selectedPieceAtom
} from '@/features/board/state'
import Piece from '@/features/piece/components/Piece'
import { Piece as PieceType } from '@/features/piece/schema'
import { PlayerType, getOppositePlayerType } from '@/features/player/schema'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Button, css } from '@kuma-ui/core'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export default function HavingPieces({
	havingPieces,
	playerType
}: { havingPieces: PieceType[]; playerType: PlayerType }) {
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const [selectedhavingPiece, setSelectedHavingPiece] = useAtom(
		selectedHavingPieceAtom
	)
	const setSelectedPiece = useSetAtom(selectedPieceAtom)

	const handleClickHavingPiece = (piece: PieceType) => {
		setSelectedHavingPiece(piece)
		setSelectedPiece(null)
	}

	return (
		<Box>
			{havingPieces.map(piece => (
				<Button
					className={
						selectedhavingPiece === piece
							? css`background-color: yellow;`
							: css`background-color: transparent;`
					}
					key={piece.id}
					display="flex"
					justifyContent="center"
					alignItems="center"
					border="none"
					onClick={() => handleClickHavingPiece(piece)}
					disabled={currentPlayer === getOppositePlayerType(playerType)}
					cursor={currentPlayer === playerType ? 'pointer' : 'not-allowed'}
				>
					<Piece piece={piece} />
				</Button>
			))}
		</Box>
	)
}
