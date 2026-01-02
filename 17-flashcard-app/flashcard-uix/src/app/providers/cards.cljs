(ns app.providers.cards
  (:require [app.hooks.use-local-storage :refer [use-local-storage]]
            [uix.core :refer [$ create-context defui use-callback use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(def ^:dynamic *cards* (create-context []))

(defui cards-provider
  "Provides cards retrieved from local storage or remote API, via the `*cards*` context."
  [{:keys [children]}]
  (let [[cards set-cards] (use-state [])
        [get-stored-cards store-cards] (use-local-storage "cards")
        set-and-store-cards (use-callback #(do (set-cards %)
                                               (store-cards %))
                                          [store-cards])
        _ (use-effect #(if-let [saved-cards (get-stored-cards)]
                         (set-cards saved-cards)
                         (-> (fetch-data) (.then set-and-store-cards)))
                      [get-stored-cards set-and-store-cards])]
    ($ *cards* {:value [cards set-and-store-cards]}
       children)))
