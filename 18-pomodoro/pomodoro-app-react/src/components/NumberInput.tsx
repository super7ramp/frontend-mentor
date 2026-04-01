import iconArrowUp from '../assets/icons/icon-arrow-up.svg';
import iconArrowDown from '../assets/icons/icon-arrow-down.svg';

import './NumberInput.scss';

type NumberInputProps = {
    /** the id of the input */
    id: string,
    /** the current value */
    value: number,
    /** the callback on value change */
    onValueChange: (newValue: number) => void,
}

const NumberInput = ({ id, value, onValueChange }: NumberInputProps) => {
    return (
        <div className='number-input'>
            <input
                className='number-input__input'
                id={id}
                type="number"
                value={value}
                onChange={(e) => onValueChange(e.target.valueAsNumber)} />
            <div className='number-input__buttons'>
                <button type='button' onClick={() => onValueChange(value + 1)}>
                    <img src={iconArrowUp} />
                </button>
                <button type='button' onClick={() => onValueChange(value - 1)}>
                    <img src={iconArrowDown} />
                </button>
            </div>
        </div>
    );
}

export default NumberInput;