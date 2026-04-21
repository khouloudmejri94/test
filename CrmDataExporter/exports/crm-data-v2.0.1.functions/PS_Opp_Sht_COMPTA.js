function PS_Opp_Sht_COMPTA()
{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vListProfilMKT  = "GRP_ACH;ASS_CO;ASS_CO_VEO;ACH_SED;ACH_SED_VEO;ACH_TER;MAN_HA_ASS;MAN_HA_SED;MAN_HA_SED_VEO;MAN_HA_TER" ;
	if(vListProfilMKT.indexOf(vProf) == -1 && vProf !='ADMT' && vProf !='ADMF')
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé d’utiliser cette fonctionnalité  !! \n Merci de contacter votre administrateur."]]);
	     return false;
	}
	var vOppNRID = top.MyApp.GetItemValue ("OppNRID");
	var vStatut  = top.MyApp.GetItemValue("OppStatus"); 
	if(top.MyApp.CurrentSetting.nChapMode != "Open")  return true;
	
	  top.MyApp.OpenDlg("Wizard", "Opp||Open||"+vOppNRID,top.MyData_View, false, "PS_Opp_FillWizard_Compta()");
}