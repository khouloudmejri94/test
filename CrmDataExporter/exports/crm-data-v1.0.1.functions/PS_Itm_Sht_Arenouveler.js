function PS_Itm_Sht_Arenouveler()
{
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	
	var vListProfilsValides = "NEG_SEN;LEAD_NEG;ADMT;ADMF;ADMFT;ASS_CO";
	
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	    var rtn = PS_Itm_ProlongationValidite();
	
	} else {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	    return false;
	}
	
	return true;
}