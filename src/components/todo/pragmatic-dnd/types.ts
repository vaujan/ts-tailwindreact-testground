export interface Card {
	id: string;
	description: string;
}

export interface Column {
	id: string;
	cards: Card[];
	title: string;
}

export interface Board {
	id: string;
	columns: Column[];
	title: string;
}
