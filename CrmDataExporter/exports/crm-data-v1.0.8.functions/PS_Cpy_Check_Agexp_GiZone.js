function()
{
	//PS_Cpy_Check_Agexp_GiZone
	//NRID  : 42009653185770
	// HAS DEB : 2025-02-05 - verifier la zone GI pour un agent d'export
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vReqValExport = top.MyApp.GetItemValue("CpyExtUserDemValExport");
	var vCpyNrid = top.MyApp.GetItemValue("CpyNRID");
	var vGiZ = top.MyApp.GetItemValue("CpyExtExportZone");
	//alert("Calling to import with server function SS_Quo_Call_Exp_Imp for Affair : " + vAffair + " and offer : " +vOffer + ".")
	if (vReqValExport != '' && vReqValExport != null && vCpyNrid != '' && vCpyNrid != null && vCpyNrid != undefined) {
		var vListProfilsValides = "ADMT;ADMF;ADMFT";
		if (vListProfilsValides.indexOf(vProf) == -1) {
			top.MyApp.OpenDlg("Alert", ["Attention", "Your are not allowed to do this request!"])
			return false;
		}
		var vReturn = top.MyApp.ExecuteServerScript(42251053645768, [vReqValExport, vCpyNrid]);
		top.MyApp.Custom_CheckGiZoneBtn = true;
		//var oGiZ = top.MyApp.FindItem("Label42019653185770");
		alert("Check GI Zone Export result : " + vReturn);
		if (vReturn == '0') {
			top.MyApp.SetItemValue("CpyExtChkExpZone", "NOVALID");
		} else if (vReturn == '1') {
			top.MyApp.SetItemValue("CpyExtChkExpZone", "VALID");
		}
		top.MyApp.SetItemValue("CpyExtExportZone", vReturn);
		top.MyApp.Custom_IncompletBtn = false;
		top.MyApp.fraMenuBar.Execute("R_Save");
		//top.MyApp.fraMenuBar.Execute("T_Refresh");
		/* if (vReturn == '0') {
		 top.MyApp.SetItemValue("CpyExtValidExporter", "Standby");
		 top.MyApp.fraMenuBar.Execute("R_Save");
		} */
	}
	// HAS END : 2025-02-05 - verifier la zone GI pour un agent d'export
}