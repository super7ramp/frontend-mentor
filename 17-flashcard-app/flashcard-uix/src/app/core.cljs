(ns app.core
  (:require [app.providers.cards :refer [cards-provider]]
            [app.pages.edit :refer [edit]]
            [app.pages.study :refer [study]]
            [uix.core :as uix :refer [$ defui use-state]]
            [uix.dom]))

(defui app [] 
  ($ cards-provider
     (let [[mode set-mode] (use-state :study)]
       (case mode
         :study ($ study {:set-mode set-mode})
         :edit ($ edit {:set-mode set-mode})))))

(defonce root
  (uix.dom/create-root (js/document.getElementById "root")))

(defn render []
  (uix.dom/render-root
   ($ uix/strict-mode
      ($ app))
   root))

(defn ^:export init []
  (render))
