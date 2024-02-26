import { currentGameIndexAtom, gameAtom } from '@/features/game/state'
import { atom } from 'jotai'

export const currentBoardAtom = atom(get => {
	const game = get(gameAtom)
	const index = get(currentGameIndexAtom)
	return game.boards[index]
})
