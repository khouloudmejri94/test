function PS_Itm_Sht_Affecter_Consigne()
{
	// Récupère les initiales du profil de l'utilisateur connecté
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	
	// Liste des profils autorisés à utiliser cette fonctionnalité
	var vListProfilsValides = ["LEAD_SRC", "ADMT", "ADMF", "ADMFT"]
	
	// Récupère la valeur du statut courant de la consigne
	var vStatut = top.MyApp.GetItemValue("ItmExtStatut");
	
	// Récupère l'identifiant NRID de la fiche (consigne)
	var vAr0NRID = top.MyApp.GetItemValue("ItmNRID");
	
	// Si le statut n'est ni "VALIDER" ni "RENOUVELER", bloquer l'opération
	if (vStatut != 'VALIDER' && vStatut != 'RENOUVELER') {
	    // Affiche une alerte à l'utilisateur
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["L'affectation n'est pas autorisée"]]);
	    return false; // interrompt le script
	}
	console.log("matching profile index:"+vListProfilsValides.indexOf(vProf));
	
	// Si l'utilisateur appartient à un des profils autorisés
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	var arrParams = []
	 arrParams[0] = top.MyApp
	 arrParams[1] = top.bWizard
	 
	 top.MyApp.OpenDlg('42869685358766',arrParams , top, undefined, undefined, undefined, undefined, function (){
	  console.log(top.MyApp.AppSetting.dlgReturn);
	});
	/*
	    // Vérifie s'il est déjà affecté à cette consigne
	    var sQuery = "select 1 from sysadm.xar0_sourceur where ar0_nrid = '" + vAr0NRID + "' and sourceur = '" + top.MyApp.UserSetting.User.Name + "'";
	    var sQueryRes = top.MyApp.fctGetQryResult(sQuery, false, 0, 1);
	    
	    var fullcount = top.MyApp.GetItemAttributeFromXML(sQueryRes, "Result", "FullCount");
	
	    if (fullcount > 0) {
	        // L'utilisateur est déjà affecté : alerte et arrêt
	        top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous êtes déjà affecté à cette consigne"]]);
	        return false;
	    } else {
	        // Sinon : insère l'utilisateur comme sourceur sur cette consigne
	
	        // Formate la date du jour au format système
	        var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE, top.MyApp.SYSTEM_DATE);
	
	        // Construit la requête SQL d'insertion
	        var vsql = "INSERT INTO xar0_sourceur (ar0_nrid, sourceur, date)" +
	                   " VALUES ('" + vAr0NRID + "', '" + top.MyApp.UserSetting.User.Name + "','" + vDate + "')";
	
	        // Exécute le script serveur (identifiant 30231053360342) pour insérer le nouveau lien sourceur
	        var strResultat = top.MyApp.ExecuteServerScript('30231053360342', [vsql]);
	
	        // Rafraîchit l’écran pour refléter l’ajout
	        top.MyApp.fraMenuBar.Execute("T_Refresh");
	    }
	*/
	} else {
	    // Si le profil ne fait pas partie des autorisés
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	    return false;
	}
	
	return true; // Fin normale du traitement
}