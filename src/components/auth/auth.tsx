import React from "react";
import { supabase } from "../../lib/supabase";

type AuthState = "sign up" | "sign in";

export default function Auth() {
	const [authMethod, setAuthMethod] = React.useState<AuthState>("sign up");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [authErrorMessage, setAuthErrorMessage] = React.useState<string>();

	const handleSwitchAuth = () => {
		setAuthMethod(() => (authMethod === "sign up" ? "sign in" : "sign up"));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (authMethod === "sign up") {
			const { error: signUpError } = await supabase.auth.signUp({
				email,
				password,
			});
			if (signUpError) {
				setAuthErrorMessage(signUpError.message);
				console.error(
					"An error has occur when signing up:",
					signUpError.message
				);
				return;
			}

			alert(
				"Please confirm your signing by clicking the link in the email we sent you!"
			);
		} else {
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (signInError) {
				setAuthErrorMessage(signInError.message);
				console.error(
					"An error has occur when signing in:",
					signInError.message
				);
				return;
			}
		}
		// console.log("Sending form!", { email: email, password: password });
		setEmail("");
		setPassword("");
	};
	return (
		<div className="flex w-96 flex-col justify-center items-center">
			<form action="" onSubmit={(e) => handleSubmit(e)}>
				<h1 className="mb-8">
					{authMethod === "sign in" ? "Welcome back!" : "Create a new account"}
				</h1>

				<h2 className="text-red-500">
					{!authErrorMessage
						? null
						: `An error has occur when signing in: ${authErrorMessage}`}
				</h2>
				<div className="flex flex-col gap-3 mb-8">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="enter your email"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="enter your password"
					/>
				</div>
				<button type="submit" className="w-full">
					{authMethod === "sign in" ? "Sign in" : "Sign up"}
				</button>
				<div className="w-full my-2 h-[1px] bg-white/10"></div>
			</form>
			<button onClick={() => handleSwitchAuth()} className="w-full">
				{authMethod === "sign in"
					? "Create new account"
					: "Sign in to existing account"}
			</button>
		</div>
	);
}
