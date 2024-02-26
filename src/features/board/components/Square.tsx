import {
	canBeMovedCoordinatesAtom,
	selectedPieceAtom
} from '@/features/board/state'
import PieceComp from '@/features/piece/components/Piece'
import { Coordinate, Piece } from '@/features/piece/schema'
import { Button, VStack } from '@kuma-ui/core'
import { useAtom, useAtomValue } from 'jotai'

export default function Square({
	piece,
	coordinate
}: { piece: Piece; coordinate: Coordinate }) {
	const [selectedPiece, setSelectedPiece] = useAtom(selectedPieceAtom)
	const _canBeMoved = useAtomValue(canBeMovedCoordinatesAtom)

	const seleceted =
		selectedPiece?.coordinate.x === coordinate.x &&
		selectedPiece?.coordinate.y === coordinate.y
	const canBeMoved = _canBeMoved.some(
		c => c.x === coordinate.x && c.y === coordinate.y
	)

	return (
		<VStack
			border="1px solid black"
			width={80}
			height={80}
			justifyContent="center"
			alignItems="center"
			backgroundColor={
				seleceted ? 'yellow' : canBeMoved ? 'blue' : 'tranparent'
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
				onClick={() => setSelectedPiece({ ...piece, coordinate: coordinate })}
			>
				<PieceComp piece={piece} Coordinate={coordinate} />
				{coordinate.x},{coordinate.y}
			</Button>
		</VStack>
	)
}
