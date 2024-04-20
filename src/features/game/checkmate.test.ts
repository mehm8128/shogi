import { Board } from '@/features/board/schema'
import { checkmate } from '@/features/game/checkmate'
import { arrayWith, nullBoard } from '@/lib/testUtils'

describe('checkmate', () => {
	test('頭金の詰み判定ができる', () => {
		const board: Board['board'] = arrayWith(
			arrayWith(
				arrayWith(nullBoard, 0, 4, {
					id: '0',
					type: 'king',
					own: 'white',
					promoted: false
				}),
				1,
				4,
				{
					id: '1',
					type: 'gold',
					own: 'black',
					promoted: false
				}
			),
			2,
			4,
			{
				id: '2',
				type: 'gold',
				own: 'black',
				promoted: false
			}
		)

		expect(checkmate({ board: board }, 'white')).toBe(true)
	})
	// //TODO: 他のパターン
	// test('の詰み判定ができる', () => {
	// 	const board: Board['board'] = arrayWith(
	// 		arrayWith(
	// 			arrayWith(nullBoard, 0, 4, {
	// 				id: '0',
	// 				type: 'king',
	// 				own: 'white',
	// 				promoted: false
	// 			}),
	// 			1,
	// 			4,
	// 			{
	// 				id: '1',
	// 				type: 'gold',
	// 				own: 'black',
	// 				promoted: false
	// 			}
	// 		),
	// 		2,
	// 		4,
	// 		{
	// 			id: '2',
	// 			type: 'gold',
	// 			own: 'black',
	// 			promoted: false
	// 		}
	// 	)

	// 	expect(checkmate({ board: board }, 'white')).toBe(true)
	// })
})
