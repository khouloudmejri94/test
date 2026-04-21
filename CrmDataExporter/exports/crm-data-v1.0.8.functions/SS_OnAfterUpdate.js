function()
{
	 /*************************************************************/
	 // Société                             : MASAO
	 // Nom script                          : SS_Cpy_OnAfterUpdate
	 // Infos Paramètres                    :  
	 // Auteur                              : CCO                                                  
	 // Chapitre concerné                   : Société
	 // Date de création                    : 31/05/2012
	 // Modifié par                         : CCO                                                  
	 // Date de modification                : 31/05/2012
	 // Commentaires                        : 
	 // Règles de gestion                   : RG
	 /*************************************************************/
		// Cpy - si validation SAS= "A supprimer" alors validation acheteur =0 et validation cp = 0
	// ajout d'une vérification du statut pour ne pas casser la RG du statut "POUBELLE"
	var ValidSAS = CurrentRecord["CpyExtValidSas"];
	var CpyStatut = CurrentRecord["CpyType"];
	if (ValidSAS = 'A SUPP' && CpyStatut != 'POUBELLE')
	{
	CurrentRecord["CpyExtValidAch"] = 0;
	CurrentRecord["CpyExtValidMktg"] = 0;
	}
		return true;
}