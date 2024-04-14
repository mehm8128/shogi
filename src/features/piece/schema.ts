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
	id: string | null
	type: PieceType
	own: PlayerType | null
	promoted: boolean
}
export interface PieceWithCoordinate extends Piece {
	coordinate: Coordinate
}

export interface Coordinate {
	x: number
	y: number
}
