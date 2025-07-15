import { type Column } from "./types";
import Card from "./card";

export default function Column({ column }: { column: Column }) {
	const { cards, id, title } = column;

	return (
		<div className="w-[350px] p-3 rounded-lg flex flex-col gap-5 bg-black/20">
			<h3 className="font-medium text-white/50">
				{title} - id: {id}
			</h3>
			{cards.map((card) => (
				<Card key={card.id} card={card} />
			))}
		</div>
	);
}
