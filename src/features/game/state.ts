import { Game } from '@/features/game/schema'
import { atom } from 'jotai'

export const gameAtom = atom<Game>({ boards: [] })
