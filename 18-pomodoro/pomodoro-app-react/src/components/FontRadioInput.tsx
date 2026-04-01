import './FontRadioInput.scss'

type FontRadioInputProps = {
    /** the identifier of the font */
    font: string,
    /** whether the input is checked */
    checked: boolean,
    /** callback when input is clicked */
    onClick: () => void,
}

const FontRadioInput = ({ font, checked, onClick }: FontRadioInputProps) => {
    return (
        <div className={`font-radio-input font-radio-input--${font}`}>
            <div aria-hidden={true}>Aa</div>
            <input
                aria-label={font}
                name='font'
                type="radio"
                checked={checked}
                onClick={onClick} />
        </div>
    );
}

export default FontRadioInput;
