import { Board } from '@/features/board/schema'
import { Coordinate } from '@/features/piece/schema'
import {
	filterByCollision,
	isInsideOfBoardAndNotOwnPiece
} from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * x . x
 * x o x
 * x L x
 */
export const canMoveLance = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const canMoveTo = [
		{ x: current.x, y: current.y - 1 },
		{ x: current.x, y: current.y - 2 },
		{ x: current.x, y: current.y - 3 },
		{ x: current.x, y: current.y - 4 },
		{ x: current.x, y: current.y - 5 },
		{ x: current.x, y: current.y - 6 },
		{ x: current.x, y: current.y - 7 },
		{ x: current.x, y: current.y - 8 }
	]

	const canMoveToFiltered = filterByCollision(canMoveTo, own, board)

	const canMoveToFilteredByCollision = isInsideOfBoardAndNotOwnPiece(
		canMoveToFiltered,
		own,
		board
	)

	return canMoveToFilteredByCollision
}
