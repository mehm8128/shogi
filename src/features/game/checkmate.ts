import { Board } from '@/features/board/schema'
import { PieceWithCoordinate } from '@/features/piece/schema'
import { getCanBeMovedCoordinates } from '@/features/piece/selector'
import { PlayerType, getOppositePlayerType } from '@/features/player/schema'

// TODO: 王将が取られたらゲーム終了の処理

// TODO: 合駒できるときに詰み判定しない
export const checkmate = (board: Board, currentPlayer: PlayerType) => {
	// 詰み判定
	// 王手がかかってて、逃げる場所がなく、王手をかけている駒を玉でも他の自分の駒でも取れなければ負け。玉で取れる場合でも取ったあとで取られる範囲にいたら駄目
	// 1. 相手の駒の動ける場所を全列挙し、玉が王手をかけられているかを判定
	// 2. 玉の動ける場所を全列挙
	// 3. 相手の駒全てを順に探索し、玉の動ける場所から相手の駒の移動範囲を除外。動ける場所が残っていなければ逃げられるところはない
	// 4. 自分の駒全てを順に探索し、王手をかけている相手の駒を取れるかどうかを判定
	// 5. 王手をかけている相手の駒に他の相手の駒の動ける範囲が含まれていないかを判定

	// boardを座標つきにする
	const boardWithCoordinate: PieceWithCoordinate[][] = board.board.map(
		(row, y) => row.map((piece, x) => ({ ...piece, coordinate: { x, y } }))
	)

	const oppositePlayer = getOppositePlayerType(currentPlayer)

	// 1. 相手の駒の動ける場所を全列挙し、玉が王手をかけられているかを判定
	// 自分の玉の座標を取得
	const king = boardWithCoordinate
		.flat()
		.find(piece => piece.type === 'king' && piece.own === currentPlayer)

	if (king === undefined) {
		throw new Error('king is absent')
	}

	const kingCoordinate = king.coordinate

	const oppositePieces = boardWithCoordinate
		.flat()
		.filter(piece => piece.own === oppositePlayer)
	const myPieces = boardWithCoordinate
		.flat()
		.filter(piece => piece.own === currentPlayer)

	// 王手がかかっているかどうかの判定
	const checkingOppositePiece = oppositePieces.find(piece =>
		getCanBeMovedCoordinates(piece, oppositePlayer, board).some(
			coordinate =>
				coordinate.x === kingCoordinate.x && coordinate.y === kingCoordinate.y
		)
	)

	if (checkingOppositePiece === undefined) {
		return false
	}

	// 2. 玉の動ける場所を全列挙
	const canMoveKingCoordinates = getCanBeMovedCoordinates(
		king,
		currentPlayer,
		board
	)

	// 3. 相手の駒全てを順に探索し、玉の動ける場所から相手の駒の移動範囲を除外。動ける場所が残っていなければ逃げられるところはない
	const canMoveKingCoordinatesWithoutCheck = canMoveKingCoordinates.filter(
		canMoveKingCoordinate =>
			!oppositePieces.some(piece =>
				getCanBeMovedCoordinates(piece, oppositePlayer, board).some(
					coordinate =>
						coordinate.x === canMoveKingCoordinate.x &&
						coordinate.y === canMoveKingCoordinate.y
				)
			)
	)

	// 1つの場合はその1つが王手をかけている相手の駒じゃなければ逃げられる
	if (
		canMoveKingCoordinatesWithoutCheck.length === 1 &&
		!(
			checkingOppositePiece.coordinate.x ===
				canMoveKingCoordinatesWithoutCheck[0].x &&
			checkingOppositePiece.coordinate.y ===
				canMoveKingCoordinatesWithoutCheck[0].y
		)
	) {
		return false
	}
	// 2つ以上の場合は逃げられる
	if (canMoveKingCoordinatesWithoutCheck.length > 1) {
		return false
	}

	// 4. 自分の駒全てを順に探索し、王手をかけている相手の駒を取れるかどうかを判定
	const canTakeCheckingPieces = myPieces.filter(piece =>
		getCanBeMovedCoordinates(piece, currentPlayer, board).some(
			coordinate =>
				coordinate.x === checkingOppositePiece.coordinate.x &&
				coordinate.y === checkingOppositePiece.coordinate.y
		)
	)

	// 5. 4.の駒が玉であれば、王手をかけている相手の駒に他の相手の駒の動ける範囲が含まれていないかを判定
	if (
		canTakeCheckingPieces.length === 1 &&
		canTakeCheckingPieces[0].type === 'king'
	) {
		// 王手をかけている駒は除外しないと取り返せるかどうかの判定ができない
		const checkingPieceExcludedBoard: Board['board'] = boardWithCoordinate.map(
			row =>
				row.map(piece => {
					if (
						piece.coordinate.x === checkingOppositePiece.coordinate.x &&
						piece.coordinate.y === checkingOppositePiece.coordinate.y
					) {
						return { ...piece, own: null, type: null }
					}
					return piece
				})
		)
		const canTakeBack = oppositePieces.some(piece =>
			getCanBeMovedCoordinates(piece, oppositePlayer, {
				board: checkingPieceExcludedBoard
			}).some(
				coordinate =>
					coordinate.x === checkingOppositePiece.coordinate.x &&
					coordinate.y === checkingOppositePiece.coordinate.y
			)
		)

		if (canTakeBack) {
			return true
		}
	}

	if (canTakeCheckingPieces.length > 0) {
		return false
	}

	return true
}
