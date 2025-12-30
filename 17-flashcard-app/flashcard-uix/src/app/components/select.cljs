(ns app.components.select
  (:require [uix.core :refer [$ defui]]))

(defui option [{:keys [value complement selected on-change]}]
  ($ :li.select__option
     ($ :input {:type "checkbox"
                :id value
                :checked selected
                :on-change #(on-change value (not selected))})
     ($ :label.text-preset-5 {:for value}
        value " " ($ :span.select__option-label-complement complement))))

(defui select
  [{:keys [id label options on-change]}]
  ($ :div.select
     ($ :button.select__button {:popover-target id} label)
     ($ :ul.select__list {:popover "" :id id}
        (->> options
             (map (fn [{:keys [value] :as item}]
                    ($ option (assoc item
                                     :key value
                                     :on-change on-change))))))))
