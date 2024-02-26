import { Board } from '@/features/board/schema'
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
	const canMoveTo = [
		{ x: current.x + 1, y: current.y - 2 },
		{ x: current.x - 1, y: current.y - 2 }
	]

	const canMoveToFiltered = isInsideOfBoardAndNotOwnPiece(canMoveTo, own, board)

	return canMoveToFiltered
}
