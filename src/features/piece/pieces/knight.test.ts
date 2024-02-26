import { initBoard } from '@/features/game/const'
import { canMoveKnight } from '@/features/piece/pieces/knight'
import { compareCoordinates } from '@/lib/testUtils'

describe('knight', () => {
	describe('canMoveKnight', () => {
		test('桂馬が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 5, y: 2 },
				{ x: 3, y: 2 }
			].toSorted(compareCoordinates)

			expect(
				canMoveKnight(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})
