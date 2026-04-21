function AfterLoad_FP_38262053627750()
{
	  /************************************************************************************************************************************/
	  // Nom script                          : AfterLoad_FP_37699178479609
	  // NRID                                : 37699178479609
	  // Infos Paramètres                    :  
	  // Auteur                              : Hassen                             
	  // Chapitre concerné                   : Cpy
	  // Date de création                    : 24/12/2020
	  // Modifié par                         : OZEOL                                               
	  // Date de modification                : 
	  // Commentaires                        : Afterload de l'onglet Agent export
	  /************************************************************************************************************************************/
		var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	 _oCurWnd = top.MyData_View;
	} else {
	 _oCurWnd = top.MyApp.wizardWindow;
	}
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials; //CpyExtValDirExport
	var vFunction = top.MyApp.UserSetting.User.Function;
	var vGiZ = top.MyApp.GetItemValue("CpyExtChkExpZone");
	
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 PS_Cpy_Export_Status();
	 var typeHnd = top.MyApp.FindItem("CpyExtValidExporter", _oCurWnd);
	 if (typeHnd) {
	  top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_Export_Status);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_Export_Status);
	 }
	}
	
	var oValidExporter = top.MyApp.FindItem("CpyExtValidExporter", top.MyData_View);
	if (oValidExporter) {
	    if (vGiZ != '' && vGiZ != null && vGiZ != undefined) {
	        if (vProfiluser != 'ADMFT' && vProfiluser != 'ADMT' && vProfiluser != 'ADMF') {
	            top.MyApp.CurrentSetting.Catalog.CpyExtValidExporter.Ed = -1;
	        } else {
	            top.MyApp.CurrentSetting.Catalog.CpyExtValidExporter.Ed = 1;
	        }
	    } else {
	        top.MyApp.CurrentSetting.Catalog.CpyExtValidExporter.Ed = -1;
	    }
	}
	
	var oValDirExport = top.MyApp.FindItem("CpyExtValDirExport", top.MyData_View);
	if (oValDirExport) {
	 if (vProfiluser != 'ADMT' && vFunction != 'Directeur Back Office' && vFunction != 'Directeur operations' ) {
	  top.MyApp.CurrentSetting.Catalog.CpyExtValDirExport.Ed = -1;
	 } else {
	  top.MyApp.CurrentSetting.Catalog.CpyExtValDirExport.Ed = 1;
	 }
	}
	
	var oComExp = top.MyApp.FindItem("CpyExtFraisAnnexeText", top.MyData_View);
	if (oComExp) {
	 if (vFunction != 'Directeur operations' && vProfiluser != 'ADMFT' && vProfiluser != 'ADMT' && vProfiluser != 'ADMF') {
	  top.MyApp.CurrentSetting.Catalog.CpyExtFraisAnnexeText.Ed = -1;
	 } else {
	  top.MyApp.CurrentSetting.Catalog.CpyExtFraisAnnexeText.Ed = 1;
	 }
	}
	
	
	
		// HAS DEB - 2025-02-05 - add a green flag text if Export Agent Zone GI is Autorised OR Red in the opposite
	top.MyApp.SetItem("CpyExtExportZone", "style.visibility", "hidden");
	top.MyApp.SetItem("CpyExtExportZone", "parentElement.style.visibility", "hidden");
	top.MyApp.SetItem("CpyExtChkExpZone", "style.visibility", "hidden");
	top.MyApp.SetItem("CpyExtChkExpZone", "parentElement.style.visibility", "hidden");
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 var vGiZ = top.MyApp.GetItemValue("CpyExtChkExpZone");
	 var oGiZ = top.MyApp.FindItem("Label42019653185770");
	 if (oGiZ) {
	  if (vGiZ == 'VALID') {
	   oGiZ.innerHTML = "<a id='GiZone'>       .Autorised Zone Exp. </a> ";
	   oGiZ.style = "cursor:pointer";
	   oGiZ.style.fontWeight = 'bold';
	   oGiZ.style.color = '#228B22';
	   oGiZ.style.backgroundColor = 'white';
	   oGiZ.style.border = '10px';
	   oGiZ.style.textAlign = 'center';
	   oGiZ.style.textDecorationUnderline = true;
	  } else if (vGiZ == 'NOVALID') {
	   oGiZ.innerHTML = "<a id='GiZone'> .Derogation Zone. </a> ";
	   oGiZ.style = "cursor:pointer";
	   oGiZ.style.fontWeight = 'bold';
	   oGiZ.style.color = '#f75141';
	   oGiZ.style.backgroundColor = 'white';
	   oGiZ.style.border = '10px';
	   oGiZ.style.textAlign = 'center';
	   oGiZ.style.textDecorationUnderline = true;
	  } else {
	   oGiZ.innerHTML = "";
	  }
	 }
	}
	
	// HAS END - 2025-02-05 - add a green flag text if Export Agent Zone GI is Autorised OR Red in the opposite
}