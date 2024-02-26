'use client'

import Board from '@/features/board/components/Board'
import { currentPlayerAtom } from '@/features/player/state'
import { Button, css } from '@kuma-ui/core'
import { useAtomValue } from 'jotai'

export default function Page() {
	const currentPlayer = useAtomValue(currentPlayerAtom)

	return (
		<main>
			<Button className={css`cursor: default;`}>{currentPlayer}</Button>
			<Board />
		</main>
	)
}
