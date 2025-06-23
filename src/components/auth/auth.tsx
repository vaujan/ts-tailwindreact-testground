import React from "react";

type AuthState = "sign up" | "sign in";

export default function Auth() {
	const [authMethod, setAuthMethod] = React.useState<AuthState>("sign up");

	const handleSwitchAuth = () => {
		setAuthMethod(() => (authMethod === "sign up" ? "sign in" : "sign up"));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		e.console.log("Handle submit");
	};
	return (
		<div className="flex w-96 flex-col justify-center items-center">
			<form action="" onSubmit={(e) => handleSubmit(e)}>
				<h1 className="mb-8">
					{authMethod === "sign in" ? "Welcome back!" : "Create a new account"}
				</h1>

				<div className="flex flex-col gap-3 mb-8">
					<input type="text" placeholder="enter your email" />
					<input type="text" placeholder="enter your password" />
				</div>
				<button className="w-full">submit</button>
				<div className="w-full my-2 h-[1px] bg-white/10"></div>
				<button onClick={() => handleSwitchAuth()} className="w-full">
					{authMethod === "sign in"
						? "Create new account"
						: "Sign in to existing account"}
				</button>
			</form>
		</div>
	);
}
