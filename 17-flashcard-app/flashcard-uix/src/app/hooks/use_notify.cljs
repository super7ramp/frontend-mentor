(ns app.hooks.use-notify
  (:require [app.components.toast :refer [toast]]
            ["sonner" :as sonner]
            [uix.core :refer [$ defhook]]))

(defn- notify [content]
  (.custom sonner/toast (fn [toast-id]
                          ($ toast {:on-dismiss #(.dismiss sonner/toast toast-id)}
                             content))))

(defhook use-notify
  "
   A hook to notify via toasts 🫓
   
   ```
   (let [notify (use-notify)]
     (notify \"🫓\"))
   ```
  "
  []
  notify)
