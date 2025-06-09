import style from "./MortgageCalculator.module.css"
import iconCalculator from "../assets/images/icon-calculator.svg"
import illustrationEmpty from "../assets/images/illustration-empty.svg"
import {useState} from "react";

function MortgageCalculator() {

    const [result, setResult] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault()
        // TODO validation
        console.log("Form submitted")
        setResult({"monthly": 1_797.74, "total": 539_322.94})
    }

    return (
        <div>
            <MortgageCalculatorForm onSubmit={onSubmit}/>
            <MortgageRepaymentResult result={result}/>
        </div>
    )
}

function MortgageCalculatorForm({onSubmit}) {
    return (
        <form className={style.form} onSubmit={onSubmit}>
            <h1 className="text-preset-2">Mortgage Calculator</h1>
            <input type="reset" value="Clear All" className={`text-preset-4 ${style.resetFormButton}`}/>
            <NumberField label="Mortgage Amount" prefix="£" min="0"/>
            <NumberField label="Mortgage Term" suffix="years" min="0"/>
            <NumberField label="Interest Rate" suffix="%" min="0" max="100"/>
            <RadioGroup label="Mortgage Type">
                <RadioField label="Repayment"/>
                <RadioField label="Interest Only"/>
            </RadioGroup>
            <SubmitButton/>
        </form>
    )
}

function NumberField({label, prefix, suffix, min, max}) {
    return (
        <div className={style.numberField}>
            <label htmlFor={label} className="text-preset-4">{label}</label>
            <div className={style.numberFieldPrefixInputSuffix}>
                {prefix && <p className={`text-preset-3 ${style.numberFieldUnit}`}>{prefix}</p>}
                <input type="number"
                       required={true}
                       min={min || Number.MIN_VALUE}
                       max={max || Number.MAX_VALUE}
                       step="any"
                       id={label}
                       className="text-preset-3"/>
                {suffix && <p className={`text-preset-3 ${style.numberFieldUnit}`}>{suffix}</p>}
            </div>
        </div>
    )
}

function RadioGroup({label, children}) {
    return (
        <div className={style.radioGroup}>
            <label className="text-preset-4">{label}</label>
            {children}
        </div>
    )
}

function RadioField({label}) {
    return (
        <div className={style.radioField}>
            <input type="radio" id={label}/>
            <label htmlFor={label} className="text-preset-3">{label}</label>
        </div>
    )
}

function SubmitButton() {
    return (
        <button type="submit" className={`text-preset-3 ${style.submitButton}`}>
            <img src={iconCalculator} alt="Calculator icon"/>
            Calculate Repayments
        </button>
    )
}

function MortgageRepaymentResult({result}) {
    return (
        <>
            {result
                ? <MortgageRepaymentResultFilled result={result}/>
                : <MortgageRepaymentResultPlaceholder/>}
        </>
    )
}

function MortgageRepaymentResultFilled({result}) {
    const {monthly, total} = result
    return (
        <section className={style.result + " " + style.resultFilled}>
            <header className={style.resultFilledHeader}>
                <h2 className="text-preset-2">Your Result</h2>
                <p className="text-preset-4">
                    Your results are shown below based on the information you provided. To adjust the results, edit the
                    form and click “calculate repayments” again.
                </p>
            </header>
            <div className={style.resultFilledTable}>
                <div className={style.resultEntry}>
                    <p className="text-preset-4">Your monthly repayments</p>
                    <p className={`text-preset-1 ${style.resultMonthly}`}>£{`${monthly}`}</p>
                </div>
                <hr className={style.resultSeparator}/>
                <div className={style.resultEntry}>
                    <p className="text-preset-4">Total you'll repay over the term</p>
                    <p className={`text-preset-2 ${style.resultTotal}`}>£{`${total}`}</p>
                </div>
            </div>
        </section>
    )
}

function MortgageRepaymentResultPlaceholder() {
    return (
        <section className={style.result + " " + style.resultPlaceholder}>
            <img src={illustrationEmpty} alt="Illustration empty"/>
            <h2 className="text-preset-2">Results shown here</h2>
            <p className="text-preset-4">
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
            </p>
        </section>
    )
}

export default MortgageCalculator