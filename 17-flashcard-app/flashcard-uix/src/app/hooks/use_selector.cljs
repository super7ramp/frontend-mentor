(ns app.hooks.use-selector
  (:require [app.utils :refer [find-first pos]]
            [uix.core :refer [defhook use-effect use-state]]))

(defn- previous-key [items current-index key-extractor]
  (when-let [total (pos (count items))]
    (let [previous-index (mod (dec current-index) total)
          previous-item (get items previous-index)]
      (key-extractor previous-item))))

(defn- next-key [items current-index key-extractor]
  (when-let [total (pos (count items))]
    (let [next-index (mod (inc current-index) total)
          next-item (get items next-index)]
      (key-extractor next-item))))

(defhook use-selector
  "
   A hook that manages the selection of a single item among the given items.
   It ensures that despite given items changes, there always is a single selected item,
   unless given collection is empty in which case selection is nil.
   
   Optionally takes a `key-extractor` to keep track of the selected item upon changes.
   If not provided, defaults to `identity`, which works fine unless the selected item
   mutates.
   "
  [{:keys [items key-extractor] :or {key-extractor identity}}]
  {:pre [(indexed? items)]}
  (let [[current-key set-current-key] (use-state (key-extractor (first items)))
        current-index (-> (find-first #(= (key-extractor %) current-key) items)
                          (or -1))
        _ (use-effect #(when (and (neg? current-index)
                                  (not (empty? items)))
                         (set-current-key (key-extractor (first items))))
                      [current-index items key-extractor])]
    {:selected-index current-index
     :select-previous #(set-current-key (previous-key items current-index key-extractor))
     :select-next #(set-current-key (next-key items current-index key-extractor))}))
