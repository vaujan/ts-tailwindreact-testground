import { type Column } from "./types";
import Card from "./card";
import { Plus, Trash } from "lucide-react";

export default function Column({ column }: { column: Column }) {
	const { cards, id, title, boardId } = column;

	return (
		<div className="p-3 rounded-lg flex flex-col gap-5 bg-black/20">
			<div className="w-[350px] flex justify-between">
				<div className="flex flex-col">
					<h3 className="font-medium w-full text-white/50">{title}</h3>
					<p className="text-xs text-white/50">
						id:<span className="font-semibold">{id}</span>- boardId:
						<span className="font-semibold">{boardId}</span>
					</p>
				</div>
				<div className="w-fit flex gap-3">
					<button className="size-10 ">
						<Plus />
					</button>
					<button className="size-10">
						<Trash />
					</button>
				</div>
			</div>
			{cards.map((card) => (
				<Card key={card.id} card={card} />
			))}
		</div>
	);
}
