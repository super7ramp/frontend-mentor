(ns app.components.deck
  (:require [app.components.card :refer [card]]
            [app.components.select :refer [select]]
            [app.hooks.use-cards :refer [use-cards]]
            [app.hooks.use-filter-list :refer [use-filter-list]]
            [app.hooks.use-selector :refer [use-selector]]
            [app.utils :refer [mastered?]]
            [uix.core :refer [defui $ use-state]]))

(defn- select-categories-button-label [options]
  (let [option-count (count options)
        selected-count (count (filter :selected options))]
    (cond
      (= selected-count option-count) "All Categories"
      (= 1 selected-count) "One Category"
      :else (str selected-count " Categories"))))

(defui select-categories [{:keys [categories selected-categories set-selected-categories]}]
  (let [options (->> categories
                     (mapv #(hash-map :value %
                                      ; TODO count by category
                                      :complement "(1)"
                                      :selected (or (= selected-categories ::all-categories)
                                                    (contains? selected-categories %)))))]
    ($ select {:label (select-categories-button-label options)
               :options options
               :on-change (fn [category selected]
                            (set-selected-categories
                             (cond
                               selected (conj selected-categories category)
                               (= selected-categories ::all-categories) (disj categories category)
                               (> (count selected-categories) 1) (disj selected-categories category)
                               :else ::all-categories)))})))

(defui deck-transformer [{:keys [categories
                                 selected-categories
                                 set-selected-categories
                                 shuffle
                                 mastered-hidden
                                 set-mastered-hidden]}]
  ($ :div.deck-transformer
     ($ :div.deck-filter
        ($ select-categories {:categories categories
                              :selected-categories selected-categories
                              :set-selected-categories set-selected-categories})
        ($ :div.deck-filter__hide-mastered
           ($ :input {:type "checkbox"
                      :id "hide-mastered"
                      :value mastered-hidden
                      :on-click #(set-mastered-hidden (not mastered-hidden))})
           ($ :label {:for "hide-mastered"} "Hide Mastered")))
     ($ :button.deck-transformer__shuffle {:on-click shuffle} "Shuffle")))

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
     ($ :button.card-selector__previous {:on-click select-previous})
     ($ :p "Card " (inc current) " of " total)
     ($ :button.card-selector__next {:on-click select-next})))

(defui deck []
  (let [[cards set-cards] (use-cards)

        [selected-categories set-selected-categories] (use-state ::all-categories)
        [mastered-hidden set-mastered-hidden] (use-state false)
        [filtered-cards original-index-of] (use-filter-list
                                            #(and (or (not mastered-hidden)
                                                      (not (mastered? %)))
                                                  (or (= selected-categories ::all-categories)
                                                      (contains? selected-categories (:category %))))
                                            cards)

        {:keys [selected selected-index total select-previous select-next]} (use-selector filtered-cards)
        [current-revealed set-current-revealed] (use-state false)]

    ($ :div.block.deck

       ($ deck-transformer {:categories (into (sorted-set) (map :category) cards)
                            :selected-categories selected-categories
                            :set-selected-categories set-selected-categories
                            :mastered-hidden mastered-hidden
                            :set-mastered-hidden set-mastered-hidden
                            :shuffle #(set-cards (shuffle cards))})

       ($ card-interactor {:card-data selected
                           :revealed current-revealed
                           :set-revealed set-current-revealed
                           :set-known-count #(set-cards (assoc-in cards [(original-index-of selected-index) :knownCount] %))})

       ($ card-selector {:current selected-index
                         :total total
                         :select-previous #(do (select-previous)
                                               (set-current-revealed false))
                         :select-next #(do (select-next)
                                           (set-current-revealed false))}))))
