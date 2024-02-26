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
