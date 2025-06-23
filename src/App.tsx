import "./App.css";
// import Testing2 from "./components/timer/testing-2";
// import Todo from "./components/todo/todo";
import React from "react";
import Auth from "./components/auth/auth";

function App() {
	return (
		<div className="flex gap-6">
			{/* <Testing2 /> */}
			{/* <Todo /> */}
			<Auth />
		</div>
	);
}

export default App;
