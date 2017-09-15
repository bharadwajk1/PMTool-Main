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

				 this.rebindTable();
				// oView.addEventDelegate({
				// 	onBeforeShow: function(oEvent) {
				
				// 		oView.byId("inProjectIdCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inProjectIdCo").destroyTooltip();
						
				// 		oView.byId("inTeamCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inTeamCo").destroyTooltip();
						
				// 		oView.byId("inDomainCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inDomainCo").destroyTooltip();
						
				// 		oView.byId("inSpecNameCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inSpecNameCo").destroyTooltip();
						
				// 		oView.byId("inTicketCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inTicketCo").destroyTooltip();
					
						
				// 		oView.byId("inCategoryCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inCategoryCo").destroyTooltip();
						
						
				// 		oView.byId("inDevScopeCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inDevScopeCo").destroyTooltip();
						
					
				// 		oView.byId("inDevStatusCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inDevStatusCo").destroyTooltip();
						
				// 		oView.byId("inDeveloperCo").setValueState(sap.ui.core.ValueState.None);
				//      	oView.byId("inDeveloperCo").destroyTooltip();
						
				// 		oView.byId("inAssignedByCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inAssignedByCo").destroyTooltip();
						

				// 		oView.byId("inDevTypeCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inDevTypeCo").destroyTooltip();
						
				// 		oView.byId("inAssignedDateCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inAssignedDateCo").destroyTooltip();
						
						
				// 		oView.byId("inPlanStartCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inPlanStartCo").destroyTooltip();

				// 		oView.byId("inPlanEndCo").setValueState(sap.ui.core.ValueState.None);
				// 		oView.byId("inPlanEndCo").destroyTooltip();
				// 		// oView.byId("vtestingDays").setValue("");
				// 		// // oView.byId("vtestingDays").setValueState(sap.ui.core.ValueState.None);
				// 		// // oView.byId("vtestingDays").destroyTooltip();
				// 		// oView.byId("vreviewDays").setValue("");
				// 		// oView.byId("vabapWorkload").setValue("");
						
						
				     	
				//   //   	oView.byId("vpriority").setValue("");
				// 		// oView.byId("vpriority").setValueState(sap.ui.core.ValueState.None);
				// 		// oView.byId("vpriority").destroyTooltip();
				     	
				//   //   	oView.byId("vcomplexity").setValue("");
				// 		// // oView.byId("vcomplexity").setValueState(sap.ui.core.ValueState.None);
				// 		// // oView.byId("vcomplexity").destroyTooltip();
						
				// 		// oView.byId("vdevstatus").setValue("");
				// 	}
				// }, oView);
			

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
						// 			oView.byId("inProjectIdCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inProjectIdCo").destroyTooltip();
						
						// oView.byId("inTeamCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inTeamCo").destroyTooltip();
						
						// oView.byId("inDomainCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inDomainCo").destroyTooltip();
						
						// oView.byId("inSpecNameCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inSpecNameCo").destroyTooltip();
						
						// oView.byId("inTicketCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inTicketCo").destroyTooltip();
					
						
						// oView.byId("inCategoryCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inCategoryCo").destroyTooltip();
						
						
						// oView.byId("inDevScopeCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inDevScopeCo").destroyTooltip();
						
					
						// oView.byId("inDevStatusCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inDevStatusCo").destroyTooltip();
						
						// oView.byId("inDeveloperCo").setValueState(sap.ui.core.ValueState.None);
				  //   	oView.byId("inDeveloperCo").destroyTooltip();
						
						// oView.byId("inAssignedByCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inAssignedByCo").destroyTooltip();
						

						// oView.byId("inDevTypeCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inDevTypeCo").destroyTooltip();
						
						// oView.byId("inAssignedDateCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inAssignedDateCo").destroyTooltip();
						
						
						// oView.byId("inPlanStartCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inPlanStartCo").destroyTooltip();

						// oView.byId("inPlanEndCo").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("inPlanEndCo").destroyTooltip();
						// // oView.byId("vtestingDays").setValue("");
						// // // oView.byId("vtestingDays").setValueState(sap.ui.core.ValueState.None);
						// // // oView.byId("vtestingDays").destroyTooltip();
						// // oView.byId("vreviewDays").setValue("");
						// // oView.byId("vabapWorkload").setValue("");
						
						
				     	
				  ////   	oView.byId("vpriority").setValue("");
						// // oView.byId("vpriority").setValueState(sap.ui.core.ValueState.None);
						// // oView.byId("vpriority").destroyTooltip();
				     	
				  ////   	oView.byId("vcomplexity").setValue("");
						// // // oView.byId("vcomplexity").setValueState(sap.ui.core.ValueState.None);
						// // // oView.byId("vcomplexity").destroyTooltip();
						
						// // oView.byId("vdevstatus").setValue("");
				
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
					if (obj.Zdomain == "") { obj.Zdomain = " ";}
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
					text: 'Please wait while updating record'
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
			
				
			// oEntry.ZprojId = oview.byId("inProjectId").getValue();
		
			
				
				
					var iError = 0;
					
						var oZprojId1 = this.getView().byId("inProjectId").getSelectedItem();
						if (oZprojId1 === null || oEntry.ZprojId < 1) {
							var ZprojId2 = this.getView().byId("inProjectId").getValue();
							if ( ZprojId2 === null || ZprojId2 === "" || ZprojId2 === " " )
							{
							this.getView().byId("inProjectId").setValueState(sap.ui.core.ValueState.Error);
							this.getView().byId("inProjectId").setTooltip("Select Valid Project");
							iError++;
							}
						} else {
							this.getView().byId("inProjectId").setValueState(sap.ui.core.ValueState.None);
							this.getView().byId("inProjectId").destroyTooltip();
						}
						if ( ZprojId2 !== null && ZprojId2 !== "" && ZprojId2 !== " " )
						{
							oEntry.ZprojId = ZprojId2;
						}
						
						if (oZprojId1 !== null) {
							var oKey = oZprojId1.getKey();
							oEntry.ZprojId = oKey;
							// var svar;
						}
			
				// oEntry.Zteam = oview.byId("inTeam").getValue();
				oEntry.Zteam = this.getView().byId("inTeam").getValue();
				var oTeam = this.getView().byId("inTeam").getSelectedItem();
				if (oTeam === null || oEntry.Zteam < 1) {
					var Zteam = this.getView().byId("inTeam").getValue();
					if ( Zteam === null || Zteam === "" || Zteam === " " )
					{
						this.getView().byId("inTeam").setValueState(sap.ui.core.ValueState.Error);
						this.getView().byId("inTeam").setTooltip("Select Valid Team");
						iError++;
					}	
				} else {
					this.getView().byId("inTeam").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inTeam").destroyTooltip();
				}
				
				// if ( Zteam != null)
				if ( Zteam !== null && Zteam !== "" && Zteam !== " " )
				{
					oEntry.Zteam = Zteam;
				}
						
				if (oTeam !== null) {
					oEntry.Zteam = oTeam.getKey();
				}
				
				
				// oEntry.ZgapNo = oview.byId("inGapNo").getValue
					var oDomain = this.getView().byId("inDomain").getSelectedItem();
				if (oDomain === null || oEntry.Zdomain < 1) {
					var Zdom = this.getView().byId("inDomain").getValue();
					// if ( Zdom === null )
					if ( Zdom === null || Zdom === "" || Zdom === " " )
					{
					this.getView().byId("inDomain").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDomain").setTooltip("Select Valid Domain");
					iError++;
					}
				} else {
					this.getView().byId("inDomain").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDomain").destroyTooltip();
				}
				
				// if ( Zdom != null)
				if ( Zdom !== null && Zdom !== "" && Zdom !== " " )
				{
					oEntry.Zdomain = Zdom;
				}
				
				if (oDomain !== null) {
					oEntry.Zdomain = oDomain.getKey();
				}
				
				// oEntry.ZspecName = oview.byId("inSpecName").getValue
					oEntry.ZspecName = this.getView().byId("inSpecName").getValue();
				if (oEntry.ZspecName === "") {
					this.getView().byId("inSpecName").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inSpecName").setTooltip("Enter Specification Name");
					iError++;
				} else {
					this.getView().byId("inSpecName").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inSpecName").destroyTooltip();
				}
				oEntry.ZgapNo = this.getView().byId("inGapNo").getValue();
				
				var oComplexity = this.getView().byId("inComplexity").getSelectedItem();
				if (oComplexity === null || oEntry.Zcomplexity < 1) {
					var Zcomplex = this.getView().byId("inComplexity").getValue();
					// if ( Zcomplex === null )
					if ( Zcomplex === null || Zcomplex === "" || Zcomplex === " " )
					{
					this.getView().byId("inComplexity").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inComplexity").setTooltip("Select Valid entry");
					iError++;
					}
				} else {
					this.getView().byId("inComplexity").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inComplexity").destroyTooltip();
				}
				
				// if ( Zcomplex != null)
				if ( Zcomplex !== null && Zcomplex !== "" && Zcomplex !== " " )
				{
					oEntry.Zcomplexity = Zcomplex;
				}
				
				if (oComplexity !== null) {
					oEntry.Zcomplexity = oComplexity.getKey();
				}
				
				oEntry.ZspecVersion = oview.byId("inSpecVer").getValue();
				oEntry.ZseqNo = oview.byId("inSeq").getValue();
				
				 oEntry.ZspecDesc = oview.byId("inSpecDesc").getValue();
				 
				 //oEntry.Zdomain = oview.byId("inDomain").getValue();
			
				 /*oEntry.Zcategory = oview.byId("inCategory").getValue();*/
				 var ocategory = this.getView().byId("inCategory").getSelectedItem();
				if (ocategory === null || oEntry.Zcategory < 1) {
					var Zcategory = this.getView().byId("inCategory").getValue();
					// if ( Zcategory === null )
					if ( Zcategory === null || Zcategory === "" || Zcategory === " " )
					{
					this.getView().byId("inCategory").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inCategory").setTooltip("Select Valid entry");
					iError++;
					}
				} else {
					this.getView().byId("inCategory").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inCategory").destroyTooltip();
				}
				
				// if ( Zcategory != null)
				if ( Zcategory !== null && Zcategory !== "" && Zcategory !== " " )
				{
					oEntry.Zcategory = Zcategory;
				}
				
				if (ocategory !== null) {
					oEntry.Zcategory = ocategory.getKey();
				}
				 
				oEntry.ZticketNo = oview.byId("inTicket").getValue();
					if (oEntry.ZticketNo === "") {
					this.getView().byId("inTicket").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inTicket").setTooltip("Enter Ticket Number");
					iError++;
				} else {
					this.getView().byId("inTicket").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inTicket").destroyTooltip();
				}
				
				
				 //oEntry.ZstatusDev = oview.byId("inDevStatus").getValue();
				 var ostatusDev = this.getView().byId("inDevStatus").getSelectedItem();
				if (ostatusDev === null || oEntry.ZstatusDev < 1) {
					var ZstatusDev = this.getView().byId("inDevStatus").getValue();
					// if ( ZstatusDev === null )
					if ( ZstatusDev === null || ZstatusDev === "" || ZstatusDev === " " )
					{
					this.getView().byId("inDevStatus").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDevStatus").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDevStatus").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDevStatus").destroyTooltip();
				}
				// if ( ZstatusDev != null)
				if ( ZstatusDev !== null && ZstatusDev !== "" && ZstatusDev !== " " )
				{
					oEntry.ZstatusDev = ZstatusDev;
				}
				if (ostatusDev !== null) {
					oEntry.ZstatusDev = ostatusDev.getKey();
				}
				 
				 
				 //oEntry.ZdevScope = oview.byId("inDevScope").getValue();
				var odevScope = this.getView().byId("inDevScope").getSelectedItem();
				if (odevScope === null || oEntry.ZdevScope < 1) {
					var ZdevScope = this.getView().byId("inDevScope").getValue();
					// if ( ZdevScope === null )
					if ( ZdevScope === null || ZdevScope === "" || ZdevScope === " " )
					{
					this.getView().byId("inDevScope").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDevScope").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDevScope").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDevScope").destroyTooltip();
				}
				// if ( ZdevScope != null)
				if ( ZdevScope !== null && ZdevScope !== "" && ZdevScope !== " " )
				{
					oEntry.ZdevScope = ZdevScope;
				}
				if (odevScope !== null) {
					oEntry.ZdevScope = odevScope.getKey();
				} 
				 
				 
				// oEntry.ZdevType = oview.byId("inDevType").getValue();
				var oDevType = this.getView().byId("inDevType").getSelectedItem();
				if (oDevType === null || oEntry.ZdevType < 1) {
					var Zdtype = this.getView().byId("inDevType").getValue();
					// if ( Zdtype === null )
					if ( Zdtype === null || Zdtype === "" || Zdtype === " " )
					{
					this.getView().byId("inDevType").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDevType").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDevType").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDevType").destroyTooltip();
				}
				// if ( Zdtype != null)
				if ( Zdtype !== null && Zdtype !== "" && Zdtype !== " " )
				{
					oEntry.ZdevType = Zdtype;
				}
				if (oDevType !== null) {
					oEntry.ZdevType = oDevType.getKey();
				}
				 
				 
				// oEntry.ZassignedBy = oview.byId("inAssignedBy").getValue();
				var oassignedBy = this.getView().byId("inAssignedBy").getSelectedItem();
				if (oassignedBy === null || oEntry.ZdevScope < 1) {
					var ZassignedBy = this.getView().byId("inAssignedBy").getValue();
					// if ( ZassignedBy === null )
					if ( ZassignedBy === null || ZassignedBy === "" || ZassignedBy === " " )
					{
					this.getView().byId("inAssignedBy").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inAssignedBy").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inAssignedBy").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inAssignedBy").destroyTooltip();
				}
				// if ( ZassignedBy != null)
				if ( ZassignedBy !== null && ZassignedBy !== "" && ZassignedBy !== " " )
				{
					oEntry.ZassignedBy = ZassignedBy;
				}
				if (oassignedBy !== null) {
					oEntry.ZassignedBy = oassignedBy.getKey();
				} 
				
				// oEntry.Zdeveloper = oview.byId("inDeveloper").getValue();
				var odeveloper = this.getView().byId("inDeveloper").getSelectedItem();
				if (odeveloper === null || oEntry.ZdevType < 1) {
					var Zdeveloper = this.getView().byId("inDeveloper").getValue();
					// if ( Zdeveloper === null )
					if ( Zdeveloper === null || Zdeveloper === "" || Zdeveloper === " " )
					{
					this.getView().byId("inDeveloper").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDeveloper").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDeveloper").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDeveloper").destroyTooltip();
				}
				// if ( Zdeveloper != null)
				if ( Zdeveloper !== null && Zdeveloper !== "" && Zdeveloper !== " " )
				{
					oEntry.Zdeveloper = Zdeveloper;
				}
				if (odeveloper !== null) {
					oEntry.Zdeveloper = odeveloper.getKey();
				}
				
				// oEntry.OwnerNmOnsite = oview.byId("iownerNmOnsite").getValue();
				// oEntry.OwnerNmOffsh = oview.byId("iownerOffsh").getValue();
				// var ozassignDate = oview.byId("inAssignedDate").getDateValue();
				// var oZplanStart = oview.byId("inPlanStart").getDateValue();
				// var oZplanEnd = oview.byId("inPlanEnd").getDateValue();
				
				
				var oFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-ddTKK:mm:ss"});
			
			
			
				var dPrdate = this.getView().byId("inAssignedDate").getDateValue();
				if (dPrdate === null) {
					this.getView().byId("inAssignedDate").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inAssignedDate").setTooltip("Enter Assigned Date");
					iError++;
				} else {
					this.getView().byId("inAssignedDate").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inAssignedDate").destroyTooltip();
				}
				oEntry.ZassignDate = oFormatDate.format(dPrdate);
				
					var dplanSdate = this.getView().byId("inPlanStart").getDateValue();
				if (dplanSdate === null) {
					this.getView().byId("inPlanStart").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inPlanStart").setTooltip("Enter Planed Start Date");
					iError++;
				} else {
					this.getView().byId("inPlanStart").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inPlanStart").destroyTooltip();
				}
				oEntry.ZplanStart = oFormatDate.format(dplanSdate);
				
				
					var dplanEdate = this.getView().byId("inPlanEnd").getDateValue();
				if (dplanEdate === null) {
					this.getView().byId("inPlanEnd").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inPlanEnd").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inPlanEnd").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inPlanEnd").destroyTooltip();
				}
				oEntry.ZplanEnd = oFormatDate.format(dplanEdate);
			
				// var oRealStartDate = oview.byId("inRealStart").getDateValue();
				// oEntry.ZrealStart = oFormatDate.format(oRealStartDate);
				
					var dRealStartDate = this.getView().byId("inRealStart").getDateValue();
				if (dRealStartDate === null) {
					this.getView().byId("inRealStart").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inRealStart").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inRealStart").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inRealStart").destroyTooltip();
				}
				oEntry.ZrealStart = oFormatDate.format(dRealStartDate);
				
				
				
				// var oRealEnd = oview.byId("inRealEnd").getDateValue();
				// oEntry.ZrealEnd = oFormatDate.format(oRealEnd);
					var dRealEndDate = this.getView().byId("inRealEnd").getDateValue();
				if (dRealEndDate === null) {
					this.getView().byId("inRealEnd").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inRealEnd").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inRealEnd").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inRealEnd").destroyTooltip();
				}
				oEntry.ZrealEnd = oFormatDate.format(dRealEndDate);
				
				
				
				// var oCloseDate = oview.byId("inCloseDate").getDateValue();
	   //         oEntry.ZcloseDate = oFormatDate.format(oCloseDate);
	            	var dRealCloseDate = this.getView().byId("inCloseDate").getDateValue();
				if (dRealCloseDate === null) {
					this.getView().byId("inCloseDate").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inCloseDate").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inCloseDate").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inCloseDate").destroyTooltip();
				}
				oEntry.ZcloseDate = oFormatDate.format(dRealCloseDate);
	            
	            
	         
	            
	          	oEntry.ZstdDays = oview.byId("instdDays").getValue();
	          		if (oEntry.ZstdDays === "" || oEntry.ZstdDays === "0.00")
				{
					oEntry.ZstdDays = " ";
				}
	         	oEntry.ZcodeDays = oview.byId("incodeDays").getValue();
	         		if (oEntry.ZcodeDays === "" || oEntry.ZcodeDays === "0.00")
				{
					oEntry.ZcodeDays = " ";
				}
	         	oEntry.ZtestDays = oview.byId("intestDays").getValue();
	         		if (oEntry.ZtestDays === "" || oEntry.ZtestDays === "0.00")
				{
					oEntry.ZtestDays = " ";
				}
	         	oEntry.ZrevDays = oview.byId("inreviewDays").getValue();
	         		if (oEntry.ZrevDays === "" || oEntry.ZrevDays === "0.00")
				{
					oEntry.ZrevDays = " ";
				}
	         	oEntry.ZabapWorkLoad = oview.byId("inabapWLoad").getValue();
	         		if (oEntry.ZabapWorkLoad === "" || oEntry.ZabapWorkLoad === "0.00")
				{
					oEntry.ZabapWorkLoad = " ";
				}
	         	oEntry.ZactualDays = oview.byId("inactCodeDays").getValue();
	         		if (oEntry.ZactualDays === "" || oEntry.ZactualDays === "0.00")
				{
					oEntry.ZactualDays = " ";
				}
	          
					if (iError > 0) {
					dialog.close();
					return;
				} else {
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
				}
				
				this.getView().byId("bCopy").setVisible(true);
				this.getView().byId("bChange").setVisible(true);
				// this.getView().byId("bDelete").setVisible(true);
				this.getView().byId("bSave").setVisible(false);
				this.getView().byId("bCancel").setVisible(false);
				
				this.getView().byId("idTechDialogChange").close();
				this.getView().byId("idTechDialogChange").destroy();
				oTable.clearSelection();
				
				// var oBinding = oTable.getBinding();
				// var aLength = oBinding.getLength();
				// oTable.setVisibleRowCount(aLength);
				
				
			},
			
			fTechSave_Copy: function() {
				var dialog = new sap.m.BusyDialog({
					text: 'Please wait while updating record'
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
			
				
			// oEntry.ZprojId = oview.byId("inProjectId").getValue();
		
			
				
				
					var iError = 0;
					
						var oZprojId1 = this.getView().byId("inProjectIdCo").getSelectedItem();
						if (oZprojId1 === null || oEntry.ZprojId < 1) {
							var ZprojId2 = this.getView().byId("inProjectIdCo").getValue();
							// if ( ZprojId2 === null )
							if ( ZprojId2 === null || ZprojId2 === "" || ZprojId2 === " " )
							{
							this.getView().byId("inProjectIdCo").setValueState(sap.ui.core.ValueState.Error);
							this.getView().byId("inProjectIdCo").setTooltip("Select Valid Project");
							iError++;
							}
						} else {
							this.getView().byId("inProjectIdCo").setValueState(sap.ui.core.ValueState.None);
							this.getView().byId("inProjectIdCo").destroyTooltip();
						}
						// if ( ZprojId2 != null)
						if ( ZprojId2 !== null && ZprojId2 !== "" && ZprojId2 !== " " )
						{
							oEntry.ZprojId = ZprojId2;
						}
						
						if (oZprojId1 !== null) {
							var oKey = oZprojId1.getKey();
							oEntry.ZprojId = oKey;
							// var svar;
						}
			
				// oEntry.Zteam = oview.byId("inTeam").getValue();
				oEntry.Zteam = this.getView().byId("inTeamCo").getValue();
				var oTeam = this.getView().byId("inTeamCo").getSelectedItem();
				if (oTeam === null || oEntry.Zteam < 1) {
					var Zteam = this.getView().byId("inTeamCo").getValue();
					// if ( Zteam === null )
					if ( Zteam === null || Zteam === "" || Zteam === " " )
					{
						this.getView().byId("inTeamCo").setValueState(sap.ui.core.ValueState.Error);
						this.getView().byId("inTeamCo").setTooltip("Select Valid Team");
						iError++;
					}	
				} else {
					this.getView().byId("inTeamCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inTeamCo").destroyTooltip();
				}
				
				// if ( Zteam != null)
				if ( Zteam !== null && Zteam !== "" && Zteam !== " " )
				{
					oEntry.Zteam = Zteam;
				}
						
				if (oTeam !== null) {
					oEntry.Zteam = oTeam.getKey();
				}
				
				
				// oEntry.ZgapNo = oview.byId("inGapNo").getValue
					var oDomain = this.getView().byId("inDomainCo").getSelectedItem();
				if (oDomain === null || oEntry.Zdomain < 1) {
					var Zdom = this.getView().byId("inDomainCo").getValue();
					// if ( Zdom === null )
					if ( Zdom === null || Zdom === "" || Zdom === " " )
					{
					this.getView().byId("inDomainCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDomainCo").setTooltip("Select Valid Domain");
					iError++;
					}
				} else {
					this.getView().byId("inDomainCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDomainCo").destroyTooltip();
				}
				
				// if ( Zdom != null)
				if ( Zdom !== null && Zdom !== "" && Zdom !== " " )
				{
					oEntry.Zdomain = Zdom;
				}
				
				if (oDomain !== null) {
					oEntry.Zdomain = oDomain.getKey();
				}
				
				// oEntry.ZspecName = oview.byId("inSpecName").getValue
					oEntry.ZspecName = this.getView().byId("inSpecNameCo").getValue();
				if (oEntry.ZspecName === "") {
					this.getView().byId("inSpecNameCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inSpecNameCo").setTooltip("Enter Specification Name");
					iError++;
				} else {
					this.getView().byId("inSpecNameCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inSpecNameCo").destroyTooltip();
				}
				oEntry.ZgapNo = this.getView().byId("inGapNoCo").getValue();
				
				var oComplexity = this.getView().byId("inComplexityCo").getSelectedItem();
				if (oComplexity === null || oEntry.Zcomplexity < 1) {
					var Zcomplex = this.getView().byId("inComplexityCo").getValue();
					// if ( Zcomplex === null )
					if ( Zcomplex === null || Zcomplex === "" || Zcomplex === " " )
					{
					this.getView().byId("inComplexityCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inComplexityCo").setTooltip("Select Valid entry");
					iError++;
					}
				} else {
					this.getView().byId("inComplexityCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inComplexityCo").destroyTooltip();
				}
				
				// if ( Zcomplex != null)
				if ( Zcomplex !== null && Zcomplex !== "" && Zcomplex !== " " )
				{
					oEntry.Zcomplexity = Zcomplex;
				}
				
				if (oComplexity !== null) {
					oEntry.Zcomplexity = oComplexity.getKey();
				}
				
				oEntry.ZspecVersion = oview.byId("inSpecVerCo").getValue();
				oEntry.ZseqNo = oview.byId("inSeqCo").getValue();
				
				 oEntry.ZspecDesc = oview.byId("inSpecDescCo").getValue();
				 
				 //oEntry.Zdomain = oview.byId("inDomain").getValue();
			
				 /*oEntry.Zcategory = oview.byId("inCategory").getValue();*/
				 var ocategory = this.getView().byId("inCategoryCo").getSelectedItem();
				if (ocategory === null || oEntry.Zcategory < 1) {
					var Zcategory = this.getView().byId("inCategoryCo").getValue();
					// if ( Zcategory === null )
					if ( Zcategory === null || Zcategory === "" || Zcategory === " " )
					{
					this.getView().byId("inCategoryCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inCategoryCo").setTooltip("Select Valid entry");
					iError++;
					}
				} else {
					this.getView().byId("inCategoryCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inCategoryCo").destroyTooltip();
				}
				
				// if ( Zcategory != null)
				if ( Zcategory !== null && Zcategory !== "" && Zcategory !== " " )
				{
					oEntry.Zcategory = Zcategory;
				}
				
				if (ocategory !== null) {
					oEntry.Zcategory = ocategory.getKey();
				}
				 
				oEntry.ZticketNo = oview.byId("inTicketCo").getValue();
					if (oEntry.ZticketNo === "") {
					this.getView().byId("inTicketCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inTicketCo").setTooltip("Enter Ticket Number");
					iError++;
				} else {
					this.getView().byId("inTicketCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inTicketCo").destroyTooltip();
				}
				
				
				 //oEntry.ZstatusDev = oview.byId("inDevStatus").getValue();
				 var ostatusDev = this.getView().byId("inDevStatusCo").getSelectedItem();
				if (ostatusDev === null || oEntry.ZdevType < 1) {
					var ZstatusDev = this.getView().byId("inDevStatusCo").getValue();
					// if ( ZstatusDev === null )
					if ( ZstatusDev === null || ZstatusDev === "" || ZstatusDev === " " )
					{
					this.getView().byId("inDevStatusCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDevStatusCo").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDevStatusCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDevStatusCo").destroyTooltip();
				}
				// if ( ZstatusDev != null)
				if ( ZstatusDev !== null && ZstatusDev !== "" && ZstatusDev !== " " )
				{
					oEntry.ZstatusDev = ZstatusDev;
				}
				if (ostatusDev !== null) {
					oEntry.ZstatusDev = ostatusDev.getKey();
				}
				 
				 
				 //oEntry.ZdevScope = oview.byId("inDevScope").getValue();
				var odevScope = this.getView().byId("inDevScopeCo").getSelectedItem();
				if (odevScope === null || oEntry.ZdevType < 1) {
					var ZdevScope = this.getView().byId("inDevScopeCo").getValue();
					// if ( ZdevScope === null )
					if ( ZdevScope === null || ZdevScope === "" || ZdevScope === " " )
					{
					this.getView().byId("inDevScopeCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDevScopeCo").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDevScopeCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDevScopeCo").destroyTooltip();
				}
				// if ( ZdevScope != null)
				if ( ZdevScope !== null && ZdevScope !== "" && ZdevScope !== " " )
				{
					oEntry.ZdevScope = ZdevScope;
				}
				if (odevScope !== null) {
					oEntry.ZdevScope = odevScope.getKey();
				} 
				 
				 
				// oEntry.ZdevType = oview.byId("inDevType").getValue();
				var oDevType = this.getView().byId("inDevTypeCo").getSelectedItem();
				if (oDevType === null || oEntry.ZdevType < 1) {
					var Zdtype = this.getView().byId("inDevTypeCo").getValue();
					// if ( Zdtype === null )
					if ( Zdtype === null || Zdtype === "" || Zdtype === " " )
					{
					this.getView().byId("inDevTypeCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDevTypeCo").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDevTypeCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDevTypeCo").destroyTooltip();
				}
				// if ( Zdtype != null)
				if ( Zdtype !== null && Zdtype !== "" && Zdtype !== " " )
				{
					oEntry.ZdevType = Zdtype;
				}
				if (oDevType !== null) {
					oEntry.ZdevType = oDevType.getKey();
				}
				 
				 
				// oEntry.ZassignedBy = oview.byId("inAssignedBy").getValue();
				var oassignedBy = this.getView().byId("inAssignedByCo").getSelectedItem();
				if (oassignedBy === null || oEntry.ZdevType < 1) {
					var ZassignedBy = this.getView().byId("inAssignedByCo").getValue();
					// if ( ZassignedBy === null )
					if ( ZassignedBy === null || ZassignedBy === "" || ZassignedBy === " " )
					{
					this.getView().byId("inAssignedByCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inAssignedByCo").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inAssignedByCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inAssignedByCo").destroyTooltip();
				}
				// if ( ZassignedBy != null)
				if ( ZassignedBy !== null && ZassignedBy !== "" && ZassignedBy !== " " )
				{
					oEntry.ZassignedBy = ZassignedBy;
				}
				if (oassignedBy !== null) {
					oEntry.ZassignedBy = oassignedBy.getKey();
				} 
				
				// oEntry.Zdeveloper = oview.byId("inDeveloper").getValue();
				var odeveloper = this.getView().byId("inDeveloperCo").getSelectedItem();
				if (odeveloper === null || oEntry.ZdevType < 1) {
					var Zdeveloper = this.getView().byId("inDeveloperCo").getValue();
					// if ( Zdeveloper === null )
					if ( Zdeveloper === null || Zdeveloper === "" || Zdeveloper === " " )
					{
					this.getView().byId("inDeveloperCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inDeveloperCo").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("inDeveloperCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inDeveloperCo").destroyTooltip();
				}
				// if ( Zdeveloper != null)
				if ( Zdeveloper !== null && Zdeveloper !== "" && Zdeveloper !== " " )
				{
					oEntry.Zdeveloper = Zdeveloper;
				}
				if (odeveloper !== null) {
					oEntry.Zdeveloper = odeveloper.getKey();
				}
				
				// oEntry.OwnerNmOnsite = oview.byId("iownerNmOnsite").getValue();
				// oEntry.OwnerNmOffsh = oview.byId("iownerOffsh").getValue();
				// var ozassignDate = oview.byId("inAssignedDate").getDateValue();
				// var oZplanStart = oview.byId("inPlanStart").getDateValue();
				// var oZplanEnd = oview.byId("inPlanEnd").getDateValue();
				
				
				var oFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-ddTKK:mm:ss"});
			
			
			
				var dPrdate = this.getView().byId("inAssignedDateCo").getDateValue();
				if (dPrdate === null) {
					this.getView().byId("inAssignedDateCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inAssignedDateCo").setTooltip("Enter Assigned Date");
					iError++;
				} else {
					this.getView().byId("inAssignedDateCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inAssignedDateCo").destroyTooltip();
				}
				oEntry.ZassignDate = oFormatDate.format(dPrdate);
				
					var dplanSdate = this.getView().byId("inPlanStartCo").getDateValue();
				if (dplanSdate === null) {
					this.getView().byId("inPlanStartCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inPlanStartCo").setTooltip("Enter Planed Start Date");
					iError++;
				} else {
					this.getView().byId("inPlanStartCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inPlanStartCo").destroyTooltip();
				}
				oEntry.ZplanStart = oFormatDate.format(dplanSdate);
				
				
					var dplanEdate = this.getView().byId("inPlanEndCo").getDateValue();
				if (dplanEdate === null) {
					this.getView().byId("inPlanEndCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inPlanEndCo").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inPlanEndCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inPlanEndCo").destroyTooltip();
				}
				oEntry.ZplanEnd = oFormatDate.format(dplanEdate);
			
				// var oRealStartDate = oview.byId("inRealStart").getDateValue();
				// oEntry.ZrealStart = oFormatDate.format(oRealStartDate);
				
					var dRealStartDate = this.getView().byId("inRealStartCo").getDateValue();
				if (dRealStartDate === null) {
					this.getView().byId("inRealStartCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inRealStartCo").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inRealStartCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inRealStartCo").destroyTooltip();
				}
				oEntry.ZrealStart = oFormatDate.format(dRealStartDate);
				
				
				
				// var oRealEnd = oview.byId("inRealEnd").getDateValue();
				// oEntry.ZrealEnd = oFormatDate.format(oRealEnd);
					var dRealEndDate = this.getView().byId("inRealEndCo").getDateValue();
				if (dRealEndDate === null) {
					this.getView().byId("inRealEndCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inRealEndCo").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inRealEndCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inRealEndCo").destroyTooltip();
				}
				oEntry.ZrealEnd = oFormatDate.format(dRealEndDate);
				
				
				
				// var oCloseDate = oview.byId("inCloseDate").getDateValue();
	   //         oEntry.ZcloseDate = oFormatDate.format(oCloseDate);
	            	var dRealCloseDate = this.getView().byId("inCloseDateCo").getDateValue();
				if (dRealCloseDate === null) {
					this.getView().byId("inCloseDateCo").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("inCloseDateCo").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("inCloseDateCo").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("inCloseDateCo").destroyTooltip();
				}
				oEntry.ZcloseDate = oFormatDate.format(dRealCloseDate);
	            
	            
	         
	            
	          	oEntry.ZstdDays = oview.byId("instdDaysCo").getValue();
	          		if (oEntry.ZstdDays === "" || oEntry.ZstdDays === "0.00")
				{
					oEntry.ZstdDays = " ";
				}
	         	oEntry.ZcodeDays = oview.byId("incodeDaysCo").getValue();
	         		if (oEntry.ZcodeDays === "" || oEntry.ZcodeDays === "0.00")
				{
					oEntry.ZcodeDays = " ";
				}
	         	oEntry.ZtestDays = oview.byId("intestDaysCo").getValue();
	         		if (oEntry.ZtestDays === "" || oEntry.ZtestDays === "0.00")
				{
					oEntry.ZtestDays = " ";
				}
	         	oEntry.ZrevDays = oview.byId("inreviewDaysCo").getValue();
	         		if (oEntry.ZrevDays === "" || oEntry.ZrevDays === "0.00")
				{
					oEntry.ZrevDays = " ";
				}
	         	oEntry.ZabapWorkLoad = oview.byId("inabapWLoadCo").getValue();
	         		if (oEntry.ZabapWorkLoad === "" || oEntry.ZabapWorkLoad === "0.00")
				{
					oEntry.ZabapWorkLoad = " ";
				}
	         	oEntry.ZactualDays = oview.byId("inactCodeDaysCo").getValue();
	         		if (oEntry.ZactualDays === "" || oEntry.ZactualDays === "0.00")
				{
					oEntry.ZactualDays = " ";
				}
	          
					if (iError > 0) {
					dialog.close();
					return;
				} else {
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
				}
				
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