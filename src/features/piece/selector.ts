import { pieceNameToJpMapping } from '@/features/piece/const'
import { PieceType, PieceWithCoordinate } from '@/features/piece/schema'
import { PlayerType } from '@/features/player/schema'

export const pieceTypeToJp = (piece: PieceType) => {
	if (piece === null) {
		return ''
	}
	return pieceNameToJpMapping[piece]
}

export const canPromote = (
	piece: PieceWithCoordinate,
	playerType: PlayerType
) => {
	if (piece.type !== 'king' && piece.type !== 'gold') {
		return false
	}
	if (
		(playerType === 'black' && piece.coordinate.y < 3) ||
		(playerType === 'white' && piece.coordinate.y > 5)
	) {
		return true
	}

	return false
}
