(ns app.hooks.use-cards
  (:require [app.contexts.cards :refer [*cards-context*]]
            [uix.core :refer [defhook use-context]]))

(defhook use-cards
  "Hook to read and write global cards data."
  []
  (use-context *cards-context*))
