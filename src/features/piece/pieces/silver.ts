import { Board } from '@/features/board/schema'
import { Coordinate } from '@/features/piece/schema'
import { isInsideOfBoardAndNotOwnPiece } from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * o o o
 * x S x
 * o x o
 */
export const canMoveSilver = (
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
