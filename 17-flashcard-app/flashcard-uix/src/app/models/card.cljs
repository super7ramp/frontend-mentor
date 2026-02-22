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

(defn progress [{:keys [knownCount]}]
  (case knownCount
    0 :not-started
    (1 2 3 4) :in-progress
    5 :mastered))

(defn mastered?
  "Returns `true` iff given card is mastered."
  [card]
  (= :mastered (progress card)))
