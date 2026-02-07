(ns app.contexts.cards
  (:require [app.hooks.use-local-storage :refer [use-local-storage]]
            [app.models.card :as model]
            [app.utils :refer [find-first]]
            [cljs.spec.alpha :as s]
            [uix.core :refer [$ defcontext defui use-callback use-effect use-effect-event use-memo use-state]]))

(defn- fetch-data []
  (-> (js/fetch "data/data.json")
      (.then #(.json %))
      (.then #(js->clj % :keywordize-keys true))
      (.then #(:flashcards %))
      (.catch #(js/console.log %))))

(defcontext *cards-context* [])

(s/def ::stored-cards (s/nilable (s/coll-of ::model/card)))

(defui cards-provider
  "Provides, via `*cards-context*`, the cards retrieved from local storage or remote API."
  [{:keys [children]}]
  (let [[get-stored-cards store-cards] (use-local-storage "cards" ::stored-cards)
        [cards set-cards] (use-state get-stored-cards)
        set-and-store-cards (use-callback #(do (set-cards %)
                                               (store-cards %))
                                          [store-cards])
        init-local-storage (use-effect-event #(when (nil? cards)
                                                (-> (fetch-data)
                                                    (.then set-and-store-cards))))
        _ (use-effect #(init-local-storage) [])
        context (use-memo (fn []
                            {:cards cards

                             :update-card (fn [{:keys [id] :as updated-card}]
                                            (when-let [index (find-first #(= id (:id %)) cards)]
                                              (set-and-store-cards (assoc cards index updated-card))))

                             :add-card (fn [new-card]
                                         (let [new-card-with-id (assoc new-card :id (str (random-uuid)) :knownCount 0)]
                                           (set-and-store-cards (conj cards new-card-with-id))))

                             :delete-card (fn [{:keys [id]}]
                                            (when-let [index (find-first #(= id (:id %)) cards)]
                                              (set-and-store-cards (into (subvec cards 0 index) (subvec cards (inc index))))))

                             :shuffle #(set-and-store-cards (shuffle cards))})
                          [cards set-and-store-cards])]
    ($ *cards-context* {:value context}
       children)))
