import iconSettingsSvg from "../assets/icons/icon-settings.svg";

import "./SettingsButton.scss";

const SettingsButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button {...props} className={`settings-button ${props.className ?? ""}`}>
      <img src={iconSettingsSvg} alt="" />
      <span className="visually-hidden">Open Settings</span>
    </button>
  );
};

export default SettingsButton;
