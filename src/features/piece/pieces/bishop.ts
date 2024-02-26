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
export const canMoveBishop = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const offset = own === 'black' ? 1 : -1
	const canMoveToTopLeft = Array(8)
		.fill(0)
		.map((_, i) => ({
			x: current.x - (i + 1) * offset,
			y: current.y - (i + 1) * offset
		}))
	const canMoveToTopRight = Array(8)
		.fill(0)
		.map((_, i) => ({
			x: current.x + (i + 1) * offset,
			y: current.y - (i + 1) * offset
		}))
	const canMoveToBottomLeft = Array(8)
		.fill(0)
		.map((_, i) => ({
			x: current.x - (i + 1) * offset,
			y: current.y + (i + 1) * offset
		}))
	const canMoveToBottomRight = Array(8)
		.fill(0)
		.map((_, i) => ({
			x: current.x + (i + 1) * offset,
			y: current.y + (i + 1) * offset
		}))

	const canMoveToList = [
		canMoveToTopLeft,
		canMoveToTopRight,
		canMoveToBottomLeft,
		canMoveToBottomRight
	]

	const canMoveToFiltered = canMoveToList.flatMap(canMoveTo =>
		filterByCollision(canMoveTo, own, board)
	)

	const canMoveToFilteredByCollision = isInsideOfBoardAndNotOwnPiece(
		canMoveToFiltered,
		own,
		board
	)

	return canMoveToFilteredByCollision
}
