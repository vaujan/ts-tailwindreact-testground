import React from "react";
import { type ColumnProps } from "./types";
import Card from "./card";
import { Plus, Trash } from "lucide-react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export default function Column({ column, onCardMove }: ColumnProps) {
	const { cards, id, title, boardId } = column;
	const [isHovering, setIsHovering] = React.useState<boolean>(false);
	const [isOver, setIsOver] = React.useState<boolean>(false);
	const ref = React.useRef(null);

	React.useEffect(() => {
		const element = ref.current;

		if (!element) return;

		const cleanup = dropTargetForElements({
			element,
			getData() {
				return { ...column };
			},
			onDragEnter() {
				setIsOver(true);
			},
			onDragLeave() {
				setIsOver(false);
			},
			onDrop({ source, self }) {
				onCardMove(
					source.data.id as string,
					source.data.columnId as string,
					self.data.id as string
				);
				setIsOver(false);
				// console.log("source", source);
				// console.log("self", self);
				// console.log("location", location);
			},
		});

		return cleanup;
	}, [id, onCardMove]);

	return (
		<div
			ref={ref}
			className={`p-3 rounded-lg ${
				isOver ? "bg-stone-500/20" : "bg-black/20"
			} flex h-fit min-h-[120px] transition-all ease-out flex-col gap-5 `}
		>
			<div
				className="w-[350px] flex justify-between"
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				<div className="flex flex-col">
					<h3 className="font-medium w-full text-white/50">{title}</h3>
					<p className="text-xs text-white/50">
						id:<span className="font-semibold">{id}</span>- boardId:
						<span className="font-semibold">{boardId}</span>
					</p>
				</div>
				<div className={`w-fit flex gap-3 ${!isHovering && "invisible"}`}>
					<button className="size-10 ">
						<Plus />
					</button>
					<button className="size-10">
						<Trash />
					</button>
				</div>
			</div>
			{cards.length === 0 && (
				<div className="flex justify-center items-center font-medium p-3 border-2 border-dashed rounded-lg opacity-10">
					No task here.
				</div>
			)}
			{cards.map((card) => (
				<Card key={card.id} card={card} />
			))}
		</div>
	);
}
