(ns app.pages.edit
  (:require [app.components.edit.create-form :refer [create-form]]
            [app.components.edit.deck-explorer :refer [deck-explorer]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui edit
  "The edit page."
  []
  ($ layout {:main ($ :<>
                      ($ create-form)
                      ($ deck-explorer))}))
