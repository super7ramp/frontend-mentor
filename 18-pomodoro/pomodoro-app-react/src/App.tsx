import Logo from "./components/Logo";
import SettingsButton from "./components/SettingsButton";
import SettingsDialog from "./components/SettingsDialog";
import Tabs from "./components/Tabs";
import Timer from "./components/Timer";
import useSettings from "./hooks/useSettings";
import useTabs from "./hooks/useTabs";

import "./App.scss";

function App() {
  const [settings] = useSettings();
  const [currentTab] = useTabs();
  const currentTimer = settings.time.find(({ timer }) => timer === currentTab);

  return (
    <div
      className={`app app--color-${settings.color.selected} app--font-${settings.font.selected}`}
    >
      <header>
        <Logo />
        <Tabs />
      </header>
      <main>
        {currentTimer && (
          <Timer
            key={currentTimer.timer + currentTimer.durationInSeconds}
            durationInSeconds={currentTimer.durationInSeconds}
          />
        )}
        <SettingsButton command="show-modal" commandfor="settings-dialog" />
        <SettingsDialog id="settings-dialog" />
      </main>
    </div>
  );
}

export default App;
