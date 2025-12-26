(ns app.components.card
  (:require [app.components.progressbar :refer [progress-bar]]
            [uix.core :as uix :refer [defui $]]))

(defui card-recto [{:keys [question category knownCount set-revealed]}]
  ($ :button.card {:on-click #(set-revealed true)}
     ($ :p.card__category.text-preset-6 category)
     ($ :div.card__body
        ($ :p.text-preset-1--mobile question)
        ($ :p.card__heading.text-preset-4--medium "Click to reveal answer"))
     ($ progress-bar {:known-count knownCount})))

(defui card-verso [{:keys [answer category knownCount set-revealed]}]
  ($ :button.card.card--verso {:on-click #(set-revealed false)}
     ($ :p.card__category.text-preset-6 category)
     ($ :div.card__body
        ($ :p.card__heading.text-preset-4--medium "Answer:")
        ($ :p.text-preset-1--mobile answer))
     ($ progress-bar {:known-count knownCount})))

(defui card [{:keys [card-data revealed set-revealed]}]
  (let [card-data-and-set-revealed (assoc card-data :set-revealed set-revealed)]
    (if-not revealed
      ($ card-recto card-data-and-set-revealed)
      ($ card-verso card-data-and-set-revealed))))
