import {
	pieceNameToJpMapping,
	promotedPieceNameToJpMapping
} from '@/features/piece/const'
import { PieceType } from '@/features/piece/schema'

export const pieceTypeToJp = (piece: PieceType, promoted: boolean) => {
	if (piece === null) {
		return ''
	}
	if (promoted) {
		return promotedPieceNameToJpMapping[piece]
	}

	return pieceNameToJpMapping[piece]
}
