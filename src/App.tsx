import "./App.css";
// import PragmaticDnd from "./components/pragmatic-dnd/pragmatic-dnd";
import Kanban from "./components/todo/pragmatic-dnd/kanban";

function App() {
	return (
		<div className="flex min-h-screen bg-stone-700 text-white flex-col gap-6">
			<div className="md:py-32 md:px-16">
				{/* <PragmaticDnd /> */}

				<Kanban />
			</div>
		</div>
	);
}

export default App;
