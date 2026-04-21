function()
{
	               /************************************************************************************************************/
	                // Société                             : MASAO
	                // Nom script                          : PS_Acn_OnAfterInsert  
	                // Infos Paramètres                    :  
	                // Auteur                              : KEL et CCO                                 
	                // Chapitre concerné                   : Acn
	                // Date de création                    : 07/06/2012
	                // Modifié par                         :                                                   
	                // Date de modification                :  
	                // Commentaires                        : si statut = fait alors pas de modification possible
	                // Règles de gestion                   : 
	                /*************************************************************************************************************/
		var strStatut = top.MyApp.GetItemValue("AcnStatus",top.MyData_View);
	if( top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") != "true" )
	{
	      var intNewAcnNRID  = top.MyApp.GetItemValue("AcnAcnNRID") ;
	      if( intNewAcnNRID!=""  && intNewAcnNRID != undefined )
	      {
	       top.MyApp.OpenDlg("Alert",["Confirmation", top.MyApp.arrTranslations["Une relance vient d’être créée, voulez-vous l’ouvrir ?"],"YesNo"]) ;
	       if(top.MyApp.AppSetting.dlgReturn[0])
	       {
	          top.MyApp.OpenData_View("Acn",intNewAcnNRID,"Open",'','','');
	       }
	       else
	       {
	   top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["L'action a été crée."]]);
	   top.MyApp.fraMenuBar.Execute("R_Consult");
	       }   
	      }
	   else
	   {
	        top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["L'action a été crée."]]);
	        top.MyApp.fraMenuBar.Execute("R_Consult");
	   }
	}
		return true;
}