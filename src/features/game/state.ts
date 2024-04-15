import { History } from '@/features/game/schema'
import { atom } from 'jotai'
import { initBoard } from './const'
import { Game } from './schema'

export const gameAtom = atom<Game>({
	boards: [
		{
			board: initBoard
		}
	]
})
export const currentGameIndexAtom = atom(0)

export const historiesAtom = atom<History[]>([])
