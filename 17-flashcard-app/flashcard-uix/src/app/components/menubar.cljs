(ns app.components.menubar
  (:require  [uix.core :as uix :refer [defui $]]))

(defui logo []
  ($ :img.menu-bar__logo {:src "/assets/images/logo-small.svg"
                          :alt "Flashcard Logo"}))

(defui tabs []
  ($ :div.menu-bar__tabs
     ($ :div.menu-bar__tab-item
        ($ :input {:type "radio" :name "mode" :id "study-mode"})
        ($ :label.text-preset-4--semi-bold {:for "study-mode"} "Study Mode"))
     ($ :div.menu-bar__tab-item
        ($ :input {:type "radio" :name "mode" :id "all-cards"})
        ($ :label.text-preset-4--semi-bold {:for "all-cards"} "All Cards"))))

(defui menubar []
  ($ :.menu-bar
     ($ logo)
     ($ tabs)))