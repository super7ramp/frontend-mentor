(ns app.components.edit.card-summary
  (:require [app.components.badge :refer [badge]]
            [app.components.edit.edit-menu :refer [edit-menu]]
            [app.components.progress-bar :refer [progress-bar]]
            [uix.core :refer [$ defui]]))

(defui card-summary
  "A card summary inside the deck explorer, with an access to the edit form."
  [{:keys [id question answer category knownCount] :as card}]
  ($ :article.block.card-summary
     ($ :h2.text-preset-3 question)
     ($ :div.text-preset-5.card-summary__answer
        ($ :p.card-summary__answer-heading "Answer:")
        ($ :p answer))
     ($ :footer.card-summary__footer
        ($ :div
           ($ badge {:class-name "card-summary__category"} category))
        ($ :div
           ($ progress-bar {:known-count knownCount}))
        (let [edit-menu-id (str "edit-menu-" id)]
          ($ :div
             ($ :button.card-summary__menu-button {:title "Open Edit Menu"
                                                   :popover-target edit-menu-id})
             ($ edit-menu {:id edit-menu-id :card card}))))))
