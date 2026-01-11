(ns app.components.edit.edit-dialog
  (:require [app.components.button-close :refer [button-close]]
            [app.components.edit.edit-form :refer [edit-form]]
            [uix.core :refer [$ defui]]))

(defui edit-dialog
  "A dialog containing the edit form."
  [{:keys [ref card on-submit]}]
  ($ :dialog.block {:ref ref}
     ($ button-close {:class-name "edit-dialog__close"
                      :on-click #(.close @ref)
                      :auto-focus ""})
     ($ :h2.text-preset-2.edit-dialog__heading
        "Edit your card")
     ($ edit-form {:card card
                   :on-submit #(do (on-submit %)
                                   (.close @ref))})))
