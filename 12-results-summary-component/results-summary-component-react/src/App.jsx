import './App.css'
import FinalScoreCard from "./components/FinalScoreCard.jsx";
import ScoreEntry from "./components/ScoreEntry.jsx";
import ScoreSummary from "./components/ScoreSummary.jsx";

function App() {
    return (
        <div className="app">
            <FinalScoreCard result="76"/>
            <ScoreSummary>
                <ScoreEntry category="Reaction"
                            icon={<img src="/icon-reaction.svg" alt="Reaction icon"/>}
                            score="80"/>
                <ScoreEntry category="Memory"
                            icon={<img src="/icon-memory.svg" alt="Memory icon"/>}
                            score="92"/>
                <ScoreEntry category="Verbal"
                            icon={<img src="/icon-verbal.svg" alt="Verbal icon"/>}
                            score="61"/>
                <ScoreEntry category="Visual"
                            icon={<img src="/icon-visual.svg" alt="Visual icon"/>}
                            score="72"/>
            </ScoreSummary>
        </div>
    )
}

export default App
