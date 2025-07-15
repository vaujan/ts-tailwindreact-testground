import React from "react";
import { type Card } from "./types";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export default function Card({ card }: { card: Card }) {
	const { description, id } = card;
	const [isDragging, setIsDragging] = React.useState<boolean>(false);
	const [preview, setPreview] = React.useState<HTMLElement | null>(null);
	const ref = React.useRef(null);

	React.useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const cleanup = draggable({
			element,
			onDragStart() {
				console.log("drag start");
				setIsDragging(true);
			},
			onDrop() {
				console.log("drag stop");
				setIsDragging(false);
				setPreview(null);
			},
			onGenerateDragPreview({ nativeSetDragImage }) {
				setCustomNativeDragPreview(nativeSetDragImage, render({ container }) { 
					setPreview(container)
				});
			},
		});

		return cleanup;
	}, []);

	return (
		<div
			ref={ref}
			className={`${
				isDragging ? "opacity-50" : ""
			} bg-white/10 flex flex-col gap-2 rounded-md p-3`}
		>
			<span className="text-sm  rounded-md p-1 bg-orange-900 border border-orange-800 text-orange-200 w-fit">
				{id}
			</span>
			<span>{description}</span>
		</div>
	);
}
