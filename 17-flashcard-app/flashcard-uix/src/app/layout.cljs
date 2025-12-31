(ns app.layout
  (:require [uix.core :refer [defui $]]))

(defui layout
  "A generic layout for the app pages."
  [{:keys [header main aside]}]
  ($ :div.layout
     ($ :header header)
     ($ :main main)
     ($ :aside aside)))