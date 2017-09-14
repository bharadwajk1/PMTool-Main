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

		return Controller.extend("ZNav.controller.V_Tech", {

			onInit: function() {
				this.oTable = this.getView().byId("idTechTable");
				var oView = this.getView();
				var oTable1 = oView.byId("idTechTable");
				var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTECH_TRACKER_SRV");
				var oBinding = oModel.bindList("/TechTrackerSet");
				var aLength = oBinding.getLength();
				oTable1.setVisibleRowCount(aLength);
				
				var ojsonModel = new sap.ui.model.json.JSONModel();
				ojsonModel.loadData("model/Data.json", "", false);
				this.getView().setModel(ojsonModel, "jData");
				
				// this.oModel = this.oTable.getModel();
				// this.oModel = this.getView().getModel();

				 this.rebindTable();
				
			

			},

			rebindTable: function() {
				var dialog = new sap.m.BusyDialog({
					text: 'Please wait'
				});
				dialog.open();
				this.oTable.bindRows({
					path: "/TechTrackerSet",
					// key: ["ZprojId", "ZgapNo", "ZspecName", "ZspecVersion", "ZseqNo"]
					key: ["Zobjnr"]
				});
				//var oModel = this.getView().getModel();
				// this.oModel = this.getView().getModel();
				// this.oModel = this.oTable.getModel();
				dialog.close();
			},

			// * Similar to onAfterRen	dering, but this hook is invoked before the controller's View is re-rendered
			//* (NOT before the first rendering! onInit() is used for that one!).
			//* @memberOf ZNav.view.V_Trans
			onBeforeRendering: function() {
				this.oModel = this.getView().getModel();
				var dialog = new sap.m.BusyDialog({
					text: 'Please wait'
				});
				//text:'Loading Data' });
				this.oModel.attachRequestSent(function() {
					// sap.ui.core.BusyIndicator.show(10);
					dialog.open();
				});
				this.oModel.attachRequestCompleted(function() {
					// sap.ui.core.BusyIndicator.hide();
					dialog.close();
				});
				this.oModel.attachRequestFailed(function() {
					dialog.close();
				});
				// var oModel1 = this.getView().getModel();
			},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf ZNav.view.V_Trans
			 */
			// onAfterRendering: function() {
			// 	// var oModel = this.getView().getModel();
			// 	// var oModel1 = this.getView().getModel();
			// 	// // oModel.refresh();
			// 	this.oModel = this.getView().getModel();
			// 	var dialog = new sap.m.BusyDialog({
			// 			  text:'Loading Data' });
			// 	this.oModel.attachRequestSent(function(){ 
			// 		// sap.ui.core.BusyIndicator.show(10);
			// 		dialog.open(); });
			// 	this.oModel.attachRequestCompleted(function(){ 
			// 		// sap.ui.core.BusyIndicator.hide();
			// 		dialog.close();
			// 	});
			// 	this.oModel.attachRequestFailed(function () {
			// 		dialog.close(); });
			// },

			onExit: function() {
				this.aTechTrackerSet = [];
			},

			fTechCopy: function() {
				// var oTable = this.getView().byId("idTechTable");
				var oView = this.getView();
				var oTable = oView.byId("idTechTable");
				var aIndex = oTable.getSelectedIndex();
				if (aIndex < 0) {
					MessageToast.show("Please select one record");
				} else {
					var selectedRow = oTable.getRows()[aIndex];
					var path = selectedRow.getBindingContext().getPath();
					var obj = oTable.getModel().getProperty(path);
					if (obj.ZprojId == "") { obj.ZprojId = " ";}
					if (obj.ZgapNo == "") { obj.ZgapNo = " ";}
					if (obj.ZspecName == "") { obj.ZspecName = " ";}
					if (obj.ZspecVersion == "") { obj.ZspecVersion = " ";}
					if (obj.ZspecDesc == "") { obj.ZspecDesc = " ";}
					if (obj.Zdomain == "") { obj.Zdomain = " ";}
					if (obj.Zteam == "") { obj.Zteam = " ";}
					if (obj.Zcategory == "") { obj.Zcategory = " ";}
					if (obj.ZticketNo == "") { obj.ZticketNo = " ";}
					
						if (obj.Zcomplexity == "") { obj.Zcomplexity = " ";}
					if (obj.ZdevScope == "") { obj.ZdevScope = " ";}
					if (obj.ZdevType == "") { obj.ZdevType = " ";}
					if (obj.Zcomplexity == "") { obj.Zcomplexity = " ";}
					if (obj.ZassignedBy == "") { obj.ZassignedBy = " ";}
					if (obj.OwnerNmOnsite == "") { obj.OwnerNmOnsite = " ";}
					if (obj.OwnerNmOffsh == "") { obj.OwnerNmOffsh = " ";}
					// if (obj.ZassignDate == "") { obj.ZassignDate = " ";}
					// if (obj.ZplanStart == "") { obj.ZplanStart = " ";}
					// if (obj.ZplanEnd == "") { obj.ZplanEnd = " ";}
					if (obj.Zdeveloper == "") { obj.Zdeveloper = " ";}
				}
				var oDialog = oView.byId("idTechDialogCopy");
				// create dialog lazily
				if (!oDialog) {
					// create dialog via fragment factory
					oDialog = sap.ui.xmlfragment(oView.getId(), "ZNav.view.TechCopy", this);
					// connect dialog to view (models, lifecycle)
					oView.addDependent(oDialog);
				}
				
				oView.byId("inProjectIdCo").setValue(obj.ZprojId);
				oView.byId("inTeamCo").setValue(obj.Zteam);
				oView.byId("inGapNoCo").setValue(obj.ZgapNo);
				oView.byId("inSpecNameCo").setValue(obj.ZspecName);
				
				oView.byId("inSpecVerCo").setValue(obj.ZspecVersion);
				oView.byId("inSeqCo").setValue(obj.ZseqNo);
				oView.byId("inSpecDescCo").setValue(obj.ZspecDesc);
				oView.byId("inDomainCo").setValue(obj.Zdomain);
				oView.byId("inCategoryCo").setValue(obj.Zcategory);
				oView.byId("inTicketCo").setValue(obj.ZticketNo);
				oView.byId("inDevStatusCo").setValue(obj.ZstatusDev);
				oView.byId("inDevScopeCo").setValue(obj.ZdevScope);
				oView.byId("inDevTypeCo").setValue(obj.ZdevType);
				oView.byId("inComplexityCo").setValue(obj.Zcomplexity);
				oView.byId("inAssignedByCo").setValue(obj.ZassignedBy);
			    oView.byId("inDeveloperCo").setValue(obj.Zdeveloper);
			    
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-yyyy" });   
				
				
				var dateFormatted = dateFormat.format(obj.ZassignDate);
				oView.byId("inAssignedDateCo").setValue(dateFormatted);
				
				var dateFormatted = dateFormat.format(obj.ZplanStart);
				oView.byId("inPlanStartCo").setValue(dateFormatted);
				
				var dateFormatted = dateFormat.format(obj.ZplanEnd);
				oView.byId("inPlanEndCo").setValue(dateFormatted);
				
					var dateFormatted = dateFormat.format(obj.ZrealStart);
				oView.byId("inRealStartCo").setValue(dateFormatted);
				
					var dateFormatted = dateFormat.format(obj.ZrealEnd);
				oView.byId("inRealEndCo").setValue(dateFormatted);
				
					var dateFormatted = dateFormat.format(obj.ZcloseDate);
				oView.byId("inCloseDateCo").setValue(dateFormatted);
				
				
				  oView.byId("instdDaysCo").setValue(obj.ZstdDays);
				  oView.byId("incodeDaysCo").setValue(obj.ZcodeDays);
				  oView.byId("intestDaysCo").setValue(obj.ZtestDays); 
				  oView.byId("inreviewDaysCo").setValue(obj.ZrevDays);
				  oView.byId("inabapWLoadCo").setValue(obj.ZabapWorkLoad);
				  oView.byId("inactCodeDaysCo").setValue(obj.ZactualDays);
			
			
			
				oDialog.open();
			},
			
			onCloseDialog : function () 
			{
				this.getView().byId("idTechDialogCopy").close();
				var oTable = this.getView().byId("idTechTable");
			var oModel = oTable.getModel();
			
			oModel.setProperty("/TechTrackerSet", this.aDevMasterSet);
			this.rebindTable();
			},
			onCloseDialog_Change : function () 
			{
				this.getView().byId("idTechDialogChange").close();
				
			var oTable = this.getView().byId("idTechTable");
			var oModel = oTable.getModel();
			
			oModel.setProperty("/TechTrackerSet", this.aDevMasterSet);
			
			this.rebindTable();
			},
		fTechChange: function() {
				var oView = this.getView();
				var oTable = oView.byId("idTechTable");
				var aIndex = oTable.getSelectedIndex();
				if (aIndex < 0) {
					MessageToast.show("Please select one record");
				} else {
					var selectedRow = oTable.getRows()[aIndex];
					var path = selectedRow.getBindingContext().getPath();
					var obj = oTable.getModel().getProperty(path);
					if (obj.ZprojId == "") { obj.ZprojId = " ";}
					
					if (obj.ZgapNo == "") { obj.ZgapNo = " ";}
					if (obj.ZspecName == "") { obj.ZspecName = " ";}
					if (obj.ZspecVersion == "") { obj.ZspecVersion = " ";}
					if (obj.ZspecDesc == "") { obj.ZspecDesc = " ";}
					if (obj.Zdomain == "") { obj.Zdomain = " ";}
					if (obj.Zteam == "") { obj.Zteam = " ";}
					if (obj.Zcategory == "") { obj.Zcategory = " ";}
					if (obj.ZticketNo == "") { obj.ZticketNo = " ";}
					if (obj.ZdevScope == "") { obj.ZdevScope = " ";}
					if (obj.ZdevType == "") { obj.ZdevType = " ";}
					if (obj.Zcomplexity == "") { obj.Zcomplexity = " ";}
					if (obj.ZassignedBy == "") { obj.ZassignedBy = " ";}
					if (obj.OwnerNmOnsite == "") { obj.OwnerNmOnsite = " ";}
					if (obj.OwnerNmOffsh == "") { obj.OwnerNmOffsh = " ";}
					if (obj.Zdeveloper == "") { obj.Zdeveloper = " ";}
				}
				var oDialog = oView.byId("idTechDialogChange");
				// create dialog 
				if (!oDialog) {
					oDialog = sap.ui.xmlfragment(oView.getId(), "ZNav.view.TechChange", this);
					oView.addDependent(oDialog);
				}
				
			oView.byId("inProjectId").setValue(obj.ZprojId);
				oView.byId("inTeam").setValue(obj.Zteam);
				oView.byId("inGapNo").setValue(obj.ZgapNo);
				oView.byId("inSpecName").setValue(obj.ZspecName);
				
				oView.byId("inSpecVer").setValue(obj.ZspecVersion);
				oView.byId("inSeq").setValue(obj.ZseqNo);
				oView.byId("inSpecDesc").setValue(obj.ZspecDesc);
				oView.byId("inDomain").setValue(obj.Zdomain);
				oView.byId("inCategory").setValue(obj.Zcategory);
				oView.byId("inTicket").setValue(obj.ZticketNo);
				oView.byId("inDevStatus").setValue(obj.ZstatusDev);
				oView.byId("inDevScope").setValue(obj.ZdevScope);
				oView.byId("inDevType").setValue(obj.ZdevType);
				oView.byId("inComplexity").setValue(obj.Zcomplexity);
				oView.byId("inAssignedBy").setValue(obj.ZassignedBy);
			    oView.byId("inDeveloper").setValue(obj.Zdeveloper);
			    
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-yyyy" });   
				
				
				var dateFormatted = dateFormat.format(obj.ZassignDate);
				oView.byId("inAssignedDate").setValue(dateFormatted);
				
				var dateFormatted = dateFormat.format(obj.ZplanStart);
				oView.byId("inPlanStart").setValue(dateFormatted);
				
				var dateFormatted = dateFormat.format(obj.ZplanEnd);
				oView.byId("inPlanEnd").setValue(dateFormatted);
				
					var dateFormatted = dateFormat.format(obj.ZrealStart);
				oView.byId("inRealStart").setValue(dateFormatted);
				
					var dateFormatted = dateFormat.format(obj.ZrealEnd);
				oView.byId("inRealEnd").setValue(dateFormatted);
				
					var dateFormatted = dateFormat.format(obj.ZcloseDate);
				oView.byId("inCloseDate").setValue(dateFormatted);
				
				
				  oView.byId("instdDays").setValue(obj.ZstdDays);
				  oView.byId("incodeDays").setValue(obj.ZcodeDays);
				  oView.byId("intestDays").setValue(obj.ZtestDays); 
				  oView.byId("inreviewDays").setValue(obj.ZrevDays);
				  oView.byId("inabapWLoad").setValue(obj.ZabapWorkLoad);
				  oView.byId("inactCodeDays").setValue(obj.ZactualDays);
			
				oDialog.open();
			},
			
			
			// fTechChange: function() {
			// 	var dialog = new sap.m.BusyDialog({
			// 		text: 'Please wait'
			// 	});
			// 	dialog.open();

			// 	var oTable = this.getView().byId("idTechTable");
			// 	var oModel = oTable.getModel();
			// 	this.aTransTrackerSet = jQuery.extend(true, [], oModel.getProperty("/TechTrackerSet"));
			// 	this.getView().byId("bCopy").setVisible(false);
			// 	this.getView().byId("bChange").setVisible(false);
			// 	this.getView().byId("bDelete").setVisible(false);
			// 	this.getView().byId("bDownload").setVisible(false);
			// 	this.getView().byId("bSave").setVisible(true);
			// 	this.getView().byId("bCancel").setVisible(true);

			// 	//oCancelTable = oTable;
			// 	// aIndex = oTable.getSelectedIndex();
			// 	// sMsg = oTable.getContextByIndex(aIndex);
			// 	// // alert(sMsg);
			// 	// var selectedRow = oTable.getRows()[aIndex];
			// 	// for (var i = 0; i < 23; i++) {
			// 	// 	selectedRow.getCells()[i].setProperty("editable", true);
			// 	// }
			// 	// oModel.setProperty("/TechTrackerSet", this.aTransTrackerSet);
			// 	this.rebindTable();
			// 	dialog.close();
			// },
			
			fTechDelete: function() {
				var oModel = this.getView().getModel();
				var oTable = this.getView().byId("idTechTable");
				var aIndex = oTable.getSelectedIndex();
				if (aIndex < 0) 
				{
					MessageToast.show("Please select one record");
				} 
				else 
				{
					MessageBox.show("Do you want to delete",
					{   actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose:function(oAction){
						if (oAction === sap.m.MessageBox.Action.YES){
					
					var dialog = new sap.m.BusyDialog({ text: 'Please wait' });
					dialog.open();
					
					var contexts = oTable.getContextByIndex(aIndex);
					var set = contexts.sPath;
					
					oModel.remove(set, {
						method: "DELETE",
						success: function(data) {
							dialog.close();
							// alert("success");
							MessageToast.show("Record has been deleted successfully");
							oTable.clearSelection();
						},
						error: function(e) {
							dialog.close();
							// alert("error");
							MessageToast.show("Error occured while deleting record");
							oTable.clearSelection();
						}
					
					});
				}
					else
					{
						oTable.clearSelection();
					}
				}});
				}
			},

				fTechSave_change: function() {
				var dialog = new sap.m.BusyDialog({
					text: 'Please wait'
				});
				dialog.open();

			
				var oTable = this.getView().byId("idTechTable");
				 var aIndex = oTable.getSelectedIndex();
				var selectedRow = oTable.getRows()[aIndex];
				var path = selectedRow.getBindingContext().getPath();
				var obj = oTable.getModel().getProperty(path);

				var contexts = oTable.getContextByIndex(aIndex);
				var set = contexts.sPath;

				/*create operation*/
				var oModel = this.getView().getModel();
				var oEntry = {};
				
				var oview = this.getView();
			
				
			oEntry.ZprojId = oview.byId("inProjectId").getValue();
				oEntry.Zteam = oview.byId("inTeam").getValue();
				oEntry.ZgapNo = oview.byId("inGapNo").getValue();
				oEntry.ZspecName = oview.byId("inSpecName").getValue();
				oEntry.ZspecVersion = oview.byId("inSpecVer").getValue();
				oEntry.ZseqNo = oview.byId("inSeq").getValue();
				
				 oEntry.ZspecDesc = oview.byId("inSpecDesc").getValue();
				 
				 oEntry.Zdomain = oview.byId("inDomain").getValue();
			
				 oEntry.Zcategory = oview.byId("inCategory").getValue();
				oEntry.ZticketNo = oview.byId("inTicket").getValue();
				 oEntry.ZstatusDev = oview.byId("inDevStatus").getValue();
				 oEntry.ZdevScope = oview.byId("inDevScope").getValue();
				oEntry.ZdevType = oview.byId("inDevType").getValue();
				 oEntry.Zcomplexity = oview.byId("inComplexity").getValue();
				oEntry.ZassignedBy = oview.byId("inAssignedBy").getValue();
				oEntry.Zdeveloper = oview.byId("inDeveloper").getValue();
				// oEntry.OwnerNmOnsite = oview.byId("iownerNmOnsite").getValue();
				// oEntry.OwnerNmOffsh = oview.byId("iownerOffsh").getValue();
				var ozassignDate = oview.byId("inAssignedDate").getDateValue();
				var oZplanStart = oview.byId("inPlanStart").getDateValue();
				var oZplanEnd = oview.byId("inPlanEnd").getDateValue();
				
				
				var oFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTKK:mm:ss"});
				oEntry.ZassignDate = oFormatDate.format(ozassignDate);
				oEntry.ZplanStart = oFormatDate.format(oZplanStart);
	            oEntry.ZplanEnd = oFormatDate.format(oZplanEnd);
	            
				var oRealStartDate = oview.byId("inRealStart").getDateValue();
				var oRealEnd = oview.byId("inRealEnd").getDateValue();
				var oCloseDate = oview.byId("inCloseDate").getDateValue();
				
				oEntry.ZrealStart = oFormatDate.format(oRealStartDate);
				oEntry.ZrealEnd = oFormatDate.format(oRealEnd);
	            oEntry.ZcloseDate = oFormatDate.format(oCloseDate);
	            
	         
	            
	          	oEntry.ZstdDays = oview.byId("instdDays").getValue();
	         	oEntry.ZcodeDays = oview.byId("incodeDays").getValue();
	         	oEntry.ZtestDays = oview.byId("intestDays").getValue();
	         	oEntry.ZrevDays = oview.byId("inreviewDays").getValue();
	         	oEntry.ZabapWorkLoad = oview.byId("inabapWLoad").getValue();
	         	oEntry.ZactualDays = oview.byId("inactCodeDays").getValue();
	          
				
				oModel.update(set, oEntry, {
					method: "PUT",
					success: function(data) {
						dialog.close();
						MessageToast.show("Record has been updated successfully");
					},
					error: function(e) {
						dialog.close();
						MessageToast.show("Error has occured while updating record");
					}
				});

				this.getView().byId("bCopy").setVisible(true);
				this.getView().byId("bChange").setVisible(true);
				// this.getView().byId("bDelete").setVisible(true);
				this.getView().byId("bSave").setVisible(false);
				this.getView().byId("bCancel").setVisible(false);
				
				this.getView().byId("idTechDialogChange").close();
				this.getView().byId("idTechDialogChange").destroy();
				oTable.clearSelection();
				var oBinding = oTable.getBinding();
				var aLength = oBinding.getLength();
				oTable.setVisibleRowCount(aLength);
			},
			
			fTechSave_Copy: function() {
				var dialog = new sap.m.BusyDialog({
					text: 'Please wait'
				});
				dialog.open();

				var oTable = this.getView().byId("idTechTable");
				 var aIndex = oTable.getSelectedIndex();
				var selectedRow = oTable.getRows()[aIndex];
				var path = selectedRow.getBindingContext().getPath();
				var obj = oTable.getModel().getProperty(path);

				var contexts = oTable.getContextByIndex(aIndex);
				var set = contexts.sPath;

				/*create operation*/
				var oModel = this.getView().getModel();
				var oEntry = {};
				
				var oview = this.getView();
				var oModel = this.getView().getModel();
				var oEntry = {};
				oEntry.ZprojId = oview.byId("inProjectIdCo").getValue();
				oEntry.Zteam = oview.byId("inTeamCo").getValue();
				oEntry.ZgapNo = oview.byId("inGapNoCo").getValue();
				oEntry.ZspecName = oview.byId("inSpecNameCo").getValue();
				oEntry.ZspecVersion = oview.byId("inSpecVerCo").getValue();
				oEntry.ZseqNo = oview.byId("inSeqCo").getValue();
				
				 oEntry.ZspecDesc = oview.byId("inSpecDescCo").getValue();
				 
				 oEntry.Zdomain = oview.byId("inDomainCo").getValue();
			
				 oEntry.Zcategory = oview.byId("inCategoryCo").getValue();
				oEntry.ZticketNo = oview.byId("inTicketCo").getValue();
				 oEntry.ZstatusDev = oview.byId("inDevStatusCo").getValue();
				 oEntry.ZdevScope = oview.byId("inDevScopeCo").getValue();
				oEntry.ZdevType = oview.byId("inDevTypeCo").getValue();
				 oEntry.Zcomplexity = oview.byId("inComplexityCo").getValue();
				oEntry.ZassignedBy = oview.byId("inAssignedByCo").getValue();
				oEntry.Zdeveloper = oview.byId("inDeveloperCo").getValue();
				// oEntry.OwnerNmOnsite = oview.byId("iownerNmOnsite").getValue();
				// oEntry.OwnerNmOffsh = oview.byId("iownerOffsh").getValue();
				var ozassignDate = oview.byId("inAssignedDateCo").getDateValue();
				var oZplanStart = oview.byId("inPlanStartCo").getDateValue();
				var oZplanEnd = oview.byId("inPlanEndCo").getDateValue();
				
				
				var oFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTKK:mm:ss"});
				oEntry.ZassignDate = oFormatDate.format(ozassignDate);
				oEntry.ZplanStart = oFormatDate.format(oZplanStart);
	            oEntry.ZplanEnd = oFormatDate.format(oZplanEnd);
	            
				var oRealStartDate = oview.byId("inRealStartCo").getDateValue();
				var oRealEnd = oview.byId("inRealEndCo").getDateValue();
				var oCloseDate = oview.byId("inCloseDateCo").getDateValue();
				
				oEntry.ZrealStart = oFormatDate.format(oRealStartDate);
				oEntry.ZrealEnd = oFormatDate.format(oRealEnd);
	            oEntry.ZcloseDate = oFormatDate.format(oCloseDate);
	            
	         
	            
	          	oEntry.ZstdDays = oview.byId("instdDaysCo").getValue();
	         	oEntry.ZcodeDays = oview.byId("incodeDaysCo").getValue();
	         	oEntry.ZtestDays = oview.byId("intestDaysCo").getValue();
	         	oEntry.ZrevDays = oview.byId("inreviewDaysCo").getValue();
	         	oEntry.ZabapWorkLoad = oview.byId("inabapWLoadCo").getValue();
	         	oEntry.ZactualDays = oview.byId("inactCodeDaysCo").getValue();
	          
	       
				
				oModel.create("/TechTrackerSet", oEntry, {
				method: "POST",
				success: function(data) {
											dialog.close();
											MessageToast.show("Record has been created successfully");
										},
							error: function(e) {
												dialog.close();
												MessageToast.show("Error while saving record");
											   }
						});
				
					this.getView().byId("bCopy").setVisible(true);
					this.getView().byId("bChange").setVisible(true);
					this.getView().byId("bSave").setVisible(false);
					this.getView().byId("bCancel").setVisible(false);
					
				this.getView().byId("idTechDialogCopy").close();
				this.getView().byId("idTechDialogCopy").destroy();
				oTable.clearSelection();
				var oBinding = oTable.getBinding();
				var aLength = oBinding.getLength();
				oTable.setVisibleRowCount(aLength);
				
				var sTable = this.getView().byId("idTechTable");
			var sModel = sTable.getModel();
			
			sModel.setProperty("/TechTrackerSet", this.aDevMasterSet);
			this.rebindTable();
			},
			
			fTechCancel: function() {
				this.getView().byId("bCopy").setVisible(true);
				this.getView().byId("bChange").setVisible(true);
				this.getView().byId("bDelete").setVisible(true);
				this.getView().byId("bDownload").setVisible(true);
				this.getView().byId("bSave").setVisible(false);
				this.getView().byId("bCancel").setVisible(false);
				var oTable = this.getView().byId("idTechTable");
			var oModel = oTable.getModel();
			
			oModel.setProperty("/TechTrackerSet", this.aDevMasterSet);
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