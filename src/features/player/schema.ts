export type PlayerType = 'black' | 'white'

export interface Player {
	type: PlayerType
}

export const getOppositePlayerType = (playerType: PlayerType): PlayerType =>
	playerType === 'black' ? 'white' : 'black'
