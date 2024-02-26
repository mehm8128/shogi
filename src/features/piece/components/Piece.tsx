import { Coordinate, Piece as PieceType } from '@/features/piece/schema'
import { pieceTypeToJp } from '@/features/piece/selector'
import { VStack } from '@kuma-ui/core'

export default function Piece({
	piece,
	coordinate
}: { piece: PieceType; coordinate: Coordinate }) {
	return (
		<VStack
			as="span"
			backgroundColor="white"
			border="1px solid black"
			p={4}
			transform={piece.own === 'white' ? 'rotate(180deg)' : ''}
		>
			{pieceTypeToJp(piece.type)}
		</VStack>
	)
}
