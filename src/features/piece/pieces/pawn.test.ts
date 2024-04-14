import { initBoard } from '@/features/game/const'
import {
	canMoveNotPromotedPawn,
	willBeTwoPawns
} from '@/features/piece/pieces/pawn'
import { Piece } from '@/features/piece/schema'
import { compareCoordinates } from '@/lib/testUtils'

describe('pawn', () => {
	describe('canMovePawn', () => {
		test('歩兵が動けるマスを返す', () => {
			const current = { x: 4, y: 4 }
			const own = 'black'
			const expected = [{ x: 4, y: 3 }].toSorted(compareCoordinates)

			expect(
				canMoveNotPromotedPawn(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
		test('歩兵が動けるマスを返す(後手)', () => {
			const current = { x: 4, y: 4 }
			const own = 'white'
			const expected = [{ x: 4, y: 5 }].toSorted(compareCoordinates)

			expect(
				canMoveNotPromotedPawn(current, own, { board: initBoard }).toSorted(
					compareCoordinates
				)
			).toEqual(expected)
		})
	})
	describe('willBeTwoPawns', () => {
		test('歩を打ちたい列に既に自分の歩があるときに、二歩になる', () => {
			const existPawn: Piece = {
				id: 'test',
				type: 'pawn',
				own: 'black',
				promoted: false
			}
			const nullSquare: Piece = {
				id: 'test',
				type: null,
				own: null,
				promoted: false
			}
			const board = initBoard.map((pieces, index) =>
				index === 7 ? pieces.with(4, existPawn) : pieces.with(4, nullSquare)
			)
			const coordinate = { x: 4, y: 4 }
			const playerType = 'black'

			expect(willBeTwoPawns({ board: board }, coordinate, playerType)).toBe(
				true
			)
		})
		test('歩を打ちたい列にまだ歩がないときに、二歩にならない', () => {
			const nullSquare: Piece = {
				id: 'test',
				type: null,
				own: null,
				promoted: false
			}
			const board = initBoard.map(pieces => pieces.with(4, nullSquare))
			const coordinate = { x: 4, y: 4 }
			const playerType = 'black'

			expect(willBeTwoPawns({ board: board }, coordinate, playerType)).toBe(
				false
			)
		})
		test('歩を打ちたい列に既に相手の歩だけがあるときに、二歩にならない', () => {
			const existPawn: Piece = {
				id: 'test',
				type: 'pawn',
				own: 'white',
				promoted: false
			}
			const nullSquare: Piece = {
				id: 'test',
				type: null,
				own: null,
				promoted: false
			}
			const board = initBoard.map((pieces, index) =>
				index === 7 ? pieces.with(4, existPawn) : pieces.with(4, nullSquare)
			)
			const coordinate = { x: 4, y: 4 }
			const playerType = 'black'

			expect(willBeTwoPawns({ board: board }, coordinate, playerType)).toBe(
				false
			)
		})
	})
})
