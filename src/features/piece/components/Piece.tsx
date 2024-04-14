import { Piece as PieceType } from '@/features/piece/schema'
import { pieceTypeToJp } from '@/features/piece/selector'
import { VStack, css } from '@kuma-ui/core'

export default function Piece({ piece }: { piece: PieceType }) {
	return (
		<VStack
			as="span"
			backgroundColor="white"
			border="1px solid black"
			p={4}
			w="fit-content"
			className={piece.own === 'white' ? css`transform: rotate(180deg);` : ''}
		>
			{piece.id}
			{pieceTypeToJp(piece.type)}
		</VStack>
	)
}
