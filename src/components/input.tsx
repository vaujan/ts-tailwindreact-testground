import React from "react";

export default function Input() {
	const [value, setValue] = React.useState<string>("1000");

	const handleClick = () => {
		console.log("value", value);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<div className="flex flex-col gap-3">
			<input
				className="text-5xl border-1 rounded-lg font-medium"
				value={value}
				type="number"
				onChange={handleChange}
			/>
			<button onClick={handleClick}>log value!</button>
		</div>
	);
}
