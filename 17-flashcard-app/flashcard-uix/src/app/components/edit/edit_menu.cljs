(ns app.components.edit.edit-menu
  (:require [app.components.dropdown :refer [dropdown dropdown-entry]]
            [app.components.edit.edit-dialog :refer [edit-dialog]]
            [app.components.edit.delete-dialog :refer [delete-dialog]]
            [app.hooks.use-deck :refer [use-deck]]
            [app.hooks.use-notify :refer [use-notify]]
            [uix.core :refer [$ defui use-ref]]))

(defui edit-menu
  "A small menu to access the edit and delete dialogs of a card."
  [{:keys [id card]}]
  (let [edit-dialog-ref (use-ref)
        delete-dialog-ref (use-ref)
        notify (use-notify)
        {:keys [update-card delete-card]} (use-deck)]
    ($ :<>
       ($ dropdown {:id id :class-name "edit-menu"}
          ($ dropdown-entry {:key "edit"}
             ($ :button.edit-menu__edit {:on-click #(.showModal @edit-dialog-ref)}
                "Edit"))
          ($ dropdown-entry {:key "delete"}
             ($ :button.edit-menu__delete {:on-click #(.showModal @delete-dialog-ref)}
                "Delete")))
       ($ edit-dialog {:ref edit-dialog-ref
                       :card card
                       :on-submit #(do (update-card %)
                                       (notify "Card updated successfully."))})
       ($ delete-dialog {:ref delete-dialog-ref
                         :on-delete #(do (delete-card card)
                                         (notify "Card deleted."))}))))
