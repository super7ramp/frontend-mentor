# Frontend Mentor - Flashcard app solution

This is a solution to the [Flashcard app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/flashcard-app). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

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

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

#### Flashcard Management

- Create new flashcards with a question, answer, and category
- Edit existing flashcards to update their details
- Delete flashcards they no longer need
- See form validation messages when trying to submit a card without all fields completed
- View all their flashcards in a grid layout
- See flashcard details including question, answer, category, and mastery progress

#### Study Mode

- Study flashcards one at a time in Study Mode
- Click on a flashcard to reveal the answer
- Mark a flashcard as known by clicking "I Know This" to track mastery progress
- Navigate between flashcards using Previous and Next buttons
- See which card they're currently viewing (e.g., "Card 1 of 40")
- Track mastery progress for each card on a scale of 0 to 5
- Reset progress on a flashcard to start learning it again

#### Filtering & Organization

- Filter flashcards by selecting one or multiple categories
- See the number of cards in each category within the filter dropdown
- Hide mastered cards to focus on cards that still need practice
- Shuffle flashcards to randomize the study order

#### Statistics & Progress

- View study statistics showing total cards, mastered, in progress, and not started counts

#### UI & Navigation

- Toggle between Study Mode and All Cards views
- Load more flashcards when viewing the full card list with more than 12 cards
- See a toast message when a card is created, updated, or deleted
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app using only their keyboard

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Mobile-first workflow
- [ClojureSript](https://clojurescript.org/)
- [UIx](https://uix-cljs.dev/) (ClojureScript wrapper over [React](https://reactjs.org/))

### What I learned

#### ClojureScript

TODO

#### UIx

TODO

#### Compose backgrounds

TODO

#### Limitations of `data-*` attributes

When implementing progress bar. TODO.

#### Implementing my own select

Because native select is hard to style. TODO.

#### Customizing checkboxes

Checkboxes are not the easiest things to style but with `appareance: none` and a background image for the tick, it's ok:

```css
input[type=checkbox] {
    appearance: none;
    height: 1rem;
    width: 1rem;
    border: var(--border-solid);
    border-radius: var(--radius-4);
}

input[type=checkbox]:checked {
    background-color: var(--yellow-500);
    background-image: url("data:image/svg+xml,%3Csvg width='9' height='7' viewBox='0 0 9 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.98828 0.0976562C8.08594 0 8.24219 0 8.32031 0.0976562L8.88672 0.644531C8.96484 0.742188 8.96484 0.898438 8.88672 0.976562L3.02734 6.83594C2.92969 6.93359 2.79297 6.93359 2.69531 6.83594L0.078125 4.23828C0 4.14062 0 3.98438 0.078125 3.90625L0.644531 3.33984C0.722656 3.26172 0.878906 3.26172 0.976562 3.33984L2.85156 5.23438L7.98828 0.0976562Z' fill='%232E1401'/%3E%3C/svg%3E%0A");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 62.5%;
}

input[type=checkbox]:not(:focus):hover {
    box-shadow: 1px 1px 0 var(--neutral-900);
}
```

#### CSS without SCSS is not as nice

I went full CSS because the UIx template didn't setup SCSS and I didn't want to spend more time on tool setup. I took that like an opportunity to try again a "vanilla CSS" approach and see what can be done with modern CSS.

##### Nesting

CSS has now `&` but it is not as nice as in SCSS when using BEM, e.g. one can't write in CSS:

```scss
my-block {
    &__my-element {
        /* something */
    }
}
```

One has to write:

```scss
my-block {
    & my-block__my-element {
        /* something */
    }
}
```

##### Mixins

Not available yet in any browser. It's a shame, I really like composing SCSS mixins in CSS classes, instead of composing utility classes inside the HTML.

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Antoine Belvire](https://belv.re)
- Frontend Mentor - [@super7ramp](https://www.frontendmentor.io/profile/super7ramp)

## Acknowledgments

All reviewers for their feedback ❤️
