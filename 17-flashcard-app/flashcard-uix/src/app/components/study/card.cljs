(ns app.components.study.card
  (:require [app.components.badge :refer [badge]]
            [app.components.progress-bar :refer [progress-bar]]
            [uix.core :as uix :refer [defui $]]))

(defui card-body-recto [{:keys [question]}]
  ($ :<>
     ($ :p.text-preset-1 question)
     ($ :p.card__secondary-text.text-preset-4--medium "Click to reveal answer")))

(defui card-body-verso [{:keys [answer]}]
  ($ :<>
     ($ :p.card__secondary-text.text-preset-4--medium "Answer:")
     ($ :p.text-preset-2 answer)))

(defui card
  "A flashcard ⚡ Two sides: recto contains the question, verso contains the answer."
  [{:keys [card-data revealed set-revealed]}]
  (let [{:keys [category question answer knownCount]} card-data]
    ($ :button.card {:on-click #(set-revealed (not revealed)) 
                     :class-name (when revealed "card--verso")}
       ($ badge category)
       ($ :div.card__body
          (if-not revealed
            ($ card-body-recto {:question question})
            ($ card-body-verso {:answer answer})))
       ($ progress-bar {:known-count knownCount}))))
