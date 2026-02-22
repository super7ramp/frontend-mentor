(ns app.components.study.stats
  (:require [app.hooks.use-cards :refer [use-cards]]
            [app.models.card :refer [progress]]
            [clojure.string :as str]
            [uix.core :refer [defui $]]))

(defn- stat-name
  "Returns a CSS-friendly name for the statistic with the given label."
  [label]
  (-> label
      (str/replace " " "-")
      str/lower-case))

(defui stat [{:keys [label value]}]
  ($ :article.stat
     ($ :div.stat__label-value
        ($ :h2.text-preset-4--medium label)
        ($ :p.text-preset-1 value))
     ($ :div {:class-name (str "stat__img stat__img--" (stat-name label))})))

(defui stats
  "Statistics about the study 📈"
  []
  (let [{:keys [cards]} (use-cards)
        count-by-progress (frequencies (map progress cards))]
    ($ :div.block.stats
       ($ :h1.text-preset-2 "Study Statistics")
       ($ :div.stat-list
          ($ stat {:label "Total cards" :value (count cards)})
          ($ stat {:label "Mastered" :value (:mastered count-by-progress)})
          ($ stat {:label "In Progress" :value (:in-progress count-by-progress)})
          ($ stat {:label "Not Started" :value (:not-started count-by-progress)})))))
