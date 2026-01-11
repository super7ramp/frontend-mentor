(ns app.core
  (:require [app.contexts.cards :refer [cards-provider]]
            [app.pages.edit :refer [edit]]
            [app.pages.study :refer [study]]
            ["react-router" :refer [BrowserRouter Routes Route]]
            [uix.core :as uix :refer [$ defui]]
            [uix.dom]))

(defui app []
  ($ cards-provider
     ($ BrowserRouter
        ($ Routes
           ($ Route {:path "/" :element ($ study)})
           ($ Route {:path "/edit" :element ($ edit)})))))

(defonce root
  (uix.dom/create-root (js/document.getElementById "root")))

(defn render []
  (uix.dom/render-root
   ($ uix/strict-mode
      ($ app))
   root))

(defn ^:export init []
  (render))
