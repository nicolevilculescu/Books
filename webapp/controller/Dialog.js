sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast"
], function (ManagedObject, Fragment, MessageToast) {
	"use strict";

	return ManagedObject.extend("org.ubb.books.controller.Dialog", {

		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;
		},

		open : function () {
			var oView = this._oView;

			// create dialog lazily
			if (!this.pDialog) {
				var oFragmentController = {
					onCloseDialog : function () {
						oView.byId("dialog").close();
						// var variabila = sap.ui.getCore().byId("isbn").getValue();
						// MessageToast.show(variabila);
					}
				};
				// load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "org.ubb.books.view.Dialog",
					controller: oFragmentController
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		}

	});

});