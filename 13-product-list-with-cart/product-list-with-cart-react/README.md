# Frontend Mentor - Product list with cart solution

This is a solution to
the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d).
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

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)

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

### What I learned

#### Using CSS modules

I learned how to use CSS modules in a React project to scope styles locally. This helps avoid class name conflicts and
makes styles easier to manage.

Structure:

```
src/components/
├── AddToCartButton.jsx
├── AddToCartButton.module.css
├── Cart.jsx
├── Cart.module.css
├── Dessert.jsx
├── Dessert.module.css
├── Desserts.jsx
├── Desserts.module.css
├── Order.jsx
├── Order.module.css
├── OrderConfirmedModal.jsx
├── OrderConfirmedModal.module.css
├── PrimaryButton.jsx
└── PrimaryButton.module.css
```

Importing a CSS module in a component:

```js
import style from "./AddToCartButton.module.css"

/* ... */

function Spinner({img, onClick}) {
    return (
        <input className={style.spinner} // << style from CSS module
               type="image"
               src={img}
               alt="Spinner icon"
               onClick={onClick}
        />
    )
}
```

A problem I encountered was CSS class names not being valid JavaScript identifiers (e.g., `block__element--modifier`).
There seems to be an automatic conversion to a valid camel-cased identifier (since IDE auto-completion works) but it
didn't actually work in the browser, so I had to abandon the BEM convention and use camel-case class names instead.

#### Using `<picture>` and `<source>` elements

Like this:

```js
function DessertPicture({image, name}) {
    return (
        <picture>
            <source srcSet={`/src/${image.tablet}`} media="(40.625rem <= width < 64rem)"/>
            <source srcSet={`/src/${image.desktop}`} media="(64rem <= width)"/>
            <img src={`/src/${image.mobile}`} alt={name}/>
        </picture>
    )
}
```

It's a bit weird to put media queries in HTML/Js, but it works! I don't see how to do it in pure CSS anyway when
image name is dynamic 🤔

#### Use `modal` with React

I really like the (relatively) new `<dialog>` HTML element. However, it's not straightforward to use with React, there's
no built-in `showDialog()`/ `close()` function accessible.

I used `useRef()` to get a reference to the dialog element and then call the `showModal()` and `close()` methods:

```js

function App() {
    const [cartItems, setCartItems] = useState([])
    const modalRef = useRef(null)

    const showModal = () => {
        modalRef.current?.showModal()
    }
  
    const resetCartAndCloseModal = () => {
        setCartItems([]);
        modalRef.current?.close()
    }
    
    /* ... */
  
    return (
        <main>
            {/* ... */}
            <Cart items={cartItems}
                  onConfirmOrder={showModal}/>
                
            <OrderConfirmedModal items={cartItems}
                                 ref={modalRef}
                                 onStartNewOrder={resetCartAndCloseModal}/>
        </main>
    )
}
```

### Continued development

No specific plans for continued development at the moment.

### Useful resources

- [Animate the dialog element](https://frontendmasters.com/blog/animating-dialog/) - A blog post explaining how to
  animate the `<dialog>` element.
- [CSSFilterConverter](https://cssfilterconverter.com/) - An online tool that helps convert colors into CSS `filter`
  effects; I used it to change svg icon colors when hovered.

## Author

- Website - [Antoine Belvire](https://belv.re)
- Frontend Mentor - [@super7ramp](https://www.frontendmentor.io/profile/super7ramp)

## Acknowledgments

All reviewers for their feedback ❤️

