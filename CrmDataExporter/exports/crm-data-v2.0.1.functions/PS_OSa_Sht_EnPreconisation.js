function PS_OSa_Sht_EnPreconisation()
{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vListProfilMKT  = "LEAD_NEG;MNG_ACH_OPR;FMTN" ;
	
	
	if(vListProfilMKT.indexOf(vProf) == -1 && vProf !='ADMT' && vProf !='ADMF')
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", "Vous n’êtes pas autorisé d’utiliser cette fonctionnalité  !! \n Merci de contacter votre administrateur "]);
	     return false;
	}
	var vOsaNRID = top.MyApp.GetItemValue ("OSaNRID");
	var vStatut  = top.MyApp.GetItemValue("OSaExtStatut"); 
	
	
	if(top.MyApp.CurrentSetting.nChapMode != "Open")  return true;
	
	
	if (vStatut == "A revoir" || vStatut == "En création")
	{
	 
	 //On passe le Statut en Preconisation
	     top.MyApp.SetItemValue ("OSaExtStatut", "En préconisation");
	     top.MyApp.fraMenuBar.Execute("R_Save");
	     
	}
	else
	{
	top.MyApp.OpenDlg("Alert", ["Attention", "Cette fonctionnalité n'est pas accessible à partir de ce statut !! \n Merci de contacter votre administrateur "]);
	 return false;
	}
}