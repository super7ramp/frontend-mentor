import "./FinalScoreCard.css"

function FinalScoreCard({result}) {
    return <div className="final-score-card">
        <p className="text-preset-5--bold">Your Result</p>
        <div className="final-score-card__result">
            <p className="text-preset-1">{result}</p>
            <p className="text-preset-6--bold">of 100</p>
        </div>
        <div className="final-score-card__comment">
            <p className="text-preset-4">Great</p>
            <p className="text-preset-6--medium">
                You scored higher than 65% of the people who have taken these tests.
            </p>
        </div>
    </div>
}

export default FinalScoreCard
