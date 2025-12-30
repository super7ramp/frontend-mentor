(ns app.pages.study
  (:require [app.components.deck :refer [deck]]
            [app.components.menu-bar :refer [menu-bar]]
            [app.components.stats :refer [stats]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui study []
  ($ layout {:header ($ menu-bar)
             :main ($ deck)
             :aside ($ stats)}))
