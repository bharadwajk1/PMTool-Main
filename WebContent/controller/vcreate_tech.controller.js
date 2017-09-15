sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageToast"],
	function(Controller, History, MessageToast) {
		"use strict";
		var chk;
		return Controller.extend("ZNav.controller.vcreate_tech", {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf ProjectTool.view.vcreate_tech
			 */
			onInit: function() {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData("model/Data.json", "", false);
				this.getView().setModel(oModel, "jData");

				var oView = this.getView();
				oView.addEventDelegate({
					onBeforeShow: function(oEvent) {
						oView.byId("vcreateProjectId").setValue("");
						oView.byId("vcreateProjectId").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreateProjectId").destroyTooltip();
						oView.byId("vTeam").setValue("");
						oView.byId("vTeam").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vTeam").destroyTooltip();
						oView.byId("vDomain").setValue("");
						oView.byId("vDomain").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vDomain").destroyTooltip();
						oView.byId("vcreateGapNumber").setValue("");
						oView.byId("vcreatespec").setValue("");
						oView.byId("vcreatespec").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreatespec").destroyTooltip();
						oView.byId("vcreateversion").setValue("");
						oView.byId("vcreateSeq").setValue("");
						oView.byId("vcreateticket").setValue("");
						oView.byId("vcreateticket").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreateticket").destroyTooltip();
						oView.byId("vcreatedev").setValue("");
						oView.byId("vcreatedev").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreatedev").destroyTooltip();
						
						oView.byId("vcategory").setValue("");
						oView.byId("vcategory").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcategory").destroyTooltip();
						
						oView.byId("vDevScope").setValue("");
						oView.byId("vDevScope").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vDevScope").destroyTooltip();
						
						oView.byId("vdevstatus").setValue("");
						oView.byId("vdevstatus").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vdevstatus").destroyTooltip();
						
						oView.byId("vcreateassdate").setValue("");
						oView.byId("vcreateassdate").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreateassdate").destroyTooltip();
						
						// oView.byId("vcreateassby").setValue("");
						oView.byId("vcreateassby").setValue("");
						oView.byId("vcreateassby").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreateassby").destroyTooltip();
						
						oView.byId("vcreatepsdate").setValue("");
						oView.byId("vcreatepsdate").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreatepsdate").destroyTooltip();
						oView.byId("vcreatepedate").setValue("");
						oView.byId("vcreatepedate").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vcreatepedate").destroyTooltip();
						oView.byId("vactualCodeDays").setValue("");
						// oView.byId("vcreatersdate").setValue("");
						// oView.byId("vcreateredate").setValue("");
						oView.byId("vstdDays").setValue("");
						oView.byId("vcodeDays").setValue("");
						// oView.byId("vcodeDays").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("vcodeDays").destroyTooltip();
						oView.byId("vtestingDays").setValue("");
						// oView.byId("vtestingDays").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("vtestingDays").destroyTooltip();
						oView.byId("vreviewDays").setValue("");
						oView.byId("vabapWorkload").setValue("");
						oView.byId("vcreatedeveloper").setValue("");
						oView.byId("vcreatedeveloper").setValueState(sap.ui.core.ValueState.None);
				     	oView.byId("vcreatedeveloper").destroyTooltip();
				     	
				     	oView.byId("vpriority").setValue("");
						oView.byId("vpriority").setValueState(sap.ui.core.ValueState.None);
						oView.byId("vpriority").destroyTooltip();
				     	
				     	oView.byId("vcomplexity").setValue("");
						// oView.byId("vcomplexity").setValueState(sap.ui.core.ValueState.None);
						// oView.byId("vcomplexity").destroyTooltip();
						
						oView.byId("vdevstatus").setValue("");
					}
				}, oView);

			},

			handle_projId_combo: function() {
				var oZprojId1 = this.getView().byId("vcreateProjectId").getSelectedItem();
			},

			handleDevtype: function(evt) {
				var oDevType1 = evt.getParameter("selectedItem").getKey();
			},
			fSavetech: function() {
				var dialog = new sap.m.BusyDialog({
					text: 'Creating Record'
				});
				// dialog.open();

				/*create operation*/
				var oModel = this.getView().getModel();
				var oEntry = {};
				var iError = 0;
				var oZprojId1 = this.getView().byId("vcreateProjectId").getSelectedItem();
				if (oZprojId1 === null || oEntry.ZprojId < 1) {
					this.getView().byId("vcreateProjectId").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreateProjectId").setTooltip("Select Valid Project");
					iError++;
				} else {
					this.getView().byId("vcreateProjectId").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreateProjectId").destroyTooltip();
				}
				if (oZprojId1 !== null) {
					var oKey = oZprojId1.getKey();
					oEntry.ZprojId = oKey;
				}

				var oTeam = this.getView().byId("vTeam").getSelectedItem();
				if (oTeam === null || oEntry.Zteam < 1) {
					this.getView().byId("vTeam").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vTeam").setTooltip("Select Valid Team");
					iError++;
				} else {
					this.getView().byId("vTeam").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vTeam").destroyTooltip();
				}
				if (oTeam !== null) {
					oEntry.Zteam = oTeam.getKey();
				}
				
				var oDomain = this.getView().byId("vDomain").getSelectedItem();
				if (oDomain === null || oEntry.Zdomain < 1) {
					this.getView().byId("vDomain").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vDomain").setTooltip("Select Valid Domain");
					iError++;
				} else {
					this.getView().byId("vDomain").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vDomain").destroyTooltip();
				}
				if (oDomain !== null) {
					oEntry.Zdomain = oDomain.getKey();
				}
				
				// var oPriority = this.getView().byId("vpriority").getSelectedItem();
				// if (oPriority != null) 
				// {
				// oEntry.Zdomain = oPriority.getKey();
				
				// if (oPriority === null || oEntry.oPriority < 1) {
				// 	this.getView().byId("vpriority").setValueState(sap.ui.core.ValueState.Error);
				// 	this.getView().byId("vpriority").setTooltip("Select valid priority");
				// 	iError++;
				// } else {
				// 	this.getView().byId("vpriority").setValueState(sap.ui.core.ValueState.None);
				// 	this.getView().byId("vpriority").destroyTooltip();
				// }
				// if (oPriority != null) {
				// 	oEntry.Zdomain = oPriority.getKey();
				// }
				
				var oComplexity = this.getView().byId("vcomplexity").getSelectedItem();
				if (oComplexity !== null) 
				{
				oEntry.Zcomplexity = oComplexity.getKey();
				}
				// if (oComplexity === null || oEntry.Zcomplexity < 1) {
				// 	this.getView().byId("vcomplexity").setValueState(sap.ui.core.ValueState.Error);
				// 	this.getView().byId("vcomplexity").setTooltip("Select Valid Complexity");
				// 	iError++;
				// } else {
				// 	this.getView().byId("vcomplexity").setValueState(sap.ui.core.ValueState.None);
				// 	this.getView().byId("vcomplexity").destroyTooltip();
				// }
				// if (oComplexity != null) {
				// 	oEntry.Zcomplexity = oComplexity.getKey();
				// }
				
				// oEntry.ZcodeDays = this.getView().byId("vcodeDays").getValue();
				oEntry.ZgapNo = this.getView().byId("vcreateGapNumber").getValue();
				oEntry.ZspecName = this.getView().byId("vcreatespec").getValue();
				if (oEntry.ZspecName === "") {
					this.getView().byId("vcreatespec").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreatespec").setTooltip("Enter Specification Name");
					iError++;
				} else {
					this.getView().byId("vcreatespec").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreatespec").destroyTooltip();
				}

				oEntry.ZspecVersion = this.getView().byId("vcreateversion").getValue();
				oEntry.ZseqNo = this.getView().byId("vcreateSeq").getValue();
				oEntry.ZticketNo = this.getView().byId("vcreateticket").getValue();
				if (oEntry.ZticketNo === "") 
				{
					this.getView().byId("vcreateticket").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreateticket").setTooltip("Enter Ticket Number");
					iError++;
				} else {
					this.getView().byId("vcreateticket").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreateticket").destroyTooltip();
				}

				// var oDevType = this.getView().byId("vcreatedev").getSelectedItem();
               	var odevScope = this.getView().byId("vDevScope").getSelectedItem();
				if (odevScope === null || oEntry.ZdevType < 1) {
					var ZdevScope = this.getView().byId("vDevScope").getValue();
					if ( ZdevScope === "" )
					{
					this.getView().byId("vDevScope").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vDevScope").setTooltip("Select Development Type");
					iError++;
					}
				} else {
					this.getView().byId("vDevScope").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vDevScope").destroyTooltip();
				}
				if ( ZdevScope !== null)
				{
					oEntry.ZdevScope = ZdevScope;
				}
				if (odevScope !== null) {
					oEntry.ZdevScope = odevScope.getKey();
				} 
				var oDevType = this.getView().byId("vcreatedev").getSelectedItem();
				if (oDevType === null || oEntry.ZdevType < 1) {
					this.getView().byId("vcreatedev").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreatedev").setTooltip("Select Development Type");
					iError++;
				} else {
					this.getView().byId("vcreatedev").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreatedev").destroyTooltip();
				}

				if (oDevType !== null) {
					oEntry.ZdevType = oDevType.getKey();
				}
                
                var ocategory = this.getView().byId("vcategory").getSelectedItem();
				if (ocategory === null || oEntry.Zcategory < 1) {
					var Zcategory = this.getView().byId("vcategory").getValue();
					if ( Zcategory === "" )
					{
					this.getView().byId("vcategory").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcategory").setTooltip("Select Valid entry");
					iError++;
					}
				} else {
					this.getView().byId("vcategory").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcategory").destroyTooltip();
				}
				
				if ( Zcategory !== " " )
				{
					oEntry.Zcategory = Zcategory;
				}
				
				if (ocategory !== null) {
					oEntry.Zcategory = ocategory.getKey();
				}
				var oFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "yyyy-MM-ddTKK:mm:ss"
				});
				var dPrdate = this.getView().byId("vcreateassdate").getDateValue();
				if (dPrdate === null) {
					this.getView().byId("vcreateassdate").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreateassdate").setTooltip("Enter Assigned Date");
					iError++;
				} else {
					this.getView().byId("vcreateassdate").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreateassdate").destroyTooltip();
				}
				oEntry.ZassignDate = oFormatDate.format(dPrdate);

				// oEntry.ZassignDate = this.getView().byId("vcreateassdate").getValue() + "T00:00:00";
				

				var dplanSdate = this.getView().byId("vcreatepsdate").getDateValue();
				if (dplanSdate === null) {
					this.getView().byId("vcreatepsdate").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreatepsdate").setTooltip("Enter Planed Start Date");
					iError++;
				} else {
					this.getView().byId("vcreatepsdate").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreatepsdate").destroyTooltip();
				}
				oEntry.ZplanStart = oFormatDate.format(dplanSdate);
				// oEntry.ZplanStart = this.getView().byId("vcreatepsdate").getValue() + "T00:00:00";

				var dplanEdate = this.getView().byId("vcreatepedate").getDateValue();
				if (dplanEdate === null) {
					this.getView().byId("vcreatepedate").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreatepedate").setTooltip("Enter Planned End Date");
					iError++;
				} else {
					this.getView().byId("vcreatepedate").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreatepedate").destroyTooltip();
				}
				oEntry.ZplanEnd = oFormatDate.format(dplanEdate);
				// oEntry.ZplanEnd = this.getView().byId("vcreatepedate").getValue() + "T00:00:00";
				// oEntry.ZrealStart = this.getView().byId("vcreatersdate").getValue() + "T00:00:00";
				// oEntry.ZrealEnd = this.getView().byId("vcreateredate").getValue() + "T00:00:00";
				// oEntry.ZcloseDate = "2017-04-29T00:00:00";
				// oEntry.Zdeveloper = this.getView().byId("vcreatedeveloper").getValue();
				oEntry.ZactualDays = this.getView().byId("vactualCodeDays").getValue();
				if (oEntry.ZactualDays === "")
				{
					oEntry.ZactualDays = " ";
				}
				
				oEntry.ZstdDays = this.getView().byId("vstdDays").getValue();
				if (oEntry.ZstdDays === "")
				{
					oEntry.ZstdDays = " ";
				}
				
				oEntry.ZcodeDays = this.getView().byId("vcodeDays").getValue();
				if (oEntry.ZcodeDays === "")
				{
					oEntry.ZcodeDays = " ";
				}
				// if (oEntry.ZcodeDays === "") {
				// 	this.getView().byId("vcodeDays").setValueState(sap.ui.core.ValueState.Error);
				// 	this.getView().byId("vcodeDays").setTooltip("Enter Code Days");
				// 	iError++;
				// } else {
				// 	this.getView().byId("vcodeDays").setValueState(sap.ui.core.ValueState.None);
				// 	this.getView().byId("vcodeDays").destroyTooltip();
				// }
				oEntry.ZtestDays = this.getView().byId("vtestingDays").getValue();
				if (oEntry.ZtestDays === "")
				{
					oEntry.ZtestDays = " ";
				}
				
				// if (oEntry.ZtestDays === "") {

				// 	this.getView().byId("vtestingDays").setValueState(sap.ui.core.ValueState.Error);
				// 	this.getView().byId("vtestingDays").setTooltip("Enter Testing");
				// 	iError++;
				// } else {
				// 	this.getView().byId("vtestingDays").setValueState(sap.ui.core.ValueState.None);
				// 	this.getView().byId("vtestingDays").destroyTooltip();
				// }

				oEntry.ZrevDays = this.getView().byId("vreviewDays").getValue();
				if (oEntry.ZrevDays === "")
				{
					oEntry.ZrevDays = " ";
				}
				oEntry.ZabapWorkLoad = this.getView().byId("vabapWorkload").getValue();
				if (oEntry.ZabapWorkLoad === "")
				{
					oEntry.ZabapWorkLoad = " ";
				}
				// oEntry.ZstatusDev = this.getView().byId("vdevstatus").getSelectedItem();
				var ostatusDev = this.getView().byId("vdevstatus").getSelectedItem();
				if (ostatusDev === null || oEntry.ZstatusDev < 1) {
					this.getView().byId("vdevstatus").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vdevstatus").setTooltip("Select Valid Dev Status");
					iError++;
				} else {
					this.getView().byId("vdevstatus").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vdevstatus").destroyTooltip();
				}
				if (ostatusDev !== null) {
					var odevstatus = ostatusDev.getKey();
					oEntry.ZstatusDev = odevstatus;
				}
				

				var oZdeveloper = this.getView().byId("vcreatedeveloper").getSelectedItem();
				if (oZdeveloper === null || oEntry.Zdeveloper < 1) {
					this.getView().byId("vcreatedeveloper").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreatedeveloper").setTooltip("Select Valid Developer ID");
					iError++;
				} else {
					this.getView().byId("vcreatedeveloper").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreatedeveloper").destroyTooltip();
				}
				if (oZdeveloper !== null) {
					var odev = oZdeveloper.getKey();
					oEntry.Zdeveloper = odev;
				}
				
				// oEntry.ZassignedBy = this.getView().byId("vcreateassby").getValue();
				var oAssignedby = this.getView().byId("vcreateassby").getSelectedItem();
				if (oAssignedby === null || oEntry.ZassignedBy < 1) {
					this.getView().byId("vcreateassby").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("vcreateassby").setToolvcreateassbytip("Select Valid ID");
					iError++;
				} else {
					this.getView().byId("vcreateassby").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("vcreateassby").destroyTooltip();
				}
				if (oAssignedby !== null) {
					var oAsgnBy = oAssignedby.getKey();
					oEntry.ZassignedBy = oAsgnBy;
				}
				
				


				if (iError > 0) {
					return;
				} else {
					oModel.create("/TechTrackerSet", oEntry, {
						method: "POST",
						success: function(data) {
							// dialog.close();
							MessageToast.show("Record has been created successfully");
							// MessageToast.show("Record has been saved");
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
						error: function(e) {
							// dialog.close();
							MessageToast.show("Error while saving record");
						}
					});
					// oModel.clearSelection();
				}
				// oModel.clearSelection();
			},
			/**
			 *@memberOf ZNav.controller.vcreate_tech
			 */
			fBackFromTechCreate: function() {
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