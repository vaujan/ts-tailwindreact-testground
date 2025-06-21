import React from "react";
import { supabase } from "../../supabase-client";

export default function Todo() {
	const [tasks, setTasks] = React.useState();

	React.useEffect(() => {
		const fetchTasks = async () => {
			const { data, error } = await supabase.from("tasks").select("*");

			if (error) console.log("An error has occur:", error);
			console.log("data:", data);
			return data;
		};

		fetchTasks();
	}, [tasks]);

	return (
		<div className="flex gap-5">
			<div className="flex-col">
				<h2 className="mb-5 text-3xl font-medium">Todo</h2>
				<div className="flex flex-col gap-2">
					<input type="text" placeholder="Current Task" />
					<input type="text" placeholder="Description" />
				</div>
				<button className="mt-3">add task</button>
				<button>fetch</button>{" "}
			</div>

			<div className="flex-col p-3 rounded-2xl w-150 h-150 border-1 border-white/10">
				<span className="inline-flex p-1 mb-5 text-sm font-medium text-left rounded-lg border-1 text-white/50 border-white/10">
					Tasks
				</span>
				{/* {tasks.map((task) => (
					<div
						className="flex flex-col gap-2 justify-start items-start p-3 mb-2 rounded-lg border-1 border-white/10 bg-white/5"
						key={task.id}
						onClick={handleClick}
					>
						<span className={`${task.isDone ? "line-through" : ""}`}>
							{task.title}
						</span>
						<p className="text-white/50">{task.description}</p>
					</div>
				))} */}
				<div className="flex flex-col"></div>
			</div>
		</div>
	);
}
