(ns app.components.menubar
  (:require  [uix.core :as uix :refer [$ defui use-state]]))

(defui logo []
  ($ :img.menu-bar__logo {:src "/assets/images/logo-small.svg"
                          :alt "Flashcard Logo"}))

(defui tabs [{:keys [mode set-mode]}]
  ($ :fieldset.menu-bar__tabs
     ($ :div.menu-bar__tab-item
        ($ :input {:type "radio"
                   :name "mode"
                   :id "study-mode"
                   :checked (= mode :study)
                   :on-change #(set-mode :study)})
        ($ :label.text-preset-4--semi-bold {:for "study-mode" :tabIndex "0"} "Study Mode"))
     ($ :div.menu-bar__tab-item
        ($ :input {:type "radio"
                   :name "mode"
                   :id "all-cards"
                   :checked (= mode :edit)
                   :on-change #(set-mode :edit)})
        ($ :label.text-preset-4--semi-bold {:for "all-cards" :tabIndex "0"} "All Cards"))))

(defui menubar [{:keys [mode set-mode]}]
  (do (prn "set-mode menubar" set-mode)
      ($ :div.menu-bar
         ($ logo)
         ($ tabs {:mode mode :set-mode set-mode}))))
