(ns app.components.edit.card-summary
  (:require [app.components.badge :refer [badge]]
            [app.components.progress-bar :refer [progress-bar]]
            [uix.core :refer [$ defui]]))

(defui card-summary
  "A card summary inside the deck explorer, with an access to the edit form."
  [{:keys [question answer category knownCount]}]
  ($ :article.block.card-summary
     ($ :h2.text-preset-3 question)
     ($ :div.text-preset-5
        ($ :p.card-summary__answer-heading "Answer:")
        ($ :p answer))
     ($ :footer.card-summary__footer
        ($ :div
           ($ badge {:class-name "card-summary__category"} category))
        ($ :div
           ($ progress-bar {:known-count knownCount}))
        ($ :div
           ($ :button.card-summary__menu-button)))))
