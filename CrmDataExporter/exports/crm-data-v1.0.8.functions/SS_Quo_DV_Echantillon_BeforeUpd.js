function()
{
	//init CurrentRecord
	try {
	    var v = "";
	    if (CurrentRecord["ExtEchntlln1NoEchantillon"] == "") v = "";
	} catch (e) {
	    CurrentRecord["ExtEchntlln1NoEchantillon"] = "1000000000000";
	}
	
	try {
	    var vStatut = CurrentRecord["ExtEchntlln1StatusEchantillon"];
	    var vResp = CurrentRecord["ExtEchntlln1ResponsableEch"];
	    if (CurrentRecord.IsUpdated("ExtEchntlln1Detail") == true && vResp != '' && vStatut != 'Commande avant échantillon' && vStatut != 'Envoyé' && vStatut != 'Sans échantillon') {
	        throw "You can not change a validated request";
	    }
	} catch (e) {
	    throw "You can not change a validated request";
	}
	
	try {
	    var vStatut = CurrentRecord["ExtEchntlln1StatusEchantillon"];
	    if (CurrentRecord.IsUpdated("ExtEchntlln1NoTracking") == true && vStatut != 'Commande avant échantillon' && vStatut != 'Envoyé' && vStatut != 'Sans échantillon') {
	        throw "You can not change a stored Tracking Number";
	    }
	} catch (e) {
	    throw "You can not change a stored Tracking Number";
	}
	// HAS DEB - récupération du profil de utilisateur en cours
	var oQryObju = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQLu = "select set_us_profile_init as usr from sysadm.set_us1  where template is null and nom = :strUserNom";
	var oResu = oQryObju.ExecuteSql(vSQLu);
	var oXmlDocu = InitXml(oResu);
	var oRowsu = FindItem("Flds", oXmlDocu, true);
	var profil = GetItemValue("usr", oRowsu[0]);
	// HAS DEB - récupération du status echantillon en cours
	var QryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQl = "select top 1 STATUS_ECHANTILLON as vStatEch from x_echantillon  where  template is null and dc0_nrid = :QuoNRID order by dmod desc ";
	var oRes = QryObj.ExecuteSql(vSQl);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	var vStatut = GetItemValue("vStatEch", oRows[0]);
	//HAS DEB - Vérification statut de l'offre
	var oQryObjs = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQLs = "select  XSTATOFF as status from dc0  where  template is null and nrid = :QuoNRID ";
	var oRess = oQryObjs.ExecuteSql(vSQLs);
	var oXmlDocs = InitXml(oRess);
	var oRowss = FindItem("Flds", oXmlDocs, true);
	var vStatus = GetItemValue("status", oRowss[0]);
	if (CurrentRecord.IsUpdated("ExtEchntlln1StatusEchantillon") == true){
	    if (profil != 'QUA' && profil != 'ADMT') {
	        if (vStatus != '2. Négocié' && vStatus != '5. Commandée') {
	            throw "Buyer Profile can only edit valid offers";
	        }
	        if (vStatut != 'Commande avant échantillon' && vStatut != 'Envoyé' && vStatut != 'Sans échantillon') {
	            throw "Buyer Profile can only edit open request ";
	        }
	    } else if (profil == 'QUA') {
	        if (vStatus != '2. Négocié' && vStatus != '5. Commandée' && vStatus != '3. Perdue') {
	            throw "Quality Profile can only edit valid offers";
	        }
	        if (vStatut != 'Commande avant échantillon' && vStatut != 'Envoyé'  && vStatut != 'Réceptionné' && vStatut != 'Sans échantillon') {
	            throw "Quality Profile can only edit open request ";
	        }
	    }
	}
	delete oQryObjs;
	delete QryObj;
	if (CurrentRecord["ExtEchntlln1NoEchantillon"] == "" || CurrentRecord["ExtEchntlln1NoEchantillon"] == null || CurrentRecord["ExtEchntlln1NoEchantillon"] == "1000000000000") {
	    var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vSQL = "select max(isnull(no_echantillon,0))+1 as mngach   from x_echantillon  where dc0_nrid = :QuoNRID ";
	    var oRes = oQryObj.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	    if (GetItemValue("mngach", oRows[0]) == "" || GetItemValue("mngach", oRows[0]) == null) CurrentRecord["ExtEchntlln1NoEchantillon"] = 1
	    else CurrentRecord["ExtEchntlln1NoEchantillon"] = GetItemValue("mngach", oRows[0]);
	    delete oQryObj;
	}
	
	// PARTIE II
	try {
	    var v2 = "";
	    if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == "") CurrentRecord["ExtEchntlln1StatusEchantillon"] = "";
	} catch (e) {
	    CurrentRecord["ExtEchntlln1StatusEchantillon"] = "";
	}
	
	var vStatEcht = CurrentRecord["ExtEchntlln1StatusEchantillon"];
	if (CurrentRecord.IsUpdated("ExtEchntlln1EchtPerdu") == true) {
	    if (profil == 'QUA' || profil == 'ADMT') {
	        if (vStatEcht != 'Validé' && vStatEcht != 'Validé sous condition' && vStatEcht != 'Confirmé sans échantillon' && vStatEcht != 'Non valider') {
	            CurrentRecord["ExtEchntlln1DatePerdu"] = DateTime.Now.ToString("dd/MM/yyyy");
	        } else {
	            throw "Lost sample qualification only for non validated samples";
	            return false;
	        }
	    } else {
	        throw "Votre Profil est different de QUA et ADMT";
	        return false;
	    }
	}
	
	if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Envoyé' || CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Commande avant échantillon') {
	    if (CurrentRecord["ExtEchntlln1NoTracking"] == "" || CurrentRecord["ExtEchntlln1NoTracking"] == null) {
	        throw 'Champ obligatoire manquant numéro de tracking';
	        return false;
	    }
	    if (CurrentRecord["ExtEchntlln1DateEnvoi"] == "" || CurrentRecord["ExtEchntlln1DateEnvoi"] == null) {
	        CurrentRecord["ExtEchntlln1DateEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy");
	    }
	} else if (CurrentRecord["ExtEchntlln1DateEnvoi"] == "" || CurrentRecord["ExtEchntlln1DateEnvoi"] == null && CurrentRecord["ExtEchntlln1StatusEchantillon"] == "Demande d'envoi") {
	    CurrentRecord["ExtEchntlln1DateDemEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy");
	} else if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Réceptionné') {
	    CurrentRecord["ExtEchntlln1Receptionneur"] = CurrentUserName;
	    if (CurrentRecord["ExtEchntlln1DateReception"] == "" || CurrentRecord["ExtEchntlln1DateReception"] == null) {
	        CurrentRecord["ExtEchntlln1DateReception"] = DateTime.Now.ToString("dd/MM/yyyy");
	    }
	}
	// SIR: Ajout des contrôles des statuts (Réceptionné et Déposé)
	try {
	    if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Envoyé' || CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Commande avant échantillon') {
	        if (CurrentRecord["ExtEchntlln1NoTracking"] == "" || CurrentRecord["ExtEchntlln1NoTracking"] == null) {
	            throw 'Champ obligatoire manquant numéro de tracking';
	            return false;
	        }
	        if (CurrentRecord["ExtEchntlln1DateEnvoi"] == "" || CurrentRecord["ExtEchntlln1DateEnvoi"] == null) {
	            CurrentRecord["ExtEchntlln1DateEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy");
	        }
	    } else if (CurrentRecord["ExtEchntlln1DateEnvoi"] == "" || CurrentRecord["ExtEchntlln1DateEnvoi"] == null && CurrentRecord["ExtEchntlln1StatusEchantillon"] == "Demande d'envoi") {
	        CurrentRecord["ExtEchntlln1DateDemEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy");
	    } else if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Réceptionné' && (profil == 'QUA' || profil == 'ADMT')) {
	        if (CurrentRecord.IsUpdated("ExtEchntlln1StatusEchantillon")) {
	            CurrentRecord["ExtEchntlln1DateReception"] = DateTime.Now.ToString("dd/MM/yyyy");
	        }
	    } else if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Déposé' && (profil == 'QUA' || profil == 'ADMT')) {
	        if (CurrentRecord.IsUpdated("ExtEchntlln1StatusEchantillon")) {
	            CurrentRecord["ExtEchntlln1DateDepot"] = DateTime.Now.ToString("dd/MM/yyyy");
	        }
	    } else if ((CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Réceptionné' || CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Déposé') && (profil != 'QUA' && profil != 'ADMT')) {
	        throw "You're not allowed to select this status";
	        return false;
	    }
	
	} catch (e) {
	    throw e + " !!";
	    delete oQryObju;
	}
}