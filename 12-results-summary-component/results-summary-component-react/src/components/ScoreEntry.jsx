import "./ScoreEntry.css"

function ScoreEntry({category, score, icon}) {
    return <div className={`score-entry score-entry--${category.toLowerCase()}`}>
        <div className="score-entry__category text-preset-6--medium">
            {icon}
            {category}
        </div>
        <span className="score-entry__score text-preset-6--bold">
            {score}
        </span>
    </div>
}

export default ScoreEntry
