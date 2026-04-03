# Frontend Mentor - Pomodoro app solution

This is a solution to the [Pomodoro app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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

- [x] Set a pomodoro timer and short & long break timers
- [x] Customize how long each timer runs for
- [x] See a circular progress bar that updates every minute and represents how far through their timer they are
- [x] Customize the appearance of the app with the ability to set preferences for colors and fonts

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- SASS
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

#### Drawing a circular progressbar in pure CSS

```scss
// The custom property defintion is required for the animation
@property --progress {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

.timer {
  // ...

  &__arc {
    --_thickness: 0.85rem;
    --_progress: calc(360deg * var(--progress));
    --_edge: /var(--_thickness) var(--_thickness) no-repeat
      radial-gradient(50% 50%, #000 97%, #0000);
    padding: var(--_thickness);
    margin: var(--_thickness);
    border-radius: 50%;
    background: var(--accent-color);
    mask:
      // start rounded edge
      top var(--_edge),
      // end rounded edge
      calc(50% + 50% * sin(var(--_progress)))
        calc(50% - 50% * cos(var(--_progress))) var(--_edge),
      // a transparent gradient that mask the inner part of the progress gradient
      linear-gradient(#0000 0 0) content-box intersect,
      // the progress gradient
      conic-gradient(#000 var(--_progress), #0000 0);
    transition: --progress 0.5s;
  }
}
```

### Open/close a modal with the invoker API

Usually I show/close a `dialog` element [using its JavaScript API](https://github.com/super7ramp/frontend-mentor/tree/main/13-product-list-with-cart/product-list-with-cart-react#use-modal-with-react).

Here I tried the relatively recent [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) (baseline 2025), which allows to add the show/close behaviour to buttons via the `command` and `commandfor` HTML attributes, without JavaScript:

For the opening:

```tsx
<SettingsButton command="show-modal" commandfor="settings-dialog" />
<SettingsDialog id="settings-dialog" />
```

For the closing:

```tsx
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
```

### Theming

Used a React context to store the settings:

```ts
import { createContext } from "react";

type TimeSettings = {
  timer: string;
  durationInSeconds: number;
};

type FontSettings = {
  fonts: string[];
  selected: string;
};

type ColorSettings = {
  colors: string[];
  selected: string;
};

export type Settings = {
  time: TimeSettings[];
  font: FontSettings;
  color: ColorSettings;
};

type SettingsContextT = [Settings, (settings: Settings) => void];

export const DEFAULT_SETTINGS = {
  time: [
    {
      timer: "pomodoro",
      durationInSeconds: 25 * 60,
    },
    {
      timer: "short break",
      durationInSeconds: 5 * 60,
    },
    {
      timer: "long break",
      durationInSeconds: 15 * 60,
    },
  ],
  font: {
    fonts: ["font-1", "font-2", "font-3"],
    selected: "font-1",
  },
  color: {
    colors: ["color-1", "color-2", "color-3"],
    selected: "color-1",
  },
};

export const SettingsContext = createContext<SettingsContextT>([
  DEFAULT_SETTINGS,
  () => {},
]);
```

Read it to dynamically set theme-related classes:

```tsx
function App() {
  const [settings] = useSettings();
  //...
  return (
    <div
      className={`app app--${settings.color.selected} app--${settings.font.selected}`}
    >
      {/* ... */}
    </div>
  );
}
```

Then it's just some repetitive CSS usage of CSS variable:

```scss
.app {
  display: flex;
  flex-direction: column;
  gap: $spacing-600;
  margin: $spacing-400 $spacing-300;

  &--color-1 {
    --accent-color: #{$accent-color-1};
  }

  &--color-2 {
    --accent-color: #{$accent-color-2};
  }

  &--color-3 {
    --accent-color: #{$accent-color-3};
  }

  &--font-1 {
    @include use-font-1;
  }

  &--font-2 {
    @include use-font-2;
  }

  &--font-3 {
    @include use-font-3;
  }
}
```

Fonts were a bit tedious to write, see [`_typography.scss`](./src/styles/_typography.scss). For each combination of (font, preset, preset level, mobile or not), there are several CSS properties to set (`font`, `letter-spacing` and `line-height`). Maybe there is a smarter way to do it.

### Continued development

Things I'd like to improve:

- Accessibility: There are some aria attributes to add to make the timer accessible.
- Animation: On tab switching, on timer end.

### Useful resources

- [Create an animated, circular progress bar](https://www.youtube.com/watch?v=MXWP56LUI3g) - A Kevin Powel video on how to create a circular progressbar. Very instructive, the only info I missed was how to implement rounded edges (progressbar edges are not rounded in the video, he quickly mentions it's possible to do it with svg though).
- [css-shape.com](https://css-shape.com/arc/) - For the circular progressbar rounded edges

## Author

- Website - [Antoine Belvire](https://belv.re)
- Frontend Mentor - [@super7ramp](https://www.frontendmentor.io/profile/super7ramp)

## Acknowledgments

All reviewers for their feedback ❤️
