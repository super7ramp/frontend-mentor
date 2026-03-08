(ns app.components.study.card
  (:require [app.components.badge :refer [badge]]
            [app.components.progress-bar :refer [progress-bar]]
            [uix.core :as uix :refer [defui $]]))

(defui card-body [{:keys [card-data revealed]}]
  ($ :div.card__body
     ($ :div {:aria-hidden revealed}
        ($ :p.card__question.text-preset-1
           (:question card-data))
        ($ :p.card__click-to-reveal.text-preset-4--medium
           "Click to reveal answer"))
     ($ :div {:aria-hidden (not revealed)}
        ($ :p.card__answer-header.text-preset-4--medium
           "Answer:")
        ($ :p.card__answer.text-preset-2
           (:answer card-data)))))

(defui card
  "A flashcard ⚡ Two sides: recto contains the question, verso contains the answer."
  [{:keys [card-data revealed set-revealed] :as card-props}]
  ($ :button.card {:on-click #(set-revealed (not revealed))
                   :class-name (when revealed "card--verso")}
     ($ badge (:category card-data))
     ($ card-body card-props)
     ($ progress-bar {:known-count (:knownCount card-data)})))
