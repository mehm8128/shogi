import { Piece } from '@/features/piece/schema'

export const initBoard: Piece[][] = [
	[
		{ type: 'lance', own: 'white' },
		{ type: 'knight', own: 'white' },
		{ type: 'silver', own: 'white' },
		{ type: 'gold', own: 'white' },
		{ type: 'king', own: 'white' },
		{ type: 'gold', own: 'white' },
		{ type: 'silver', own: 'white' },
		{ type: 'knight', own: 'white' },
		{ type: 'lance', own: 'white' }
	],
	[
		{ type: null, own: null },
		{ type: 'rook', own: 'white' },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: 'bishop', own: 'white' },
		{ type: null, own: null }
	],
	[
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' },
		{ type: 'pawn', own: 'white' }
	],
	[
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null }
	],
	[
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null }
	],
	[
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null }
	],
	[
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' },
		{ type: 'pawn', own: 'black' }
	],
	[
		{ type: null, own: null },
		{ type: 'bishop', own: 'black' },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: null, own: null },
		{ type: 'rook', own: 'black' },
		{ type: null, own: null }
	],
	[
		{ type: 'lance', own: 'black' },
		{ type: 'knight', own: 'black' },
		{ type: 'silver', own: 'black' },
		{ type: 'gold', own: 'black' },
		{ type: 'king', own: 'black' },
		{ type: 'gold', own: 'black' },
		{ type: 'silver', own: 'black' },
		{ type: 'knight', own: 'black' },
		{ type: 'lance', own: 'black' }
	]
]
