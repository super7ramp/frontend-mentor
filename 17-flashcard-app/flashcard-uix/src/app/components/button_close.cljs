(ns app.components.button-close
  (:require [uix.core :refer [$ defui]]))

(defui button-close [props]
  ($ :button.button-close {:title "Close"
                           :type "button"
                           :& props}))
