(ns app.hooks.use-filter-list
  (:require [app.utils :refer [find-first]]
            [uix.core :refer [defhook]]))

(defhook use-filter-list
  "A hook that manages a filtered list.
   It provides a way to get back to original indices of the non-filtered collection."
  [pred original]
  (let [filtered (filterv pred original)
        original-index-of (fn [index-in-filtered]
                            (let [item-id (:id (get filtered index-in-filtered))]
                              (find-first #(= item-id (:id %)) original)))]
    [filtered original-index-of]))
