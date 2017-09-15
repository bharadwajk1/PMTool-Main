sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(Controller, History, MessageToast) {
	"use strict";
	return Controller.extend("ZNav.controller.V_Trans_Copy", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZNav.view.V_Trans_Copy
		 */
			onInit: function() {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.getRoute("Route_Trans_Copy").attachPatternMatched(this._onObjectMatched, this);
        // oRouter.attachRouteMatched(function(oEvent) {
            // var team = oEvent.getParameter("arguments").team;
        },
        
        _onObjectMatched: function (oEvent) {
        	
				 var Team = oEvent.getParameter("arguments").Team;
				 var Project = oEvent.getParameter("arguments").Project;
				 var Ticket = oEvent.getParameter("arguments").Ticket;
				 var Folder = oEvent.getParameter("arguments").SpecName;
				 var Seqnr = oEvent.getParameter("arguments").Seqnr;
				 var Land1 = oEvent.getParameter("arguments").Country;
				 var Trkorr = oEvent.getParameter("arguments").Trkorr;
				 var TrkorrPrev = oEvent.getParameter("arguments").TrkorrPrev;
				 var Devtype = oEvent.getParameter("arguments").Devtype;
				 var Owner = oEvent.getParameter("arguments").Owner;
				 
				 this.getView().byId("idTeam").setValue(Team);
				 this.getView().byId("idProject").setValue(Project);
				 this.getView().byId("idTicketNumber").setValue(Ticket);
				 this.getView().byId("idSpecificationName").setValue(Folder);
				 this.getView().byId("idSequenceNumber").setValue(Seqnr);
				 this.getView().byId("idCountry").setValue(Land1);
				 this.getView().byId("idTransportRequest").setValue(Trkorr);
				 this.getView().byId("idPreviousRequest").setValue(TrkorrPrev);
				 this.getView().byId("idDevelopmentType").setValue(Devtype);
				 this.getView().byId("idOwner").setValue(Owner);
			// });
				
				// var oModel = this.getModel();
				// var oRouter = sap.ui.core.routing.Router.getRouter("Route_Trans_Copy");
				// oRouter.attachRouteMatched(function (oEvent) {
				
				// var team = oEvent.getParameter("arguments").idTeam;
				// },this);
							// var oTable = V_Trans.getView().byId("Trans_Table");
			// var aIndex = oTable.getSelectedIndex();
			// var selectedRow = oTable.getRows()[2];
			// oEntry.Team = this.getView().byId("idTeam").getValue();
			// oEntry.Project = this.getView().byId("idProject").getValue();
			// oEntry.Ticket = this.getView().byId("idTicketNumber").getValue();
			// oEntry.Folder = this.getView().byId("idSpecificationName").getValue();
			// oEntry.Seqnr = this.getView().byId("idSequenceNumber").getValue();
			// oEntry.Land1 = this.getView().byId("idCountry").getValue();
			// oEntry.Trkorr = this.getView().byId("idTransportRequest").getValue();
			// oEntry.TrkorrPrev = this.getView().byId("idPreviousRequest").getValue();
			// oEntry.Devtype = this.getView().byId("idDevelopmentType").getValue();
			// oEntry.As4user = this.getView().byId("idOwner").getValue();
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZNav.view.V_Trans_Copy
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZNav.view.V_Trans_Copy
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZNav.view.V_Trans_Copy
		 */
		//	onExit: function() {
		//
		//	}
		
				f_GotoTrans: function() {
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
fSaveTrans: function() {
			/*create operation*/
			var oModel = this.getView().getModel();
			var oEntry = {};
			// oEntry.Objnr = "7";
			oEntry.Team = this.getView().byId("idTeam").getValue();
			oEntry.Project = this.getView().byId("idProject").getValue();
			oEntry.Ticket = this.getView().byId("idTicketNumber").getValue();
			oEntry.Folder = this.getView().byId("idSpecificationName").getValue();
			oEntry.Seqnr = this.getView().byId("idSequenceNumber").getValue();
			oEntry.Land1 = this.getView().byId("idCountry").getValue();
			oEntry.Trkorr = this.getView().byId("idTransportRequest").getValue();
			oEntry.TrkorrPrev = this.getView().byId("idPreviousRequest").getValue();
			oEntry.Devtype = this.getView().byId("idDevelopmentType").getValue();
			oEntry.As4user = this.getView().byId("idOwner").getValue();
			// oEntry.Erdat = "2017-08-25T00:00:00";
			// oEntry.Ertime = "";			
			// oEntry.Chdat = "2017-09-25T00:00:00";
			// oEntry.Chtim = "PT10H10M10S";
			oModel.create("/TransTrackerSet", oEntry, {
				method: "POST",
				success: function(data) {
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
					
					// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Tell the Router to Navigate To Route_Tar_3
					// oRouter.navTo("Route_Tar_3", {});
				},
				error: function(e) {
					alert("error");
				}
			});
		}		

	});

});