import React from "react";
import { type Column as ColumnType } from "./types";
import { v4 as uuidv4 } from "uuid";
import Column from "./column";

function randomId() {
	return uuidv4().slice(0, 4);
}

export default function Board() {
	const todoColumnId = randomId();
	const inProgressColumnId = randomId();
	const boardId = randomId();

	const columns: ColumnType[] = [
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
	];

	const [isHovering, setIsHovering] = React.useState<boolean>(false);

	return (
		<div className="flex  flex-col gap-8 md:py-32 px-8 py-12">
			<h1 className="text-3xl font-semibold text-gray-200p">My board</h1>
			{/* Column map */}
			<div className="flex gap-3 overflow-x-auto">
				{/* Column */}
				{columns.map((column) => (
					<Column key={column.id} column={column} />
					// <Card key={card.id} card={card} />
				))}
			</div>
		</div>
	);
}
