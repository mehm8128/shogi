import { Player } from '@/features/player/schema'
import { atom } from 'jotai'

export const blackPlayerAtom = atom<Player>({ type: 'black', piecesInHand: [] })
export const whitePlayerAtom = atom<Player>({ type: 'white', piecesInHand: [] })
