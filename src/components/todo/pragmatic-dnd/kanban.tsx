import React from "react";
import type { Card as CardType } from "./types";
import Card from "./card";
import { Plus, Trash } from "lucide-react";

export default function Kanban() {
	const card: CardType = {
		id: "1",
		description: "testing",
	};

	const [isHovering, setIsHovering] = React.useState<boolean>(false);

	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-3xl font-semibold text-gray-200p">My board</h1>
			{/* Column map */}
			<div className="flex gap-3">
				{/* Column */}
				<div
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					className="w-[350px] p-3 rounded-lg flex flex-col gap-5 bg-black/20"
				>
					<div className="flex justify-between">
						<h3 className="font-medium text-white/50">Todo</h3>
						<div className={`${isHovering ? "" : "invisible"} flex gap-2`}>
							<button className="size-10 ">
								<Plus />
							</button>
							<button className="size-10">
								<Trash />
							</button>
						</div>
					</div>

					<Card card={card} />
				</div>
			</div>
		</div>
	);
}
