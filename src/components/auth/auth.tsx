import React from "react";

export default function Auth() {
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		e.console.log("Handle submit");
	};
	return (
		<div className="flex flex-col justify-center items-center">
			<form action="" onSubmit={(e) => handleSubmit(e)}>
				<h1 className="mb-8">Login</h1>

				<div className="flex flex-col gap-3">
					<input type="text" placeholder="enter your email" />
					<input type="text" placeholder="enter your password" />
				</div>
				<button className="w-full mt-5">submit</button>
				<button className="w-full mt-2">create new account</button>
			</form>
		</div>
	);
}
