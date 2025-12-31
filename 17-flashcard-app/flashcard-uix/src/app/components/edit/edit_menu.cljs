(ns app.components.edit.edit-menu
  (:require [app.components.dropdown :refer [dropdown]]
            [app.hooks.use-deck :refer [use-deck]]
            [uix.core :refer [$ defui use-ref]]))

(defui delete-confirmation-dialog [{:keys [ref on-delete on-abort]}]
  ($ :dialog.block.delete-confirmation-dialog {:ref ref}
     ($ :div.delete-confirmation-dialog__message
        ($ :p.text-preset-2
           "Delete this card?")
        ($ :p.text-preset-4--regular
           "This action can't be undone."))
     ($ :footer.delete-confirmation-dialog__buttons
        ($ :button {:auto-focus "" :on-click on-abort}
           "Cancel")
        ($ :button.primary.with-shadow {:on-click on-delete}
           "Delete Card"))))

(defui edit-menu [{:keys [id card]}]
  (let [delete-confirmation-dialog-ref (use-ref)
        {:keys [delete-card]} (use-deck)]
    ($ :<>
       ($ dropdown {:id id :class-name "edit-menu"}
          ($ :button.edit-menu__edit {:on-click #()}
             "Edit")
          ($ :button.edit-menu__delete {:on-click #(.showModal @delete-confirmation-dialog-ref)}
             "Delete"))
       ($ delete-confirmation-dialog {:ref delete-confirmation-dialog-ref
                                      :on-delete #(delete-card card)
                                      :on-abort #(.close @delete-confirmation-dialog-ref)}))))
