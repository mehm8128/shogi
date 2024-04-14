import { initBoard } from '@/features/game/const'
import {
	canMoveBishop,
	canMovePromotedBishop
} from '@/features/piece/pieces/bishop'
import { compareCoordinates } from '@/lib/testUtils'

describe('bishop', () => {
	describe('canMoveBishop', () => {
		test('角行が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 5, y: 5 },
				{ x: 3, y: 3 },
				{ x: 2, y: 2 },
				{ x: 5, y: 3 },
				{ x: 6, y: 2 },
				{ x: 3, y: 5 }
			].toSorted(compareCoordinates)

			expect(
				canMoveBishop(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
		test('角行が動けるマスを返す(後手)', () => {
			const current = { x: 4, y: 4 }
			const own = 'white'
			const expected = [
				{ x: 5, y: 5 },
				{ x: 3, y: 3 },
				{ x: 2, y: 6 },
				{ x: 5, y: 3 },
				{ x: 6, y: 6 },
				{ x: 3, y: 5 }
			].toSorted(compareCoordinates)

			expect(
				canMoveBishop(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
	describe('canMovePromotedBishop', () => {
		test('竜馬が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [
				{ x: 5, y: 5 },
				{ x: 3, y: 3 },
				{ x: 2, y: 2 },
				{ x: 5, y: 3 },
				{ x: 6, y: 2 },
				{ x: 3, y: 5 },
				{ x: 3, y: 4 },
				{ x: 4, y: 3 },
				{ x: 4, y: 5 },
				{ x: 5, y: 4 }
			].toSorted(compareCoordinates)

			expect(
				canMovePromotedBishop(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
		test('竜馬が動けるマスを返す(後手)', () => {
			const current = { x: 4, y: 4 }
			const own = 'white'
			const expected = [
				{ x: 5, y: 5 },
				{ x: 3, y: 3 },
				{ x: 2, y: 6 },
				{ x: 5, y: 3 },
				{ x: 6, y: 6 },
				{ x: 3, y: 5 },
				{ x: 3, y: 4 },
				{ x: 4, y: 3 },
				{ x: 4, y: 5 },
				{ x: 5, y: 4 }
			].toSorted(compareCoordinates)

			expect(
				canMovePromotedBishop(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
})

