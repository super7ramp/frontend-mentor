import iconSettingsSvg from "../assets/icons/icon-settings.svg";

import "./SettingsButton.scss";

const SettingsButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button className={`settings-button ${props.className}`} {...props}>
      <img src={iconSettingsSvg} />
    </button>
  );
};

export default SettingsButton;
