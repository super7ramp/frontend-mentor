(ns app.components.badge
   (:require [uix.core :refer [$ defui]]))

(defui badge [{:keys [class-name children]}]
  ($ :div.badge.text-preset-6 {:class-name class-name}
     children))
