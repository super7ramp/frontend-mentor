(ns app.components.edit.edit-menu
  (:require [app.components.button-close :refer [button-close]]
            [app.components.dropdown :refer [dropdown dropdown-entry]]
            [app.components.edit.edit-form :refer [edit-form]]
            [app.hooks.use-deck :refer [use-deck]]
            [app.hooks.use-notify :refer [use-notify]]
            [uix.core :refer [$ defui use-ref]]))

(defui edit-dialog [{:keys [ref card on-submit]}]
  ($ :dialog.block {:ref ref}
     ($ button-close {:class-name "edit-dialog__close"
                      :on-click #(.close @ref)
                      :auto-focus ""})
     ($ :h2.text-preset-2.edit-dialog__heading
        "Edit your card")
     ($ edit-form {:card card
                   :on-submit #(do (on-submit %)
                                   (.close @ref))})))

(defui delete-dialog [{:keys [ref on-delete]}]
  ($ :dialog.block.delete-confirmation-dialog {:ref ref}
     ($ :div.delete-confirmation-dialog__message
        ($ :p.text-preset-2
           "Delete this card?")
        ($ :p.text-preset-4--regular
           "This action can't be undone."))
     ($ :footer.delete-confirmation-dialog__buttons
        ($ :button {:auto-focus "" :on-click #(.close @ref)}
           "Cancel")
        ($ :button.primary.with-shadow {:on-click on-delete}
           "Delete Card"))))

(defui edit-menu [{:keys [id card]}]
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
                       :on-submit (fn [updated-card]
                                    (update-card updated-card)
                                    (notify "Card updated successfully."))})
       ($ delete-dialog {:ref delete-dialog-ref
                         :on-delete (fn []
                                      (delete-card card)
                                      (notify "Card deleted."))}))))
