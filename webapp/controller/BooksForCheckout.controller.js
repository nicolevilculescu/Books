sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel",
	"sap/ui/model/Filter"
 ], function (Controller, MessageToast, Fragment, ResourceModel, Filter) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.App", {

        onInit : function () {
            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

        constructor : function (oView) {
			this._oView = oView;
		},

        openChecked : function () {
            var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "org.ubb.books.view.DialogChecked",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
        },

        handleCheckout : function (oEvent) {
            var oCurrent = oEvent.getSource().getBindingContext().getObject();

            var currentDate = new Date(),
                oView = this.getView(),
                oModel = oView.getModel(),
                oData = {
                    BookISBN: oCurrent.BookISBN,
                    Title: oCurrent.Title,
                    Author: oCurrent.Author,
                    PublishingDate: new Date(oCurrent.PublishingDate),
                    Language: oCurrent.Language,
                    TotalNumber: parseInt(oCurrent.TotalNumber),
                    Available: parseInt(oCurrent.Available) - 1,
                    CreatedOn: currentDate,
                    ChangedOn: currentDate
                },
                oIsbn = oCurrent.BookISBN;
            
            oView.setBusy(true);

            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            oModel.update("/BooksSet('"+oIsbn+"')", oData, {
                success: function () {
                    oView.setBusy(false);
                    var sMsg = oBundle.getText("succsessfulUpdate");
                    MessageToast.show(sMsg);
                },
                error: function () {
                    oView.setBusy(false);
                    var sMsg = oBundle.getText("unsuccsessfulUpdate");
                    MessageToast.show(sMsg);
                }
            });

            var currentDate = new Date(),
                oView = this.getView(),
                oModel = oEvent.getSource().getModel(),
                oData = {
                    CheckoutDate: currentDate,
                    ReturnDate: currentDate,
                    Isbn: oIsbn
                };
            
            oView.setBusy(true);

            oModel.create("/CheckedSet", oData, {
                success: function () {
                    oView.setBusy(false);
                }.bind(this),
                error: function () {
                    oView.setBusy(false);
                }
            });
        },

        onFilterBooks : function (oEvent) {
            // filter binding
                var oTable = this.byId("idBooksTable2"),
                    oBinding = oTable.getBinding("items"),
                    aFilters = [];
    
                aFilters.push(new Filter("BookISBN", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
                aFilters.push(new Filter("Title", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
                aFilters.push(new Filter("Author", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
                // aFilters.push(new Filter("Language", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
    
                oBinding.filter(new Filter({
                    filters: aFilters,
                    and: true
                }));
           }
    });
 });