function()
{
	
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	
	var vListProfilsValides = "MNG_ACH_OPR;LEAD_NEG;ADMT;ADMF;ADMFT";
	
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	    var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE, top.MyApp.SYSTEM_DATE);
	
	    top.MyApp.SetItemValue("ItmExtStatut", "RENOUVELER");
	    top.MyApp.SetItemValue("ItmExtAuteurRenouveler", top.MyApp.UserSetting.User.Name);
	    top.MyApp.SetItemValue("ItmExtDateRenouveler", top.MyApp.fctFormatDate(new Date(), null, top.MyApp.SYSTEM_DATE));
	
	    var nb = top.MyApp.GetItemValue("ItmExtProlongation");
	
	    nb = Number(nb);
	
	    top.MyApp.SetItemValue("ItmExtProlongation", nb + 1);
	
	    top.MyApp.fraMenuBar.Execute("R_Save");
	
	
	} else {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	    return false;
	}
	
	return true;
}