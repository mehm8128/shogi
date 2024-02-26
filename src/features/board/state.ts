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
import { Coordinate, PieceWithCoordinate } from '@/features/piece/schema'
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
				return selectedPiece
			}

			return piece
		})
	)
	set(currentBoardAtom, { board: newBoard })
})

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
