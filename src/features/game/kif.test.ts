import { getKif } from '@/features/game/kif'
import { History } from '@/features/game/schema'

describe('getKif', () => {
	test('historiesからkifに変換できる', () => {
		const histories: History[] = [
			{
				before: { x: 7, y: 6 },
				after: { x: 7, y: 5 },
				pieceType: '歩',
				decorator: ''
			},
			{
				before: { x: 7, y: 2 },
				after: { x: 7, y: 3 },
				pieceType: '歩',
				decorator: ''
			},
			{
				before: { x: 7, y: 5 },
				after: { x: 7, y: 4 },
				pieceType: '歩',
				decorator: ''
			},
			{
				before: { x: 7, y: 3 },
				after: { x: 7, y: 4 },
				pieceType: '歩',
				decorator: ''
			},
			{
				before: { x: 7, y: 7 },
				after: { x: 7, y: 4 },
				pieceType: '飛',
				decorator: ''
			},
			{
				before: null,
				after: { x: 7, y: 6 },
				pieceType: '歩',
				decorator: '打'
			},
			{
				before: { x: 7, y: 4 },
				after: { x: 7, y: 2 },
				pieceType: '飛',
				decorator: '成'
			}
		]

		const expected = `先手: 先手
後手: 後手

1 2六歩(27)
2 2四歩(23)
3 2五歩(26)
4 2五歩(24)
5 2五飛(28)
6 2七歩打
7 2三飛成(25)
`

		expect(getKif(histories, false)).toBe(expected)
	})
})
