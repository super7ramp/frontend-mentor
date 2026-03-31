import { useState } from 'react';

import iconArrowUp from '../assets/icons/icon-arrow-up.svg';
import iconArrowDown from '../assets/icons/icon-arrow-down.svg';
import iconCloseSvg from '../assets/icons/icon-close.svg';
import useSettings from '../hooks/useSettings';

import './SettingsDialog.scss';

type SettingsDialogProps = {
    /** The id of the dialog element. */
    id: string
}

const SettingsDialog = ({ id }: SettingsDialogProps) => {
    const [settings, applySettings] = useSettings();
    const [currentSettings, setCurrentSettings] = useState(settings);

    const updateTimer = (index: number, newDuration: number) => {
        if (!currentSettings?.time[index]) {
            return;
        }
        const updatedTimeSettings = currentSettings.time.slice()
        updatedTimeSettings[index] = { ...currentSettings.time[index], durationInSeconds: newDuration }
        const updatedSettings = { ...currentSettings, time: updatedTimeSettings }
        setCurrentSettings(updatedSettings)
    }

    return (
        <dialog id={id} className="settings-dialog">
            <div className="settings-dialog__head">
                <h2>Settings</h2>
                <button
                    autoFocus
                    className="settings-dialog__close-button"
                    command="close"
                    commandfor={id}>
                    <img src={iconCloseSvg}></img>
                </button>
            </div>
            <form method="dialog">
                <fieldset>
                    <h3>Time (minutes)</h3>
                    <div className='settings-dialog__timers'>
                        {currentSettings?.time.map(({ timer, durationInSeconds }, index) => {
                            const timerInputId = timer.replaceAll(' ', '-');
                            return (
                                <div className='settings-dialog__timer' key={timer}>
                                    <label htmlFor={timerInputId}>{timer}</label>
                                    <input
                                        id={timerInputId}
                                        type="number"
                                        value={durationInSeconds / 60}
                                        onChange={(e) => updateTimer(index, e.target.valueAsNumber * 60)}>
                                    </input>
                                    <div className='settings-dialog__timer-buttons'>
                                        <button
                                            type='button'
                                            onClick={() => updateTimer(index, durationInSeconds + 60)}>
                                            <img src={iconArrowUp} />
                                        </button>
                                        <button type='button'
                                            onClick={() => updateTimer(index, durationInSeconds - 60)}>
                                            <img src={iconArrowDown} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </fieldset>
                <fieldset>
                    <h3>Font</h3>
                </fieldset>
                <fieldset>
                    <h3>Color</h3>
                </fieldset>
                <button
                    className="settings-dialog__apply-button"
                    onClick={() => applySettings(currentSettings)}>
                    Apply
                </button>
            </form>
        </dialog>
    );
}

export default SettingsDialog;
