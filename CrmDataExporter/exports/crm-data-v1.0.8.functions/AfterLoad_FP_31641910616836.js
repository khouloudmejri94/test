function()
{
	
	
	  /************************************************************************************************************************************/
	  // Nom script                          : AfterLoad_FP_31641910616836
	  // NRID                                : 32621787300750 
	  // Infos Paramètres                    :  
	  // Auteur                              : MASAO                             
	  // Chapitre concerné                   : Opp
	  // Date de création                    : 30/10/2015
	  // Modifié par                         : OZEOL                                               
	  // Date de modification                : 01/06/2018
	  // Commentaires                        : Afterload de l'onglet Suivie Administratif
	  /************************************************************************************************************************************/
		
	// Récupération de la fenetre courante
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	    _oCurWnd = top.MyData_View;
	} else {
	    _oCurWnd = top.MyApp.wizardWindow;
	}
	// Applique les controles des champs
	//PS_Opp_Header_Status();
	//PS_Opp_Header_Status();
	var typeHnd = top.MyApp.FindItem("OppExtRaisonNS", _oCurWnd);
	if (typeHnd) { // Applique le controle sur les champs si le champ OppExtRaisonNS a été modifié
	    top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Opp_Header_Status);
	    top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
}