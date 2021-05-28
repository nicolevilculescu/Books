sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.App", {
       handleDelete : function (oEvent) {
          var sBookPath = oEvent.getParameter('listItem').getBindingContext().getPath();
          this.getView().getModel().remove(sBookPath, {
            success: function() {
                MessageToast.show("Book deleted!");
            },
            error: function() {
                MessageToast.show("Error deleting the book!");
            }
        });
       }
    });
 });