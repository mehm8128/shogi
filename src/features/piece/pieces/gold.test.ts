import { initBoard } from '@/features/game/const'
import { canMoveGold } from '@/features/piece/pieces/gold'
import { compareCoordinates } from '@/lib/testUtils'

describe('gold', () => {
	describe('canMoveGold', () => {
		test('金将の動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 5, y: 4 },
				{ x: 5, y: 3 },
				{ x: 4, y: 5 },
				{ x: 4, y: 3 },
				{ x: 3, y: 4 },
				{ x: 3, y: 3 }
			].toSorted(compareCoordinates)

			expect(
				canMoveGold(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})
