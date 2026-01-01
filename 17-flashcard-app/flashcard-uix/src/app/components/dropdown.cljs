(ns app.components.dropdown
  (:require [uix.core :refer [$ defui]]))

(defui dropdown-entry [{:keys [key children]}]
  ($ :li.dropdown__entry {:key key}
     children))

(defui dropdown
  "A dropdown. Children should be dropdown entries or at least have a key."
  [{:keys [id class-name children]}]
  (let [anchor-name (str "--dropdown-anchor-" id)]
    ($ :div {:style {:anchor-name anchor-name}}
       ($ :ul.dropdown {:id id
                        :class-name class-name
                        :popover ""
                        :style {:position-anchor anchor-name}}
          children))))
