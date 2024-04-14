import { Board } from '@/features/board/schema'
import { canMoveKing } from '@/features/piece/pieces/king'
import { Coordinate } from '@/features/piece/schema'
import { isInsideOfBoardAndNotOwnPiece } from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * x o x
 * x P x
 * x x x
 */
export const canMoveNotPromotedPawn = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const offset = own === 'black' ? 1 : -1
	const canMoveTo = [{ x: current.x, y: current.y - offset }]

	const canMoveToFiltered = isInsideOfBoardAndNotOwnPiece(canMoveTo, own, board)

	return canMoveToFiltered
}

export const canMovePromotedPawn = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	return canMoveKing(current, own, board)
}

export const canMovePawn = (
	current: Coordinate,
	own: PlayerType,
	board: Board,
	promoted: boolean
) => {
	if (promoted) {
		return canMovePromotedPawn(current, own, board)
	}
	return canMoveNotPromotedPawn(current, own, board)
}
