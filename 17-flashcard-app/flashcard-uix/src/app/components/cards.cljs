(ns app.components.cards
  (:require [app.components.progressbar :refer [progress-bar]]
            [uix.core :as uix :refer [defui $ use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(defui card-recto [{:keys [question category knownCount set-revealed]}]
  ($ :button.card {:on-click #(set-revealed true)}
     ($ :p.card__category.text-preset-6 category)
     ($ :div.card__body
        ($ :p.text-preset-1--mobile question)
        ($ :p.card__heading.text-preset-4--medium "Click to reveal answer"))
     ($ progress-bar {:known-count knownCount})))

(defui card-verso [{:keys [answer category knownCount set-revealed]}]
  ($ :button.card.card--verso {:on-click #(set-revealed false)}
     ($ :p.card__category.text-preset-6 category)
     ($ :div.card__body
        ($ :p.card__heading.text-preset-4--medium "Answer:")
        ($ :p.text-preset-1--mobile answer))
     ($ progress-bar {:known-count knownCount})))

(defui card [{:keys [revealed] :as card-data}]
  (if-not revealed
    ($ card-recto card-data)
    ($ card-verso card-data)))

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

(defui cards []
  (let [[deck set-deck] (use-state [])
        [current-index set-current-index] (use-state 0)
        [current-revealed set-current-revealed] (use-state false)
        current (assoc (nth deck current-index {})
                       :revealed current-revealed
                       :set-revealed set-current-revealed)
        _ (use-effect #(-> (fetch-data) (.then set-deck)) [])]
    ($ :div.cards
       ($ card-interactor {:card-data current
                           :set-known-count #(set-deck (assoc-in deck [current-index :knownCount] %))})
       ($ card-selector {:current current-index
                         :set-current #(do (set-current-index %)
                                           (set-current-revealed false))
                         :total (count deck)}))))
