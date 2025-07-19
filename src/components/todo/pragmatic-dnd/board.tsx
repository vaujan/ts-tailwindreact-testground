import React from "react";
import { type Column as ColumnType } from "./types";
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

	// const handleCardMove2 = React.useCallback(({ fromCardId, toCardId }) => {
	// 	setColumns((prevColumns) => {
	// 		const newColumns = [...prevColumns];

	// 		const fromCardIndex = newColumns.findIndex((col) =>
	// 			col.cards.some((card) => card.id === fromCardId)
	// 		);

	// 		const toCardIndex = newColumns.findIndex((col) =>
	// 			col.cards.some((card) => card.id === toCardId)
	// 		);
	// 	});
	// }, []);

	return (
		<div className="flex  flex-col gap-8 md:py-32 px-8 py-12">
			<h1 className="text-3xl font-semibold text-gray-200p">My board</h1>
			{/* Column map */}
			<div className="flex gap-3 overflow-x-auto">
				{/* Column */}
				{columns.map((column) => (
					<Column onCardMove={handleCardMove} key={column.id} column={column} />
					// <Card key={card.id} card={card} />
				))}
			</div>
		</div>
	);
}
