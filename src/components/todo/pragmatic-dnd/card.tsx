import React from "react";
import { type Card as CardType, type CardProps } from "./types";
import {
	draggable,
	dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from "react-dom";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

export default function Card({ card, onCardInsert }: CardProps) {
	const { description, id, columnId } = card;
	const [isDragging, setIsDragging] = React.useState<boolean>(false);
	const [preview, setPreview] = React.useState<HTMLElement | null>(null);
	const [dropPosition, setDropPosition] = React.useState<
		"above" | "below" | null
	>(null);
	const ref = React.useRef(null);

	React.useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const cleanup = combine(
			draggable({
				element,
				getInitialData() {
					// Return an object to satisfy the expected type
					return { type: "card", ...card };
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

			dropTargetForElements({
				element,
				getData() {
					return { type: "card", ...card };
				},
				canDrop({ source }) {
					// if the type is card and not in the same place (same id), can drop
					return source.data.type === "card" && source.data.id !== card.id;
				},
				onDrag({ source, self, location }) {
					console.log("source", source);
					console.log("self", self);
					console.log("location", location);

					const target = self.element;
					const targetRect = target.getBoundingClientRect();
					const clientY = location.current.input.clientY;

					// calculate if we're in bottom half or top half
					const midpoint = targetRect.top + targetRect.bottom / 2;

					//if midpoint is higher than current client Y coordinate, then we're on top dropping position
					const position = clientY < midpoint ? "above" : "below";
					setDropPosition(position);
				},
				onDragLeave() {
					setDropPosition(null);
				},
				onDrop({ source, self }) {
					if (source.data.type === "card" && dropPosition) {
						// (cardId, targetId, position)
						onCardInsert(source.data.id as string, id, dropPosition);
					}

					setDropPosition(null);
				},
			})
		);

		return cleanup;
	}, [id, columnId, description, onCardInsert, dropPosition]);

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
		<div className="w-[350px] ">
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
