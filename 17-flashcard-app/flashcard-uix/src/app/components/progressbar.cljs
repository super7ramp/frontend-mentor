(ns app.components.progressbar
  (:require [uix.core :as uix :refer [defui $]]))

(defui progress-bar [{:keys [known-count]}]
  ($ :p known-count "/5"))
