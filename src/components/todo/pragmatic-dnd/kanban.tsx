import type { Card as CardType } from "./types";
import Card from "./card";

export default function Kanban() {
	const card: CardType = {
		id: "1",
		description: "testing",
	};

	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-3xl font-semibold text-gray-200p">My board</h1>
			{/* Column map */}
			<div className="flex gap-3">
				{/* Column */}
				<div className="w-[350px] p-3 rounded-lg flex flex-col gap-5 bg-black/20">
					<h3 className="font-medium text-white/50">Todo</h3>

					<Card card={card} />
				</div>
			</div>
		</div>
	);
}
