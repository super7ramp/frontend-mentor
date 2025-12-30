(ns app.components.deck
  (:require [app.components.card :refer [card]]
            [app.components.deck-transformer :refer [deck-transformer]]
            [app.hooks.use-cards :refer [use-cards]]
            [app.hooks.use-filter-list :refer [use-filter-list]]
            [app.hooks.use-selector :refer [use-selector]]
            [app.utils :refer [mastered?]]
            [uix.core :refer [defui $ use-state]]))

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
  (let [[cards set-cards] (use-cards)

        [selected-categories set-selected-categories] (use-state :all-categories)
        [mastered-hidden set-mastered-hidden] (use-state false)
        [filtered-cards original-index-of] (use-filter-list
                                            #(and (or (not mastered-hidden)
                                                      (not (mastered? %)))
                                                  (or (= selected-categories :all-categories)
                                                      (contains? selected-categories (:category %))))
                                            cards)

        {:keys [selected-index
                select-previous
                select-next]} (use-selector {:items filtered-cards :key-extractor :id})

        [current-revealed set-current-revealed] (use-state false)]

    ($ :div.block.deck

       ($ deck-transformer {:category-frequencies (->> cards (map :category) frequencies sort)
                            :selected-categories selected-categories
                            :set-selected-categories set-selected-categories
                            :mastered-hidden mastered-hidden
                            :set-mastered-hidden set-mastered-hidden
                            :shuffle #(set-cards (shuffle cards))})

       ($ card-interactor {:card-data (get filtered-cards selected-index)
                           :revealed current-revealed
                           :set-revealed set-current-revealed
                           :set-known-count #(set-cards (assoc-in cards [(original-index-of selected-index) :knownCount] %))})

       ($ card-selector {:current selected-index
                         :total (count filtered-cards)
                         :select-previous #(do (select-previous)
                                               (set-current-revealed false))
                         :select-next #(do (select-next)
                                           (set-current-revealed false))}))))
