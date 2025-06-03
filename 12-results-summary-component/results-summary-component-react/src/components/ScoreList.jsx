import "./ScoreList.css"
import Button from "./Button.jsx";

function ScoreList({children}) {
    return <section className="score-list">
        <h1 className="text-preset-5--bold">Summary</h1>
        <div className="score-list__entries">
            {children}
        </div>
        <Button label="Continue"/>
    </section>
}

export default ScoreList
