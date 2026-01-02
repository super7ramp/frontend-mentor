(ns app.components.menu-bar
  (:require ["react-router" :refer [NavLink]]
            [uix.core :refer [$ defui]]))

(defui logo []
  ($ :picture
     ($ :source {:src-set "/assets/images/logo-large.svg" :media "(min-width: 768px)"})
     ($ :img {:src "/assets/images/logo-small.svg" :alt "Flashcard Logo"})))

(defn- link-classes [link]
  (str "text-preset-4--semi-bold menu-bar__link" (when (. link -isActive) " menu-bar__link--active")))

(defui links []
  ($ :nav.menu-bar__nav
     ($ NavLink {:to "/" :class-name link-classes} "Study Mode")
     ($ NavLink {:to "/edit" :class-name link-classes} "All Cards")))

(defui menu-bar
  "The menu bar."
  []
  ($ :div.menu-bar
     ($ logo)
     ($ links)))
