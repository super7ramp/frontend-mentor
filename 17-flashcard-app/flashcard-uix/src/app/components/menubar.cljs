(ns app.components.menubar
  (:require ["react-router" :as react.router :refer [NavLink]]
            [uix.core :refer [$ defui]]))

(defui logo []
  ($ :img.menu-bar__logo {:src "/assets/images/logo-small.svg"
                          :alt "Flashcard Logo"}))

(defn- link-classes [props]
  (let [is-active (get (js->clj props) "isActive")]
    (str "menu-bar__link text-preset-4--semi-bold" (when is-active " menu-bar__link--active"))))

(defui links []
  ($ :nav.menu-bar__nav
     ($ NavLink {:to "/" :class-name link-classes} "Study Mode")
     ($ NavLink {:to "/edit" :class-name link-classes} "All Cards")))

(defui menubar []
  ($ :div.menu-bar
     ($ logo)
     ($ links)))
