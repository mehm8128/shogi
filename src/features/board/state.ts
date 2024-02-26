import { Board } from '@/features/board/schema'
import { currentGameIndexAtom, gameAtom } from '@/features/game/state'
import { canMoveBishop } from '@/features/piece/pieces/bishop'
import { canMoveGold } from '@/features/piece/pieces/gold'
import { canMoveKing } from '@/features/piece/pieces/king'
import { canMoveKnight } from '@/features/piece/pieces/knight'
import { canMoveLance } from '@/features/piece/pieces/lance'
import { canMovePawn } from '@/features/piece/pieces/pawn'
import { canMoveRook } from '@/features/piece/pieces/rook'
import { canMoveSilver } from '@/features/piece/pieces/silver'
import { Coordinate, Piece, PieceWithCoordinate } from '@/features/piece/schema'
import { currentPlayerAtom } from '@/features/player/state'
import { atom } from 'jotai'

export const currentBoardAtom = atom(
	get => {
		const game = get(gameAtom)
		const index = get(currentGameIndexAtom)
		return game.boards[index]
	},
	(get, set, newBoard: Board) => {
		const game = get(gameAtom)
		const index = get(currentGameIndexAtom)
		const newGame = {
			boards: game.boards.with(index, newBoard)
		}
		set(gameAtom, newGame)
	}
)
export const setBoardAtom = atom(null, (get, set, newCoodinate: Coordinate) => {
	const currentBoard = get(currentBoardAtom)
	const selectedPiece = get(selectedPieceAtom)
	if (selectedPiece === null) {
		throw new Error('selectedPiece is null')
	}

	const newBoard = currentBoard.board.map((row, y) =>
		row.map((piece, x) => {
			// 移動元をnullにする
			if (
				x === selectedPiece.coordinate.x &&
				y === selectedPiece.coordinate.y
			) {
				return { type: null, own: null }
			}

			// 移動先に選択中の駒を移動する
			if (x === newCoodinate.x && y === newCoodinate.y) {
				return { type: selectedPiece.type, own: selectedPiece.own }
			}

			return piece
		})
	)

	// 相手の駒がいたら駒を取る
	const targetPiece = currentBoard.board[newCoodinate.y][newCoodinate.x]
	if (targetPiece.own !== null) {
		if (selectedPiece.own === 'black') {
			set(addPiecesBlackHavingAtom, {
				type: targetPiece.type,
				own: 'black'
			})
		} else {
			set(addPiecesWhiteHavingAtom, {
				type: targetPiece.type,
				own: 'white'
			})
		}
	}

	set(currentBoardAtom, {
		...currentBoard,
		board: newBoard
	})
})

export const piecesBlackHavingAtom = atom<Piece[]>([])
export const addPiecesBlackHavingAtom = atom<null, Piece[], void>(
	null,
	(get, set, newPiece: Piece) => {
		const currentPiecesBlackHaving = get(piecesBlackHavingAtom)
		const piecesBlackHaving = [...currentPiecesBlackHaving, newPiece]
		set(piecesBlackHavingAtom, piecesBlackHaving)
	}
)
export const piecesWhiteHavingAtom = atom<Piece[]>([])
export const addPiecesWhiteHavingAtom = atom<null, Piece[], void>(
	null,
	(get, set, newPiece: Piece) => {
		const currentPiecesWhiteHaving = get(piecesWhiteHavingAtom)
		const piecesWhiteHaving = [...currentPiecesWhiteHaving, newPiece]
		set(piecesWhiteHavingAtom, piecesWhiteHaving)
	}
)

export const selectedPieceAtom = atom<PieceWithCoordinate | null>(null)
export const canBeMovedCoordinatesAtom = atom(get => {
	const selectedPiece = get(selectedPieceAtom)
	const board = get(currentBoardAtom)
	const currentPlayer = get(currentPlayerAtom)

	if (selectedPiece === null || selectedPiece.type === null) return []

	switch (selectedPiece.type) {
		case 'king':
			return canMoveKing(selectedPiece.coordinate, currentPlayer, board)
		case 'rook':
			return canMoveRook(selectedPiece.coordinate, currentPlayer, board)
		case 'bishop':
			return canMoveBishop(selectedPiece.coordinate, currentPlayer, board)
		case 'gold':
			return canMoveGold(selectedPiece.coordinate, currentPlayer, board)
		case 'silver':
			return canMoveSilver(selectedPiece.coordinate, currentPlayer, board)
		case 'knight':
			return canMoveKnight(selectedPiece.coordinate, currentPlayer, board)
		case 'lance':
			return canMoveLance(selectedPiece.coordinate, currentPlayer, board)
		case 'pawn':
			return canMovePawn(selectedPiece.coordinate, currentPlayer, board)
		default:
			throw new Error(`invalid piece: ${selectedPiece.type satisfies never}`)
	}
})
