import "./ScoreSummary.css"
import Button from "./Button.jsx";

function ScoreSummary({children}) {
    return <section className="score-summary">
        <h1 className="text-preset-5--bold">Summary</h1>
        <div className="score-summary__entries">
            {children}
        </div>
        <Button label="Continue"/>
    </section>
}

export default ScoreSummary
