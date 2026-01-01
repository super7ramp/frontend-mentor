(ns app.components.edit.edit-form
  (:require [uix.core :refer [$ defui use-state]]))

(defui edit-form [{:keys [card on-submit]}]
  (let [[modified-card set-modified-card] (use-state card)
        set-modified-card-field (fn [field value]
                                  (set-modified-card (assoc modified-card field value)))]
    ($ :form {:action #(on-submit modified-card)}

       ($ :div.form__entry
          ($ :label {:for "question"}
             "Question")
          ($ :input#question.text-preset-4--regular
             {:name "question"
              :type "text"
              :placeholder "e.g., What is the capital of France?"
              :required true
              :value (:question modified-card)
              :on-change #(set-modified-card-field :answer (.. % -target -value))})
          ($ :p.text-preset-5--regular.form__entry-error
             "Please enter a question."))

       ($ :div.form__entry
          ($ :label {:for "answer"} "Answer")
          ($ :textarea#answer.text-preset-4--regular
             {:name "answer"
              :rows 5
              :placeholder "e.g., Paris"
              :required true
              :value (:answer modified-card)
              :on-change #(set-modified-card-field :answer (.. % -target -value))})
          ($ :p.text-preset-5--regular.form__entry-error
             "Please enter an answer."))

       ($ :div.form__entry
          ($ :label {:for "category"} "Category")
          ($ :input#category.text-preset-4--regular
             {:name "category"
              :type "text"
              :placeholder "e.g., Geography"
              :required true
              :value (:category modified-card)
              :on-change #(set-modified-card-field :category (.. % -target -value))})
          ($ :p.text-preset-5--regular.form__entry-error
             "Please enter a category."))

       ($ :button.primary.with-shadow.form__submit {:type "submit"}
          "Update Card"))))
