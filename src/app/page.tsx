'use client'

import Board from '@/features/board/components/Board'
import {
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom
} from '@/features/board/state'
import HavingPieces from '@/features/player/components/HavingPieces'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Button, css } from '@kuma-ui/core'
import { useAtomValue } from 'jotai'

export default function Page() {
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const piecesBlackHaving = useAtomValue(piecesBlackHavingAtom)
	const piecesWhiteHaving = useAtomValue(piecesWhiteHavingAtom)

	return (
		<main>
			<Button className={css`cursor: default;`}>{currentPlayer}</Button>
			<Board />
			<Box>
				<Box>
					先手:
					<HavingPieces havingPieces={piecesBlackHaving} playerType="black" />
				</Box>
				<Box>
					後手:
					<HavingPieces havingPieces={piecesWhiteHaving} playerType="white" />
				</Box>
			</Box>
		</main>
	)
}
