(ns app.components.dropdown
  (:require [uix.core :refer [$ defui]]))

(defui dropdown [{:keys [id class-name children]}]
  ($ :ul.dropdown {:id id :class-name class-name :popover ""}
     (map (fn [child] ($ :li.dropdown__entry child))
          children)))
