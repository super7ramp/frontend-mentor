import "./FontRadioInput.scss";

type FontRadioInputProps = {
  /** the identifier of the font */
  font: string;
  /** whether the input is checked */
  checked: boolean;
  /** callback when input is being checked */
  onCheck: () => void;
};

const FontRadioInput = ({ font, checked, onCheck }: FontRadioInputProps) => {
  return (
    <div className="font-radio-input">
      <div aria-hidden={true}>Aa</div>
      <input
        aria-label={font}
        name="font"
        type="radio"
        checked={checked}
        onChange={onCheck}
        value={font}
      />
    </div>
  );
};

export default FontRadioInput;
