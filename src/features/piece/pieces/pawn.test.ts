import { initBoard } from '@/features/game/const'
import { canMovePawn } from '@/features/piece/pieces/pawn'
import { compareCoordinates } from '@/lib/testUtils'

describe('pawn', () => {
	describe('canMovePawn', () => {
		test('歩兵が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [{ x: 4, y: 3 }].toSorted(compareCoordinates)

			expect(
				canMovePawn(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})
