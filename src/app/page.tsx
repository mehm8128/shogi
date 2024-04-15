'use client'

import Board from '@/features/board/components/Board'
import {
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom
} from '@/features/board/state'
import { getKif } from '@/features/game/kif'
import {
	bocchiModeAtom,
	finishedAtom,
	historiesAtom
} from '@/features/game/state'
import HavingPieces from '@/features/player/components/HavingPieces'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Button, Flex, VStack } from '@kuma-ui/core'
import { useAtom, useAtomValue } from 'jotai'

export default function Page() {
	const [finished, setFinished] = useAtom(finishedAtom)
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const piecesBlackHaving = useAtomValue(piecesBlackHavingAtom)
	const piecesWhiteHaving = useAtomValue(piecesWhiteHavingAtom)
	const histories = useAtomValue(historiesAtom)
	const [bocchiMode, setBocchiMode] = useAtom(bocchiModeAtom)

	const handleSurrender = () => {
		if (currentPlayer === 'black') {
			alert('後手の勝ちです')
		} else {
			alert('先手の勝ちです')
		}
		setFinished(true)
	}

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
							value={getKif(histories, finished)}
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
					<Button
						onClick={handleSurrender}
						disabled={finished || currentPlayer === 'black'}
					>
						投了
					</Button>
					<HavingPieces havingPieces={piecesWhiteHaving} playerType="white" />
				</Box>
				<Board />
				<Flex alignItems="flex-end">
					先手
					<Button
						onClick={handleSurrender}
						disabled={finished || currentPlayer === 'white'}
					>
						投了
					</Button>
					<HavingPieces havingPieces={piecesBlackHaving} playerType="black" />
				</Flex>
			</Flex>
		</Flex>
	)
}
