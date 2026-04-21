function()
{
	/*************************************************************/
	// Société                             : MASAO
	// Nom script                          : _gfctGetModeChap 
	// Infos Paramètres                    : 
	 // Auteur                              : KEL                                                  
	 // Chapitre concerné                   : Sell
	// Date de création                    : 02/08/2011
	// Modifié par                         :                                                   
	// Date de modification                :  
	// Commentaires                        : Pour le mode d'ouverture d'un chapitre
	// Règles de gestion                   : 
	 /*************************************************************/
		if (top.bWizard == false || top.bWizard == undefined)
	{
	  return (top.MyApp.MySetting[top.MyApp.MySetting.CurrentData_View].nChapMode);
	}
	else
	{
	  return (top.MyApp.WizardSetting[top.MyApp.WizardSetting.CurrentData_View].nChapMode);
	}
}