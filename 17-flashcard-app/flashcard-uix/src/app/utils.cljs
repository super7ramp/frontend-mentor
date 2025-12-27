(ns app.utils)

(defn find-first
  "Finds the key/index of the first element of the given collection matching the given predicate."
  [pred coll]
  (->> coll
       (keep-indexed (fn [idx v] (when (pred v) idx)))
       first))

(defn mastered?
  "Returns `true` iff given card is mastered."
  [{:keys [knownCount]}]
  (= knownCount 5))

(defn in-progress?
  "Returns `true` iff given card learning is in progress."
  [{:keys [knownCount]}]
  (and (pos? knownCount) (< knownCount 5)))

(defn not-started?
  "Returns `true` iff given card learning is not started."
  [{:keys [knownCount]}]
  (zero? knownCount))
