export interface ListItemProps {
	item: Item;
	index: number;
	onDrop: (fromIndex: number, toIndex: number) => void;
}

export interface Item {
	id: string;
	content: string;
}

export interface DragData {
	id: string;
	index: number;
}
