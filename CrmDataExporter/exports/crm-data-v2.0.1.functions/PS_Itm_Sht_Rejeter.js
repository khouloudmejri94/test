function PS_Itm_Sht_Rejeter()
{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	
	var vListProfilsValides = "LEAD_NEG;ADMT;ADMF;ADMFT";
	
	
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	     var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE,  top.MyApp.SYSTEM_DATE ); 
	
	     top.MyApp.SetItemValue("ItmExtStatut","REJETER");
	     top.MyApp.SetItemValue("ItmExtAuteurRejet",top.MyApp.UserSetting.User.Name);
	     top.MyApp.SetItemValue("ItmExtDateRejet", vDate);
	
	
	     top.MyApp.fraMenuBar.Execute("R_Save");
	
	}
	else {
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	      return false;
	}
	
	return true;
}