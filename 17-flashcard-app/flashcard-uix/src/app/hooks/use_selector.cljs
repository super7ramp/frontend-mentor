(ns app.hooks.use-selector
  (:require [app.utils :refer [find-first]]
            [uix.core :refer [defhook use-effect use-state]]))

(defhook use-selector
  "A hook that manages the selection of a single item in the given items.
   It ensures that despite given items changes, there always is a single selected item,
   unless given items is empty in which case selection is nil."
  [items]
  {:pre [(indexed? items)]}
  (let [total (count items)
        [current-id set-current-id] (use-state (:id (first items)))
        current-index (-> (find-first #(= (:id %) current-id) items) (or -1))
        _ (use-effect #(when (and (neg? current-index) (not (empty? items)))
                         (set-current-id (:id (first items))))
                      [current-index items])]
    {:selected (get items current-index)
     :selected-index current-index
     :total total
     :select-previous #(when (pos? total)
                         (let [previous-index (mod (dec current-index) total)]
                           (set-current-id (get-in items [previous-index :id]))))
     :select-next #(when (pos? total)
                     (let [next-index (mod (inc current-index) total)]
                       (set-current-id (get-in items [next-index :id]))))}))
