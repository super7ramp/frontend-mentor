fetch("./data.json")
    .then(response => response.json())
    .then(populateReport)
    .then(addSelectorListeners)

function populateReport(data) {
    const report = document.querySelector(".report")
    for (const datum of data) {
        const section = newSectionElementFromData(datum)
        report.appendChild(section)
    }
}

/* Creates a new section element based on the provided data */
function newSectionElementFromData({title, timeframes}) {
    const sectionElement = document.createElement("section")
    sectionElement.classList.add("report-section", `report-section--${title.toLowerCase().replace(" ", "-")}`)
    sectionElement.innerHTML = formatReportSectionContent({title, timeframes})
    return sectionElement
}

/* Formats the report section content based on the provided title and timeframes */
function formatReportSectionContent({title, timeframes}) {
    return `
        <div class="report-section__inner">
            <header class="report-section__header">
                <h2 class="report-section__title">${title}</h2>
            </header>
            <div class="report-section__durations report-section__durations--daily">
                <time class="current-duration">${timeframes["daily"].current}hrs</time>
                <div>
                    Yesterday - <time class="previous-duration">${timeframes["daily"].previous}hrs</time>
                </div>
            </div>
            <div class="report-section__durations report-section__durations--weekly report-section__durations--selected">
                <time class="current-duration">${timeframes["weekly"].current}hrs</time>
                <div>
                    Last Week - <time class="previous-duration">${timeframes["weekly"].previous}hrs</time>
                </div>
            </div>
            <div class="report-section__durations report-section__durations--monthly">
                <time class="current-duration">${timeframes["monthly"].current}hrs</time>
                <div>
                    Last Month - <time class="previous-duration">${timeframes["monthly"].previous}hrs</time>
                </div>
            </div>
        </div>
        `
}

/* Adds event listeners to the selectors to toggle the active state and selected durations */
function addSelectorListeners() {
    for (const timeframe of ["daily", "weekly", "monthly"]) {
        addListenerForTimeframe(timeframe)
    }
}

/* Adds an event listener to the selector for the specified timeframe */
function addListenerForTimeframe(timeframe) {
    const selector = document.querySelector(`.selectors__item--${timeframe}`)
    const otherSelectors = document.querySelectorAll(`.selectors__item:not(.selectors__item--${timeframe})`)
    const sections = document.querySelectorAll(`.report-section__durations--${timeframe}`)
    const otherSections = document.querySelectorAll(`.report-section__durations:not(.report-section__durations--${timeframe})`)

    selector.addEventListener("click", (e) => {
        e.preventDefault()
        otherSelectors.forEach(otherSelector => otherSelector.classList.remove("selectors__item--active"))
        otherSections.forEach(otherSection => otherSection.classList.remove("report-section__durations--selected"))
        selector.classList.add("selectors__item--active")
        sections.forEach(section => section.classList.add("report-section__durations--selected"))
    })
}
