import { Coordinate } from '@/features/piece/schema'

export const compareCoordinates = (a: Coordinate, b: Coordinate) =>
	Number(`${a.x}${a.y}`) - Number(`${b.x}${b.y}`)
