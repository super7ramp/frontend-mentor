(ns app.pages.edit
  (:require [app.components.menubar :refer [menubar]]
            [app.layout :refer [layout]]
            [uix.core :as uix :refer [defui $]]))

(defui edit [{:keys [set-mode]}]
  ($ layout {:header ($ menubar {:mode :edit :set-mode set-mode})
             :main ($ :p "all cards here!")}))
