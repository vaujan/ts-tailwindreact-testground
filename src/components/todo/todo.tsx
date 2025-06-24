/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { supabase } from "../../lib/supabase";
import { X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

interface Task {
	id: number;
	title: string;
	description: string;
	created_at: string;
}

export default function Todo({ session }: { session: Session }) {
	const [newTask, setNewTask] = React.useState({ title: "", description: "" });
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);

	const [newDescription, setNewDescription] = React.useState<string>();

	// Fetching data in initial render
	React.useEffect(() => {
		const fetchTasks = async () => {
			setLoading(true);
			setError(null);

			const { data, error } = await supabase
				.from("tasks")
				.select("*")
				.order("created_at", { ascending: true });

			if (error) {
				setError(error.message);
				console.error("An error has occur:", error.message);
			} else {
				setTasks(data || []);
			}

			setLoading(false);
		};
		fetchTasks();
	}, []);

	// Handle subscription
	React.useEffect(() => {
		const channel = supabase.channel("tasks-channel");

		const subscription = channel
			.on(
				"postgres_changes", // What to listen for
				{
					event: "INSERT", // What type of change
					schema: "public", // Which part of the database
					table: "tasks", // Which table
				},
				(payload) => {
					// What to do when it happens
					const newTask = payload.new as Task;
					setTasks((prev) => [...prev, newTask]);
				}
			)
			.on(
				"postgres_changes",
				{
					event: "DELETE",
					schema: "public",
					table: "tasks",
				},
				(payload) => {
					console.log("Task deleted:", payload);
					const deletedTask = payload.old as Task;
					setTasks((prev) => prev.filter((task) => task.id !== deletedTask.id));
				}
			)
			.subscribe((status) => console.log("Subscription:", status));

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		// Validating if form is not empty
		if (newTask.title === "" && newTask.description === "") {
			alert("Task cannot be empty");
			return;
		}

		const { error } = await supabase
			.from("tasks")
			.insert({ ...newTask, email: session.user.email })
			.select()
			.single();

		console.log("inserting data:", newTask);

		if (error) {
			console.error("An error has occur during insertion:", error.message);
			return;
		} else {
			console.log("Insertion completed");

			setNewTask({ title: "", description: "" });
			return;
		}
	};

	const handleEditDescription = async (id: number) => {
		const { error } = await supabase
			.from("tasks")
			.update({ description: newDescription })
			.eq("id", id);

		if (error) console.error("An error has occur in delete task");
		setNewDescription("");
		return;
	};

	const handleDelete = async (id: number) => {
		const { error } = await supabase.from("tasks").delete().eq("id", id);

		if (error)
			console.error("An error has occur in deleting task", error.message);
		return;
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
							value={newTask.title}
						/>
						<input
							onChange={(e) =>
								setNewTask((prev) => ({ ...prev, description: e.target.value }))
							}
							name="description"
							type="text"
							placeholder="Description"
							value={newTask.description}
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
					>
						<span>{task.title}</span>
						<p className="text-white/50">{task.description}</p>
						<div>
							<input
								type="text"
								placeholder="edit description"
								onChange={(e) => setNewDescription(e.target.value)}
							/>
							<button onClick={() => handleEditDescription(task.id)}>
								edit
							</button>
						</div>
						<button onClick={() => handleDelete(task.id)}>
							<X />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
