(ns app.components.study.stats
  (:require [app.hooks.use-cards :refer [use-cards]]
            [app.utils :refer [in-progress? mastered? not-started?]]
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
  (let [[cards] (use-cards)]
    ($ :div.block.stats
       ($ :h1.text-preset-2 "Study Statistics")
       ($ :div.stat-list
          ($ stat {:label "Total cards" :value (count cards)})
          ($ stat {:label "Mastered" :value (count (filter mastered? cards))})
          ($ stat {:label "In Progress" :value (count (filter in-progress? cards))})
          ($ stat {:label "Not Started" :value (count (filter not-started? cards))})))))
