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

const successDialog = document.querySelector(".success-dialog")
const successDialogEmail = successDialog.querySelector(".success-dialog__email")
form.addEventListener("submit", e => {
    e.preventDefault()
    if (!formInputEmail.validity.valid) {
        formErrorEmail.innerHTML = "Valid email required"
        return
    }
    successDialogEmail.textContent = formInputEmail.value
    successDialog.showModal()
})

const dismissButton = document.querySelector(".success-dialog__close-button")
dismissButton.addEventListener("click", () => {
        successDialogEmail.textContent = ""
        successDialog.close()
    }
)
