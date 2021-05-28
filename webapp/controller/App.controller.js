sap.ui.define([
   "sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("org.ubb.books.controller.App", {

      onAddPress : function () {
			this.getOwnerComponent().openDialog();
			var variabila = this.getView().byId("isbn").value();
			MessageToast.show(variabila);
		}

   });
});