import React from "react";
import { v4 as uuidv4 } from "uuid";

interface Item {
	number: number;
	id: string;
}

// interface Items {
// 	items: Item[];
// }

export default function PragmaticDnd() {
	const [items, setItems] = React.useState<Item[]>([]);

	React.useEffect(() => {
		console.log("current items:", items);
	}, [items]);

	const testAddItem = () => {
		const newItem: Item = {
			number: items.length + 1,
			id: uuidv4(),
		};

		setItems([...items, newItem]);
	};

	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-3xl font-semibold">PragmaticDnd</h1>
			<div className="flex justify-center items-center w-full h-full rounded-lg border-2 border-dashed opacity-50 min-h-30 min-w-30">
				{items.length === 0 ? "currently empty" : "there's something here!"}
			</div>
			<button onClick={testAddItem}>add task</button>
		</div>
	);
}
