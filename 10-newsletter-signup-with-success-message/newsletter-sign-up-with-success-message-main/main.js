const formInputEmail = document.querySelector("#signup-form-email__input")
const formErrorEmail = document.querySelector("#signup-form-email__error")
const form = document.querySelector(".signup-form")
form.addEventListener("input", e => {
    if (!formInputEmail.validity.valid) {
        formErrorEmail.innerHTML = "Valid email required"
        return;
    }
    formErrorEmail.innerHTML = ""
})

const successModal = document.querySelector(".success-modal")
const successEmail = successModal.querySelector(".success-modal__email")
form.addEventListener("submit", e => {
    e.preventDefault()
    if (!formInputEmail.validity.valid) {
        formErrorEmail.innerHTML = "Valid email required"
        return
    }
    successEmail.textContent = formInputEmail.value
    successModal.classList.add("success-modal--visible")
})

const dismissButton = document.querySelector(".success-modal__dismiss-button")
dismissButton.addEventListener("click", () => {
        successEmail.textContent = ""
        successModal.classList.remove("success-modal--visible")
    }
)
