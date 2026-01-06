(ns app.hooks.use-local-storage
  (:require [cljs.spec.alpha :as s]
            [uix.core :refer [defhook use-callback]]))

(defhook use-local-storage [key spec]
  "Hook that provides read/write access to local storage."
  {:pre [(some? key) (s/spec? spec)]}
  (let [get-item (use-callback (fn [] 
                                 {:post [(s/valid? spec %)]}
                                 (-> (.getItem js/localStorage key)
                                     js/JSON.parse
                                     (js->clj :keywordize-keys true)))
                               [key spec]) 
        set-item (use-callback (fn [item]
                                 {:pre [(s/valid? spec item)]}
                                 (->> (clj->js item)
                                      js/JSON.stringify
                                      (.setItem js/localStorage key)))
                               [key spec])]
    [get-item set-item]))
