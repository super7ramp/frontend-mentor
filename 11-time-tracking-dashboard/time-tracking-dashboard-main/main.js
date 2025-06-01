const addSelectorListener = (selector, sections, otherSelectors, otherSelectorsSections) => {
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

const dailySelector = document.querySelector(".selectors__item--daily")
const dailySections = document.querySelectorAll(".report-section__durations--daily")
const weeklySelector = document.querySelector(".selectors__item--weekly")
const weeklySections = document.querySelectorAll(".report-section__durations--weekly")
const monthlySelector = document.querySelector(".selectors__item--monthly")
const monthlySections = document.querySelectorAll(".report-section__durations--monthly")

addSelectorListener(dailySelector, dailySections, [weeklySelector, monthlySelector], [weeklySections, monthlySections])
addSelectorListener(weeklySelector, weeklySections, [dailySelector, monthlySelector], [dailySections, monthlySections])
addSelectorListener(monthlySelector, monthlySections, [dailySelector, weeklySelector], [dailySections, weeklySections])

fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        for (const {title, timeframes} of data) {
            const sectionName = title.toLowerCase().replace(" ", "-")
            const section = document.querySelector(`.report-section--${sectionName}`)
            for (const timeframeName in timeframes) {
                const durationsClass = `.report-section__durations--${timeframeName}`
                const durations = section.querySelector(durationsClass)
                const {previous, current} = timeframes[timeframeName]
                durations.querySelector(".current-duration").textContent = current + "hrs"
                durations.querySelector(".previous-duration").textContent = previous + "hrs"
            }
        }
    })
