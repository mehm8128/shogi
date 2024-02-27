'use client'

import Board from '@/features/board/components/Board'
import {
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom,
	selectedHavingPieceAtom,
	selectedPieceAtom
} from '@/features/board/state'
import Piece from '@/features/piece/components/Piece'
import { Piece as PieceType } from '@/features/piece/schema'
import { currentPlayerAtom } from '@/features/player/state'
import { Box, Button, css } from '@kuma-ui/core'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export default function Page() {
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const piecesBlackHaving = useAtomValue(piecesBlackHavingAtom)
	const piecesWhiteHaving = useAtomValue(piecesWhiteHavingAtom)
	const [selectedhavingPiece, setSelectedHavingPiece] = useAtom(
		selectedHavingPieceAtom
	)
	const setSelectedPiece = useSetAtom(selectedPieceAtom)

	const handleClickHavingPiece = (piece: PieceType) => {
		setSelectedHavingPiece(piece)
		setSelectedPiece(null)
	}

	return (
		<main>
			<Button className={css`cursor: default;`}>{currentPlayer}</Button>
			<Board />
			<Box>
				<Box>
					先手:
					<Box>
						{/**TODO: idかなんかをkeyに入れる */}
						{piecesBlackHaving.map(piece => (
							<Button
								className={
									selectedhavingPiece === piece
										? css`background-color: yellow;`
										: css`background-color: transparent;`
								}
								display="flex"
								justifyContent="center"
								alignItems="center"
								border="none"
								onClick={() => handleClickHavingPiece(piece)}
								disabled={currentPlayer === 'white'}
								cursor={currentPlayer === 'white' ? 'not-allowed' : 'pointer'}
							>
								<Piece piece={piece} />
							</Button>
						))}
					</Box>
				</Box>
				<Box>
					後手:
					<Box>
						{/**TODO: idかなんかをkeyに入れる
						 * idで比較してスタイルをつける
						 */}
						{piecesWhiteHaving.map(piece => (
							<Button
								className={
									selectedhavingPiece === piece
										? css`background-color: yellow;`
										: css`background-color: transparent;`
								}
								display="flex"
								justifyContent="center"
								alignItems="center"
								border="none"
								onClick={() => handleClickHavingPiece(piece)}
								disabled={currentPlayer === 'black'}
								cursor={currentPlayer === 'black' ? 'not-allowed' : 'pointer'}
							>
								<Piece piece={piece} />
							</Button>
						))}
					</Box>
				</Box>
			</Box>
		</main>
	)
}
