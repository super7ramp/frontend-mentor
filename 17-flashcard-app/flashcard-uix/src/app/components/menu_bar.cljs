(ns app.components.menu-bar
  (:require ["react-router" :as react.router :refer [NavLink]]
            [uix.core :refer [$ defui]]))

(defui logo []
  ($ :img.menu-bar__logo {:src "/assets/images/logo-small.svg"
                          :alt "Flashcard Logo"}))

(defn- link-classes [link]
  (str "text-preset-4--semi-bold menu-bar__link" (when (. link -isActive) " menu-bar__link--active")))

(defui links []
  ($ :nav.menu-bar__nav
     ($ NavLink {:to "/" :class-name link-classes} "Study Mode")
     ($ NavLink {:to "/edit" :class-name link-classes} "All Cards")))

(defui menu-bar []
  ($ :div.menu-bar
     ($ logo)
     ($ links)))
