import { type BoxProps } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Draggable(boxes: BoxProps) {
	const { box } = boxes;

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
		isOver,
	} = useSortable({
		id: box.id,
		data: {
			type: "Box",
			item: box,
		},

		animateLayoutChanges: () => true,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: isDragging ? "none" : transition,
		opacity: isDragging ? 0.5 : 1,
		scale: isDragging ? 1.05 : 1,
		zIndex: isDragging ? 1000 : "auto",
	};

	if (isOver) {
		return (
			<div className="bg-cyan-400/50 w-full h-full rounded-lg font-semibold flex justify-center items-center">
				isOver
			</div>
		);
	}

	if (isDragging) {
		return (
			<div className="bg-pink-400/50 w-full h-full rounded-lg font-semibold flex justify-center items-center">
				isDragging
			</div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`cursor-grab active:cursor-grabbing w-50 h-50 bg-cyan-900 p-3 gap-3 flex flex-col justify-center items-center  rounded-xl ${
				isDragging ? "bg-green-500" : "bg-sky-500"
			}`}
		>
			<span className="font-semibold text-3xl">{box.number}</span>
			<p>{box.id}</p>
		</div>
	);
}
