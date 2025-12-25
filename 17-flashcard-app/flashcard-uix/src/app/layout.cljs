(ns app.layout
  (:require [app.components.cards :refer [cards]]
            [app.components.menubar :refer [menubar]]
            [uix.core :as uix :refer [defui $]]
            [uix.dom]))

(defui layout []
  ($ :<>
     ($ :header (menubar))
     ($ :main (cards))
     ($ :aside "stats")))