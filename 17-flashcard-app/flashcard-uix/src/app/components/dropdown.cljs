(ns app.components.dropdown
  (:require [uix.core :refer [$ defui]]))

(defui dropdown [{:keys [id class-name children]}]
  (let [anchor-name (str "--dropdown-anchor-" id)]
    ($ :div {:style {:anchor-name anchor-name}}
       ($ :ul.dropdown {:id id
                        :class-name class-name
                        :popover ""
                        :style {:position-anchor anchor-name}}
          (map (fn [child] ($ :li.dropdown__entry child))
               children)))))
