import { Board } from '@/features/board/schema'
import { canMoveKing } from '@/features/piece/pieces/king'
import { Coordinate } from '@/features/piece/schema'
import { isInsideOfBoardAndNotOwnPiece } from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * o o o
 * x S x
 * o x o
 */
export const canMoveNotPromotedSilver = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const offset = own === 'black' ? 1 : -1
	const canMoveTo = [
		{ x: current.x + offset, y: current.y + offset },
		{ x: current.x + offset, y: current.y - offset },
		{ x: current.x, y: current.y - offset },
		{ x: current.x - offset, y: current.y + offset },
		{ x: current.x - offset, y: current.y - offset }
	]

	const canMoveToFiltered = isInsideOfBoardAndNotOwnPiece(canMoveTo, own, board)

	return canMoveToFiltered
}

export const canMovePromotedSilver = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	return canMoveKing(current, own, board)
}

export const canMoveSilver = (
	current: Coordinate,
	own: PlayerType,
	board: Board,
	promoted: boolean
) => {
	if (promoted) {
		return canMovePromotedSilver(current, own, board)
	}
	return canMoveNotPromotedSilver(current, own, board)
}
