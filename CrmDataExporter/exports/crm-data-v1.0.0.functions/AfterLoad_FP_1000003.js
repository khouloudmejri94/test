function AfterLoad_FP_1000003()
{
	/*
	var vProfiluser    = top.MyApp.UserSetting.User.ProfileInitials; 
	if ((vProfiluser == 'ADMF') || (vProfiluser == 'ADMFT') || (vProfiluser == 'ADMT')) {
	var validate = top.MyApp.FindItem("CpyExtValidAdm");
	if (validate) validate.disabled = false;
	   
	//  top.MyApp.FindItem("CpyExtValidSas", top.MyData_View).disabled = false;
	    } else {
	          
	   var validate = top.MyApp.FindItem("CpyExtValidAdm");
	   if (validate) validate.disabled = true;
	//   top.MyApp.FindItem("CpyExtValidSas", top.MyData_View).disabled = true;
	   }
	 
	  if ((vProfiluser == 'ADMF' || vProfiluser == 'ADMFT' || vProfiluser == 'ADMT') || (vProfiluser == 'MAN_HA_TER') || (vProfiluser == 'MAN_HA_ASS')) {
	 var validmng = top.MyApp.FindItem("CpyExtValidationManager");
	   if (validmng) validmng.disabled = false;     
	     } else {
	      var validmng = top.MyApp.FindItem("CpyExtValidationManager");
	   if (validmng) validmng.disabled = true; 
	    }
	*/
	
	function getCouleur() {
	 var oCpyExtAbc = top.MyApp.FindItem("CpyExtAbc");
	 if (top.MyApp.GetItemValue("CpyExtAbc") == "JAUNE") {
	  if (oCpyExtAbc) top.MyApp.FindItem("CpyExtAbc").style.background = "#FFFF00";
	  if (top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	   //top.MyApp.SetItemAttribute("CpyComment", "className", "Mandatory");
	   //top.MyApp.CurrentSetting.Catalog["CpyComment"].Mn = 1;
	   top.MyApp._gfctSetClassName("CpyComment", "NM");
	  }
	 } else {
	  if (top.MyApp.GetItemValue("CpyExtAbc") == "ORANGE") {
	   if (oCpyExtAbc) top.MyApp.FindItem("CpyExtAbc").style.background = "#FFA500"
	  } else {
	   if (top.MyApp.GetItemValue("CpyExtAbc") == "ROUGE") {
	    if (oCpyExtAbc) top.MyApp.FindItem("CpyExtAbc").style.background = "#FF0000"
	   } else if (oCpyExtAbc) top.MyApp.FindItem("CpyExtAbc").style.background = "#FFFFFF"
	  }
	  if (top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	   top.MyApp.SetItemAttribute("CpyComment", "className", "");
	   top.MyApp.CurrentSetting.Catalog["CpyComment"].Mn = -1;
	  }
	 }
	}
	getCouleur();
	
	var strABC = top.MyApp.FindItem("CpyExtAbc");
	if (strABC) {
	 strABC.onchange = function () {
	  getCouleur();
	 };
	}
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	 var oCpyExtAbc = top.MyApp.FindItem("CpyExtAbc");
	 if (vProfiluser == 'CH_PRO' || vProfiluser == 'ADMT') {
	  if (oCpyExtAbc) top.MyApp.SetItem("CpyExtAbc", "disabled", false, top.MyData_View);
	  top.MyApp.SetItem("CpyAddr2CpyName", "disabled", false, top.MyData_View);
	 } else {
	  if (oCpyExtAbc) top.MyApp.SetItem("CpyExtAbc", "disabled", true, top.MyData_View);
	  top.MyApp.SetItem("CpyAddr2CpyName", "disabled", true, top.MyData_View);
	 }
	
	 //17.11.2015 CBA #546
	 if (vProfiluser == 'LTG' || vProfiluser == 'ADMT' || vProfiluser == 'ADMF') {
	  top.MyApp.SetItem("CpyExtInfoLogistique", "disabled", false, top.MyData_View);
	  top.MyApp.SetItem("CpyComment", "disabled", false, top.MyData_View);
	 } else {
	  top.MyApp.SetItem("CpyExtInfoLogistique", "disabled", true, top.MyData_View);
	  top.MyApp.SetItem("CpyComment", "disabled", true, top.MyData_View);
	 }
	 /*
	 if (top.MyApp.GetItemValue("CpyExtLitige") == 1) {
	 if(top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.CurrentSetting.nChapMode != 'Reset')
	  top.MyApp.SetItemAttribute("CpyComment", "className", "Mandatory");      
	  top.MyApp.CurrentSetting.Catalog["CpyComment"].Mn=1;
	 }
	 */
	}
		return true;
}