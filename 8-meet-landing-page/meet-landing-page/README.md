# Frontend Mentor - Meet landing page solution

This is a solution to
the [Meet landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/meet-landing-page-rbTDS6OUR).
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

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [GitHub](https://github.com/super7ramp/frontend-mentor/8-meet-landing-page)
- Live Site
  URL: [GitHub Pages](https://super7ramp.github.io/frontend-mentor/8-meet-landing-page/meet-landing-page)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

#### Using the `overflow` property

So that heroes images are cut at viewport limits without scrollbar:

```css
body {
    overflow-x: hidden;
}
```

#### Inserting images as pseudo-elements with `::before` and `::after`

Like this:

```css
.zero {
    display: flex;
    flex-direction: column;
}

.zero::before {
    content: url("assets/tablet/image-hero.png");
}
```

Or for desktop view:

```css
@media (1000px <= width) {
    .zero {
        flex-direction: row;
    }

    .zero::before {
        content: url("assets/desktop/image-hero-left.png");
    }

    .zero::after {
        content: url("assets/desktop/image-hero-right.png");
    }
}
```

An issue that arises with mobile screen is that the image cannot be resized with `width`/`height` when content is
replaced (see this post
on [Stack Overflow](https://stackoverflow.com/questions/14978807/can-you-apply-a-width-to-a-before-after-pseudo-element-contenturlimage)).

A solution is to set the image as `background-image` of the pseudo-element:

```css
.zero::before {
    background-image: url("assets/tablet/image-hero.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: 433px;
}
```

But there is an issue: `background-image` cannot [overflow](#using-the-overflow-property) its parent!

The solution I found is to set the image as `content` and resize the image using `transform`.

```css
.zero::before {
    content: url("assets/tablet/image-hero.png");
    transform: scale(0.53);
}
```

#### Styling page number with the border of a pseudo-element

There's probably a nicer way to do it (svg?) but it works.

```css
.page-number::before {
    content: "";
    border-right: 1px solid var(--slate-300);
    height: 80px;
    width: 0;
}
```

#### Applying a filter to a background image

I know it doesn't respect the design, but I find it's an elegant solution nevertheless:

```css
footer {
    background-image: url("assets/mobile/image-footer.jpg"), linear-gradient(var(--cyan-600));
}
```

### Continued development

Keep experimenting with overflows.

### Useful resources

- [Applying CSS to pseudo-elements](https://www.bennadel.com/blog/3857-applying-css-flexbox-to-pseudo-elements.htm) -
  For the images inserted as pseudo-element contents.
- [How do I resize an image in a pseudo-element?](https://stackoverflow.com/questions/19254376/how-do-i-resize-an-image-in-a-pseudo-element) -
  For the images inserted as pseudo-element contents.
- [Apply a filter to a background image](https://css-tricks.com/apply-a-filter-to-a-background-image/) - For the blue
  effect on the footer image.

## Author

- Website - [Antoine Belvire](https://belv.re)
- Frontend Mentor - [@super7ramp](https://www.frontendmentor.io/profile/super7ramp)

## Acknowledgments

All reviewers for their feedback ❤️
