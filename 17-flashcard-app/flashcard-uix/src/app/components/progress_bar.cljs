(ns app.components.progress-bar
  (:require [uix.core :refer [defui $]]))

(defui progress-bar [{:keys [known-count]}]
  (let [progress-percent (* 100 (/ known-count 5))]
    ($ :div.progress-bar
       ($ :div.progress-bar__bar-outside
          ($ :div.progress-bar__bar-inside {:style {:--progress (str progress-percent "%")}}))
       ($ :p.text-preset-6 known-count "/5"))))
