(ns app.components.study.card-selector
  (:require [uix.core :refer [$ defui]]))

(defui card-selector [{:keys [current total select-previous select-next]}]
  ($ :div.card-selector
     ($ :button.card-selector-button.card-selector__previous {:title "Go to previous card" :on-click select-previous}
        ($ :span.card-selector-button__text
           "Previous"))
     ($ :p.card-selector__text {:aria-live "polite"
                                :aria-atomic true}
        "Card " (inc current) " of " total)
     ($ :button.card-selector-button.card-selector__next {:title "Go to next card" :on-click select-next}
        ($ :span.card-selector-button__text
           "Next"))))
