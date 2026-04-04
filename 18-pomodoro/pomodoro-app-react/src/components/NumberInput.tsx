import iconArrowUp from "../assets/icons/icon-arrow-up.svg";
import iconArrowDown from "../assets/icons/icon-arrow-down.svg";

import "./NumberInput.scss";

type NumberInputProps = {
  /** the id of the input */
  id: string;
  /** the current value */
  value: number;
  /** the minimal allowed value */
  min?: number;
  /** the maximal allowed value */
  max?: number;
  /** the callback on value change */
  onValueChange: (newValue: number) => void;
};

const NumberInput = ({
  id,
  value,
  min,
  max,
  onValueChange,
}: NumberInputProps) => {
  return (
    <div className="number-input">
      <input
        className="number-input__input"
        id={id}
        inputMode="numeric"
        min={min}
        max={max}
        type="number"
        value={value}
        onChange={({ target: { valueAsNumber } }) => {
          if (!Number.isNaN(valueAsNumber)) {
            onValueChange(valueAsNumber);
          }
        }}
      />
      <div className="number-input__buttons">
        <button type="button" onClick={() => onValueChange(value + 1)}>
          <img src={iconArrowUp} alt="" />
          <span className="visually-hidden">Increase</span>
        </button>
        <button type="button" onClick={() => onValueChange(value - 1)}>
          <img src={iconArrowDown} alt="" />
          <span className="visually-hidden">Decrease</span>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
