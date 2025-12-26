(ns app.utils)

(defn find-first
  "Finds the key/index of the first element of the given collection matching the given predicate."
  [pred coll]
  (->> coll
       (keep-indexed (fn [idx v] (when (pred v) idx)))
       first))