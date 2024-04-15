'use client'

import Board from '@/features/board/components/Board'
import {
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom
} from '@/features/board/state'
import { getKif } from '@/features/game/kif'
import { bocchiModeAtom, historiesAtom } from '@/features/game/state'
import HavingPieces from '@/features/player/components/HavingPieces'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Button, Flex, VStack } from '@kuma-ui/core'
import { useAtom, useAtomValue } from 'jotai'

export default function Page() {
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const piecesBlackHaving = useAtomValue(piecesBlackHavingAtom)
	const piecesWhiteHaving = useAtomValue(piecesWhiteHavingAtom)
	const histories = useAtomValue(historiesAtom)
	const [bocchiMode, setBocchiMode] = useAtom(bocchiModeAtom)

	return (
		<Flex as="main" gap={100} padding={12}>
			<Box>
				<Box>現在の手番: {currentPlayer}</Box>
				<Button onClick={() => setBocchiMode(!bocchiMode)}>ぼっちモード</Button>
				<Box>ぼっちモード: {bocchiMode ? 'オン' : 'オフ'}</Box>
				<Box>
					<VStack as="label">
						kif
						<Box
							as="textarea"
							value={getKif(histories)}
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
