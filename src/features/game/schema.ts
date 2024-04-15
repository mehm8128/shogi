import { Board } from '@/features/board/schema'
import { Coordinate, PieceTypeNonNullable } from '@/features/piece/schema'

export interface Game {
	boards: Board[]
}

type HistoryPieceType =
	| '玉'
	| '飛'
	| '竜'
	| '角'
	| '馬'
	| '金'
	| '銀'
	| '成銀'
	| '桂'
	| '成桂'
	| '香'
	| '成香'
	| '歩'
	| 'と'
type Decorator = '成' | '打' | ''
export interface History {
	before: Coordinate | null
	after: Coordinate
	pieceType: HistoryPieceType
	decorator: Decorator
}

export const pieceTypeToHistoryPieceTypeMapping: Record<
	PieceTypeNonNullable,
	HistoryPieceType
> = {
	king: '玉',
	rook: '飛',
	bishop: '角',
	gold: '金',
	silver: '銀',
	knight: '桂',
	lance: '香',
	pawn: '歩'
}
export const promotedPieceTypeToHistoryPieceTypeMapping: Record<
	PieceTypeNonNullable,
	HistoryPieceType
> = {
	king: '玉',
	rook: '竜',
	bishop: '馬',
	gold: '金',
	silver: '成銀',
	knight: '成桂',
	lance: '成香',
	pawn: 'と'
}
export const numberToKanjiMapping: Record<number, string> = {
	1: '一',
	2: '二',
	3: '三',
	4: '四',
	5: '五',
	6: '六',
	7: '七',
	8: '八',
	9: '九'
}
