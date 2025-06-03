import FinalScoreCard from "./FinalScoreCard.jsx";
import ScoreList from "./ScoreList.jsx";
import ScoreEntry from "./ScoreEntry.jsx";
import "./ResultSummary.css"

function ResultSummary() {
    return <div className="result-summary">
        <FinalScoreCard result="76"/>
        <ScoreList>
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
        </ScoreList>
    </div>
}

export default ResultSummary