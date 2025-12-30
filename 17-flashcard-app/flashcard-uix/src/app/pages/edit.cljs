(ns app.pages.edit
  (:require [app.components.menu-bar :refer [menu-bar]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui edit []
  ($ layout {:header ($ menu-bar)
             :main ($ :p "all cards here!")}))
