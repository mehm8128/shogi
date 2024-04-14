import { Board } from '@/features/board/schema'
import { Coordinate } from '@/features/piece/schema'
import {
	filterByCollision,
	isInsideOfBoardAndNotOwnPiece
} from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * x x . x x
 * x x o x x
 * . o R o .
 * x x o x x
 * x x . x x
 */
export const canMoveNotPromotedRook = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const offset = own === 'black' ? 1 : -1
	const canMoveToTop = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x, y: current.y - (i + 1) * offset }))
	const canMoveToBottom = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x, y: current.y + (i + 1) * offset }))
	const canMoveToLeft = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x - (i + 1) * offset, y: current.y }))
	const canMoveToRight = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x + (i + 1) * offset, y: current.y }))

	const canMoveToList = [
		canMoveToTop,
		canMoveToBottom,
		canMoveToLeft,
		canMoveToRight
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

/**
 * x x . x x
 * x o o o x
 * . o R o .
 * x o o o x
 * x x . x x
 */
export const canMovePromotedRook = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const offset = own === 'black' ? 1 : -1
	const canMoveToTop = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x, y: current.y - (i + 1) * offset }))
	const canMoveToBottom = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x, y: current.y + (i + 1) * offset }))
	const canMoveToLeft = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x - (i + 1) * offset, y: current.y }))
	const canMoveToRight = Array(8)
		.fill(0)
		.map((_, i) => ({ x: current.x + (i + 1) * offset, y: current.y }))

	const canMoveToList = [
		canMoveToTop,
		canMoveToBottom,
		canMoveToLeft,
		canMoveToRight
	]
	const canMoveToListAdditonal = [
		{ x: current.x + 1, y: current.y + 1 },
		{ x: current.x + 1, y: current.y - 1 },
		{ x: current.x - 1, y: current.y + 1 },
		{ x: current.x - 1, y: current.y - 1 }
	]

	const canMoveToFiltered = canMoveToList.flatMap(canMoveTo =>
		filterByCollision(canMoveTo, own, board)
	)

	const canMoveToFilteredByCollision = isInsideOfBoardAndNotOwnPiece(
		[...canMoveToFiltered, ...canMoveToListAdditonal],
		own,
		board
	)

	return canMoveToFilteredByCollision
}

export const canMoveRook = (
	current: Coordinate,
	own: PlayerType,
	board: Board,
	promoted: boolean
) => {
	if (promoted) {
		return canMovePromotedRook(current, own, board)
	}
	return canMoveNotPromotedRook(current, own, board)
}
