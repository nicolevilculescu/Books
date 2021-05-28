sap.ui.define([
    "sap/ui/core/UIComponent",
    "./controller/Dialog"
 ], function (UIComponent, Dialog) {
    "use strict";
    return UIComponent.extend("org.ubb.books.Component", {
       metadata : {
             manifest: "json"
       },
       init : function () {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
          
          // set dialog
			this._dialog = new Dialog(this.getRootControl());
         // create the views based on the url/hash
			this.getRouter().initialize();
		},

		exit : function() {
			this._dialog.destroy();
			delete this._dialog;
		},

		openDialog : function () {
			this._dialog.open();
      }
    });
 });