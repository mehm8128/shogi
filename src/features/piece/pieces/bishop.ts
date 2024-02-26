import { Board } from '@/features/board/schema'
import { Coordinate } from '@/features/piece/schema'
import {
	filterByCollision,
	isInsideOfBoardAndNotOwnPiece
} from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * . x x x .
 * x o x o x
 * x x B x x
 * x o x o x
 * . x x x .
 */
export const canMoveRook = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const canMoveToTopLeft = [
		{ x: current.x - 1, y: current.y - 1 },
		{ x: current.x - 2, y: current.y - 2 },
		{ x: current.x - 3, y: current.y - 3 },
		{ x: current.x - 4, y: current.y - 4 },
		{ x: current.x - 5, y: current.y - 5 },
		{ x: current.x - 6, y: current.y - 6 },
		{ x: current.x - 7, y: current.y - 7 },
		{ x: current.x - 8, y: current.y - 8 }
	]
	const canMoveToTopRight = [
		{ x: current.x + 1, y: current.y - 1 },
		{ x: current.x + 2, y: current.y - 2 },
		{ x: current.x + 3, y: current.y - 3 },
		{ x: current.x + 4, y: current.y - 4 },
		{ x: current.x + 5, y: current.y - 5 },
		{ x: current.x + 6, y: current.y - 6 },
		{ x: current.x + 7, y: current.y - 7 },
		{ x: current.x + 8, y: current.y - 8 }
	]
	const canMoveToBottomLeft = [
		{ x: current.x - 1, y: current.y + 1 },
		{ x: current.x - 2, y: current.y + 2 },
		{ x: current.x - 3, y: current.y + 3 },
		{ x: current.x - 4, y: current.y + 4 },
		{ x: current.x - 5, y: current.y + 5 },
		{ x: current.x - 6, y: current.y + 6 },
		{ x: current.x - 7, y: current.y + 7 },
		{ x: current.x - 8, y: current.y + 8 }
	]
	const canMoveToBottomRight = [
		{ x: current.x + 1, y: current.y + 1 },
		{ x: current.x + 2, y: current.y + 2 },
		{ x: current.x + 3, y: current.y + 3 },
		{ x: current.x + 4, y: current.y + 4 },
		{ x: current.x + 5, y: current.y + 5 },
		{ x: current.x + 6, y: current.y + 6 },
		{ x: current.x + 7, y: current.y + 7 },
		{ x: current.x + 8, y: current.y + 8 }
	]

	const canMoveToList = [
		canMoveToTopLeft,
		canMoveToTopRight,
		canMoveToBottomLeft,
		canMoveToBottomRight
	]

	const canMoveToFilteredByCollision = canMoveToList.flatMap(canMoveTo =>
		filterByCollision(canMoveTo, own, board)
	)

	const canMoveToFiltered = isInsideOfBoardAndNotOwnPiece(
		canMoveToFilteredByCollision,
		own,
		board
	)

	return canMoveToFiltered
}
