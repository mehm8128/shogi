import { Piece } from '@/features/piece/schema'

export type PlayerType = 'black' | 'white' // 先手: black, 後手: white

export interface Player {
	type: PlayerType
	piecesInHand: Piece[]
}
