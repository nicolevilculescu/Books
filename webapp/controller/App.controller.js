sap.ui.define([
   "sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("org.ubb.books.controller.App", {

	onFirstPress: function () {
		var oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("maintainRecords");
	},

	onSecondPress: function () {
		var oRouter = this.getOwnerComponent().getRouter();
		oRouter.navTo("checkedoutBooks");
	}
   });
});