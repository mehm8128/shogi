'use client'

import Board from '@/features/board/components/Board'
import {
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom
} from '@/features/board/state'
import { useHistoryToKif } from '@/features/game/kif'
import HavingPieces from '@/features/player/components/HavingPieces'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Flex, VStack } from '@kuma-ui/core'
import { useAtomValue } from 'jotai'

export default function Page() {
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const piecesBlackHaving = useAtomValue(piecesBlackHavingAtom)
	const piecesWhiteHaving = useAtomValue(piecesWhiteHavingAtom)
	const { getKif } = useHistoryToKif()

	return (
		<Flex as="main" gap={100} padding={12}>
			<Box>
				<Box>現在の手番: {currentPlayer}</Box>
				<Box>
					<VStack as="label">
						kif
						<Box
							as="textarea"
							value={getKif()}
							rows={20}
							readOnly
							width={300}
							padding={4}
						/>
					</VStack>
				</Box>
			</Box>
			<Flex justifyContent="center">
				<Box>
					後手
					<HavingPieces havingPieces={piecesWhiteHaving} playerType="white" />
				</Box>
				<Board />
				<Flex alignItems="flex-end">
					先手
					<HavingPieces havingPieces={piecesBlackHaving} playerType="black" />
				</Flex>
			</Flex>
		</Flex>
	)
}
