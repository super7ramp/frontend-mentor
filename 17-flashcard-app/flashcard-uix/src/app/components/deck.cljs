(ns app.components.deck
  (:require [app.components.card :refer [card]]
            [app.components.deck-transformer :refer [deck-transformer]]
            [app.hooks.use-deck :refer [use-deck]]
            [app.hooks.use-selector :refer [use-selector]]
            [uix.core :refer [$ defui use-state]]))

(defui card-interactor [{:keys [card-data set-known-count] :as props}]
  (let [known-count (:knownCount card-data)
        inc-known-count #(when (< known-count 5) (set-known-count (inc known-count)))
        reset-known-count #(set-known-count 0)]
    ($ :div.card-interactor
       ($ card props)
       ($ :div.card-buttons
          ($ :button.with-shadow.card-buttons__i-know-this {:on-click inc-known-count} "I Know This")
          ($ :button.with-shadow.card-buttons__reset {:on-click reset-known-count} "Reset Progress")))))

(defui card-selector [{:keys [current total select-previous select-next]}]
  ($ :div.card-selector
     ($ :button.card-selector__previous {:title "Previous" :on-click select-previous})
     ($ :p "Card " (inc current) " of " total)
     ($ :button.card-selector__next {:title "Next" :on-click select-next})))

(defui deck []
  (let [{:keys [cards update-card shuffle filters category-frequencies]} (use-deck)
        {:keys [selected-index select-previous select-next]} (use-selector {:items cards :key-extractor :id})
        [current-revealed set-current-revealed] (use-state false)]

    ($ :div.block.deck

       ($ deck-transformer {:category-frequencies category-frequencies 
                            :shuffle shuffle
                            :& filters})

       ($ card-interactor {:card-data (get cards selected-index)
                           :revealed current-revealed
                           :set-revealed set-current-revealed
                           :set-known-count #(update-card (get cards selected-index))})

       ($ card-selector {:current selected-index
                         :total (count cards)
                         :select-previous #(do (select-previous)
                                               (set-current-revealed false))
                         :select-next #(do (select-next)
                                           (set-current-revealed false))}))))
