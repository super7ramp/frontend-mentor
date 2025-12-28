(ns app.components.deck
  (:require [app.components.card :refer [card]]
            [app.components.select :refer [select]]
            [app.hooks.use-cards :refer [use-cards]]
            [app.utils :refer [find-first mastered?]]
            [uix.core :refer [defui $ use-state]]))

(defn- select-categories-button-label [options]
  (let [option-count (count options)
        selected-count (count (filter :selected options))]
    (cond
      (= selected-count option-count) "All Categories"
      (= 1 selected-count) "One Category"
      (zero? selected-count) "No Categories"
      :else (str selected-count " Categories"))))

(defui select-categories [{:keys [categories selected-categories set-selected-categories]}]
  (let [options (->> categories
                     (mapv #(hash-map :value %
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

(defui card-selector [{:keys [current set-current total]}]
  (let [select-previous #(set-current (mod (dec current) total))
        select-next #(set-current (mod (inc current) total))]
    ($ :div.card-selector
       ($ :button.card-selector__previous {:on-click select-previous})
       ($ :p "Card " (inc current) " of " total)
       ($ :button.card-selector__next {:on-click select-next}))))

(defui deck []
  (let [[cards set-cards] (use-cards)

        [mastered-hidden set-mastered-hidden] (use-state false)
        [current-filtered-index set-current-filtered-index] (use-state 0)
        [current-revealed set-current-revealed] (use-state false)

        categories (into (sorted-set) (map :category) cards)
        [selected-categories set-selected-categories] (use-state ::all-categories)
        filtered-cards (filter #(and (or (not mastered-hidden)
                                         (not (mastered? %)))
                                     (or (= selected-categories ::all-categories)
                                         (contains? selected-categories (:category %))))
                               cards)

        current (nth filtered-cards current-filtered-index {})
        current-index (find-first #(= (:id %) (:id current)) cards)]

    ($ :div.block.deck

       ($ deck-transformer {:categories categories
                            :selected-categories selected-categories
                            :set-selected-categories #(do (set-selected-categories %)
                                                          (set-current-filtered-index 0))
                            :mastered-hidden mastered-hidden
                            :set-mastered-hidden #(do (set-mastered-hidden %)
                                                      (set-current-filtered-index 0))
                            :shuffle #(set-cards (shuffle cards))})

       ($ card-interactor {:card-data current
                           :revealed current-revealed
                           :set-revealed set-current-revealed
                           :set-known-count #(set-cards (assoc-in cards [current-index :knownCount] %))})

       ($ card-selector {:current current-filtered-index
                         :set-current #(do (set-current-filtered-index %)
                                           (set-current-revealed false))
                         :total (count filtered-cards)}))))
