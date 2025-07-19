import React from "react";
import {
	type ColumnProps,
	type Column as ColumnType,
	type Card as CardType,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import Column from "./column";

const randomId = () => {
	return uuidv4().slice(0, 4);
};

export default function Board() {
	const boardId = React.useRef(randomId()).current;
	const todoColumnId = React.useRef(randomId()).current;
	const inProgressColumnId = React.useRef(randomId()).current;

	const [columns, setColumns] = React.useState<ColumnType[]>([
		{
			id: todoColumnId,
			boardId,
			title: "todo",
			cards: [
				{
					id: randomId(),
					columnId: todoColumnId,
					description: "testing",
				},
				{
					id: randomId(),
					columnId: todoColumnId,
					description: "hello world!",
				},
			],
		},

		{
			id: inProgressColumnId,
			boardId,
			title: "in progress",
			cards: [
				{
					id: randomId(),
					columnId: inProgressColumnId,
					description: "termangu mangu",
				},
				{
					id: randomId(),
					columnId: inProgressColumnId,
					description: "nonton film",
				},
			],
		},
	]);

	const handleCardMove = React.useCallback(
		(cardId: string, fromColumnId: string, toColumnId: string) => {
			setColumns((prevColumns) => {
				const newColumns = [...prevColumns];

				// Find source and target columns
				const fromColumnIndex = newColumns.findIndex(
					(col) => col.id === fromColumnId
				);
				const toColumnIndex = newColumns.findIndex(
					(col) => col.id === toColumnId
				);

				if (fromColumnIndex === -1 || toColumnIndex === -1) return prevColumns;

				// Find the card to move
				const cardIndex = newColumns[fromColumnIndex].cards.findIndex(
					(card) => card.id === cardId
				);
				if (cardIndex === -1) return prevColumns;

				// Remove card from source column
				const [movedCard] = newColumns[fromColumnIndex].cards.splice(
					cardIndex,
					1
				);

				// Update card's columnId
				movedCard.columnId = toColumnId;

				// Add card to target column
				newColumns[toColumnIndex].cards.push(movedCard);

				return newColumns;
			});
		},
		[]
	);

	// TODO: Complete implementation
	const handleCardInsert = React.useCallback(
		(cardId: string, targetCardId: string, position: "above" | "below") => {
			setColumns((prevColumns) => {
				//create new array for immutability
				const newColumns = [...prevColumns];

				// index -1 meaning not found
				// Step 1: find the sources: card, columnindex and cardindex
				let sourceCard: CardType | null = null;
				let sourceColumnIndex = -1;
				let sourceCardIndex = -1;

				for (let i = 0; i < newColumns.length; i++) {
					// for every card in the columns, find the card index by checking if
					// the column[i].cards.(card.id) is the same with the param cardId
					const cardIndex = newColumns[i].cards.findIndex(
						(card) => card.id === cardId
					);

					// if the cardIndex is other than -1 (meaning we found them)
					// then assign the value as the source card
					if (cardIndex !== -1) {
						sourceCard = newColumns[i].cards[cardIndex];
						sourceColumnIndex = i;
						sourceCardIndex = cardIndex;
						break;
					}
				}

				if (!sourceCard || sourceColumnIndex === -1) return prevColumns;

				// step 2: find the target
				let targetColumnIndex = -1;
				let targetCardIndex = -1;

				for (let i = 0; i < newColumns.length; i++) {
					const cardIndex = newColumns[i].cards.findIndex(
						(card) => card.id === targetCardId
					);

					if (cardIndex !== -1) {
						targetColumnIndex = i;
						targetCardIndex = cardIndex;
						break;
					}
				}

				if (targetColumnIndex === -1) return prevColumns;

				//in the source column, remove 1 item from cards[sourceIndex]
				newColumns[sourceColumnIndex].cards.splice(sourceCardIndex, 1);
			});
		},
		[]
	);
	return (
		<div className="flex  flex-col gap-8 md:py-32 px-8 py-12">
			<h1 className="text-3xl font-semibold text-gray-200p">My board</h1>
			{/* Column map */}
			<div className="flex gap-3 overflow-x-auto">
				{/* Column */}
				{columns.map((column) => (
					<Column
						onCardInsert={handleCardInsert}
						onCardMove={handleCardMove}
						key={column.id}
						column={column}
					/>
					// <Card key={card.id} card={card} />
				))}
			</div>
		</div>
	);
}
