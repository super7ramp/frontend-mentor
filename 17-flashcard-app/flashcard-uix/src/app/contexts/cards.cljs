(ns app.contexts.cards
  (:require [app.hooks.use-local-storage :refer [use-local-storage]]
            [app.models.card :as model]
            [cljs.spec.alpha :as s]
            [uix.core :refer [$ create-context defui use-callback use-effect use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(def ^:dynamic *cards-context* (create-context []))

(s/def ::stored-cards (s/nilable (s/coll-of ::model/card)))

(defui cards-provider
  "Provides, via the `*cards*` context, the cards retrieved from local storage or remote API."
  [{:keys [children]}]
  (let [[cards set-cards] (use-state [])
        [get-stored-cards store-cards] (use-local-storage "cards" ::stored-cards)
        set-and-store-cards (use-callback #(do (set-cards %)
                                               (store-cards %))
                                          [store-cards])
        _ (use-effect #(if-let [stored-cards (get-stored-cards)]
                         (set-cards stored-cards)
                         (-> (fetch-data) (.then set-and-store-cards)))
                      [get-stored-cards set-and-store-cards])]
    ($ *cards-context* {:value [cards set-and-store-cards]}
       children)))
