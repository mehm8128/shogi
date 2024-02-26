import { Player, PlayerType } from '@/features/player/schema'
import { atom } from 'jotai'

export const blackPlayerAtom = atom<Player>({ type: 'black', piecesInHand: [] })
export const whitePlayerAtom = atom<Player>({ type: 'white', piecesInHand: [] })

export const currentPlayerAtom = atom<PlayerType>('black')
export const changeCurrentPlayerAtom = atom(null, (get, set) => {
	const currentPlayer = get(currentPlayerAtom)
	set(currentPlayerAtom, currentPlayer === 'black' ? 'white' : 'black')
})

export const curerntPlayerDetailAtom = atom(get => {
	const currentPlayer = get(currentPlayerAtom)
	return currentPlayer === 'black' ? get(blackPlayerAtom) : get(whitePlayerAtom)
})
