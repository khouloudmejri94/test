function(pUser)
{
	//date de création : 30/05/2012
	//créateur : PLE
	//société : MASAO
	//date de modification : 
	//modifiée par : 
	//description : script permettant de lancer la procédure stockée de génération des domaines (sécurité visuelle)
		// HAS DEB : 28/03/2022 -  NEW CODE SS_Res_GenererDomaine
	try {
	    // Exécution de la procédure stockée générer les vue de domaine de l'utilisateur affiché dans l'ojet ressource
	    var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var ProcParam: StoredProcParam[] = new StoredProcParam[1];
	    //ar p_User = CurrentRecord["ResName"];
	    ProcParam[0] = new StoredProcParam("titulaire", "VARCHAR", "IN", 50, pUser);
	    var strResultProc = ObjSQL.ExecuteStoredProc("XGenererDomainesOneUser", ProcParam);
	} catch (e) {
	    throw (" Error while Generating User domain XGenererDomaines : " + e);
	}
	// HAS END : 28/03/2022 -  NEW CODE SS_Res_GenererDomaine
		return true;
}