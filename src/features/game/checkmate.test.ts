import { Board } from '@/features/board/schema'
import { checkmate } from '@/features/game/checkmate'
import { arrayWith, nullBoard } from '@/lib/testUtils'

describe('checkmate', () => {
	test('頭金の詰み判定ができる', () => {
		const board1: Board['board'] = arrayWith(nullBoard, 0, 4, {
			id: '0',
			type: 'king',
			own: 'white',
			promoted: false
		})
		const board2 = arrayWith(board1, 1, 4, {
			id: '1',
			type: 'gold',
			own: 'black',
			promoted: false
		})
		const board3 = arrayWith(board2, 2, 4, {
			id: '2',
			type: 'gold',
			own: 'black',
			promoted: false
		})

		expect(checkmate({ board: board3 }, 'white')).toBe(true)
	})
	// TODO: 駒を取ったときに王手がかかるとき、詰みにならない
	// test('一間竜の詰み判定ができる', () => {
	// 	const board1: Board['board'] = arrayWith(nullBoard, 1, 8, {
	// 		id: '0',
	// 		type: 'king',
	// 		own: 'white',
	// 		promoted: false
	// 	})
	// 	const board2 = arrayWith(board1, 1, 7, {
	// 		id: '1',
	// 		type: 'gold',
	// 		own: 'white',
	// 		promoted: false
	// 	})
	// 	const board3 = arrayWith(board2, 1, 6, {
	// 		id: '2',
	// 		type: 'rook',
	// 		own: 'black',
	// 		promoted: true
	// 	})
	// 	const board4 = arrayWith(board3, 2, 7, {
	// 		id: '3',
	// 		type: 'gold',
	// 		own: 'black',
	// 		promoted: false
	// 	})
	// 	const board5: Board['board'] = arrayWith(board4, 0, 8, {
	// 		id: '4',
	// 		type: 'lance',
	// 		own: 'white',
	// 		promoted: false
	// 	})

	// 	expect(checkmate({ board: board5 }, 'white')).toBe(true)
	// })
	test('桂馬を使った詰み判定ができる', () => {
		const board1: Board['board'] = arrayWith(nullBoard, 0, 8, {
			id: '0',
			type: 'king',
			own: 'white',
			promoted: false
		})
		const board2 = arrayWith(board1, 0, 7, {
			id: '1',
			type: 'gold',
			own: 'white',
			promoted: false
		})
		const board3 = arrayWith(board2, 1, 8, {
			id: '2',
			type: 'knight',
			own: 'white',
			promoted: false
		})
		const board4 = arrayWith(board3, 1, 7, {
			id: '3',
			type: 'knight',
			own: 'white',
			promoted: false
		})
		const board5 = arrayWith(board4, 2, 7, {
			id: '4',
			type: 'knight',
			own: 'black',
			promoted: false
		})

		expect(checkmate({ board: board5 }, 'white')).toBe(true)
	})
})
