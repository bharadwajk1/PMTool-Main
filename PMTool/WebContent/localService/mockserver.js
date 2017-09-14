sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	return {

		init: function () {
 
			// create
			var oMockServer = new MockServer({
				rootUri: "/sap/opu/odata/sap/ZTECH_TRACKER_SRV/"
			});
 
			var oUriParameters = jQuery.sap.getUriParameters();
 
			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 1000
			});
 
			// simulate
			var sPath = jQuery.sap.getModulePath("ZNav.localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");
			
			// start
			oMockServer.start();
		}
	};
 
});