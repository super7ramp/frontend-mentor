import FinalScoreCard from "./FinalScoreCard.jsx";
import ScoreList from "./ScoreList.jsx";
import ScoreEntry from "./ScoreEntry.jsx";
import "./ResultSummary.css"

function ResultSummary({entries}) {
    return <div className="result-summary">
        <FinalScoreCard average={average(entries)}/>
        <ScoreList>
            {
                entries.map((entry) =>
                    <ScoreEntry key={entry.category}
                                category={entry.category}
                                icon={Icon(entry.icon, entry.category)}
                                score={entry.score}
                    />
                )
            }
        </ScoreList>
    </div>
}

function average(entries) {
    return Math.round(entries.reduce((total, entry) => total + entry.score, 0) / entries.length)
}

function Icon(url, category) {
    const patchedUrl = url.replace("./assets/images/", "./")
    return <img src={patchedUrl} alt={`${category} icon`}/>
}

export default ResultSummary