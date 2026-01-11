(ns app.components.edit.delete-dialog
  (:require [uix.core :refer [$ defui]]))

(defui delete-dialog
  "A dialog to confirm a card deletion."
  [{:keys [ref on-delete]}]
  ($ :dialog.block.delete-dialog {:ref ref}
     ($ :div.delete-dialog__message
        ($ :p.text-preset-2
           "Delete this card?")
        ($ :p.text-preset-4--regular
           "This action can't be undone."))
     ($ :footer.delete-dialog__buttons
        ($ :button {:auto-focus "" :on-click #(.close @ref)}
           "Cancel")
        ($ :button.primary.with-shadow {:on-click on-delete}
           "Delete Card"))))
