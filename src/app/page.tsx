'use client'

import Board from '@/features/board/components/Board'
import {
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom
} from '@/features/board/state'
import HavingPieces from '@/features/player/components/HavingPieces'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Flex } from '@kuma-ui/core'
import { useAtomValue } from 'jotai'

export default function Page() {
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const piecesBlackHaving = useAtomValue(piecesBlackHavingAtom)
	const piecesWhiteHaving = useAtomValue(piecesWhiteHavingAtom)

	return (
		<Box as="main">
			<Box>現在の手番: {currentPlayer}</Box>
			<Flex justifyContent="center">
				<Box>
					後手
					<HavingPieces havingPieces={piecesWhiteHaving} playerType="white" />
				</Box>
				<Board />
				<Flex alignItems="end">
					先手
					<HavingPieces havingPieces={piecesBlackHaving} playerType="black" />
				</Flex>
			</Flex>
		</Box>
	)
}
