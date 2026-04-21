function()
{
	/*************************************************************/
	 // Société                                     : RAE
	 // Infos Paramètres Entree                     :
	 // Infos Paramètres Sortie                     : 
	 // Auteur                                      : MH                                                  
	 // Date de création                            : 01/01/2015
	 // Commentaires                                : 
	 /*************************************************************/ 
	  
	if(top.MyApp.CurrentSetting.nChapMode=='Open')  
	{
	   var vProfil = top.MyApp.UserSetting.User.ProfileInitials;
	   //récupération du NRID de la ligne sélectionnée.
	   var strNRID= g_eventSrcElement.parentElement.NRID;
	   if(strNRID == undefined) return true;
	   if(strNRID == "") return true;
	 
	   var vretour = top.MyApp.OpenData_View("Quo",StrNRID,"Open",'','','');
	   return true;
	}
}