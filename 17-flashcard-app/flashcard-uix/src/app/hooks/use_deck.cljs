(ns app.hooks.use-deck
  (:require  [app.hooks.use-cards :refer [use-cards]]
             [app.models.card :refer [mastered?]]
             [uix.core :refer [defhook use-state]]))

(defhook use-deck
  "Hook to manage a deck of cards."
  []
  (let [{:keys [cards update-card add-card delete-card shuffle]} (use-cards)
        [selected-categories set-selected-categories] (use-state :all-categories)
        [mastered-hidden set-mastered-hidden] (use-state false)
        filtered-cards (filterv #(and (or (not mastered-hidden)
                                          (not (mastered? %)))
                                      (or (= selected-categories :all-categories)
                                          (contains? selected-categories (:category %))))
                                cards)]
    {:cards filtered-cards
     :update-card update-card
     :add-card add-card
     :delete-card delete-card 
     :shuffle shuffle
     :category-frequencies (->> cards (map :category) frequencies sort)
     :filters {:selected-categories selected-categories
               :set-selected-categories set-selected-categories
               :mastered-hidden mastered-hidden
               :set-mastered-hidden set-mastered-hidden}}))
