import style from "./MortgageCalculator.module.css"
import iconCalculator from "../assets/images/icon-calculator.svg"
import illustrationEmpty from "../assets/images/illustration-empty.svg"

function MortgageCalculator() {
    return (
        <div>
            <MortgageCalculatorForm/>
            <MortgageRepaymentResult/>
        </div>
    )
}

function MortgageCalculatorForm() {
    return (
        <form className={style.form}>
            <h1 className="text-preset-2">Mortgage Calculator</h1>
            <input type="reset" value="Clear All" className={`text-preset-4 ${style.resetFormButton}`}/>
            <NumberField label="Mortgage Amount" prefix="£"/>
            <NumberField label="Mortgage Term" suffix="years"/>
            <NumberField label="Interest Rate" suffix="%"/>
            <RadioGroup label="Mortgage Type">
                <RadioField label="Repayment"/>
                <RadioField label="Interest Only"/>
            </RadioGroup>
            <SubmitButton/>
        </form>
    )
}

function NumberField({label, prefix, suffix}) {
    return (
        <div className={style.numberField}>
            <label htmlFor={label} className="text-preset-4">{label}</label>
            <div className={style.numberFieldPrefixInputSuffix}>
                {prefix && <p className={`text-preset-3 ${style.numberFieldUnit}`}>{prefix}</p>}
                <input type="number" id={label} className="text-preset-3"/>
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

function MortgageRepaymentResult() {
    return (
        <div className={style.resultPlaceholder}>
            <img src={illustrationEmpty} alt="Illustration empty"/>
            <h2 className="text-preset-2">Results shown here</h2>
            <p className="text-preset-4">
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
            </p>
        </div>
    )
}

export default MortgageCalculator