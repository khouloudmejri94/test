function PS_Opp_Sht_FIDAM()
{
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vListProfilMKT  = "CH_PRO;DIR_MKT;ASS_MKT;MAN_POLE;CH_MAR" ;
	if(vListProfilMKT.indexOf(vProf) == -1 && vProf !='ADMT' && vProf !='ADMF' && vProf !='ADMFT')
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé d’utiliser cette fonctionnalité  !! \n Merci de contacter votre administrateur."]]);
	     return false;
	}
	var vOppNRID = top.MyApp.GetItemValue ("OppNRID");
	var vStatut  = top.MyApp.GetItemValue("OppStatus"); 
	if(top.MyApp.CurrentSetting.nChapMode != "Open")  return true;
	
	  top.MyApp.OpenDlg("Wizard", "Opp||Open||"+vOppNRID,top.MyData_View, false, "PS_Opp_FillWizard_Fidam()");
}