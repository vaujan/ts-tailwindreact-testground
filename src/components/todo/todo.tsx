/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { supabase } from "../../lib/supabase";

interface Task {
	id: number;
	title: string;
	description: string;
	created_at: string;
}

export default function Todo() {
	const [newTask, setNewTask] = React.useState({ title: "", description: "" });
	const [tasks, setTasks] = React.useState<Task[]>([]);

	React.useEffect(() => {
		const fetchTasks = async () => {
			const { data, error } = await supabase
				.from("tasks")
				.select("*")
				.order("created_at", { ascending: true });
			if (error) console.error("An error has occur:", error);

			setTasks(data);
		};

		fetchTasks();
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (newTask.title === "" && newTask.description === "") {
			alert("Task cannot be empty");
		}
		const { error } = await supabase.from("tasks").insert(newTask).single();
		console.log("inserting data:", newTask);

		setNewTask({ title: "", description: "" });

		if (error) {
			console.error("An error has occur during insertion:", error);
			return;
		} else {
			console.log("Insertion completed");
			return;
		}
	};

	// const handleEdit = async () => {};

	// const handleDelete = async (task: Task) => {
	// 	const { data, error } = await supabase.from("tasks").delete;
	// };

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
			</div>

			<div className="flex-col p-3 rounded-2xl w-150 h-150 border-1 border-white/10">
				<span className="inline-flex p-1 mb-5 text-sm font-medium text-left rounded-lg border-1 text-white/50 border-white/10">
					Tasks
				</span>
				{tasks.map((task, index) => (
					<div
						key={index}
						className="flex flex-col gap-2 justify-start items-start p-3 mb-2 rounded-lg border-1 border-white/10 bg-white/5"
						onClick={() => {
							console.log("current task", task);
						}}
					>
						<span>{task.title}</span>
						<p className="text-white/50">{task.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}
