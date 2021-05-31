sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
 ], function (Controller, MessageToast, Filter, FilterOperator, Fragment) {
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
                    MessageToast.show("Book inserted!");
                    this.byId("dialog").close();
                    location.reload();
                }.bind(this),
                error: function () {
                    MessageToast.show("Error inserting the book!");
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

            oModel.update("/BooksSet('"+oIsbn+"')", oData, {
                success: function () {
                    oView.setBusy(false);
                    that.byId("dialogUpdate").close();
                    location.reload();
                },
                error: function () {
                    oView.setBusy(false);
                }
            });
        },

       onFilterBooks : function (oEvent) {

        //    // build filter array
        //    var aFilter = [];
        //    var sQuery = oEvent.getParameter("query");
        //    if (sQuery) {
        //        aFilter.push(new Filter("Author", FilterOperator.Contains, sQuery));
        //    }

        //    // filter binding
           var oTable = this.byId("idBooksTable");
           var oBinding = oTable.getBinding("items");
        //    oBinding.filter(aFilter);

        //    var oBinding = [CONTROL].getBinding("items");
            var aFilters = [];

            aFilters.push(new Filter("Title", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
            aFilters.push(new Filter("Author", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));

            oBinding.filter(new Filter({
                filters: aFilters,
                and: true
            }));
       },

       handelBookSearch : function (oEvent) {
        //    var oBookTable = this.getView().byId("idBooksTable");
        //    var oItemBinding = oBookTable.getBinding("columns");
        //    var sValue = oEvent.oSource.getValue();

        //    var oNameFilter = sap.ui.model.Filter("Title", sap.ui.model.FilterOperator.Contains, sValue);
        //    oItemBinding.filter(oNameFilter);
        
        // var oBinding = [CONTROL].getBinding("items");
        // var aFilters = [];

        // aFilters.push(new Filter("Title", sap.ui.model.FilterOperator.Contains, [VALUE]));
        // aFilters.push(new Filter("Author", sap.ui.model.FilterOperator.Contains, [VALUE]));

        // oBinding.filter(new Filter({
        //     filters: aFilters,
        //     and: true
        // }));
        }
    });
 });