(ns app.components.deck
  (:require [app.components.card :refer [card]]
            [app.utils :refer [find-first]]
            [uix.core :as uix :refer [defui $ use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(defui deck-transformer [{:keys [categories shuffle mastered-hidden set-mastered-hidden]}]
  ($ :div.deck-transformer
     ($ :div.deck-filter
        ; TODO create custom select
        ($ :select {:id "categories" :multiple true :size 1}
           ($ :option {:value "all"} "All Categories")
           (->> categories (map #($ :option {:key % :value %} %))))
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
          ($ :button.card-buttons__i-know-this {:on-click inc-known-count} "I Know This")
          ($ :button.card-buttons__reset {:on-click reset-known-count} "Reset Progress")))))

(defui card-selector [{:keys [current set-current total]}]
  (let [select-previous #(set-current (mod (dec current) total))
        select-next #(set-current (mod (inc current) total))]
    ($ :div.card-selector
       ($ :button.card-selector__previous {:on-click select-previous})
       ($ :p "Card " (inc current) " of " total)
       ($ :button.card-selector__next {:on-click select-next}))))

(defn- mastered?
  "Returns `true` iff given card is mastered."
  [{:keys [knownCount]}]
  (= knownCount 5))

(defui deck []
  (let [[cards set-cards] (use-state [])
        [mastered-hidden set-mastered-hidden] (use-state false)
        [current-filtered-index set-current-filtered-index] (use-state 0)
        [current-revealed set-current-revealed] (use-state false)
        filtered-cards (if-not mastered-hidden
                         cards
                         (filter #(not (mastered? %)) cards))
        current (nth filtered-cards current-filtered-index {})
        current-index (if-not mastered-hidden
                        current-filtered-index
                        (find-first #(= (:id %) (:id current)) cards))
        categories (->> filtered-cards (map :category) (into (sorted-set)))
        _ (use-effect #(-> (fetch-data) (.then set-cards)) [])]
    ($ :div.deck
       ($ deck-transformer {:categories categories
                            :mastered-hidden mastered-hidden
                            :set-mastered-hidden set-mastered-hidden
                            :shuffle #(set-cards (shuffle cards))})
       ($ card-interactor {:card-data current
                           :revealed current-revealed
                           :set-revealed set-current-revealed
                           :set-known-count #(set-cards (assoc-in cards [current-index :knownCount] %))})
       ($ card-selector {:current current-filtered-index
                         :set-current #(do (set-current-filtered-index %)
                                           (set-current-revealed false))
                         :total (count filtered-cards)}))))
