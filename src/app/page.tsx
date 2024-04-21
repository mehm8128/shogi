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
import { playerTypeToJpMapping } from '@/features/player/const'
import { PlayerType } from '@/features/player/schema'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Button, Flex, VStack, css } from '@kuma-ui/core'
import { useAtom, useAtomValue } from 'jotai'

export default function Page() {
	const finished = useAtomValue(finishedAtom)
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const histories = useAtomValue(historiesAtom)
	const [bocchiMode, setBocchiMode] = useAtom(bocchiModeAtom)

	const isBoardInverted = bocchiMode && currentPlayer === 'white'

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
				<Player playerType={isBoardInverted ? 'black' : 'white'} />
				<Board />
				<Player playerType={isBoardInverted ? 'white' : 'black'} bottom />
			</Flex>
		</Flex>
	)
}

function Player({
	playerType,
	bottom = false
}: { playerType: PlayerType; bottom?: boolean }) {
	const [finished, setFinished] = useAtom(finishedAtom)
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const piecesBlackHaving = useAtomValue(piecesBlackHavingAtom)
	const piecesWhiteHaving = useAtomValue(piecesWhiteHavingAtom)

	const havingPieces =
		playerType === 'black' ? piecesBlackHaving : piecesWhiteHaving

	const handleSurrender = () => {
		alert(`${playerTypeToJpMapping[currentPlayer]}の勝ちです`)
		setFinished(true)
	}

	return (
		<Flex
			className={
				bottom ? css`align-items: flex-end;` : css`align-items: flex-start;`
			}
		>
			{playerTypeToJpMapping[playerType]}
			<Button
				onClick={handleSurrender}
				disabled={finished || currentPlayer === playerType}
			>
				投了
			</Button>
			<HavingPieces havingPieces={havingPieces} playerType={playerType} />
		</Flex>
	)
}
