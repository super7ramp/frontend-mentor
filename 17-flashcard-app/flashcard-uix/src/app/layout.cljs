(ns app.layout
  (:require [app.components.menu-bar :refer [menubar]]
            [uix.core :as uix :refer [defui $]]
            [uix.dom]))

(defui layout []
  ($ :<>
     ($ :header (menubar))
     ($ :main "title")
     ($ :aside "stats")))