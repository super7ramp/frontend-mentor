(ns app.components.deck-transformer
  (:require [app.components.select :refer [select]]
            [uix.core :refer [$ defui]]))

(defn- select-categories-button-label [options]
  (let [option-count (count options)
        selected-count (count (filter :selected options))]
    (cond
      (= selected-count option-count) "All Categories"
      (= 1 selected-count) "One Category"
      :else (str selected-count " Categories"))))

(defui select-categories [{:keys [category-frequencies selected-categories set-selected-categories]}]
  (let [options (->> category-frequencies
                     (map (fn [[category freq]]
                            {:value category
                             :complement (str "(" freq ")")
                             :selected (or (= selected-categories :all-categories)
                                           (contains? selected-categories category))})))]
    ($ select {:id "select-categories"
               :label (select-categories-button-label options)
               :options options
               :on-change (fn [category selected]
                            (set-selected-categories
                             (cond
                               selected (conj selected-categories category)
                               (= selected-categories :all-categories) (disj (set (keys category-frequencies)) category)
                               (> (count selected-categories) 1) (disj selected-categories category)
                               :else :all-categories)))})))

(defui deck-transformer
  "A component allowing to filter and shuffle a deck of cards."
  [{:keys [category-frequencies
           selected-categories
           set-selected-categories 
           mastered-hidden
           set-mastered-hidden
           shuffle]}]
  ($ :div.deck-transformer
     ($ :div.deck-filter
        ($ select-categories {:category-frequencies category-frequencies
                              :selected-categories selected-categories
                              :set-selected-categories set-selected-categories})
        ($ :div.deck-filter__hide-mastered
           ($ :input {:type "checkbox"
                      :id "hide-mastered"
                      :value mastered-hidden
                      :on-click #(set-mastered-hidden (not mastered-hidden))})
           ($ :label {:for "hide-mastered"} "Hide Mastered")))
     ($ :button.deck-transformer__shuffle {:on-click shuffle} "Shuffle")))
