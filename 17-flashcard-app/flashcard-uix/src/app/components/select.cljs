(ns app.components.select
  (:require [uix.core :refer [$ defui ]]))

(defui option [{:keys [value complement selected on-change]}]
  ($ :li.select__option
     ($ :input.text-preset-5 {:type "checkbox"
                :id value
                :checked selected
                :on-change #(on-change value (not selected))})
     ($ :label.text-preset-5 {:for value}
        value " " ($ :span.select__option-label-complement complement))))

(defui select-list [{:keys [id options on-change]}]
  ($ :ul.select__list {:popover "" :id id}
     (->> options
          (map (fn [{:keys [value] :as item}]
                 ($ option (assoc item
                                  :key value
                                  :on-change on-change)))))))

(defui select [{:keys [id label] :as props}]
  ($ :div.select
     ($ :button.select__button {:popover-target id} label)
     ($ select-list props)))
