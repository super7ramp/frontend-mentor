(ns app.core
  (:require  [app.pages.study :refer [study]]
             [uix.core :as uix :refer [defui $]]
             [uix.dom]))

(defui app []
  ($ study))

(defonce root
  (uix.dom/create-root (js/document.getElementById "root")))

(defn render []
  (uix.dom/render-root
   ($ uix/strict-mode
      ($ app))
   root))

(defn ^:export init []
  (render))
