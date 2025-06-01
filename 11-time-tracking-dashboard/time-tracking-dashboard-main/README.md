# Frontend Mentor - Time tracking dashboard solution

This is a solution to
the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw).
Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![](./screenshot.jpg)

TODO

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Less

### What I learned

#### Insert elements in DOM

```js
function populateReport(data) {
    const report = document.querySelector(".report")
    for (const {title, timeframes} of data) {
        const sectionElement = document.createElement("section")
        sectionElement.classList.add("report-section", `report-section--${title.toLowerCase().replace(" ", "-")}`)
        sectionElement.innerHTML = formatReportSectionContent({title, timeframes})
        report.appendChild(sectionElement)
    }
}
```

#### Less (CSS preprocessor)

Mainly for applying font-styles to classes with mixins and for nesting media queries:

```less
.profile__name {
    .text-preset-4();
    @media (min-width: 1000px) {
        .text-preset-2();
    }
}
```

Very easy to get started:

```shell
mv styles.less styles.css
npx less styles.less styles.css
```

#### `grid-template-areas`

Used `grid-template-areas` to name positions in the grid for the first time:

```less
.report {
    display: grid;
    gap: var(--spacing-300);
    grid-template-areas:
        "head"
        "."
        "."
        "."
        "."
        "."
        ".";

    @media (min-width: 600px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
            "head head head"
            ". . ."
            ". . .";
    }

    @media (min-width: 1000px) {
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
            "head . . ."
            "head . . .";
        max-width: 1116px;
    }
}

.report__header {
    grid-area: head;
}
```

### Continued development

Reimplement in React.

### Useful resources

- [Less main page](https://lesscss.org/) - It contains everything to get started with Less.

## Author

- Website - [Antoine Belvire](https://belv.re)
- Frontend Mentor - [@super7ramp](https://www.frontendmentor.io/profile/super7ramp)

## Acknowledgments

All reviewers for their feedback ❤️
