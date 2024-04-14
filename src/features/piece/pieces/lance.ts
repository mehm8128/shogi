import { Board } from '@/features/board/schema'
import { canMoveKing } from '@/features/piece/pieces/king'
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
export const canMoveNotPromotedLance = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const offset = own === 'black' ? 1 : -1
	const canMoveTo = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x, y: current.y - (i + 1) * offset }))

	const canMoveToFiltered = filterByCollision(canMoveTo, own, board)

	const canMoveToFilteredByCollision = isInsideOfBoardAndNotOwnPiece(
		canMoveToFiltered,
		own,
		board
	)

	return canMoveToFilteredByCollision
}

export const canMovePromotedLance = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	return canMoveKing(current, own, board)
}

export const canMoveLance = (
	current: Coordinate,
	own: PlayerType,
	board: Board,
	promoted: boolean
) => {
	if (promoted) {
		return canMovePromotedLance(current, own, board)
	}
	return canMoveNotPromotedLance(current, own, board)
}
