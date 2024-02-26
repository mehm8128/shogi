import { PieceTypeNonNullable } from '@/features/piece/schema'

// TODO: モジュール外から使用できないようにする
export const pieceNameToJpMapping: Record<PieceTypeNonNullable, string> = {
	king: '玉将',
	rook: '飛車',
	bishop: '角行',
	gold: '金将',
	silver: '銀将',
	knight: '桂馬',
	lance: '香車',
	pawn: '歩兵'
}
