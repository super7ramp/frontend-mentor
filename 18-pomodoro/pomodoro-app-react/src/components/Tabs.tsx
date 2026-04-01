import useSettings from '../hooks/useSettings';
import useTabs from '../hooks/useTabs';
import './Tabs.scss'

const Tabs = () => {
    const [settings] = useSettings();
    const [currentTab, setCurrentTab] = useTabs();
    return (
        <ul className='tabs'>
            {settings?.time.map(({ timer }) => (
                <li key={timer}>
                    <button
                        className={`tab ${currentTab === timer ? "tab--active" : ""}`}
                        onClick={() => setCurrentTab(timer)}
                    >
                        {timer}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Tabs;
