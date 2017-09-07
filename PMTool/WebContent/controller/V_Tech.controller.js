sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageBox',
		'sap/ui/core/mvc/Controller',
		'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV',
		"sap/ui/core/routing/History",
		"sap/m/MessageToast"
	],

	function(jQuery, MessageBox, Controller, Export, ExportTypeCSV, History, MessageToast) {
		"use strict";
		var context_global = {};
		var context_indx = 0;
		var oObjnr;
		var sMsg;
		var oCancelTable;
		var aIndex;

		return Controller.extend("PMTool.controller.V_Tech", {

			onInit: function() {
				this.oTable = this.getView().byId("idTechTable");
				this.oModel = this.oTable.getModel();
				this.rebindTable();
			},

			rebindTable: function() {
				this.oTable.bindRows({
					path: "/TechTrackerSet",
					key: ["ZprojId", "ZgapNo", "ZspecName", "ZspecVersion", "ZseqNo"]
				});
			},
			onExit: function() {
				this.aTechTrackerSet = [];
			},

			fTechCopy: function() {
				var oTable = this.getView().byId("idTechTable");
				var aIndex = oTable.getSelectedIndex();
				if (aIndex < 0) {
					MessageToast.show("Please select one record");;
				} else {
					var selectedRow = oTable.getRows()[aIndex];
					var path = selectedRow.getBindingContext().getPath();
					var obj = oTable.getModel().getProperty(path);

					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					// Tell the Router to Navigate To Route_Tar_1
					oRouter.navTo("Route_Tech_Copy", {
						ProjId: obj.ZprojId,
						GapNo: obj.ZgapNo,
						SpecName: obj.ZspecName,
						SpecVer: obj.ZspecVersion,
						SeqNo: obj.ZseqNo,
						SpecDesc: obj.ZspecDesc,
						Domain: obj.Zdomain,
						Team: obj.Zteam,
						Category: obj.Zcategory,
						TktNo: obj.ZticketNo,
						StatusDev: obj.ZstatusDev,
						DevScope: obj.ZdevScope,
						DevType: obj.ZdevType,
						Complexity: obj.Zcomplexity,
						AssiBy: obj.ZassignedBy,
						OwnerOns: obj.OwnerNmOnsite,
						OwnerOffsh: obj.OwnerNmOffsh,
						AssiDate: obj.ZassignDate,
						PlanStart: obj.ZplanStart,
						PlanEnd: obj.ZplanEnd,
						Developer: obj.Zdeveloper
					});
				}
			},

			fTechChange: function() {
				var oTable = this.getView().byId("idTechTable");
				var oModel = oTable.getModel();
				this.aTransTrackerSet = jQuery.extend(true, [], oModel.getProperty("/TechTrackerSet"));
				this.getView().byId("bCopy").setVisible(false);
				this.getView().byId("bChange").setVisible(false);
				// this.getView().byId("bDelete").setVisible(false);
				this.getView().byId("bDownload").setVisible(false);
				this.getView().byId("bSave").setVisible(true);
				this.getView().byId("bCancel").setVisible(true);

				//oCancelTable = oTable;
				aIndex = oTable.getSelectedIndex();
				// sMsg = oTable.getContextByIndex(aIndex);
				// // alert(sMsg);
				var selectedRow = oTable.getRows()[aIndex];
				for (var i = 5; i < 24; i++) {
					selectedRow.getCells()[i].setProperty("editable", true);
				}
				oModel.setProperty("/TechTrackerSet", this.aTransTrackerSet);
				this.rebindTable();

			},
			fTechDelete: function() {
				/*delete operation*/
				var oModel = this.getView().getModel();
				// var Objnr = 3;
				var oTable = this.getView().byId("idTechTable");
				var iIndex = oTable.getSelectedIndex();
				// "get context
				var context = oTable.getContextByIndex(iIndex);

				// oModel.remove("/TechTrackerSet('1')", {
				oModel.remove(context.sPath, {
					method: "DELETE",
					success: function(data) {
						alert("success");
					},
					error: function(e) {
						alert("error");
					}
				});
			},

			fTechSave: function() {
				//   var oTable1 = this.getView().byId("idTechTable");
				// 	// var oModel = oTable.getModel();
				// 	var	iIndex = oTable1.getSelectedIndex();

				// 	// sMsg = oTable.getContextByIndex(aIndex);
				// 	// // alert(sMsg);
				// 	//	var contexts = oTable.getContextByIndex(aIndex);
				// //	var set = contexts.sPath;
				//             var selectedRow = oTable1.getRows()[iIndex];
				// 	/*create operation*/
				// 	var oModel = this.getView().getModel();
				// 	var oEntry = {};

				var oTable = this.getView().byId("idTechTable");
				// var aIndex = oTable.getSelectedIndex();
				var selectedRow = oTable.getRows()[aIndex];
				var path = selectedRow.getBindingContext().getPath();
				var obj = oTable.getModel().getProperty(path);

				var contexts = oTable.getContextByIndex(aIndex);
				var set = contexts.sPath;

				/*create operation*/
				var oModel = this.getView().getModel();
				var oEntry = {};

				oEntry.ZprojId = selectedRow.getCells()[0].getProperty("value");
				oEntry.ZgapNo = selectedRow.getCells()[1].getProperty("value");
				oEntry.ZspecName = selectedRow.getCells()[2].getProperty("value");
				oEntry.ZspecVersion = selectedRow.getCells()[3].getProperty("value");
				oEntry.ZseqNo = selectedRow.getCells()[4].getProperty("value");
				oEntry.ZspecDesc = selectedRow.getCells()[5].getProperty("value");
				oEntry.Zdomain = selectedRow.getCells()[6].getProperty("value");
				oEntry.Zteam = selectedRow.getCells()[7].getProperty("value");
				oEntry.Zcategory = selectedRow.getCells()[8].getProperty("value");
				oEntry.ZticketNo = selectedRow.getCells()[9].getProperty("value");
				oEntry.ZstatusDev = selectedRow.getCells()[10].getProperty("value");
				oEntry.ZdevScope = selectedRow.getCells()[11].getProperty("value");
				oEntry.ZdevType = selectedRow.getCells()[12].getProperty("value");
				oEntry.Zcomplexity = selectedRow.getCells()[13].getProperty("value");
				oEntry.ZassignedBy = selectedRow.getCells()[14].getProperty("value");
				oEntry.OwnerNmOnsite = selectedRow.getCells()[15].getProperty("value");
				oEntry.OwnerNmOffsh = selectedRow.getCells()[16].getProperty("value");
				// oEntry.ZassignDate = selectedRow.getCells()[17].getProperty("value");
				// oEntry.ZplanStart = selectedRow.getCells()[18].getProperty("value");
				// oEntry.ZplanEnd = selectedRow.getCells()[19].getProperty("value");
				oEntry.Zdeveloper = selectedRow.getCells()[23].getProperty("value");
				oModel.update(set, oEntry, {
					method: "PUT",
					success: function(data) {
						MessageToast.show("Record has been saved");
					},
					error: function(e) {
						alert("error");
					}
				});

				for (var i = 5; i < 23; i++) {
					selectedRow.getCells()[i].setProperty("editable", false);
					this.getView().byId("bCopy").setVisible(true);
					this.getView().byId("bChange").setVisible(true);
					// this.getView().byId("bDelete").setVisible(true);
					this.getView().byId("bSave").setVisible(false);
					this.getView().byId("bCancel").setVisible(false);
				}
			},

			fTechCancel: function() {
				this.getView().byId("bCopy").setVisible(true);
				this.getView().byId("bChange").setVisible(true);
				// this.getView().byId("bDelete").setVisible(true);
				this.getView().byId("bDownload").setVisible(true);
				this.getView().byId("bSave").setVisible(false);
				this.getView().byId("bCancel").setVisible(false);
				var oTable = this.getView().byId("idTechTable");
				// var oModel = oTable.getModel();
				// oModel.setProperty("/TechTrackerSet", this.aProjMasterSet);
				var selectedRow = this.oTable.getRows()[aIndex];
				for (var i = 1; i < 24; i++) {
					selectedRow.getCells()[i].setProperty("editable", false);
				}
				this.rebindTable();
			},

			fTechDownload: sap.m.Table.prototype.exportData || function(oEvent) {
				var oExport = new Export({
					exportType: new ExportTypeCSV({
						separatorChar: ",",
						charSet: "utf-8"
					}),
					models: this.getView().getModel(),
					rows: {
						path: "/TechTrackerSet"
					},
					columns: [{
						name: "Project Id",
						template: {
							content: "{ZprojId}"
						}
					}, {
						name: "Gap No",
						template: {
							content: "{ZgapNo}"
						}
					}, {
						name: "Spec Name",
						template: {
							content: "{ZspecName}"
						}
					}, {
						name: "Spec Version",
						template: {
							content: "{ZspecVersion}"
						}
					}, {
						name: "Seq No",
						template: {
							content: "{ZseqNo}"
						}
					}, {
						name: "Spec Description",
						template: {
							content: "{ZpecDesc}"
						}
					}, {
						name: "Domain",
						template: {
							content: "{Zdomain}"
						}
					}, {
						name: "Team",
						template: {
							content: "{Zteam}"
						}
					}, {
						name: "Category",
						template: {
							content: "{Zcategory}"
						}
					}, {
						name: "Ticket No",
						template: {
							content: "{ZticketNo}"
						}
					}, {
						name: "Dev Status",
						template: {
							content: "{ZstatusDev}"
						}
					}, {
						name: "Dev Scope",
						template: {
							content: "{ZdevScope}"
						}
					}, {
						name: "Dev Type",
						template: {
							content: "{ZdevType}"
						}
					}, {
						name: "Complexity",
						template: {
							content: "{Zcomplexity}"
						}
					}, {
						name: "Assigned By",
						template: {
							content: "{ZassignedBy}"
						}
					}, {
						name: "Onsite Owner Name",
						template: {
							content: "{OwnerNmOnsite}"
						}
					}, {
						name: "Offshore Owner Name",
						template: {
							content: "{OwnerNmOffshe}"
						}
					}, {
						name: "Assign Date",
						template: {
							content: "{ZassignDate}"
						}
					}, {
						name: "Plan Start Date",
						template: {
							content: "{ZplanStart}"
						}
					}, {
						name: "Plan End Date",
						template: {
							content: "{ZplanEnd}"
						}
					}, {
						name: "Real Start Date",
						template: {
							content: "{ZrealStart}"
						}
					}, {
						name: "Real End Date",
						template: {
							content: "{ZrealEnd}"
						}
					}, {
						name: "Close Date",
						template: {
							content: "{ZcloseDate}"
						}
					}, {
						name: "Developer",
						template: {
							content: "{Zdeveloper}"
						}
					}]
				});
				// // download exported file
				oExport.saveFile().catch(function(oError) {
					MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
				}).then(function() {
					oExport.destroy();
				});
			},

			fGoto_Target1: function() {
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
			}
		});
	});