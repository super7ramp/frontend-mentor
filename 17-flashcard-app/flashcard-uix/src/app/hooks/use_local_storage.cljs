(ns app.hooks.use-local-storage
  (:require [uix.core :refer [defhook use-callback]]))

(defhook use-local-storage [key]
  (let [get-item (use-callback #(-> (.getItem js/localStorage key)
                                    js/JSON.parse
                                    (js->clj :keywordize-keys true))
                               [key])
        set-item (use-callback #(->> (clj->js %)
                                     js/JSON.stringify
                                     (.setItem js/localStorage key))
                               [key])]
    [get-item set-item]))
