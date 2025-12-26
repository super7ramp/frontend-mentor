(ns app.components.cards
  (:require [uix.core :as uix :refer [defui $ use-effect use-state]]
            [uix.dom]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(defui card-not-revealed [{:keys [question category set-revealed]}]
  ($ :button.card {:on-click #(set-revealed true)}
     ($ :p.card__category.text-preset-6 category)
     ($ :p.text-preset-1--mobile question)
     ($ :p.card__heading.text-preset-4--medium "Click to reveal answer")))

(defui card-revealed [{:keys [answer category set-revealed]}]
  ($ :button.card.card--revealed {:on-click #(set-revealed false)}
     ($ :p.card__category.text-preset-6 category)
     ($ :p.card__heading.text-preset-4--medium "Answer:")
     ($ :p.text-preset-1--mobile answer)))

(defui card [{:keys [revealed] :as card-data}]
  (if-not revealed
    ($ card-not-revealed card-data)
    ($ card-revealed card-data)))

(defui card-selector [{:keys [current set-current total]}]
  (let [select-previous #(set-current (mod (dec current) total))
        select-next #(set-current (mod (inc current) total))]
    ($ :div.card-selector
       ($ :button.card-selector__previous {:on-click select-previous})
       ($ :p "Card " (inc current) " of " total)
       ($ :button.card-selector__next {:on-click select-next}))))

(defui cards []
  (let [[deck set-deck] (use-state [])
        [current-index set-current-index] (use-state 0)
        [current-revealed set-current-revealed] (use-state false)
        current (assoc (nth deck current-index {})
                       :revealed current-revealed
                       :set-revealed set-current-revealed)
        _ (use-effect #(-> (fetch-data) (.then set-deck)) [])]
    ($ :div.cards
       ($ card current)
       ($ card-selector {:current current-index
                         :set-current #(do (set-current-index %)
                                           (set-current-revealed false))
                         :total (count deck)}))))
