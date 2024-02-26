import { Board } from '@/features/board/schema'
import { Coordinate } from '@/features/piece/schema'
import { isInsideOfBoardAndNotOwnPiece } from '@/features/piece/validate'
import { PlayerType } from '@/features/player/schema'

/**
 * x o x
 * x P x
 * x x x
 */
export const canMovePawn = (
	current: Coordinate,
	own: PlayerType,
	board: Board
) => {
	const canMoveTo = [{ x: current.x, y: current.y - 1 }]

	const canMoveToFiltered = isInsideOfBoardAndNotOwnPiece(canMoveTo, own, board)

	return canMoveToFiltered
}
