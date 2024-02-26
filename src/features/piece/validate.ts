import { Board } from '@/features/board/schema'
import { Coordinate } from '@/features/piece/schema'
import { PlayerType } from '@/features/player/schema'

// 駒が盤内にあるかどうか
const isInsideOfBoard = (coordinate: Coordinate) =>
	coordinate.x >= 0 &&
	coordinate.x <= 8 &&
	coordinate.y >= 0 &&
	coordinate.y <= 8

export const isInsideOfBoardAndNotOwnPiece = (
	canMoveTo: Coordinate[],
	own: string,
	board: Board
) =>
	canMoveTo
		.filter(isInsideOfBoard)
		.filter(coordinate => board.board[coordinate.x][coordinate.y].own !== own) // 移動先に自分の駒がないかどうか

export const filterByCollision = (
	canMoveTo: Coordinate[],
	own: PlayerType,
	board: Board
) => {
	for (const coordinate of canMoveTo) {
		// 移動先の駒
		const piece = board.board[coordinate.x][coordinate.y]

		// まだ進める
		if (piece === null) {
			continue
		}
		// 自分の駒にぶつかったら1つ前までに移動できる
		if (piece.own === own) {
			return canMoveTo.slice(0, canMoveTo.indexOf(coordinate))
		}
		// 相手の駒にぶつかったらその駒まで移動できる
		return canMoveTo.slice(0, canMoveTo.indexOf(coordinate) + 1)
	}

	return canMoveTo
}
