(ns app.hooks.use-deck
  (:require  [app.hooks.use-cards :refer [use-cards]] 
             [app.utils :refer [find-first mastered?]]
             [uix.core :refer [defhook use-state]]))

(defhook use-deck
  "Hook to manages a deck of cards."
  []
  (let [[cards set-cards] (use-cards)
        [selected-categories set-selected-categories] (use-state :all-categories)
        [mastered-hidden set-mastered-hidden] (use-state false)
        filtered-cards (filterv #(and (or (not mastered-hidden)
                                          (not (mastered? %)))
                                      (or (= selected-categories :all-categories)
                                          (contains? selected-categories (:category %))))
                                cards)]
    {:cards filtered-cards 

     :update-card (fn [{:keys [id] :as updated-card}]
                    (when-let [pos (find-first #(= id (:id %)) cards)]
                      (set-cards (assoc cards pos updated-card))))

     :add-card (fn [new-card]
                 (let [new-card-with-id (assoc new-card :id (random-uuid) :knownCount 0)]
                   (set-cards (conj cards new-card-with-id))))

     :delete-card (fn [{:keys [id]}]
                    (when-let [pos (find-first #(= id (:id %)) cards)]
                      (set-cards (into (subvec cards 0 pos) (subvec cards (inc pos))))))
     
     :shuffle #(set-cards (shuffle cards))

     :category-frequencies (->> cards (map :category) frequencies sort)

     :filters {:selected-categories selected-categories
               :set-selected-categories set-selected-categories
               :mastered-hidden mastered-hidden
               :set-mastered-hidden set-mastered-hidden}}))
