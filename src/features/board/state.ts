import { Board } from '@/features/board/schema'
import {
	History,
	pieceTypeToHistoryPieceTypeMapping,
	promotedPieceTypeToHistoryPieceTypeMapping
} from '@/features/game/schema'
import {
	currentGameIndexAtom,
	gameAtom,
	historiesAtom
} from '@/features/game/state'
import { Coordinate, Piece, PieceWithCoordinate } from '@/features/piece/schema'
import { getCanBeMovedCoordinates } from '@/features/piece/selector'
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
export const setBoardAtom = atom(
	null,
	(get, set, newCoodinate: Coordinate, willPromote: boolean) => {
		const currentBoard = get(currentBoardAtom)
		const selectedPiece = get(selectedPieceAtom)
		const history = get(historiesAtom)
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
					return {
						id: crypto.randomUUID(),
						type: null,
						own: null,
						promoted: false
					}
				}

				// 移動先に選択中の駒を移動する
				if (x === newCoodinate.x && y === newCoodinate.y) {
					return { ...selectedPiece, promoted: willPromote }
				}

				return piece
			})
		)

		// 相手の駒がいたら駒を取る
		const targetPiece = currentBoard.board[newCoodinate.y][newCoodinate.x]
		if (targetPiece.own !== null) {
			if (selectedPiece.own === 'black') {
				set(addPiecesBlackHavingAtom, {
					id: crypto.randomUUID(),
					type: targetPiece.type,
					own: 'black',
					promoted: false
				})
			} else {
				set(addPiecesWhiteHavingAtom, {
					id: crypto.randomUUID(),
					type: targetPiece.type,
					own: 'white',
					promoted: false
				})
			}
		}

		set(currentBoardAtom, {
			...currentBoard,
			board: newBoard
		})

		if (selectedPiece.type === null) {
			throw new Error('selectedPiece.type is null')
		}
		const newHistory: History = {
			before: {
				x: selectedPiece.coordinate.x,
				y: selectedPiece.coordinate.y
			},
			after: newCoodinate,
			pieceType: selectedPiece.promoted
				? promotedPieceTypeToHistoryPieceTypeMapping[selectedPiece.type]
				: pieceTypeToHistoryPieceTypeMapping[selectedPiece.type],
			decorator: willPromote ? '成' : ''
		}
		set(historiesAtom, [...history, newHistory])
	}
)

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

	if (selectedPiece === null) {
		return []
	}

	return getCanBeMovedCoordinates(selectedPiece, currentPlayer, board)
})

export const selectedHavingPieceAtom = atom<Piece | null>(null)
export const releaseHavingPieceAtom = atom(
	null,
	(get, set, coordinate: Coordinate) => {
		const currentBoard = get(currentBoardAtom)
		const selectedHavingPiece = get(selectedHavingPieceAtom)
		const history = get(historiesAtom)
		if (selectedHavingPiece === null) {
			throw new Error('selectedHavingPiece is null')
		}

		const newBoard = currentBoard.board.map((row, y) =>
			row.map((piece, x) => {
				// 選択中の駒を置く
				if (x === coordinate.x && y === coordinate.y) {
					return {
						id: crypto.randomUUID(),
						type: selectedHavingPiece.type,
						own: selectedHavingPiece.own,
						promoted: false
					}
				}

				return piece
			})
		)

		set(currentBoardAtom, {
			...currentBoard,
			board: newBoard
		})

		if (selectedHavingPiece.type === null) {
			throw new Error('selectedHavingPiece.type is null')
		}
		const newHistory: History = {
			before: null,
			after: coordinate,
			pieceType: pieceTypeToHistoryPieceTypeMapping[selectedHavingPiece.type],
			decorator: '打'
		}
		set(historiesAtom, [...history, newHistory])
	}
)
