function()
{
	
	
	var vProf= top.MyApp.UserSetting.User.ProfileInitials
	
	var vListProfilsValides = "NEG_SEN;ADMT;ADMF;ADMFT;ASS_CO";
	
	
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	     var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE,  top.MyApp.SYSTEM_DATE ); 
	
	     top.MyApp.SetItemValue("ItmExtStatut","AVALIDER");
	     top.MyApp.SetItemValue("ItmExtAuteurAValider",top.MyApp.UserSetting.User.Name);
	     top.MyApp.SetItemValue("ItmExtDateAValider", vDate);
	
	
	     top.MyApp.fraMenuBar.Execute("R_Save");
	
	}
	else {
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	      return false;
	}
	
	return true;
}