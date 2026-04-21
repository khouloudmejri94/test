function()
{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vListProfilMKT  = "MNG_ACH_OPR;DIR_MKT;ASS_MKT;MAN_POLE;CH_MAR" ;
	
	
	
	
	if(vListProfilMKT.indexOf(vProf) == -1 && vProf !='ADMT' && vProf !='ADMF')
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", "Vous n’êtes pas autorisé d’utiliser cette fonctionnalité  !! \n Merci de contacter votre administrateur "]);
	     return false;
	}
	var vOsaNRID = top.MyApp.GetItemValue ("OSaNRID");
	var vStatut  = top.MyApp.GetItemValue("OSaExtStatut"); 
	
	
	
	
	if(top.MyApp.CurrentSetting.nChapMode != "Open")  return true;
	
	
	
	
	if (vStatut == "Annulée" || vStatut == "Non validée" || vStatut == "Non validée")
	{
	 
	 //On passe le Statut en Creation
	     top.MyApp.SetItemValue ("OSaExtStatut", "En création");
	     top.MyApp.fraMenuBar.Execute("R_Save");
	     
	}
	else
	{
	top.MyApp.OpenDlg("Alert", ["Attention", "Cette fonctionnalité n'est pas accessible à partir de ce statut !! \n Merci de contacter votre administrateur "]);
	 return false;
	}
}