import React from "react";
import {
	DndContext,
	PointerSensor,
	useSensors,
	useSensor,
	type DragEndEvent,
	type DragStartEvent,
	DragOverlay,
} from "@dnd-kit/core";
import type { Box } from "../types";
import Draggable from "./draggable";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

export default function TestingDnd() {
	const [boxes, setBoxes] = React.useState<Box[]>([]);
	const [activeBox, setActiveBox] = React.useState<Box | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3, //Dragging start after 3px
			},
		})
	);

	const handleAddBox = () => {
		const newBox = {
			number: boxes.length + 1,
			id: crypto.randomUUID(),
		};

		return setBoxes([...boxes, newBox]);
	};

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const draggingItem = boxes.find((box) => box.id === active.id);

		setActiveBox(draggingItem || null);

		console.log("start dragging ...");
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active } = event;

		setActiveBox(null);

		if (!over) return;
		if (active.id === over.id) return;

		setBoxes((boxes) => {
			const activeIndex = boxes.findIndex((box) => box.id === active.id);
			const overIndex = boxes.findIndex((box) => box.id === over.id);

			return arrayMove(boxes, activeIndex, overIndex);
		});

		console.log("end dragging...");
	};

	const itemsIds = React.useMemo(() => boxes.map((box) => box.id), [boxes]);

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-10">Testing dnd</h1>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="grid grid-cols-4 gap-4 justify-center items-center bg-cyan-950/50 border border-cyan-500/50 w-full max-w-4xl p-3 rounded-2xl">
					<SortableContext items={itemsIds}>
						{boxes.length === 0 && (
							<div className="flex justify-center items-center font-semibold text-2xl w-full h-30 text-center">
								<span className="text-center w-full">Add you first box</span>
							</div>
						)}

						{boxes.map((box) => (
							<Draggable box={box} key={box.id} />
						))}
					</SortableContext>
				</div>

				<DragOverlay>{activeBox && <Draggable box={activeBox} />}</DragOverlay>
			</DndContext>
			<button className="mt-3 w-full h-30 text-xl" onClick={handleAddBox}>
				add box
			</button>
		</div>
	);
}
