sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(Controller, History, MessageToast) {
	"use strict";
	var oDevType;
	return Controller.extend("PMTool.controller.V_Trans_Create", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.ypy
		 * @memberOf PMTool.view.V_Trans_Create
		 */
			onInit: function() {
	          	 var oView = this.getView();
	          	 oView.addEventDelegate({
				onBeforeShow: function(oEvent) {
			    oView.byId("vTeam").setValue("");
		        oView.byId("vcreateProjectId").setValue("");
			    oView.byId("idTicketNumber").setValue("");
			    oView.byId("idSpecificationName").setValue("");
			    oView.byId("idSequenceNumber").setValue("");
			    oView.byId("idCountry").setValue("");
			    oView.byId("idTransportRequest").setValue("");
		        oView.byId("idPreviousRequest").setValue("");
		        oView.byId("vdev").setValue("");
		         oView.byId("idOwner").setValue("");
				}

	}, oView);	
	
	            var oModel = new sap.ui.model.json.JSONModel();
	          		// var oTable = oView.byId("Trans_Table");
                oModel.loadData("model/Data.json","",false);
                this.getView().setModel(oModel, "jData");
			},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf PMTool.view.V_Trans_Create
		 */
			// onBeforeRendering: function() {
					
			// },
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf PMTool.view.V_Trans_Create
		 */
			// onAfterRendering: function() {
		        
			// },
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf PMTool.view.V_Trans_Create
		 */
		//	onExit: function() {
		//
		//	}
		handleDevTyp: function(evt)
		{
			oDevType = evt.getParameter("selectedItem").getKey();
			
		},
		fSaveTrans: function() {
			/*create operation*/
			var dialog = new sap.m.BusyDialog({ text:'Processing'});
			dialog.open();
			var oModel = this.getView().getModel();
			var oEntry = {};
			// oEntry.Objnr = "4";
			var oTeam = this.getView().byId("vTeam").getSelectedItem();
            var oKeyteam = oTeam.getKey();
			oEntry.Team = oKeyteam;
			// oEntry.Team = this.getView().byId("idTeam").getSelectedItem();
			var oZprojId1 = this.getView().byId("vcreateProjectId").getSelectedItem();
            var oKey = oZprojId1.getKey();
			oEntry.Project = oKey;
			oEntry.Ticket = this.getView().byId("idTicketNumber").getValue();
			oEntry.Folder = this.getView().byId("idSpecificationName").getValue();
			oEntry.Seqnr = this.getView().byId("idSequenceNumber").getValue();
			oEntry.Land1 = this.getView().byId("idCountry").getValue();
			oEntry.Trkorr = this.getView().byId("idTransportRequest").getValue();
			 oEntry.TrkorrPrev = this.getView().byId("idPreviousRequest").getValue();
			 //oEntry.Devtype = this.getView().byId("idDevelopmentType").getSelectedItem();
			 var oDevtype = this.getView().byId("vdev").getSelectedItem();
             var oKeyDev = oDevtype.getKey();
		 	oEntry.Devtype = oKeyDev;
			// /oEntry.Devtype = oDevType;
			oEntry.As4user = this.getView().byId("idOwner").getValue();
			// oEntry.Erdat = "2017-08-25T00:00:00";
			// oEntry.Ertime = "";			
			// oEntry.Chdat = "2017-09-25T00:00:00";
			// oEntry.Chtim = "PT10H10M10S";
			oModel.create("/TransTrackerSet", oEntry, {
				method: "POST",
				success: function(data) {
					dialog.close();
					MessageToast.show("A record has been created");
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
					dialog.close();
					MessageToast.show("Error while creating the record");
				}
			});
		},
		/**
		 *@memberOf PMTool.controller.V_Trans_Create
		 */
		f_GotoTransTracker: function() {
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
		 *@memberOf PMTool.controller.V_Trans_Create
		 */
		fTransTeamF4: function() {
			//This code was generated by the layout editor.
			var oValueHelpDialog = new sap.ui.ux3.ToolPopup({
                        modal: true,
                        inverted: false,                          // disable color inversion
                        title: "Select Team",
                        opener:  "idTeamInput",             // locate dialog next to this field
                        closed: function (oEvent) {
                    }
          });
		}
	});
});