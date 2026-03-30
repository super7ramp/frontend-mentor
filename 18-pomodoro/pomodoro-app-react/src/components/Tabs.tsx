import './Tabs.scss'

const Tabs = () => {
    return (
        <ul className='tabs'>
            <li className='tab tab--active'>pomodoro</li>
            <li className='tab'>short break</li>
            <li className='tab'>long break</li>
        </ul>
    )
}

export default Tabs;
