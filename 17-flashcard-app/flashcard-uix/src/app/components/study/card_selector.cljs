(ns app.components.study.card-selector
  (:require [uix.core :refer [$ defui]]))

(defui card-selector [{:keys [current total select-previous select-next]}]
  ($ :div.card-selector
     ($ :button.card-selector-button.card-selector__previous {:title "Previous" :on-click select-previous}
        ($ :span.card-selector-button__text "Previous"))
     ($ :p "Card " (inc current) " of " total)
     ($ :button.card-selector-button.card-selector__next {:title "Next" :on-click select-next}
        ($ :span.card-selector-button__text "Next"))))
