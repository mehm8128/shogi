'use client'

import Board from '@/features/board/components/Board'
import {
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom
} from '@/features/board/state'
import Piece from '@/features/piece/components/Piece'
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
					<Box>
						{piecesBlackHaving.map(piece => (
							<Piece piece={piece} />
						))}
					</Box>
				</Box>
				<Box>
					後手:
					<Box>
						{piecesWhiteHaving.map(piece => (
							<Piece piece={piece} />
						))}
					</Box>
				</Box>
			</Box>
		</main>
	)
}
