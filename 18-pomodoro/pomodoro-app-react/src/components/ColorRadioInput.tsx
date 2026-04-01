import "./ColorRadioInput.scss";

type ColorRadioInputProps = {
  /** the identifier of the color */
  color: string;
  /** whether the input is checked */
  checked: boolean;
  /** callback when input is clicked */
  onClick: () => void;
};

const ColorRadioInput = ({ color, checked, onClick }: ColorRadioInputProps) => {
  return (
    <input
      aria-label={color}
      className={`color-radio-input color-radio-input--${color}`}
      name="color"
      type="radio"
      checked={checked}
      onClick={onClick}
    />
  );
};

export default ColorRadioInput;
