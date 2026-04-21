function AfterLoad_Header_30820353647340(p_ViewData)
{
	
	     PS_COSA_Type_AddEvent();
	     var typeHnd = top.MyApp.FindItem("OSaExtType", p_ViewData.parentWindow);
	     top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_COSA_Type_AddEvent );
	     top.MyApp.fctAddEvent(typeHnd, "change", PS_COSA_Type_AddEvent );
		if(top.MyApp.CurrentSetting.nChapMode == "Open")  
	{
	 
	 top.MyApp.FindItem("OSaExtStatut").disabled = true;
	 top.MyApp.FindItem("OSaExtStatutBtn").disabled = true;
	}
		if (top.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true) {
	    var vStatFair = top.MyApp.GetItemValue("OSaExtStatut");
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    if (vProf != "ADMT") {
	        if (vStatFair == 'Non validée') {
	            top.MyApp.fraMenuBar.Execute("R_Consult");
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	        } else {
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	        }
	    } else {
	        top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	    }
	}
}