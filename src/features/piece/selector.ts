import { Board } from '@/features/board/schema'
import {
	pieceNameToJpMapping,
	promotedPieceNameToJpMapping
} from '@/features/piece/const'
import { canMoveBishop } from '@/features/piece/pieces/bishop'
import { canMoveGold } from '@/features/piece/pieces/gold'
import { canMoveKing } from '@/features/piece/pieces/king'
import { canMoveKnight } from '@/features/piece/pieces/knight'
import { canMoveLance } from '@/features/piece/pieces/lance'
import { canMovePawn } from '@/features/piece/pieces/pawn'
import { canMoveRook } from '@/features/piece/pieces/rook'
import { canMoveSilver } from '@/features/piece/pieces/silver'
import { PieceType, PieceWithCoordinate } from '@/features/piece/schema'
import { PlayerType } from '@/features/player/schema'

export const pieceTypeToJp = (piece: PieceType, promoted: boolean) => {
	if (piece === null) {
		return ''
	}
	if (promoted) {
		return promotedPieceNameToJpMapping[piece]
	}

	return pieceNameToJpMapping[piece]
}

export const getCanBeMovedCoordinates = (
	piece: PieceWithCoordinate,
	currentPlayer: PlayerType,
	board: Board
) => {
	if (piece.type === null) return []

	switch (piece.type) {
		case 'king':
			return canMoveKing(piece.coordinate, currentPlayer, board)
		case 'rook':
			return canMoveRook(piece.coordinate, currentPlayer, board, piece.promoted)
		case 'bishop':
			return canMoveBishop(
				piece.coordinate,
				currentPlayer,
				board,
				piece.promoted
			)
		case 'gold':
			return canMoveGold(piece.coordinate, currentPlayer, board)
		case 'silver':
			return canMoveSilver(
				piece.coordinate,
				currentPlayer,
				board,
				piece.promoted
			)
		case 'knight':
			return canMoveKnight(
				piece.coordinate,
				currentPlayer,
				board,
				piece.promoted
			)
		case 'lance':
			return canMoveLance(
				piece.coordinate,
				currentPlayer,
				board,
				piece.promoted
			)
		case 'pawn':
			return canMovePawn(piece.coordinate, currentPlayer, board, piece.promoted)
		default:
			throw new Error(`invalid piece: ${piece.type satisfies never}`)
	}
}
