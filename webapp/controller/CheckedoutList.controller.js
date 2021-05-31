sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.App", {

        constructor : function (oView) {
			this._oView = oView;

            //alert(sap.ui.getCore().byId("Title").getValue());
            // var sysTable = new DataTable();
            
            // sysTable.bindRows("/BooksSet");
            
            // sysTable.attachRowSelect(function(oEvent){
            
            // oSystemDetailsML.bindContext(
            
            // "/BooksSet/" + sysTable.getSelectedIndices());
            
            // }); 
		}

    //    handleDelete : function (oEvent) {
    //       var sBookPath = oEvent.getParameter('listItem').getBindingContext().getPath();
    //       this.getView().getModel().remove(sBookPath, {
    //         success: function() {
    //             MessageToast.show("Book deleted!");
    //         },
    //         error: function() {
    //             MessageToast.show("Error deleting the book!");
    //         }
    //     });
    //    }
    });
 });