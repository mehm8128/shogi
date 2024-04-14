import { initBoard } from '@/features/game/const'
import { canMoveNotPromotedLance } from '@/features/piece/pieces/lance'
import { compareCoordinates } from '@/lib/testUtils'

describe('lance', () => {
	describe('canMoveLance', () => {
		test('香車が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 4, y: 3 },
				{ x: 4, y: 2 }
			].toSorted(compareCoordinates)

			expect(
				canMoveNotPromotedLance(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
		test('香車が動けるマスを返す(後手)', () => {
			const current = { x: 4, y: 4 }
			const own = 'white'
			const expected = [
				{ x: 4, y: 5 },
				{ x: 4, y: 6 }
			].toSorted(compareCoordinates)

			expect(
				canMoveNotPromotedLance(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})
