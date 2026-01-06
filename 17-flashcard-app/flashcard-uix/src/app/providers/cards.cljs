(ns app.providers.cards
  (:require [app.hooks.use-local-storage :refer [use-local-storage]]
            [app.models.card :as model]
            [clojure.spec.alpha :as s]
            [uix.core :refer [$ create-context defui use-callback use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(def ^:dynamic *cards-context* (create-context []))

(defui cards-provider
  "Provides, via the `*cards*` context, the cards retrieved from local storage or remote API."
  [{:keys [children]}]
  (let [[cards set-cards] (use-state [])
        [get-stored-cards store-cards] (use-local-storage "cards" (s/nilable ::model/cards))
        set-and-store-cards (use-callback #(do (set-cards %)
                                               (store-cards %))
                                          [store-cards])
        _ (use-effect #(if-let [saved-cards (get-stored-cards)]
                         (set-cards saved-cards)
                         (-> (fetch-data) (.then set-and-store-cards)))
                      [get-stored-cards set-and-store-cards])]
    ($ *cards-context* {:value [cards set-and-store-cards]}
       children)))
