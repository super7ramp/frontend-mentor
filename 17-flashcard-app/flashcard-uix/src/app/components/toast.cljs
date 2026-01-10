(ns app.components.toast
  (:require [app.components.button-close :refer [button-close]]
            [uix.core :refer [$ defui]]))

(defui toast [{:keys [on-dismiss children]}]
  ($ :div.text-preset-4--medium.toast
     ($ :<> children)
     ($ button-close {:on-click on-dismiss})))
