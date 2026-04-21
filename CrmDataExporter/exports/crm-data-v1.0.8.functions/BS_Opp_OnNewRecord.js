function()
{
	/************************************************************************************************************************************/
	// Société                             : MASAO
	// Nom script                          : BS_Opp_OnNewRecord
	// NRID                                : 34130878217411 
	// Infos Paramètres                    :  
	// Auteur                              : FNA                             
	// Chapitre concerné                   : Opp
	// Date de création                    : 13/12/2017
	// Modifié par                         :                                                   
	// Date de modification                : 
	// Commentaires                        : Initialisation des valeurs par défaut pour les affaires 
	/************************************************************************************************************************************/
	try {
	    CurrentRecord['OppStatus'] = '01. EN CONSTITUTION';
	} catch (e) {
	    throw e.description;
	} finally {}
}