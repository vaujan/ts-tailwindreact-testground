import "./App.css";
// import PragmaticDnd from "./components/pragmatic-dnd/pragmatic-dnd";
import Board from "./components/todo/pragmatic-dnd/board";

function App() {
	return (
		<div className="flex min-h-screen bg-stone-700 text-white flex-col gap-6">
			<div className="">
				{/* <PragmaticDnd /> */}

				<Board />
			</div>
		</div>
	);
}

export default App;
