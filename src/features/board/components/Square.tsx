import {
	canBeMovedCoordinatesAtom,
	piecesBlackHavingAtom,
	piecesWhiteHavingAtom,
	releaseHavingPieceAtom,
	selectedHavingPieceAtom,
	selectedPieceAtom,
	setBoardAtom
} from '@/features/board/state'
import PieceComp from '@/features/piece/components/Piece'
import { Coordinate, Piece } from '@/features/piece/schema'
import {
	changeCurrentPlayerAtom,
	currentPlayerAtom
} from '@/features/player/state'
import { Button, VStack, css } from '@kuma-ui/core'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

export default function Square({
	piece,
	coordinate
}: { piece: Piece; coordinate: Coordinate }) {
	const [selectedPiece, setSelectedPiece] = useAtom(selectedPieceAtom)
	const [selectedHavingPiece, setSelectedHavingPiece] = useAtom(
		selectedHavingPieceAtom
	)
	const _canBeMoved = useAtomValue(canBeMovedCoordinatesAtom)
	const setBoard = useSetAtom(setBoardAtom)
	const currentPlayer = useAtomValue(currentPlayerAtom)
	const changeCurrentPlayer = useSetAtom(changeCurrentPlayerAtom)
	const releaseHavingPiece = useSetAtom(releaseHavingPieceAtom)
	const [piecesBlackHaving, setPiecesBlackHaving] = useAtom(
		piecesBlackHavingAtom
	)
	const [piecesWhiteHaving, setPiecesWhiteHaving] = useAtom(
		piecesWhiteHavingAtom
	)

	const selected =
		selectedPiece?.coordinate.x === coordinate.x &&
		selectedPiece?.coordinate.y === coordinate.y
	const canBeMoved = _canBeMoved.some(
		c => c.x === coordinate.x && c.y === coordinate.y
	)
	const canBeReleased = selectedHavingPiece !== null && piece.type === null

	const canBeClicked =
		piece.own === currentPlayer || // 動かせる駒
		(selectedPiece !== null && (canBeMoved || selected)) || // 動かす駒を選択していて、移動可能なマスか選択中の駒のマス
		(selectedHavingPiece !== null && canBeReleased) // 持ち駒を選択していて、置かれることができるマス

	const handleClick = () => {
		if (selected) {
			// 駒の選択を解除
			setSelectedPiece(null)
			return
		}
		if (canBeMoved) {
			// 駒を移動
			setBoard(coordinate)
			setSelectedPiece(null)
			changeCurrentPlayer()
			return
		}
		if (canBeReleased) {
			// 持ち駒を置く
			releaseHavingPiece(coordinate)
			setSelectedHavingPiece(null)

			if (currentPlayer === 'black') {
				setPiecesBlackHaving(
					piecesBlackHaving.filter(p => p.id !== selectedHavingPiece.id)
				)
			} else {
				setPiecesWhiteHaving(
					piecesWhiteHaving.filter(p => p.id !== selectedHavingPiece.id)
				)
			}
			changeCurrentPlayer()
			return
		}

		if (piece.own !== currentPlayer) {
			return
		}
		// 駒を選択
		setSelectedPiece({ ...piece, coordinate: coordinate })
		setSelectedHavingPiece(null)
	}

	return (
		<VStack
			border="1px solid black"
			width={80}
			height={80}
			justifyContent="center"
			alignItems="center"
			className={
				selected
					? css`background-color: yellow;`
					: canBeReleased
					  ? css`background-color: gray;`
					  : canBeMoved
						  ? css`background-color: blue;`
						  : css`background-color: transparent;`
			}
		>
			{piece.own !== null && (
				<Button
					backgroundColor="transparent"
					display="flex"
					justifyContent="center"
					alignItems="center"
					border="none"
					w="100%"
					h="100%"
					className={
						canBeClicked ? css`cursor: pointer;` : css`cursor: default;`
					}
					onClick={handleClick}
				>
					<PieceComp piece={piece} />
					{coordinate.x},{coordinate.y}
				</Button>
			)}
		</VStack>
	)
}
