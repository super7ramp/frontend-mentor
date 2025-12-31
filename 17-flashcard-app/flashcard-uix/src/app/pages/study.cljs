(ns app.pages.study
  (:require [app.components.menu-bar :refer [menu-bar]]
            [app.components.study.deck :refer [deck]]
            [app.components.study.stats :refer [stats]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui study
  "The study page."
  []
  ($ layout {:header ($ menu-bar)
             :main ($ deck)
             :aside ($ stats)}))
