(ns app.pages.edit
  (:require [app.components.menubar :refer [menubar]]
            [app.layout :refer [layout]]
            [uix.core :refer [$ defui]]))

(defui edit []
  ($ layout {:header ($ menubar)
             :main ($ :p "all cards here!")}))
