(ns app.components.deck-explorer
  (:require [app.components.deck-transformer :refer [deck-transformer]]
            [app.hooks.use-deck :refer [use-deck]]
            [uix.core :refer [$ defui]]))

(defui deck-explorer []
  (let [{:keys [cards shuffle category-frequencies filters]} (use-deck)]
    ($ :<>
       ($ deck-transformer {:category-frequencies category-frequencies
                            :shuffle shuffle
                            :& filters})
       ($ :ul
          (map #($ :li {:key (:id %)} (:question %)) cards)))))
