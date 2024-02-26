import { initBoard } from '@/features/game/const'
import {
	filterByCollision,
	isInsideOfBoard,
	isInsideOfBoardAndNotOwnPiece
} from '@/features/piece/validate'

describe('validate', () => {
	describe('isInsideOfBoard', () => {
		test('x, yが0以上8以下の場合はtrueを返す', () => {
			const coordinate1 = { x: 0, y: 0 }
			const coordinate2 = { x: 4, y: 4 }
			const coordinate3 = { x: 8, y: 8 }

			expect(isInsideOfBoard(coordinate1)).toBe(true)
			expect(isInsideOfBoard(coordinate2)).toBe(true)
			expect(isInsideOfBoard(coordinate3)).toBe(true)
		})
		test('x,yが0未満または8より大きい場合はfalseを返す', () => {
			const coordinate1 = { x: -1, y: 0 }
			const coordinate2 = { x: 0, y: -1 }
			const coordinate3 = { x: 8, y: 9 }
			const coordinate4 = { x: 9, y: 8 }

			expect(isInsideOfBoard(coordinate1)).toBe(false)
			expect(isInsideOfBoard(coordinate2)).toBe(false)
			expect(isInsideOfBoard(coordinate3)).toBe(false)
			expect(isInsideOfBoard(coordinate4)).toBe(false)
		})
	})
	describe('isInsideOfBoardAndNotOwnPiece', () => {
		test('盤内にあり、自分の駒がないマスだけ抽出する', () => {
			const canMoveTo = [
				{ x: 7, y: 4 },
				{ x: 8, y: 4 },
				{ x: 9, y: 4 },
				{ x: 6, y: 5 },
				{ x: 6, y: 6 },
				{ x: 6, y: 7 },
				{ x: 6, y: 1 },
				{ x: 6, y: 2 },
				{ x: 6, y: 3 }
			]
			const expected = [
				{ x: 7, y: 4 },
				{ x: 8, y: 4 },
				{ x: 6, y: 5 },
				{ x: 6, y: 7 },
				{ x: 6, y: 1 },
				{ x: 6, y: 2 },
				{ x: 6, y: 3 }
			]

			expect(
				isInsideOfBoardAndNotOwnPiece(canMoveTo, 'black', { board: initBoard })
			).toEqual(expected)
		})
	})
	describe('filterByCollision', () => {
		test('駒の利きが相手の駒まで、もしくは自分の駒の1つ手前までで止まるように抽出する', () => {
			const canMoveTo = [
				{ x: 7, y: 3 },
				{ x: 7, y: 2 },
				{ x: 7, y: 1 },
				{ x: 7, y: 0 }
			]
			const expected = [
				{ x: 7, y: 3 },
				{ x: 7, y: 2 }
			]

			expect(
				filterByCollision(canMoveTo, 'black', {
					board: initBoard
				})
			).toEqual(expected)
		})
	})
})
