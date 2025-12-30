(ns app.pages.edit
  (:require [app.components.menu-bar :refer [menu-bar]]
            [app.components.create-form :refer [create-form]]
            [app.components.deck-explorer :refer [deck-explorer]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui edit []
  ($ layout {:header ($ menu-bar)
             :main ($ create-form)
             :aside ($ deck-explorer)}))
