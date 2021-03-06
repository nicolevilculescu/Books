sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel"
 ], function (Controller, MessageToast, Fragment, ResourceModel) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.App", {
        onInit : function () {
            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

       handleDelete : function (oEvent) {
          var sBookPath = oEvent.getParameter('listItem').getBindingContext().getPath();

          var oBundle = this.getView().getModel("i18n").getResourceBundle();

          this.getView().getModel().remove(sBookPath, {
            success: function() {
                var sMsg = oBundle.getText("succsessfulDelete");
                MessageToast.show(sMsg);
            },
            error: function() {
                var sMsg = oBundle.getText("unsuccsessfulDelete");
                MessageToast.show(sMsg);
            }
        });
       },

       onAddPress : function (oCurrent) {
			var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "org.ubb.books.view.Dialog",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open(oCurrent);
			});
		},

        onUpdatePress : function (oCurrent) {
            var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "org.ubb.books.view.DialogUpdate",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
                    oView.byId("isbn").setValue(oCurrent.BookISBN);
                    oView.byId("title").setValue(oCurrent.Title);
                    oView.byId("author").setValue(oCurrent.Author);
                    oView.byId("date").setValue(oCurrent.PublishingDate);
                    oView.byId("language").setValue(oCurrent.Language);
                    oView.byId("total").setValue(oCurrent.TotalNumber);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open(oCurrent);
			});
        },

        onClose : function () {
            this.byId("dialog").close();
            location.reload();
        },

        
        onCloseUpdate : function () {
            this.byId("dialogUpdate").close();
            location.reload();
        },

        handleEdit : function (oEvent) {
            var oCurrent = oEvent.getSource().getBindingContext().getObject();
            this.onUpdatePress(oCurrent);
       },

		onInsert : function (oEvent) {

            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            var currentDate = new Date(),
                oView = this.getView(),
                oModel = oEvent.getSource().getModel(),
                oData = {
                    BookISBN: oView.byId('isbn').getValue(),
                    Title: oView.byId('title').getValue(),
                    Author: oView.byId('author').getValue(),
                    PublishingDate: new Date(oView.byId('date').getValue()),
                    Language: oView.byId('language').getValue(),
                    TotalNumber: parseInt(oView.byId('total').getValue()),
                    Available: parseInt(oView.byId('total').getValue()),
                    CreatedOn: currentDate,
                    ChangedOn: currentDate
                };
            
            oView.setBusy(true);

            oModel.create("/BooksSet", oData, {
                success: function () {
                    oView.setBusy(false);
                    var sMsg = oBundle.getText("succsessfulInsert");
                    MessageToast.show(sMsg);
                    this.byId("dialog").close();
                    location.reload();
                }.bind(this),
                error: function () {
                    var sMsg = oBundle.getText("unsuccsessfulInsert");
                    MessageToast.show(sMsg);
                    oView.setBusy(false);
                }
            });
        },

        onUpdate : function () {
            var currentDate = new Date(),
                oView = this.getView(),
                oModel = oView.getModel(),
                oData = {
                    BookISBN: oView.byId('isbn').getValue(),
                    Title: oView.byId('title').getValue(),
                    Author: oView.byId('author').getValue(),
                    PublishingDate: new Date(oView.byId('date').getValue()),
                    Language: oView.byId('language').getValue(),
                    TotalNumber: parseInt(oView.byId('total').getValue()),
                    Available: parseInt(oView.byId('total').getValue()),
                    CreatedOn: currentDate,
                    ChangedOn: currentDate
                },
                oIsbn = oView.byId('isbn').getValue(),
                that = this;
            
            oView.setBusy(true);

            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            oModel.update("/BooksSet('"+oIsbn+"')", oData, {
                success: function () {
                    oView.setBusy(false);
                    that.byId("dialogUpdate").close();
                    location.reload();
                    var sMsg = oBundle.getText("succsessfulUpdate");
                    MessageToast.show(sMsg);
                },
                error: function () {
                    oView.setBusy(false);
                    var sMsg = oBundle.getText("unsuccsessfulUpdate");
                    MessageToast.show(sMsg);
                }
            });
        }
    });
 });