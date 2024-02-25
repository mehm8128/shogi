export type PieceType =
	| 'king' // 王将
	| 'rook' // 飛車
	| 'bishop' // 角行
	| 'gold' // 金将
	| 'silver' // 銀将
	| 'knight' // 桂馬
	| 'lance' // 香車
	| 'pawn' // 歩兵

export interface Piece {
	type: PieceType
	x: number
	y: number
}
