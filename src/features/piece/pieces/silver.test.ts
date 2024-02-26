import { initBoard } from '@/features/game/const'
import { canMoveSilver } from '@/features/piece/pieces/silver'
import { compareCoordinates } from '@/lib/testUtils'

describe('silver', () => {
	describe('canMoveSilver', () => {
		test('銀将の動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 5, y: 5 },
				{ x: 5, y: 3 },
				{ x: 4, y: 3 },
				{ x: 3, y: 5 },
				{ x: 3, y: 3 }
			].toSorted(compareCoordinates)

			expect(
				canMoveSilver(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})
