import { PieceType } from '@/features/piece/schema'

export type SquareType = PieceType | null
export interface Board {
	board: SquareType[][]
}
