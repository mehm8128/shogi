import { Coordinate } from '@/features/piece/schema'

export const compareCoordinates = (a: Coordinate, b: Coordinate) =>
	Number(`${a.x}${a.y}`) - Number(`${b.x}${b.y}`)

export const nullPiece = { id: '', type: null, own: null, promoted: false }
export const nullBoard = Array(9).fill(
	Array(9)
		.fill(nullPiece)
		.map(piece => ({ ...piece, id: 'test' }))
)

export const arrayWith = <T>(
	arr: T[][],
	a: number,
	b: number,
	val: NoInfer<T>
) => {
	return arr.with(a, arr[a].with(b, val))
}
