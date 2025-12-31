(ns app.providers.cards
  (:require [uix.core :refer [$ create-context defui use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(def ^:dynamic *cards* (create-context []))

(defui cards-provider
  "Provides cards retrieved from local storage or remote API, via the `*cards*` context."
  ; TODO implement local storage
  [{:keys [children]}]
  (let [[cards set-cards] (use-state [])
        _ (use-effect #(-> (fetch-data) (.then set-cards)) [])]
    ($ *cards* {:value [cards set-cards]}
       children)))
