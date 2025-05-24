const shareButtons = document.querySelectorAll('.share-button');
const shareButtonIcons = document.querySelectorAll('.share-button__icon');
const shareModal = document.querySelector('.share-modal');

shareButtons.forEach(button => {
    button.addEventListener('click', () => {
            shareModal.classList.toggle('share-modal--hidden')
            shareButtons.forEach(btn => btn.classList.toggle('share-button--toggled'))
            shareButtonIcons.forEach(icon => icon.classList.toggle('share-button__icon--toggled'))
        }
    )
})
