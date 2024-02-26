import { initBoard } from '@/features/game/const'
import { canMoveRook } from '@/features/piece/pieces/rook'
import { compareCoordinates } from '@/lib/testUtils'

describe('rook', () => {
	describe('canMoveRook', () => {
		test('飛車が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 4, y: 2 },
				{ x: 4, y: 3 },
				{ x: 4, y: 5 },
				{ x: 0, y: 4 },
				{ x: 1, y: 4 },
				{ x: 2, y: 4 },
				{ x: 3, y: 4 },
				{ x: 5, y: 4 },
				{ x: 6, y: 4 },
				{ x: 7, y: 4 },
				{ x: 8, y: 4 }
			].toSorted(compareCoordinates)

			expect(
				canMoveRook(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
		test('飛車が動けるマスを返す(後手)', () => {
			const current = { x: 4, y: 4 }
			const own = 'white'
			const expected = [
				{ x: 4, y: 6 },
				{ x: 4, y: 3 },
				{ x: 4, y: 5 },
				{ x: 0, y: 4 },
				{ x: 1, y: 4 },
				{ x: 2, y: 4 },
				{ x: 3, y: 4 },
				{ x: 5, y: 4 },
				{ x: 6, y: 4 },
				{ x: 7, y: 4 },
				{ x: 8, y: 4 }
			].toSorted(compareCoordinates)

			expect(
				canMoveRook(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})
