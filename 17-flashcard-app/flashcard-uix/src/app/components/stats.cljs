(ns app.components.stats
  (:require [clojure.string :as str]
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
        ($ :p.text-preset-1--mobile value))
     ($ :div {:class-name (str "stat__img stat__img--" (stat-name label))})))

(defui stats []
  ($ :div.block.stats
     ($ :h1.text-preset-2 "Study Statistics")
     ($ :div.stat-list
        ($ stat {:label "Total cards" :value 40})
        ($ stat {:label "Mastered" :value 11})
        ($ stat {:label "In Progress" :value 21})
        ($ stat {:label "Not Started" :value 8}))))