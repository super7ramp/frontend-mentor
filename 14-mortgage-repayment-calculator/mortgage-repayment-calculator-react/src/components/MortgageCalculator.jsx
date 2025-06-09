import style from "./MortgageCalculator.module.css"
import iconCalculator from "../assets/images/icon-calculator.svg"
import illustrationEmpty from "../assets/images/illustration-empty.svg"
import {useState} from "react";

function MortgageCalculator() {

    const [result, setResult] = useState(null)

    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
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

    const [resets, setResets] = useState(0)
    const [formData, setFormData] = useState({
        amount: '',
        term: '',
        rate: '',
        type: ''
    });

    const setAmount = (value) => setFormData({...formData, amount: value})
    const setTerm = (value) => setFormData({...formData, term: value})
    const setRate = (value) => setFormData({...formData, rate: value})
    const setType = (value) => setFormData({...formData, type: value})
    const setTypeRepayment = () => setType("repayment")
    const setTypeInterestOnly = () => setType("interest-only")

    const submit = (event) => {
        event.preventDefault()
        onSubmit(formData)
    }

    const reset = () => {
        setFormData({
            amount: '',
            term: '',
            rate: '',
            type: ''
        });
        // increment resets to trigger re-render of NumberFields (and clear their local error states
        setResets(resets + 1);
    }

    return (
        <form className={style.form}
              onSubmit={submit}
              onReset={reset}>

            <h1 className="text-preset-2">Mortgage Calculator</h1>
            <input type="reset" value="Clear All" className={`text-preset-4 ${style.resetFormButton}`}/>

            <NumberField key={`amount-${resets}"`}
                         label="Mortgage Amount"
                         value={formData.amount}
                         setValue={setAmount}
                         prefix="£"
                         min="0"/>

            <NumberField key={`term-${resets}"`}
                         label="Mortgage Term"
                         value={formData.term}
                         setValue={setTerm}
                         suffix="years"
                         min="1"/>

            <NumberField key={`rate-${resets}"`}
                         label="Interest Rate"
                         value={formData.rate}
                         setValue={setRate}
                         suffix="%"
                         min="0"
                         max="100"/>

            <RadioGroup label="Mortgage Type">

                <RadioField label="Repayment"
                            groupName="type"
                            checked={formData.type === "repayment"}
                            setChecked={setTypeRepayment}/>

                <RadioField label="Interest Only"
                            groupName="type"
                            checked={formData.type === "interest-only"}
                            setChecked={setTypeInterestOnly}/>

            </RadioGroup>

            <SubmitButton/>

        </form>
    )
}

function NumberField({label, value, setValue, prefix, suffix, min, max}) {
    const [error, setError] = useState(null)
    const onInput = (event) => {
        if (event.target.validity.valid) {
            setError(null)
        } else {
            setError(event.target.validationMessage)
        }
        setValue(event.target.value)
    }
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
                       value={value}
                       className="text-preset-3"
                       onInput={onInput}/>
                {suffix && <p className={`text-preset-3 ${style.numberFieldUnit}`}>{suffix}</p>}
            </div>
            {error && <p className={`text-preset-5 ${style.error}`}>{error}</p>}
        </div>
    )
}

function RadioGroup({label, children}) {
    const [error, setError] = useState(null)
    return (
        <div className={style.radioGroup}>
            <label className="text-preset-4">{label}</label>
            {children}
            {error && <p className={`text-preset-5 ${style.error}`}>{error}</p>}
        </div>
    )
}

function RadioField({label, groupName, checked, setChecked}) {
    const change = (event) => {
        if (!event.target.validity.valid) {
            console.log("Invalid radio input:", event.target.validationMessage);
        }
        setChecked()
    }
    return (
        <div className={style.radioField}>
            <input type="radio"
                   id={label}
                   name={groupName}
                   required={true}
                   checked={checked}
                   onChange={change}/>
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