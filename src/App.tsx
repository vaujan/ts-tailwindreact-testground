import "./App.css";
import Input from "./components/input";
// import Testing from "./components/timer/testing";
import Testing2 from "./components/timer/testing-2";

function App() {
	return (
		<div className="flex gap-6">
			<Testing2 />
			{/* <Testing /> */}
			<Input />
		</div>
	);
}

export default App;
