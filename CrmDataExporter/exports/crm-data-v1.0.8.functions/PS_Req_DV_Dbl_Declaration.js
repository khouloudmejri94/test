function()
{
	
	 /*************************************************************/
	 // Société                                     : MASAO
	 // Infos Paramètres Entree                     :
	 // Infos Paramètres Sortie                     : 
	 // Auteur                                      : KEL                                                  
	 // Date de création                            : 16/11/2013
	 // Commentaires                                : 
	 /*************************************************************/ 
	  
	if(top.MyApp.CurrentSetting.nChapMode=='Open')  
	{
	 if( top.MyApp.GetItemValue("ReqExtDossGereJuri", top.MyData_View) == 1 )
	 {
	   top.MyApp.OpenDlg("Alert",["", "Pas de déclaration. Ce dossier est géré par le juridique!"]);  
	   return false;   
	 }
	   var vProfil = top.MyApp.UserSetting.User.ProfileInitials;
	   //récupération du NRID de la ligne sélectionnée.
	   var strNRID= g_eventSrcElement.parentElement.NRID;
	
	   if(strNRID == undefined) return true;
	   if(strNRID == "") return true;
	 
	   var arrMyArray=[];
	   arrMyArray[0] = "Open";
	   arrMyArray[1] = strNRID ; 
	   arrMyArray[2] = ""; 
	 
	   var vretour = top.MyApp.OpenDlg ( "30018517272164" , arrMyArray );
	
	   return true;
	}
}