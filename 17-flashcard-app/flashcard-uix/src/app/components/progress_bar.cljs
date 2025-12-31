(ns app.components.progress-bar
  (:require [app.components.badge :refer [badge]]
            [uix.core :refer [defui $]]))

(defui progress-bar [{:keys [known-count]}]
  (let [progress-percent (* 100 (/ known-count 5))]
    ($ :div.progress-bar
       (if (< progress-percent 100)
         ($ :<>
            ($ :div.progress-bar__bar-outside
               ($ :div.progress-bar__bar-inside {:style {:--progress (str progress-percent "%")}}))
            ($ :p.text-preset-6 known-count "/5"))
         ($ badge {:class-name "progress-bar__badge-mastered"}
            ($ :span "Mastered")
            ($ :span "5/5"))))))
