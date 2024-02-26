import {
	canBeMovedCoordinatesAtom,
	selectedPieceAtom,
	setBoardAtom
} from '@/features/board/state'
import PieceComp from '@/features/piece/components/Piece'
import { Coordinate, Piece } from '@/features/piece/schema'
import {
	changeCurrentPlayerAtom,
	currentPlayerAtom
} from '@/features/player/state'
import { Button, VStack, css } from '@kuma-ui/core'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export default function Square({
	piece,
	coordinate
}: { piece: Piece; coordinate: Coordinate }) {
	const [selectedPiece, setSelectedPiece] = useAtom(selectedPieceAtom)
	const _canBeMoved = useAtomValue(canBeMovedCoordinatesAtom)
	const setBoard = useSetAtom(setBoardAtom)
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const changeCurrentPlayer = useSetAtom(changeCurrentPlayerAtom)

	const selected =
		selectedPiece?.coordinate.x === coordinate.x &&
		selectedPiece?.coordinate.y === coordinate.y
	const canBeMoved = _canBeMoved.some(
		c => c.x === coordinate.x && c.y === coordinate.y
	)

	const handleClick = () => {
		if (selected) {
			// 駒の選択を解除
			setSelectedPiece(null)
			return
		}
		if (canBeMoved) {
			// 駒を移動
			setBoard(coordinate)
			setSelectedPiece(null)
			changeCurrentPlayer()
			return
		}

		if (piece.own !== currentPlayer) {
			return
		}
		// 駒を選択
		setSelectedPiece({ ...piece, coordinate: coordinate })
	}

	return (
		<VStack
			border="1px solid black"
			width={80}
			height={80}
			justifyContent="center"
			alignItems="center"
			className={
				selected
					? css`background-color: yellow;`
					: canBeMoved
					  ? css`background-color: blue;`
					  : css`background-color: transparent;`
			}
		>
			<Button
				backgroundColor="transparent"
				display="flex"
				justifyContent="center"
				alignItems="center"
				border="none"
				w="100%"
				h="100%"
				className={
					(selectedPiece === null && piece.own === currentPlayer) ||
					(selectedPiece !== null && (canBeMoved || selected))
						? css`cursor: pointer;`
						: css`cursor: default;`
				}
				onClick={handleClick}
			>
				<PieceComp piece={piece} coordinate={coordinate} />
				{coordinate.x},{coordinate.y}
			</Button>
		</VStack>
	)
}
