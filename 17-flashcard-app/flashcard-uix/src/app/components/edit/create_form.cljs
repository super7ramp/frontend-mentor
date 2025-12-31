(ns app.components.edit.create-form
  (:require [uix.core :refer [$ defui]]))

(defui create-form
  "A form allowing to create a new card."
  []
  ($ :form#create-form.block {:action #(js/console.log "Submitted!" %)}

     ($ :div.create-form__entry
        ($ :label {:for "question"} "Question")
        ($ :input#question.text-preset-4--regular {:name "question"
                                                   :type "text"
                                                   :placeholder "e.g., What is the capital of France?"
                                                   :required true})
        ($ :p.text-preset-5--regular.create-form__entry-error "Please enter a question."))

     ($ :div.create-form__entry
        ($ :label {:for "answer"} "Answer")
        ($ :textarea#answer.text-preset-4--regular {:name "answer"
                                                    :rows 5
                                                    :placeholder "e.g., Paris"
                                                    :required true})
        ($ :p.text-preset-5--regular.create-form__entry-error "Please enter an answer."))

     ($ :div.create-form__entry
        ($ :label {:for "category"} "Category")
        ($ :input#category.text-preset-4--regular {:name "category"
                                                   :type "text"
                                                   :placeholder "e.g., Geography"
                                                   :required true})
        ($ :p.text-preset-5--regular.create-form__entry-error "Please enter a category."))

     ($ :button.with-shadow.create-form__submit {:type "submit"} "Create Card")))
