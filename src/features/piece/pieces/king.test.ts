import { initBoard } from '@/features/game/const'
import { canMoveKing } from '@/features/piece/pieces/king'
import { compareCoordinates } from '@/lib/testUtils'

describe('king', () => {
	describe('canMoveKing', () => {
		test('玉将が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 5, y: 5 },
				{ x: 5, y: 4 },
				{ x: 5, y: 3 },
				{ x: 4, y: 5 },
				{ x: 4, y: 3 },
				{ x: 3, y: 5 },
				{ x: 3, y: 4 },
				{ x: 3, y: 3 }
			].toSorted(compareCoordinates)

			expect(
				canMoveKing(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})
