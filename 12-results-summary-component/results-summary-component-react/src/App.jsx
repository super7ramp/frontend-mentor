import './App.css'
import ResultSummary from "./components/ResultSummary.jsx";
import data from "../data.json";

function App() {
    return (
        <div className="app">
            <ResultSummary entries={data}/>
        </div>
    )
}

export default App
