# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to
the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).
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

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the
page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long
the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free
option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image
above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot,
feel free to remove this entire section.**

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
- [React](https://reactjs.org/) - JS library
- [SASS](https://sass-lang.com) - CSS preprocessor

### What I learned

#### Use SASS for styling

Previously used Less preprocessor, this time I used Saas (Scss actually).

#### Customizable select elements

I learned that `<select>` elements were notoriously difficult to style. It's improving though with the arrival of
"customizable select elements". Support is not universal yet, but it does work on Chrome.

```scss
.dropDownOptions::picker-icon {
    content: url("../assets/icons/icon-arrow-down.svg");
}

.dropDownOptions,
::picker(select) {
    appearance: base-select;
}

::picker(select) {
    border: none;
    border-radius: 5px;
    @include with-box-shadow;
}

.dropDownOptions > option {
    padding: 4px var(--spacing-300);
}
```

#### Light/dark theme switcher

##### CSS

For the elements:

```css
[data-theme="light"] {
    --fg-color: var(--grey-950);
    --bg-color: white;
    --bg-color-muted: var(--grey-50);
}

[data-theme="dark"] {
    --fg-color: white;
    --bg-color: var(--blue-900);
    --bg-color-muted: var(--blue-950);
}
```

For the switcher button:

```scss
.buttonSwitchTheme::before {
    display: inline-block;
    line-height: 100%;
    vertical-align: center;
    content: url("../assets/icons/icon-switch-to-dark.svg");

    [data-theme="dark"] & {
        content: url("../assets/icons/icon-switch-to-light.svg");
    }
}

.buttonSwitchTheme::after {
    content: "Dark Mode";

    [data-theme="dark"] & {
        content: "Light Mode";
    }
}
```

##### React

For the light/dark theme button itself:

```jsx
import style from "./MenuBar.module.scss"

function MenuBar({onSwitchTheme}) {
    return (
        <menu>
            <p className={style.title}>Where in the world</p>
            <button className={style.buttonSwitchTheme} type="button" onClick={onSwitchTheme}/>
        </menu>
    )
}
```

The state is managed in the `Layout` component. It injects the `data-theme` attribute into the `header` and `main`

```jsx
import MenuBar from "../components/MenuBar.jsx";
import {useEffect, useState} from "react";

function Layout({main}) {
  const [theme, setTheme] = useState(getInitialTheme())
  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  return (
          <>
            <header data-theme={theme}>
              <MenuBar onSwitchTheme={switchTheme}/>
            </header>
            <main data-theme={theme}>
              {main}
            </main>
          </>
  )
}

function getInitialTheme() {
  return localStorage.getItem("theme")
          || (window.matchMedia("(prefers-color-scheme: dark)").matches && "dark")
          || "light";
}
```

#### Lazy loading of images

It's just a matter of adding the `loading="lazy"` attribute to the `<img>` elements:

```jsx
<img className={style.flag} loading="lazy" src={country.flag} alt={`Flag of ${country.name}`}/>
```

### Continued development

- Try Tanstack Query.

### Useful resources

- [Customizable select elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) -
  The reference for the new customization possibilities of `<select>` elements.
- [The best light/dark mode theme toggle in JavaScript](https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f) -
  A very clear explanation of how-to implement a light/dark theme switcher in JavaScript.
- [Using localStorage with React Hooks](https://blog.logrocket.com/using-localstorage-react-hooks/) - Two birds, one
  stone : how to use `localStorage` with `useState` and `useEffect` and how to abstract this by creating a custom hook
  `useLocalStorage`.
- [Lazy loading images](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) - Reference on
  lazy loading.

## Author

- Website - [Antoine Belvire](https://belv.re)
- Frontend Mentor - [@super7ramp](https://www.frontendmentor.io/profile/super7ramp)

## Acknowledgments

All reviewers for their feedback ❤️
