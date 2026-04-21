function Ps_Itm_Sht_Valider()
{
	
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	
	var vListProfilsValides = "LEAD_NEG;MNG_ACH_OPR;ADMT;ADMF;ADMFT";
	
	
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	     var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE,  top.MyApp.SYSTEM_DATE );
	     top.MyApp.SetItemValue("ItmExtStatut","VALIDER");
	
	     top.MyApp.CurrentSetting.Catalog.ItmExtAuteurValide.Ed = 1;
	     top.MyApp.CurrentSetting.Catalog.ItmExtDateValide.Ed = 1;
	     top.MyApp.SetItemValue("ItmExtAuteurValide",top.MyApp.UserSetting.User.Name);
	     top.MyApp.SetItemValue("ItmExtDateValide", vDate);
	     top.MyApp.CurrentSetting.Catalog.ItmExtAuteurValide.Ed = -1;
	     top.MyApp.CurrentSetting.Catalog.ItmExtDateValide.Ed = -1;
	
	
	     top.MyApp.fraMenuBar.Execute("R_Save");
	
	}
	else {
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	      return false;
	}
	
	return true;
}