(ns app.components.select
  (:require [uix.core :refer [$ defui use-state]]))

(defui option [{:keys [value selected on-change]}]
  ($ :li.select__option
     ($ :input {:type "checkbox"
                :id value
                :checked selected
                :on-change #(on-change value (not selected))})
     ($ :label {:for value} value)))

(defui select-list [{:keys [options on-change]}]
  ($ :div.select__anchor
     ($ :ul.select__list
        (->> options
             (map (fn [{:keys [value] :as item}]
                    ($ option (assoc item
                                     :key value
                                     :on-change on-change))))))))

(defui select [{:keys [label] :as props}]
  (let [[edit set-edit] (use-state false)]
    ($ :div.select
       ($ :button.select__button {:on-click #(set-edit (not edit))} label)
       (when edit 
         ($ select-list props)))))
