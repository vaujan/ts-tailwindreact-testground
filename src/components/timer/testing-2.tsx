import { Minus, Plus } from "lucide-react";
import React from "react";

type TimerState = "idle" | "running" | "paused" | "finished";

export default function Testing2() {
	const initialTime = 15;

	const [time, setTime] = React.useState(initialTime);
	const [timerState, setTimerState] = React.useState<TimerState>("idle");

	const intervalRef = React.useRef<number | null>(null);

	// Separate effect for interval management
	React.useEffect(() => {
		if (timerState === "running" && time > 0) {
			intervalRef.current = setInterval(() => {
				setTime((prev) => {
					if (prev <= 1) {
						setTimerState("finished");
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} else {
			// Clear interval when not running or time is up
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [timerState, time]);

	// Handle timer completion
	React.useEffect(() => {
		if (timerState === "finished") {
			alert("Time is up!");
			resetSession();
		}
	}, [timerState]);

	const handleIncrement = () => {
		if (timerState === "idle") {
			setTime((prev) => prev + 5);
		}
	};

	const handleDecrement = () => {
		if (timerState === "idle" && time > 5) {
			setTime((prev) => prev - 5);
		}
	};

	const startSession = () => {
		setTimerState("running");
	};

	const pauseTimer = () => {
		setTimerState("paused");
	};

	const resumeTimer = () => {
		setTimerState("running");
	};

	const resetSession = () => {
		setTimerState("idle");
		setTime(initialTime);
	};

	const isSessionStarted = timerState !== "idle";
	const isTimeRunning = timerState === "running";

	return (
		<div className="p-24 rounded-xl border-1 bg-white/1 border-white/10 flex flex-col justify-center items-center">
			<div className="flex mb-5 gap-2 justify-center items-center">
				<span className="p-1 w-fit text-xs  bg-blue-500/20 border-1 border-blue-500 rounded-lg">
					isTimeRunning: {isTimeRunning ? "true" : "false"}
				</span>

				<span className="p-1 w-fit text-xs font-medium bg-orange-500/20 border-1 border-orange-500 rounded-lg">
					isSessionStarted: {isSessionStarted ? "true" : "false"}
				</span>
			</div>

			<h2 className="font-semibold text-3xl mb-8">time: {time}</h2>
			<div className="flex gap-3 flex-col">
				{/* Start session */}
				{timerState === "idle" && (
					<button onClick={startSession}>start session</button>
				)}

				{/* End session */}
				{timerState === "paused" && (
					<button onClick={resetSession}>end session</button>
				)}

				{/* Toggle timer */}
				{isSessionStarted && time > 0 && (
					<button onClick={isTimeRunning ? pauseTimer : resumeTimer}>
						{isTimeRunning ? "pause" : "resume"}
					</button>
				)}

				{/* Time adjustment controls */}
				{timerState === "idle" && (
					<div className="flex gap-3">
						<button onClick={handleIncrement}>
							<Plus />
						</button>
						<button onClick={handleDecrement}>
							<Minus />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
