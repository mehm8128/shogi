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

export const promotedPieceNameToJpMapping: Record<
	PieceTypeNonNullable,
	string
> = {
	king: '玉将',
	rook: '竜王',
	bishop: '竜馬',
	gold: '金将',
	silver: '成銀',
	knight: '成桂',
	lance: '成香',
	pawn: 'と金'
}
