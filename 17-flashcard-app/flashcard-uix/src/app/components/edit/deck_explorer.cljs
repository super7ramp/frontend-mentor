(ns app.components.edit.deck-explorer
  (:require [app.components.edit.card-summary :refer [card-summary]]
            [app.components.deck-transformer :refer [deck-transformer]]
            [app.hooks.use-deck :refer [use-deck]]
            [uix.core :refer [$ defui use-state]]))

(defui deck-explorer []
  (let [{:keys [cards shuffle category-frequencies filters]} (use-deck)
        [more-to-load set-more-load] (use-state true)]
    ($ :<>
       ($ deck-transformer {:category-frequencies category-frequencies
                            :shuffle shuffle
                            :& filters})
       ($ :ul.deck-explorer__card-summaries
          (map #($ :li {:key (:id %)} ($ card-summary %)) cards))
       (when more-to-load
         ($ :button.with-shadow {:on-click #(set-more-load not)}"Load more")))))
