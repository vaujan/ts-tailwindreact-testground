import "./App.css";
import Testing from "./components/testing";
import Testing2 from "./components/testing-2";

function App() {
	return (
		<div className="flex gap-6">
			<Testing2 />
			<Testing />
		</div>
	);
}

export default App;
