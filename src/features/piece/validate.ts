import { Board } from '@/features/board/schema'
import { Coordinate, PieceType } from '@/features/piece/schema'
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
	pieceType: PieceType,
	before: Coordinate, // 移動前の座標
	after: Coordinate, // 移動後の座標
	playerType: PlayerType
) => {
	if (pieceType === 'king' || pieceType === 'gold') {
		return false
	}

	// 3段目以内に入るときに成れる
	if (
		(playerType === 'black' && after.y < 3) ||
		(playerType === 'white' && after.y > 5)
	) {
		return true
	}

	// 既に3段目以内にいる場合は戻るときに成れる
	if (
		(playerType === 'black' && before.y < 3) ||
		(playerType === 'white' && before.y > 5)
	) {
		return true
	}

	return false
}

export const mustPromote = (
	pieceType: PieceType,
	coordinate: Coordinate, // 移動後の座標
	playerType: PlayerType
) => {
	if (pieceType === 'king' || pieceType === 'gold') {
		return false
	}
	if (pieceType === 'knight') {
		if (
			(playerType === 'black' && coordinate.y < 2) ||
			(playerType === 'white' && coordinate.y > 6)
		) {
			return true
		}
	}
	if (pieceType === 'lance' || pieceType === 'pawn') {
		if (
			(playerType === 'black' && coordinate.y === 0) ||
			(playerType === 'white' && coordinate.y === 8)
		) {
			return true
		}
	}

	return false
}
