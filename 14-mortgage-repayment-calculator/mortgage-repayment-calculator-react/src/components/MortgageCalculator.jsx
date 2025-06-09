import style from "./MortgageCalculator.module.css"
import iconCalculator from "../assets/images/icon-calculator.svg"
import illustrationEmpty from "../assets/images/illustration-empty.svg"
import {useState} from "react";
import NumberField from "./NumberField.jsx";
import RadioField from "./RadioField.jsx";

function MortgageCalculator() {

    const [result, setResult] = useState(null)

    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
        setResult({"monthly": 1_797.74, "total": 539_322.94})
    }

    return (
        <div className={style.calculator}>
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
        <form className={style.formContainer}
              onSubmit={submit}
              onReset={reset}>

            <header className={style.formHeader}>
                <h1 className={style.formTitle + " text-preset-2"}>Mortgage Calculator</h1>
                <button type="reset" className={`text-preset-4 ${style.resetFormButton}`}>
                    Clear All
                </button>
            </header>

            <div className={style.formFields}>

                <NumberField className={style.formFieldsAmount}
                             label="Mortgage Amount"
                             value={formData.amount}
                             setValue={setAmount}
                             prefix="£"
                             min="0"/>

                <NumberField className={style.formFieldsTerm}
                             label="Mortgage Term"
                             value={formData.term}
                             setValue={setTerm}
                             suffix="years"
                             min="1"/>

                <NumberField className={style.formFieldsRate}
                             label="Interest Rate"
                             value={formData.rate}
                             setValue={setRate}
                             suffix="%"
                             min="0"
                             max="100"/>

                <RadioGroup className={style.formFieldsType} label="Mortgage Type">

                    <RadioField label="Repayment"
                                groupName="type"
                                checked={formData.type === "repayment"}
                                setChecked={setTypeRepayment}/>

                    <RadioField label="Interest Only"
                                groupName="type"
                                checked={formData.type === "interest-only"}
                                setChecked={setTypeInterestOnly}/>

                </RadioGroup>

            </div>

            <SubmitButton/>

        </form>
    )
}

function RadioGroup({className, label, children}) {
    return (
        <div className={className + " " + style.radioGroup}>
            <label className="text-preset-4">{label}</label>
            {children}
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
                    <p className={`text-preset-1 ${style.resultMonthly}`}>£{`${monthly.toLocaleString()}`}</p>
                </div>
                <hr className={style.resultSeparator}/>
                <div className={style.resultEntry}>
                    <p className="text-preset-4">Total you'll repay over the term</p>
                    <p className={`text-preset-2 ${style.resultTotal}`}>£{`${total.toLocaleString()}`}</p>
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