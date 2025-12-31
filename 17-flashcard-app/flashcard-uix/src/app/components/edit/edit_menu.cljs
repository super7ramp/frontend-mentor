(ns app.components.edit.edit-menu
  (:require [app.components.dropdown :refer [dropdown]]
            [app.components.edit.edit-form :refer [edit-form]]
            [app.hooks.use-deck :refer [use-deck]]
            [uix.core :refer [$ defui use-ref]]))

(defui edit-dialog [{:keys [ref card on-submit]}]
  ($ :dialog.block {:ref ref}
     ($ :h2.text-preset-2.edit-dialog__heading "Edit your card")
     ($ edit-form {:card card :on-submit on-submit})))

(defui delete-dialog [{:keys [ref on-delete on-abort]}]
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
  (let [edit-dialog-ref (use-ref)
        delete-dialog-ref (use-ref)
        {:keys [update-card delete-card]} (use-deck)]
    ($ :<>
       ($ dropdown {:id id :class-name "edit-menu"}
          ($ :button.edit-menu__edit {:on-click #(.showModal @edit-dialog-ref)}
             "Edit")
          ($ :button.edit-menu__delete {:on-click #(.showModal @delete-dialog-ref)}
             "Delete"))
       ($ edit-dialog {:ref edit-dialog-ref
                       :card card
                       :on-submit #(do (update-card %)
                                       (.close @edit-dialog-ref))})
       ($ delete-dialog {:ref delete-dialog-ref
                         :on-delete #(delete-card card)
                         :on-abort #(.close @delete-dialog-ref)}))))
