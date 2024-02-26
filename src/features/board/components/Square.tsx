import {
	canBeMovedCoordinatesAtom,
	selectedPieceAtom,
	setBoardAtom
} from '@/features/board/state'
import PieceComp from '@/features/piece/components/Piece'
import { Coordinate, Piece } from '@/features/piece/schema'
import { Button, VStack } from '@kuma-ui/core'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export default function Square({
	piece,
	coordinate
}: { piece: Piece; coordinate: Coordinate }) {
	const [selectedPiece, setSelectedPiece] = useAtom(selectedPieceAtom)
	const _canBeMoved = useAtomValue(canBeMovedCoordinatesAtom)
	const setBoard = useSetAtom(setBoardAtom)

	const selected =
		selectedPiece?.coordinate.x === coordinate.x &&
		selectedPiece?.coordinate.y === coordinate.y
	const canBeMoved = _canBeMoved.some(
		c => c.x === coordinate.x && c.y === coordinate.y
	)

	const handleClick = () => {
		// 駒の選択を解除
		if (selected) {
			setSelectedPiece(null)
			return
		}
		// 駒を移動
		if (canBeMoved) {
			setBoard(coordinate)
			setSelectedPiece(null)
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
			backgroundColor={selected ? 'yellow' : canBeMoved ? 'blue' : 'tranparent'}
		>
			<Button
				backgroundColor="transparent"
				display="flex"
				justifyContent="center"
				alignItems="center"
				border="none"
				w="100%"
				h="100%"
				onClick={handleClick}
			>
				<PieceComp piece={piece} Coordinate={coordinate} />
				{coordinate.x},{coordinate.y}
			</Button>
		</VStack>
	)
}
