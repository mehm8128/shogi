import { Board } from '@/features/board/schema'
import { Coordinate } from '@/features/piece/schema'
import { isInsideOfBoardAndNotOwnPiece } from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * o o o
 * o G o
 * x o x
 */
export const canMoveGold = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const canMoveTo = [
		{ x: current.x + 1, y: current.y },
		{ x: current.x + 1, y: current.y - 1 },
		{ x: current.x, y: current.y + 1 },
		{ x: current.x, y: current.y - 1 },
		{ x: current.x - 1, y: current.y },
		{ x: current.x - 1, y: current.y - 1 }
	]

	const canMoveToFiltered = isInsideOfBoardAndNotOwnPiece(canMoveTo, own, board)

	return canMoveToFiltered
}
