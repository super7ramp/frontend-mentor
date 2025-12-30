(ns app.pages.edit
  (:require [app.components.menu-bar :refer [menu-bar]]
            [app.components.create-form :refer [create-form]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui edit []
  ($ layout {:header ($ menu-bar)
             :main ($ create-form)}))
