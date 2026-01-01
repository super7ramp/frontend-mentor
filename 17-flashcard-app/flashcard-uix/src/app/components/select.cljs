(ns app.components.select
  (:require [app.components.dropdown :refer [dropdown dropdown-entry]]
            [uix.core :refer [$ defui]]))

(defui option [{:keys [value complement selected on-change]}]
  ($ :<>
     ($ :input {:type "checkbox"
                :id value
                :checked selected
                :on-change #(on-change value (not selected))})
     ($ :label.text-preset-5 {:for value}
        value " " ($ :span.select__option-label-complement complement))))

(defui select
  "A good-looking, multiple selection, non-native select element."
  [{:keys [id label options on-change]}]
  ($ :div.select
     ($ :button.select__button {:popover-target id} label)
     ($ dropdown {:id id}
        (->> options
             (map #(assoc % :on-change on-change))
             (map (fn [{:keys [value] :as item}]
                    ($ dropdown-entry {:key value}
                       ($ option item))))))))
