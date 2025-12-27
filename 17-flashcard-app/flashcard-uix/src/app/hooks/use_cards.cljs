(ns app.hooks.use-cards
  (:require [uix.core :refer [defui use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(defui use-cards []
  (let [[cards set-cards] (use-state [])
        _ (use-effect #(-> (fetch-data) (.then set-cards)) [])]
    [cards set-cards]))
