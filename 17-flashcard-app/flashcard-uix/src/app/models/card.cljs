(ns app.models.card
  (:require [cljs.spec.alpha :as s]))

(s/def ::id string?)
(s/def ::category string?)
(s/def ::question string?)
(s/def ::answer string?)
(s/def ::knownCount (s/int-in 0 6))
(s/def ::card (s/keys :req-un [::id
                               ::question
                               ::answer
                               ::category
                               ::knownCount]))
(s/def ::cards (s/coll-of ::card))

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
