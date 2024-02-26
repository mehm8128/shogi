import { Coordinate, Piece as PieceType } from '@/features/piece/schema'
import { pieceTypeToJp } from '@/features/piece/selector'
import { Button, VStack } from '@kuma-ui/core'

export default function Piece({
	piece,
	Coordinate
}: { piece: PieceType; Coordinate: Coordinate }) {
	return (
		<VStack>
			<Button
				backgroundColor="transparent"
				w="fit-content"
				h="fit-content"
				p={4}
			>
				{pieceTypeToJp(piece.type)}
			</Button>
		</VStack>
	)
}
