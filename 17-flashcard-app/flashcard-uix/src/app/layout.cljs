(ns app.layout
  (:require [uix.core :refer [defui $]]))

(defui layout [{:keys [header main aside]}]
  ($ :div.layout
     ($ :header header)
     ($ :main main)
     ($ :aside aside)))