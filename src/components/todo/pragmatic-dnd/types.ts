export interface Card {
	id: string;
	columnId: Column["id"];
	description: string;
}

export interface CardProps {
	card: Card;
	onCardInsert: (
		cardId: string,
		targetCardId: string,
		position: "above" | "below"
	) => void;
}

export interface Column {
	id: string;
	boardId: Board["id"];
	cards: Card[];
	title: string;
}

export interface ColumnProps {
	column: Column;
	onCardMove: (
		cardId: string,
		fromColumnId: string,
		toColumnId: string
	) => void;
	onCardInsert: (
		cardId: string,
		targetCardId: string,
		position: "above" | "below"
	) => void;
}

export interface Board {
	id: string;
	columns: Column[];
	title: string;
}

export type DragData = {
	type: "card";
	id: string;
	columnId: string;
	description: string;
};
