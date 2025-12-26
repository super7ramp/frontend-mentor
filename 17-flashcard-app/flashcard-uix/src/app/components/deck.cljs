(ns app.components.deck
  (:require [app.components.card :refer [card]]
            [uix.core :as uix :refer [defui $ use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(defui card-interactor [{:keys [card-data set-known-count]}]
  (let [known-count (:knownCount card-data)
        inc-known-count #(when (< known-count 5) (set-known-count (inc known-count)))
        reset-known-count #(set-known-count 0)]
    ($ :div.card-interactor
       ($ card card-data)
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

(defui deck []
  (let [[cards set-cards] (use-state [])
        [current-index set-current-index] (use-state 0)
        [current-revealed set-current-revealed] (use-state false)
        current (assoc (nth cards current-index {})
                       :revealed current-revealed
                       :set-revealed set-current-revealed)
        _ (use-effect #(-> (fetch-data) (.then set-cards)) [])]
    ($ :div.deck
       ($ card-interactor {:card-data current
                           :set-known-count #(set-cards (assoc-in cards [current-index :knownCount] %))})
       ($ card-selector {:current current-index
                         :set-current #(do (set-current-index %)
                                           (set-current-revealed false))
                         :total (count cards)}))))
