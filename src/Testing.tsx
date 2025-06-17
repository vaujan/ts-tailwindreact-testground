/* eslint-disable @typescript-eslint/no-explicit-any */
import { Minus, Plus } from "lucide-react";
import React from "react";

export default function Testing() {
	const initialTime = 15;

	const [time, setTime] = React.useState(initialTime);
	const [isTimeRunning, setisTimeRunning] = React.useState(false);
	const [isSessionStarted, setIsSessionStarted] = React.useState(false);

	const intervalRef = React.useRef<any>(undefined);

	React.useEffect(() => {
		if (time > 0 && isTimeRunning) {
			intervalRef.current = setInterval(() => {
				setTime((prev) => prev - 1);
			}, 1000);
		} else if (time === 0 && isTimeRunning) {
			alert("Time is up!");
		}

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [time, setTime, isTimeRunning, setisTimeRunning]);

	const handleIncrement = () => {
		setTime((prev) => prev + 5);
	};

	const handleDecrement = () => {
		if (time > 5) {
			setTime((prev) => prev - 5);
		}
	};

	const toggleTimer = () => {
		setisTimeRunning(!isTimeRunning);
	};

	const toggleSession = () => {
		setIsSessionStarted(!isSessionStarted);
		setisTimeRunning(!isTimeRunning);
	};

	const resetSession = () => {
		setIsSessionStarted(false);
		setisTimeRunning(false);
		setTime(initialTime);
	};

	return (
		<div className="p-24 rounded-xl border-1 bg-white/1 border-white/10 flex flex-col justify-center items-center">
			<div className="flex mb-5 gap-2 justify-center items-center">
				<span className="p-1 w-fit text-xs  bg-blue-500/20 border-1 border-blue-500 rounded-lg">
					isTimeRunning: {isTimeRunning ? "yes" : "no"}
				</span>

				<span className="p-1 w-fit text-xs font-medium bg-orange-500/20 border-1 border-orange-500 rounded-lg">
					isSessionStarted: {isSessionStarted ? "yes" : "no"}
				</span>
			</div>

			<h2 className="font-semibold text-3xl mb-8">time: {time}</h2>
			<div className="flex gap-3 flex-col">
				{/* Toggle sessions */}
				<button
					onClick={isSessionStarted ? resetSession : toggleSession}
					className=""
				>
					{isSessionStarted ? "end session" : "start session"}
				</button>

				{/* Toggle timer */}
				<button hidden={!isSessionStarted} onClick={toggleTimer} className="">
					{isTimeRunning ? "pause" : "resume"}
				</button>

				<div hidden={time > 0}>
					<button onClick={() => setTime(5)}>restart</button>
				</div>
				<div hidden={isSessionStarted} className="flex gap-3">
					<button onClick={handleIncrement}>
						<Plus />
					</button>
					<button onClick={handleDecrement}>
						<Minus />
					</button>
				</div>
			</div>
		</div>
	);
}
