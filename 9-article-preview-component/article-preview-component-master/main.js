const shareButtons = document.querySelectorAll('.share-button');
const shareModal = document.querySelector('.share-modal');

shareButtons.forEach(button => {
    button.addEventListener('click', () =>
        shareModal.classList.toggle('hidden')
    )
})
