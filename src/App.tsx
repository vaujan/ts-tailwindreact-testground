import "./App.css";
// import Testing2 from "./components/timer/testing-2";
// import Todo from "./components/todo/todo";
import React, { useEffect } from "react";
import Auth from "./components/auth/auth";
import { supabase } from "./lib/supabase";

function App() {
	const [session, setSession] = React.useState(null);

	const fetchSession = async () => {
		const currentSession = await supabase.auth.getSession();
		console.log("Current session:", currentSession);
		setSession(currentSession.data);
	};

	React.useEffect(() => {
		fetchSession();
	}, [session]);

	return (
		<div className="flex gap-6">
			{/* <Testing2 /> */}
			{/* <Todo /> */}
			<Auth />
		</div>
	);
}

export default App;
