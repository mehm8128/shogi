import { pieceNameToJpMapping } from '@/features/piece/const'
import { PieceType } from '@/features/piece/schema'

export const pieceTypeToJp = (piece: PieceType) => {
	if (piece === null) {
		return ''
	}
	return pieceNameToJpMapping[piece]
}
