import { useState } from "react";

import iconCloseSvg from "../assets/icons/icon-close.svg";
import useSettings from "../hooks/useSettings";
import ColorRadioInput from "./ColorRadioInput";
import FontRadioInput from "./FontRadioInput";
import NumberInput from "./NumberInput";

import "./SettingsDialog.scss";

type SettingsDialogProps = {
  /** The id of the dialog element. */
  id: string;
};

const SettingsDialog = ({ id }: SettingsDialogProps) => {
  const [settings, applySettings] = useSettings();
  const [currentSettings, setCurrentSettings] = useState(settings);
  const {
    time: timeSettings,
    font: fontSettings,
    color: colorSettings,
  } = currentSettings;

  const updateTimer = (index: number, newDuration: number) => {
    if (!timeSettings[index]) {
      return;
    }
    const updatedTimeSettings = timeSettings.slice();
    updatedTimeSettings[index] = {
      ...timeSettings[index],
      durationInSeconds: newDuration,
    };
    const updatedSettings = { ...currentSettings, time: updatedTimeSettings };
    setCurrentSettings(updatedSettings);
  };

  const selectFont = (font: string) => {
    const updatedFontSettings = { ...fontSettings, selected: font };
    const updatedSettings = { ...currentSettings, font: updatedFontSettings };
    setCurrentSettings(updatedSettings);
  };

  const selectColor = (color: string) => {
    const updatedColorSettings = { ...colorSettings, selected: color };
    const updatedSettings = { ...currentSettings, color: updatedColorSettings };
    setCurrentSettings(updatedSettings);
  };

  return (
    <dialog id={id} className="settings-dialog">
      <div className="settings-dialog__inner">
        <div className="settings-dialog__head">
          <h2>Settings</h2>
          <button
            autoFocus
            className="settings-dialog__close-button"
            command="close"
            commandfor={id}
            // reset dialog settings on close
            onClick={() => setCurrentSettings(settings)}
          >
            <img src={iconCloseSvg} />
          </button>
        </div>
        <form method="dialog">
          <fieldset>
            <h3 className="settings-dialog__timers-heading">Time (minutes)</h3>
            <div className="settings-dialog__timers">
              {timeSettings.map(({ timer, durationInSeconds }, index) => {
                const timerInputId = timer.replaceAll(" ", "-");
                return (
                  <div className="settings-dialog__timer" key={timer}>
                    <label htmlFor={timerInputId}>{timer}</label>
                    <NumberInput
                      id={timerInputId}
                      min={1}
                      value={durationInSeconds / 60}
                      onValueChange={(newValue) =>
                        updateTimer(index, newValue * 60)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <h3>Font</h3>
            <div className="settings-dialog__fonts">
              {fontSettings.fonts.map((font) => (
                <FontRadioInput
                  key={font}
                  font={font}
                  checked={fontSettings.selected === font}
                  onCheck={() => selectFont(font)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <h3>Color</h3>
            <div className="settings-dialog__colors">
              {colorSettings.colors.map((color) => (
                <ColorRadioInput
                  key={color}
                  color={color}
                  checked={colorSettings.selected === color}
                  onCheck={() => selectColor(color)}
                />
              ))}
            </div>
          </fieldset>
          <button
            className="settings-dialog__apply-button"
            onClick={() => applySettings(currentSettings)}
          >
            Apply
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default SettingsDialog;
