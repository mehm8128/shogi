import { PlayerType } from '@/features/player/schema'

export type PieceType =
	| 'king'
	| 'rook'
	| 'bishop'
	| 'gold'
	| 'silver'
	| 'knight'
	| 'lance'
	| 'pawn'
	| null

export type PieceTypeNonNullable = Exclude<PieceType, null>

export interface Piece {
	type: PieceType
	own: PlayerType | null
}

export interface Coordinate {
	x: number
	y: number
}
