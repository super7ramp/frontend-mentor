(ns app.pages.study
  (:require [app.components.deck :refer [deck]]
            [app.components.menubar :refer [menubar]]
            [app.components.stats :refer [stats]]
            [app.layout :refer [layout]]
            [uix.core :as uix :refer [defui $]]))

(defui study []
  ($ layout {:header (menubar)
             :main (deck)
             :aside (stats)}))
