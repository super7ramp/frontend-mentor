(ns app.components.edit.deck-explorer
  (:require [app.components.deck-transformer :refer [deck-transformer]]
            [app.components.edit.card-summary :refer [card-summary]]
            [app.hooks.use-deck :refer [use-deck]]
            [uix.core :refer [$ defui use-state]]))

(defui deck-explorer
  "
   A component allowing to explore the deck of cards.

   Cards may be displayed progressively using the `display-chunk-size` parameter.
  "
  [{:keys [display-chunk-size] :or {display-chunk-size 12}}]
  (let [{:keys [cards shuffle category-frequencies filters]} (use-deck)
        [displayed-count set-displayed-count] (use-state display-chunk-size)
        more-to-display (< displayed-count (count cards))]
    ($ :div.deck-explorer
       ($ deck-transformer {:category-frequencies category-frequencies
                            :shuffle shuffle
                            :& filters})
       ($ :ul.deck-explorer__card-summaries
          (->> cards
               (take displayed-count)
               (map #($ :li {:key (:id %)} ($ card-summary %)))))
       (when more-to-display
         ($ :button.with-shadow.deck-explorer__load-more
            {:on-click #(set-displayed-count (+ displayed-count display-chunk-size))}
            "Load more")))))
