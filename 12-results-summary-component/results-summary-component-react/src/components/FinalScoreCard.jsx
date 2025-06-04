import "./FinalScoreCard.css"

function FinalScoreCard({average}) {
    return <div className="final-score-card">
        <p className="text-preset-5--bold final-score-card__header">Your Result</p>
        <div className="final-score-card__result">
            <p className="text-preset-2 final-score-card__average">{average}</p>
            <p className="text-preset-6--bold final-score-card__percent">of 100</p>
        </div>
        <div className="final-score-card__appraisal">
            <p className="final-score-card__note text-preset-4">Great</p>
            <p className="final-score-card__comment text-preset-6--medium">
                You scored higher than 65% of the people who have taken these tests.
            </p>
        </div>
    </div>
}

export default FinalScoreCard
