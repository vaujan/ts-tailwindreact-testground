import "./App.css";
// import Testing2 from "./components/timer/testing-2";
import Todo from "./components/todo/todo";
import React from "react";
import Auth from "./components/auth/auth";
import { supabase } from "./lib/supabase";

function App() {
	const [session, setSession] = React.useState<any>(null);

	const fetchSession = async () => {
		const currentSession = await supabase.auth.getSession();
		console.log("Current session:", currentSession.data);
		setSession(currentSession.data.session);
	};

	React.useEffect(() => {
		fetchSession();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	const logOut = async () => {
		await supabase.auth.signOut();
	};

	return (
		<div className="flex flex-col gap-6">
			{/* <Testing2 /> */}
			{session && <button onClick={logOut}>log out</button>}
			{session ? <Todo session={session} /> : <Auth />}
		</div>
	);
}

export default App;
