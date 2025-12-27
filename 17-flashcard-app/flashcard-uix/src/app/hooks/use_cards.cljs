(ns app.hooks.use-cards
  (:require [app.providers.cards :refer [*cards*]]
            [uix.core :refer [defhook use-context]]))

(defhook use-cards []
  (let [[cards set-cards] (use-context *cards*)]
    [cards set-cards]))
