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
	} = useSortable({
		id: box.id,
		data: {
			type: "Box",
			item: box,
		},
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	if (isDragging)
		return (
			<div className="w-50 h-50 bg-cyan-950 opacity-10 border-cyan-500 border-2 border-dashed p-3 gap-3 flex flex-col justify-center items-center  rounded-xl">
				Drop it like its hot!
			</div>
		);

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="cursor-grab active:cursor-grabbing w-50 h-50 bg-cyan-900 p-3 gap-3 flex flex-col justify-center items-center  rounded-xl"
		>
			<span className="font-semibold text-3xl">{box.number}</span>
			<p>{box.id}</p>
		</div>
	);
}
