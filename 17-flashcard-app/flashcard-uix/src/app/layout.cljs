(ns app.layout
  (:require [app.components.deck :refer [deck]]
            [app.components.menubar :refer [menubar]]
            [uix.core :as uix :refer [defui $]]))

(defui layout []
  ($ :<>
     ($ :header (menubar))
     ($ :main (deck))
     ($ :aside "stats")))