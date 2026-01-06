(ns app.hooks.use-cards
  (:require [app.providers.cards :refer [*cards-context*]]
            [uix.core :refer [defhook use-context]]))

(defhook use-cards 
  "Hook to access global cards data."
  []
  (let [[cards set-cards] (use-context *cards-context*)]
    [cards set-cards]))
