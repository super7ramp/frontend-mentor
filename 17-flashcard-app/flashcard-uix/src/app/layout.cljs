(ns app.layout
  (:require [app.components.menu-bar :refer [menu-bar]]
            ["sonner" :refer [Toaster]]
            [uix.core :refer [defui $]]))

(defui layout
  "A generic layout for the app pages."
  [{:keys [main aside]}]
  ($ :div.layout
     ($ :header ($ menu-bar))
     ($ :div.content-wrapper
        ($ :main main)
        (when aside
          ($ :aside aside)))
     ($ Toaster)))
