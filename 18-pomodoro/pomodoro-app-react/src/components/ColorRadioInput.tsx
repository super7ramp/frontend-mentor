import "./ColorRadioInput.scss";

type ColorRadioInputProps = {
  /** the identifier of the color */
  color: string;
  /** whether the input is checked */
  checked: boolean;
  /** callback when input is being checked */
  onCheck: () => void;
};

const ColorRadioInput = ({ color, checked, onCheck }: ColorRadioInputProps) => {
  return (
    <input
      aria-label={color}
      className={`color-radio-input color-radio-input--${color}`}
      name="color"
      type="radio"
      checked={checked}
      onChange={onCheck}
    />
  );
};

export default ColorRadioInput;
