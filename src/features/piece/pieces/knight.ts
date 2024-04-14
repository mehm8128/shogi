import { Board } from '@/features/board/schema'
import { canMoveKing } from '@/features/piece/pieces/king'
import { Coordinate } from '@/features/piece/schema'
import { isInsideOfBoardAndNotOwnPiece } from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * o x o
 * x x x
 * x N x
 */
export const canMoveKnight = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const offset = own === 'black' ? 1 : -1
	const canMoveTo = [
		{ x: current.x + offset, y: current.y - 2 * offset },
		{ x: current.x - offset, y: current.y - 2 * offset }
	]

	const canMoveToFiltered = isInsideOfBoardAndNotOwnPiece(canMoveTo, own, board)

	return canMoveToFiltered
}

export const canMovePromotedKnight = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	return canMoveKing(current, own, board)
}
