(ns app.hooks.use-cards
  (:require [app.contexts.cards :refer [*cards-context*]]
            [app.utils :refer [find-first]]
            [uix.core :refer [defhook use-context]]))

(defhook use-cards
  "Hook to read and write global cards data."
  []
  (let [[cards set-cards] (use-context *cards-context*)]
    {:cards cards

     :update-card (fn [{:keys [id] :as updated-card}]
                    (when-let [index (find-first #(= id (:id %)) cards)]
                      (set-cards (assoc cards index updated-card))))

     :add-card (fn [new-card]
                 (let [new-card-with-id (assoc new-card :id (str (random-uuid)) :knownCount 0)]
                   (set-cards (conj cards new-card-with-id))))

     :delete-card (fn [{:keys [id]}]
                    (when-let [index (find-first #(= id (:id %)) cards)]
                      (set-cards (into (subvec cards 0 index) (subvec cards (inc index))))))

     :shuffle #(set-cards (shuffle cards))}))
