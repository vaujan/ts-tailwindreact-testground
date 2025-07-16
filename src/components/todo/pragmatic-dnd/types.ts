export interface Card {
	id: string;
	columnId: Column["id"];
	description: string;
}

export interface Column {
	id: string;
	boardId: Board["id"];
	cards: Card[];
	title: string;
}

export interface Board {
	id: string;
	columns: Column[];
	title: string;
}
