import Piece from '@/features/piece/components/Piece'
import { Coordinate, Piece as PieceType } from '@/features/piece/schema'
import { VStack } from '@kuma-ui/core'

export default function Square({
	piece,
	Coordinate
}: { piece: PieceType; Coordinate: Coordinate }) {
	return (
		<VStack
			border="1px solid black"
			width={80}
			height={80}
			justifyContent="center"
			alignItems="center"
		>
			<Piece piece={piece} Coordinate={Coordinate} />
		</VStack>
	)
}
