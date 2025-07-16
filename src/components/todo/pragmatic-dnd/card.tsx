import React from "react";
import { type Card as CardType } from "./types";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from "react-dom";

export default function Card({ card }: { card: CardType }) {
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
				setCustomNativeDragPreview({
					nativeSetDragImage,
					render({ container }) {
						setPreview(container);
					},
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
			} bg-white/10 flex flex-col gap-2 rounded-md p-3 transition-all ease-out cursor-grab `}
		>
			<span className="text-sm  rounded-md p-1 bg-orange-900 border border-orange-800 text-orange-200 w-fit">
				{id}
			</span>
			<span>{description}</span>
			{preview && createPortal(<CardPreview card={card} />, preview)}
		</div>
	);
}

function CardPreview({ card }: { card: CardType }) {
	const { id, description } = card;

	return (
		<div className="w-[350px]">
			<div className="bg-white/10 flex rotate-5 flex-col gap-2 rounded-md p-3 transition-all ease-out cursor-grab">
				<span className="text-sm  rounded-md p-1 bg-orange-900 border border-orange-800 text-orange-200 w-fit">
					{id}
				</span>
				<span>{description}</span>
			</div>
		</div>
	);
}
