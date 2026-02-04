(ns app.hooks.use-selector
  (:require [uix.core :refer [defhook use-state]]))

(defn- previous-index [item-count current-index]
  (if (pos? item-count)
    (mod (dec current-index) item-count)
    current-index))

(defn- next-index [item-count current-index]
  (if (pos? item-count)
    (mod (inc current-index) item-count)
    current-index))

(defhook use-selector
  "A hook that manages the index of a single selected item among the given item count.
   It ensures that despite given item count growing and decreasing, there always is a
   single selected item, unless item count is zero in which case selected index is -1."
  [item-count]
  (let [[selected-index set-selected-index] (use-state (min 0 (dec item-count)))]
    (when (< selected-index 0 item-count)
      (set-selected-index 0))
    (when (>= selected-index item-count)
      (set-selected-index (dec item-count)))
    {:selected-index selected-index
     :select-previous #(set-selected-index (partial previous-index item-count))
     :select-next #(set-selected-index (partial next-index item-count))}))
