(ns app.pages.edit
  (:require [app.components.edit.create-form :refer [create-form]]
            [app.components.edit.deck-explorer :refer [deck-explorer]]
            [app.components.menu-bar :refer [menu-bar]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui edit
  "The edit page."
  []
  ($ layout {:header ($ menu-bar)
             :main ($ create-form)
             :aside ($ deck-explorer)}))
