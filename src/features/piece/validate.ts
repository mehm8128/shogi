import { Board } from '@/features/board/schema'
import { Coordinate, PieceWithCoordinate } from '@/features/piece/schema'
import { PlayerType } from '@/features/player/schema'

// 駒が盤内にあるかどうか
export const isInsideOfBoard = (coordinate: Coordinate) =>
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
		.filter(coordinate => board.board[coordinate.y][coordinate.x].own !== own) // 移動先に自分の駒がないかどうか

export const filterByCollision = (
	canMoveTo: Coordinate[],
	own: PlayerType,
	board: Board
) => {
	// 先にisInsideOfBoardAndNotOwnPieceでフィルタリングしておく
	for (const coordinate of canMoveTo.filter(isInsideOfBoard)) {
		// 移動先の駒
		const piece = board.board[coordinate.y][coordinate.x]

		// まだ進める
		if (piece.own === null) {
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

export const canPromote = (
	piece: PieceWithCoordinate // 移動後の座標
) => {
	if (piece.type === 'king' || piece.type === 'gold') {
		return false
	}
	if (
		(piece.own === 'black' && piece.coordinate.y < 3) ||
		(piece.own === 'white' && piece.coordinate.y > 5)
	) {
		return true
	}

	return false
}
