/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { supabase } from "../../lib/supabase";

export default function Todo() {
	const [newTask, setNewTask] = React.useState({ title: "", description: "" });
	// const [tasks, setTasks] = React.useState();

	React.useEffect(() => {
		const fetchTasks = async () => {
			const { data, error } = await supabase.from("tasks").select("*");
			if (error) console.error("An error has occur:", error);
			console.log("current data:", data);
			return data;
		};

		fetchTasks();
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const { error } = await supabase.from("tasks").insert(newTask).single();
		console.log("inserting data:", newTask);

		if (error) {
			console.error("An error has occur during insertion:", error);
		} else {
			console.log("Insertion completed");
		}
	};

	return (
		<div className="flex gap-5">
			<div className="flex-col">
				<h2 className="mb-5 text-3xl font-medium">Todo</h2>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<input
							onChange={(e) =>
								setNewTask((prev) => ({ ...prev, title: e.target.value }))
							}
							name="title"
							type="text"
							placeholder="Current Task"
						/>
						<input
							onChange={(e) =>
								setNewTask((prev) => ({ ...prev, description: e.target.value }))
							}
							name="description"
							type="text"
							placeholder="Description"
						/>
					</div>
					<button className="w-full mt-3" onClick={() => console.log(newTask)}>
						add task
					</button>
				</form>
				<button className="mt-3 w-full">fetch</button>{" "}
			</div>

			<div className="flex-col p-3 rounded-2xl w-150 h-150 border-1 border-white/10">
				<span className="inline-flex p-1 mb-5 text-sm font-medium text-left rounded-lg border-1 text-white/50 border-white/10">
					Tasks
				</span>
				<div className="flex flex-col gap-2 justify-start items-start p-3 mb-2 rounded-lg border-1 border-white/10 bg-white/5">
					<span>task title</span>
					<p className="text-white/50">task description</p>
				</div>
			</div>
		</div>
	);
}
