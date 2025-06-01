fetch("./data.json")
    .then(response => response.json())
    .then(populateReport)
    .then(addSelectorListeners)

function populateReport(data) {
    const report = document.querySelector(".report")
    for (const {title, timeframes} of data) {
        const sectionElement = document.createElement("section")
        sectionElement.classList.add("report-section", `report-section--${title.toLowerCase().replace(" ", "-")}`)
        sectionElement.innerHTML = formatReportSectionContent({title, timeframes})
        report.appendChild(sectionElement)
    }
}

/* Formats the report section content based on the provided title and timeframes */
function formatReportSectionContent({title, timeframes}) {
    return `
        <header class="report-section__header">
            <h2 class="text-preset-5--medium">${title}</h2>
        </header>
        <div class="report-section__durations report-section__durations--daily">
            <time class="current-duration text-preset-3">${timeframes["daily"].current}hrs</time>
            <div class="text-preset-6">
                Previous - <time class="previous-duration">${timeframes["daily"].previous}hrs</time>
            </div>
        </div>
        <div class="report-section__durations report-section__durations--weekly report-section__durations--selected">
            <time class="current-duration text-preset-3">${timeframes["weekly"].current}hrs</time>
            <div class="text-preset-6">
                Previous - <time class="previous-duration">${timeframes["weekly"].previous}hrs</time>
            </div>
        </div>
        <div class="report-section__durations report-section__durations--monthly">
            <time class="current-duration text-preset-3">${timeframes["monthly"].current}hrs</time>
            <div class="text-preset-6">
                Previous - <time class="previous-duration">${timeframes["monthly"].previous}hrs</time>
            </div>
        </div>
        `
}

/* Adds event listeners to the selectors to toggle the active state and selected durations */
function addSelectorListeners() {
    const dailySelector = document.querySelector(".selectors__item--daily")
    const dailySections = document.querySelectorAll(".report-section__durations--daily")
    const weeklySelector = document.querySelector(".selectors__item--weekly")
    const weeklySections = document.querySelectorAll(".report-section__durations--weekly")
    const monthlySelector = document.querySelector(".selectors__item--monthly")
    const monthlySections = document.querySelectorAll(".report-section__durations--monthly")

    addSelectorListener(dailySelector, dailySections, [weeklySelector, monthlySelector], [weeklySections, monthlySections])
    addSelectorListener(weeklySelector, weeklySections, [dailySelector, monthlySelector], [dailySections, monthlySections])
    addSelectorListener(monthlySelector, monthlySections, [dailySelector, weeklySelector], [dailySections, weeklySections])
}

/* Adds a click event listener to the selector to toggle the active state and selected durations */
function addSelectorListener(selector, sections, otherSelectors, otherSelectorsSections) {
    selector.addEventListener("click", e => {
        e.preventDefault()
        otherSelectors.forEach(otherSelector => otherSelector.classList.remove("selectors__item--active"))
        otherSelectorsSections.forEach(otherSelectorSections =>
            otherSelectorSections.forEach(otherSelectorSection =>
                otherSelectorSection.classList.remove("report-section__durations--selected")
            )
        )
        selector.classList.add("selectors__item--active")
        sections.forEach(section => section.classList.add("report-section__durations--selected"))
    })
}