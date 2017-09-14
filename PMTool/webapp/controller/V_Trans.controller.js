sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(jquery, Controller, History, MessageToast) {
	"use strict";
	// var oObjnr;
	var sMsg;
	var oCancelTable;
	var aIndex;
	return Controller.extend("ZNav.controller.V_Trans", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZNav.view.V_Trans
		 */
		onInit: function() {

			this.oTable = this.getView().byId("Trans_Table");
			this.oModel = this.oTable.getModel();
			// 				// var oModel = this.getView().getModel();
			// 	// oModel.setCountSupported(false);
			// 	this.oModel.read("/TransTrackerSet", {
			//      filters: [ new sap.ui.model.Filter({
			//           path: 'Trkorr',
			//           operator: sap.ui.model.FilterOperator.EQ,
			//           value1: 'DW2*'
			//      }) ]
			// });
			this.rebindTable();
		},

		rebindTable: function() {
			this.oTable.bindRows({
				path: "/TransTrackerSet",
				key: ["Objnr"]
			});
		},
		/**
		 * Similar to onAfterRen	dering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZNav.view.V_Trans
		 */
		// onBeforeRendering: function() {
		// var oModel = this.getView().getModel();
		// oModel.refresh();
		// },
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZNav.view.V_Trans
		 */
		onAfterRendering: function() {
			// var oModel = this.getView().getModel();
			// oModel.refresh();
		},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZNav.view.V_Trans
		 */
		onExit: function() {

		},
		/**
		 *@memberOf ZNav.controller.V_Trans
		 */
		fGoToTarget_1: function(Evt) {
			//This code was generated by the layout editor.
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			// Go one screen back if you find a Hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} // If you do not find a correct Hash, go to the Source screen using default router;
			else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("", true);
			}
		},
		/**
		 *@memberOf ZNav.controller.V_Trans
		 */
		fCreate_Trans: function() {
			//This code was generated by the layout editor.
			//This code was generated by the layout editor.
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Tell the Router to Navigate To Route_Tar_1
			oRouter.navTo("Route_Trans_Create", {});
		},
		/**
		 *@memberOf ZNav.controller.V_Trans
		 */
		fDelete_Trans: function(oEvent) {
			// alert(oObjnr);
			//       var oItem = oEvent.getSource().getParent();
			//         var oTable = this.getView().byId("Trans_Table").getItems();
			//         var oIndex = oTable.indexOfItem(oItem);
		},
		/**
		 *@memberOf ZNav.controller.V_Trans
		 */
		fChange_Trans: function() {
			//This code was generated by the layout editor.
			// var oPage = this.getView().byId("trans_page");
			// oPage.setShowFooter(true);

			var oTable = this.getView().byId("Trans_Table");
			var oModel = oTable.getModel();
			// this.aTransTrackerSet = jQuery.extend(true, [], oModel.getProperty("/TransTrackerSet"));
			aIndex = oTable.getSelectedIndex();

			if (aIndex < 0) {
				MessageToast.show("Please select one record");
			} else {
				this.getView().byId("idCopy").setVisible(false);
				this.getView().byId("idChange").setVisible(false);
				// this.getView().byId("idDelete").setVisible(false);
				this.getView().byId("idSave").setVisible(true);
				this.getView().byId("idCancel").setVisible(true);
				sMsg = oTable.getContextByIndex(aIndex);
				// alert(sMsg);
				var selectedRow = oTable.getRows()[aIndex];
				for (var i = 0; i < 14; i++) {
					selectedRow.getCells()[i].setProperty("editable", true);
				}
				// oModel.setProperty("/TransTrackerSet", this.aTransTrackerSet);
				// this.rebindTable();
			}
		},
		fCancelFromTrans: function() {
			// var oPage = this.getView().byId("trans_page");
			// oPage.setShowFooter(false);

			this.getView().byId("idCopy").setVisible(true);
			this.getView().byId("idChange").setVisible(true);
			// this.getView().byId("idDelete").setVisible(true);
			this.getView().byId("idSave").setVisible(false);
			this.getView().byId("idCancel").setVisible(false);
			// var oModel = this.getView().getModel();
			// oModel.resetChanges(["/TransTrackerSet('1')"]);
			// var oTable = this.getView().byId("Trans_Table");
			// var oModel = oTable.getModel();
			// var aIndex = oTable.getSelectedIndex();
			var selectedRow = this.oTable.getRows()[aIndex];
			for (var i = 0; i < 14; i++) {
				selectedRow.getCells()[i].setProperty("editable", false);
			}
			// oModel.setProperty("/TransTrackerSet", this.aTransTrackerSet);
			this.rebindTable();

			//oCancelTable.getBinding().refresh(true);

			//sap.ui.getCore().byId("Trans_Table").getModel().refresh(true);

			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// // Tell the Router to Navigate To Route_Tar_1
			// oRouter.navTo("Route_Tar_3", {});
		},
		fDeleteFromTrans: function() {

			/*delete operation*/
			var oModel = this.getView().getModel();
			var oTable = this.getView().byId("Trans_Table");
			var aIndex = oTable.getSelectedIndex();
			if (aIndex < 0) {
				MessageToast.show("Please select one record");
			} else {
				var contexts = oTable.getContextByIndex(aIndex);
				var set = contexts.sPath;
				//var Objnr = 3;
				oModel.remove(set, {
					//oModel.remove("/TransTrackerSet('1')", {
					//oModel.remove("/FlightSet('"+Carrid+"')" {, 
					method: "DELETE",
					success: function(data) {
						alert("success");
					},
					error: function(e) {
						alert("error");
					}
				});
			}
		},
		fCopy_Trans: function() {

			var oTable = this.getView().byId("Trans_Table");
			var aIndex = oTable.getSelectedIndex();
			if (aIndex < 0) {
				MessageToast.show("Please select one record");
			} else {
				var selectedRow = oTable.getRows()[aIndex];
				var path = selectedRow.getBindingContext().getPath();
				var obj = oTable.getModel().getProperty(path);
				if (obj.Team == "") {
					obj.Team = " ";
				}
				if (obj.Project == "") {
					obj.Project = " ";
				}
				if (obj.Ticket == "") {
					obj.Ticket = " ";
				}
				if (obj.Folder == "") {
					obj.Folder = " ";
				}
				if (obj.Seqnr == "") {
					obj.Seqnr = " ";
				}
				if (obj.Land1 == "") {
					obj.Land1 = " ";
				}
				if (obj.Trkorr == "") {
					obj.Trkorr = " ";
				}
				if (obj.TrkorrPrev == "") {
					obj.TrkorrPrev = " ";
				}
				if (obj.Devtype == "") {
					obj.Devtype = " ";
				}
				if (obj.As4user == "") {
					obj.As4user = " ";
				}
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				// Tell the Router to Navigate To Route_Tar_1
				oRouter.navTo("Route_Trans_Copy", {
					Team: obj.Team,
					Project: obj.Project,
					Ticket: obj.Ticket,
					SpecName: obj.Folder,
					Seqnr: obj.Seqnr,
					Country: obj.Land1,
					Trkorr: obj.Trkorr,
					TrkorrPrev: obj.TrkorrPrev,
					Devtype: obj.Devtype,
					// Devtype: " ",
					Owner: obj.As4user
				});
			}
		},
		// getTable : function(){
		// 	return this.getView().byId("Trans_Table");
		// },
		/**
		 *@memberOf ZNav.controller.V_Trans
		 */
		fSaveChangeTrans: function() {
			var oTable = this.getView().byId("Trans_Table");
			// var aIndex = oTable.getSelectedIndex();
			var selectedRow = oTable.getRows()[aIndex];
			var path = selectedRow.getBindingContext().getPath();
			var obj = oTable.getModel().getProperty(path);

			var contexts = oTable.getContextByIndex(aIndex);
			var set = contexts.sPath;

			/*create operation*/
			var oModel = this.getView().getModel();
			var oEntry = {};
			oEntry.Objnr = obj.Objnr;
			oEntry.TranList = selectedRow.getCells()[0].getProperty("value");
			oEntry.Team = selectedRow.getCells()[1].getProperty("value");
			oEntry.Project = selectedRow.getCells()[2].getProperty("value");
			oEntry.Ticket = selectedRow.getCells()[3].getProperty("value");
			oEntry.Folder = selectedRow.getCells()[4].getProperty("value");
			oEntry.Seqnr = selectedRow.getCells()[5].getProperty("value");
			oEntry.Land1 = selectedRow.getCells()[6].getProperty("value");
			oEntry.Trkorr = selectedRow.getCells()[7].getProperty("value");
			oEntry.TrkorrPrev = selectedRow.getCells()[8].getProperty("value");
			oEntry.Devtype = selectedRow.getCells()[9].getProperty("value");
			oEntry.As4user = selectedRow.getCells()[10].getProperty("value");
			oEntry.Comments = selectedRow.getCells()[11].getProperty("value");
			// oEntry.Delflg = selectedRow.getCells()[13].getProperty("value");
			oEntry.Ernam = selectedRow.getCells()[13].getProperty("value");
			// oEntry.Erdat = "2017-08-25T00:00:00";
			// oEntry.Ertim = "PT10H10M10S";
			// oEntry.Chnam = "V2746337";
			// oEntry.Chdat = "2017-09-25T00:00:00";
			// oEntry.Chtim = "PT10H10M10S";
			oModel.update(set, oEntry, {
				method: "PUT",
				success: function(data) {
					MessageToast.show("Record has been saved");
				},
				error: function(e) {
					MessageToast.show("error");
				}
			});
			for (var i = 0; i < 14; i++) {
				selectedRow.getCells()[i].setProperty("editable", false);
				this.getView().byId("idCopy").setVisible(true);
				this.getView().byId("idChange").setVisible(true);
				// this.getView().byId("idDelete").setVisible(true);
				this.getView().byId("idSave").setVisible(false);
				this.getView().byId("idCancel").setVisible(false);
			}
		}
	});
});