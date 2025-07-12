import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
	draggable,
	dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import type { ListItemProps, Item } from "./types";

export default function PragmaticDnd() {
	const [items, setItems] = React.useState<Item[]>([]);

	const handleAddItem = () => {
		const newItem: Item = {
			id: uuidv4(),
			content: `Item index ${items.length}`,
		};

		console.log("adding new item:", newItem);
		setItems([...items, newItem]);
	};

	const handleDrop = (sourceIndex: number, targetIndex: number) => {
		// Jika posisi asal dan tujuan sama, tidak perlu melakukan apa-apa
		if (sourceIndex === targetIndex) return;

		console.log("Dropping....");
		console.log("sourceIndex:", sourceIndex);
		console.log("targetIndex:", targetIndex);

		// Buat copy array items untuk dimodifikasi
		const newItems = [...items];

		// Hapus item dari posisi asal dan simpan dalam movedItem
		// splice(sourceIndex, 1) menghapus 1 item dari sourceIndex
		// destructuring [movedItem] mengambil item yang dihapus
		const [movedItem] = newItems.splice(sourceIndex, 1);

		// Sisipkan movedItem ke posisi target
		// splice(targetIndex, 0, movedItem):
		// - targetIndex: posisi untuk menyisipkan
		// - 0: tidak menghapus item
		// - movedItem: item yang disisipkan
		newItems.splice(targetIndex, 0, movedItem);

		// Update state dengan array yang sudah dimodifikasi
		setItems(newItems);
	};

	// React.useEffect(() => {
	// 	const cleanup = monitorForElements({
	// 		onDragStart: ({ source }) => {
	// 			const el = document.querySelector(`[data-id="${source.data.id}"]`);
	// 			if (el) {
	// 				el.classList.add("border-2 border-dashed");
	// 				console.log("el exist", el);
	// 			}
	// 		},
	// 		onDrop: ({ source }) => {
	// 			const el = document.querySelector(`[data-id="${source.data.id}]"`);

	// 			if (el) {
	// 				el.classList.remove("border-2 border-dashed");
	// 				console.log("el exist", el);
	// 			}
	// 		},
	// 	});
	// 	return cleanup;
	// }, []);

	return (
		<div className="flex flex-col gap-3 justify-center items-center px-8 py-12 pb-16 w-full max-w-5xl rounded-lg bg-slate-900">
			<h1 className="text-3xl font-semibold">Hello world</h1>
			<div className="grid grid-cols-3 gap-5 min-h-32 min-w-32">
				{items.map((item, index) => (
					<ListItem
						key={item.id}
						index={index}
						item={item}
						onDrop={handleDrop}
					/>
				))}
			</div>
			<button onClick={handleAddItem} className="btn btn-primary">
				Add item
			</button>
		</div>
	);
}

const ListItem = ({ item, index, onDrop }: ListItemProps) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [isOver, setIsOver] = React.useState(false);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const cleanup = combine(
			draggable({
				element: el,
				getInitialData: () => ({ id: item.id, index }), //The draggable data
			}),
			dropTargetForElements({
				element: el,
				canDrop: ({ source }) => source.data.id !== item.id, //Prevent dropping to the same exact location; source.id !== target.id
				onDragEnter: () => setIsOver(true),
				onDragLeave: () => setIsOver(false),
				onDrop: ({ source }) => {
					setIsOver(false);

					const data = source.data as { id: string; index: number };

					onDrop(data.index, index);
				},
			})
		);

		return cleanup;
	}, [item.id, index, onDrop]);

	return (
		<div
			ref={ref}
			className={`flex ${
				isOver ? "bg-blue-500" : "bg-pink-500"
			} flex-col justify-center items-center transition-all ease-out p-3 text-center rounded-xl aspect-square`}
		>
			<span className="font-medium">{item.content}</span>
			<p className="text-xs text-white/50">{item.id}</p>
		</div>
	);
};
