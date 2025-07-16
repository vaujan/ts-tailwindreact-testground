import React from "react";
import { type Card as CardType } from "./types";
import {
	draggable,
	dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from "react-dom";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

export default function Card({ card }: { card: CardType }) {
	const { description, id, columnId } = card;
	const [isDragging, setIsDragging] = React.useState<boolean>(false);
	const [preview, setPreview] = React.useState<HTMLElement | null>(null);
	const ref = React.useRef(null);

	React.useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const cleanup = combine(
			// Dragging operation
			draggable({
				element,
				getInitialData() {
					// Return an object to satisfy the expected type
					return { ...card };
				},
				onDragStart() {
					setIsDragging(true);
				},
				onDrop() {
					setIsDragging(false);
					setPreview(null);
				},
				onGenerateDragPreview({ nativeSetDragImage }) {
					setCustomNativeDragPreview({
						nativeSetDragImage,
						render({ container }) {
							setPreview(container);
						},
					});
				},
			}),

			// Dropping operation
			dropTargetForElements({
				element,
				getData() {
					return { ...card };
				},
				onDrag({ source, self }) {
					console.log("ondrag:", source.data.id, self.data.id);
				},
				onDrop({ source, self }) {
					console.log("ondrop:", source.data.id, self.data.id);
				},
			})
		);

		return cleanup;
	}, []);
	return (
		<div
			ref={ref}
			className={`${
				isDragging ? "opacity-50" : ""
			} bg-white/10 flex flex-col gap-2 rounded-md p-3 transition-all ease-out cursor-grab `}
		>
			<div className="flex gap-2">
				<span className="text-sm  rounded-md p-1 bg-orange-900 border-orange-800 text-orange-200 w-fit">
					id: {id}
				</span>
				<span className="text-sm  rounded-md p-1 bg-pink-900 border-pink-800 text-orange-200 w-fit">
					columnId: {columnId}
				</span>
			</div>
			<span>{description}</span>
			{preview && createPortal(<CardPreview card={card} />, preview)}
		</div>
	);
}

function CardPreview({ card }: { card: CardType }) {
	const { id, description, columnId } = card;

	return (
		<div className="w-[350px]">
			<div className="bg-white/10 flex rotate-10 flex-col gap-2 rounded-md p-3 transition-all ease-out cursor-grab">
				<div className="flex gap-2">
					{" "}
					<span className="text-sm  rounded-md p-1 bg-orange-900 border-orange-800 text-orange-200 w-fit">
						{" "}
						id: {id}
					</span>
					<span className="text-sm  rounded-md p-1 bg-pink-900 border-pink-800 text-orange-200 w-fit">
						columnId: {columnId}
					</span>
				</div>
				<span>{description}</span>
			</div>
		</div>
	);
}
