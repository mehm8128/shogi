import { initBoard } from '@/features/game/const'
import {
	canPromote,
	filterByCollision,
	isInsideOfBoard,
	isInsideOfBoardAndNotOwnPiece,
	mustPromote
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
	describe('canPromote', () => {
		test('金のときに成れない', () => {
			const type = 'gold'
			const own = 'black'
			const before = {
				x: 4,
				y: 3
			}
			const after = {
				x: 4,
				y: 2
			}

			expect(canPromote(type, before, after, own)).toBe(false)
		})
		test('先手の歩兵が4,2に動くときに成れる', () => {
			const type = 'pawn'
			const own = 'black'
			const before = {
				x: 4,
				y: 2
			}
			const after = {
				x: 4,
				y: 3
			}

			expect(canPromote(type, before, after, own)).toBe(true)
		})
		test('先手の歩兵が8,3に動くときには成れない', () => {
			const type = 'pawn'
			const own = 'black'
			const before = {
				x: 8,
				y: 4
			}
			const after = {
				x: 8,
				y: 3
			}

			expect(canPromote(type, before, after, own)).toBe(false)
		})
		test('後手の歩兵が4,6に動くときに成れる', () => {
			const type = 'pawn'
			const own = 'white'
			const before = {
				x: 4,
				y: 5
			}
			const after = {
				x: 4,
				y: 6
			}

			expect(canPromote(type, before, after, own)).toBe(true)
		})
		test('後手の歩兵が1,5に動くときには成れない', () => {
			const type = 'pawn'
			const own = 'white'
			const before = {
				x: 1,
				y: 4
			}
			const after = {
				x: 1,
				y: 5
			}

			expect(canPromote(type, before, after, own)).toBe(false)
		})
		test('先手の銀将が4,2にいるときは4,3に動いても成れる', () => {
			const type = 'silver'
			const own = 'black'
			const before = {
				x: 4,
				y: 2
			}
			const after = {
				x: 4,
				y: 3
			}

			expect(canPromote(type, before, after, own)).toBe(true)
		})
	})
	describe('mustPromote', () => {
		test('先手の桂馬が2段目に移動するときに成らなければならない', () => {
			const type = 'knight'
			const own = 'black'
			const coordinate = {
				x: 4,
				y: 1
			}

			expect(mustPromote(type, coordinate, own)).toBe(true)
		})
		test('後手の歩兵が9段目に移動するときに成らなければならない', () => {
			const type = 'pawn'
			const own = 'white'
			const coordinate = {
				x: 8,
				y: 8
			}

			expect(mustPromote(type, coordinate, own)).toBe(true)
		})
		test('先手の金将が1段目に移動するときには成らなくてもよい', () => {
			const type = 'gold'
			const own = 'black'
			const coordinate = {
				x: 2,
				y: 0
			}

			expect(mustPromote(type, coordinate, own)).toBe(false)
		})
	})
})
