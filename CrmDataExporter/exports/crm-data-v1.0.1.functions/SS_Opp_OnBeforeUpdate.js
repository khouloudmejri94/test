function SS_Opp_OnBeforeUpdate()
{
	// Opp - Renseignement de la date de modification en complet et depose et du modificateur complet et depose
	// SIR ASSISTANT DOES PROSPECTION
	var Statutdoss = CurrentRecord["OppStatus"];
	var prospecteur = CurrentRecord["OppExtProspecteur"];
	var assistante = CurrentRecord["OppExtAssCom"];
	var stracht = CurrentRecord["OppExtAcheteur"];
	var supplyer1 = CurrentRecord["OppCpyNrid"];
	//DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	if (CurrentRecord.IsUpdated("OppStatus") && Statutdoss.substr(0, 2) == '04') {
	 //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	 CurrentRecord["OppExtModificateurComplet"] = CurrentUserName;
	 CurrentRecord["OppExtDatePassComplet"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["OppExtAffectea"] = stracht;
	} else if (CurrentRecord.IsUpdated("OppExtAcheteur") && stracht != '' && stracht != null && stracht != undefined) {
	 CurrentRecord["OppExtDateAffect"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	 if (assistante != null && assistante != undefined && assistante != '' && (prospecteur == null || prospecteur == undefined || prospecteur == '')) {
	  CurrentRecord["OppExtAffectea"] = stracht;
	  var vSQL = "select  Acht from sysadm.xso4 xso4 where xso4.Acht = '" + stracht + "' and xso4.so0_nrid = '" + supplyer1 + "'";
	  var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var MyResult = MyQryObj.ExecuteSql(vSQL);
	  var MyXmlDocument = InitXml(MyResult);
	  var MyRows = FindItem("Flds", MyXmlDocument, true);
	  if (MyRows.Count == 0) {
	   MyQryObj.ExecuteSql("insert into sysadm.xso4 (Acht, so0_nrid) values ('" + stracht + "', '" + supplyer1 + "')");
	   FreeSelligentObject(MyQryObj);
	   MyQryObj.Dispose();
	  }
	 }
	}
	//DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	if (CurrentRecord.IsUpdated("OppStatus") && Statutdoss.substr(0, 2) == '05') {
	 //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	 CurrentRecord["OppExtModificateurDepose"] = CurrentUserName;
	 CurrentRecord["OppExtDatePassDepose"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS DEB : achat 2020 : Ajouter la date de passage en demande avis
	if (CurrentRecord.IsUpdated("OppStatus") && Statutdoss.substr(0, 4) == '01.A') {
	 CurrentRecord["OppExtDatePassDemAvis"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS DEB : achat 2020 : Ajouter la date de passage en Prenegociation
	if (CurrentRecord.IsUpdated("OppStatus") && Statutdoss.substr(0, 4) == '01.B') {
	 CurrentRecord["OppExtDatePassPrenego"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS DEB : achat 2020 : Ajouter la date de passage Valid CRV
	if (CurrentRecord.IsUpdated("OppStatus") && Statutdoss.substr(0, 4) == '01.C') {
	 CurrentRecord["OppExtDatePassValidCRV"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS : Mettre à jour la date de validation ----------------------
	var valid = CurrentRecord["OppExtValidEcht"];
	if (CurrentRecord.IsUpdated("OppExtValidEcht") && valid == 'Validé' || valid == 'Validé sous condition' || valid == 'Non validé') {
	 CurrentRecord["OppExtDateValidEchant"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END EDIT ------------------------------------------
	// HAS : Insérer la date de valorisation
	var etat = CurrentRecord["Oppstatus"];
	var VdateDemValo = CurrentRecord["OppExtDatedemvalorisation"]
	if (CurrentRecord.IsUpdated("OppStatus") && Statutdoss.substr(0, 2) == '07') {
	 //  CurrentRecord["OppExtDatedemvalorisation"] = DateTime.Now.ToString("dd/MM/yyyy");
	 if (VdateDemValo != '' && VdateDemValo != null) {
	  CurrentRecord["OppExtDateLastDemValoris"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	 } else {
	  CurrentRecord["OppExtDatedemvalorisation"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	  CurrentRecord["OppExtHeureDemVal"] = DateTime.Now.ToString("HH:mm:ss");
	 }
	}
	// HAS END EDIT
	// HAS : Insérer la date de publicationvar etat = CurrentRecord["Oppstatus"];
	var vEtape = CurrentRecord["OppExtEtape"];
	if (CurrentRecord.IsUpdated("OppExtEtape") && vEtape == '2. Envoyé') {
	 CurrentRecord["OppExtDatePublication"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END EDIT
	// DEB HAS : 13/03/2019 insertion automatique de la date de demande échantillon
	var vTracking = CurrentRecord["OppExtNumTrack"];
	if (CurrentRecord.IsUpdated("OppExtNumTrack") && vTracking != '' && vTracking != null && vTracking != undefined) {
	 CurrentRecord["OppExtDteEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// DEB HAS : 13/03/2019 insertion automatique de la date de demande échantillon
	
	
	// DEB HAS : 29/10/2024 insertion automatique de la date de depot échantillon
	if (CurrentRecord.IsUpdated("OppExtValidEcht") && valid == 'Déposé') {
	 CurrentRecord["OppValidityDate"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// DEB HAS : 29/10/2024 insertion automatique de la date de depot échantillon
	
	
	
	// HAS : tronquer 950 cafractère de la problématique du lot
	var vProblot = CurrentRecord["OppExtProbLot"];
	if (vProblot != null && vProblot != undefined && vProblot != '') {
	 CurrentRecord["OppExtProbLot"] = vProblot.substr(0, 950);
	}
	// HAS DEB - 29/04/2020 - ajouter la date de demande de mise en stand by reprise activité
	var vDemSBrep = CurrentRecord["OppExtSBReprise"];
	if (CurrentRecord.IsUpdated("OppExtSBReprise") && vDemSBrep == '1') {
	 CurrentRecord["OppExtDateSBReprise"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	 CurrentRecord["OppExtUserDemSBReprise"] = CurrentUserName;
	}
	// HAS END - 29/04/2020 - ajouter la date de demande de mise en stand by reprise activité
	// HAS DEB - 29/04/2020 - ajouter la date de résponse SB reprise activité
	var vRepSBrep = CurrentRecord["OppExtRepSbReprise"];
	if (CurrentRecord.IsUpdated("OppExtRepSbReprise") && vRepSBrep != '' && vRepSBrep != null && vRepSBrep != undefined) {
	 CurrentRecord["OppExtDateRepSbReprise"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	 CurrentRecord["OppExtUserRepSBReprise"] = CurrentUserName;
	}
	// HAS END - 29/04/2020 - ajouter la date de résponse SB reprise activité
	// HAS DEB - 05/07/2020 - ajouter les données de réponse BUM sur SB Reprise
	var vValMngSBrep = CurrentRecord["OppExtValMngSBReprise"];
	if (CurrentRecord.IsUpdated("OppExtValMngSBReprise") && vValMngSBrep == '1') {
	 CurrentRecord["OppExtDateValMngSBReprise"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	 CurrentRecord["OppExtUserValMngSBReprise"] = CurrentUserName;
	}
	// HAS END - 05/07/2020 - ajouter les données de réponse BUM sur SB Reprise
		if (CurrentRecord.IsUpdated("OppExtCodePaysDepart") || CurrentRecord.IsUpdated("OppExtDedeoune")) {
	    try {
	        var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var vCodPaysDep = CurrentRecord["OppExtCodePaysDepart"];
	        var vIsDedouane = CurrentRecord["OppExtDedeoune"];
	
	        var vSQL = "select top 1 clearance as IsClear from sysadm.x_Zone where Code =  '" + vCodPaysDep + "' ";
	        var MyResult = oQryObj.ExecuteSql(vSQL);
	        var MyXmlDocument = InitXml(MyResult);
	        var MyRows = FindItem("Flds", MyXmlDocument, true);
	        if (MyRows.Count == 1) {
	            var vClear = GetItemValue("IsClear", MyRows[0]);
	            if (vClear == "1" && vIsDedouane == "OUI") {
	                CurrentRecord["OppExtPaysFacturation"] = "FR - Europe";
	            } else {
	                CurrentRecord["OppExtPaysFacturation"] = "ZZ - Rest Of The World";
	            }
	        }
	    } catch (e) {
	        throw "HAS - Error Update Invoice Country on SS_Opp_OnBeforeUpdate : " + e;
	    } finally {
	        oQryObj.Dispose();
	        FreeSelligentObject(oQryObj);
	    }
	}
		//DEB HAS  01/05/2021 : envoi MAJ lot atypique
	Session["HUB_UPDATE_LOT"] = false;
	try {
	 if (CurrentRecord["OppExtAtypique"] == "1" && CurrentRecord["OppExtEtape"] != "" && CurrentRecord["OppExtEtape"] != null && CurrentRecord["OppExtEtape"] != "1. Demande envoi") {
	  if (CurrentRecord.IsUpdated("OppExtQuantiteTotale") == true || CurrentRecord.IsUpdated("OppExtCodePaysDepart") == true || CurrentRecord.IsUpdated("OppExtPortDepart") == true || CurrentRecord.IsUpdated("OppExtFamille") == true) {
	   Session["HUB_UPDATE_LOT"] = true;
	  }
	 }
	} catch (e) {
	 Selligent.Library.Monitor.Tracer.Write("ERREUR UPDATE LOT VERS HUB" + e, false);
	}
	//DEB HAS  01/05/2021 : envoi MAJ lot atypique
		
	//HAS DEB 11/05/2021 : définir le variable "OPP_CREATE_OPP" pour déclencher la création de l'affaire dans SAP
	try {
	 Session["OPP_CREATE_OPP"] = false;
	 if (CurrentRecord.IsUpdated("OppStatus") == true && CurrentRecord["OppStatus"].substring(0, 2) == "06" && CurrentRecord["OppExtAtypique"] == '1') {
	  Session["OPP_CREATE_OPP"] = true; //SS_Opp_Create_Affaire_SAP(strOppRef);
	 }
	} catch (e) {
	 throw (" Add New Affaire ATYPIC SS_Opp_Create_Affaire_SAP: " + e);
	}
	//HAS END  11/05/2021 : définir le variable "OPP_CREATE_OPP" pour déclencher la création de l'affaire dans SAP
	
	
	
	// HAS END 14/05/2021 : mise à jour etape sur niveau le plus optimiste
	if (CurrentRecord.IsUpdated("OppExtClient1Dec") == true || CurrentRecord.IsUpdated("OppExtClient2Dec") == true) {
	 var DecMag = CurrentRecord["OppExtClient1Dec"];
	 var DecFi = CurrentRecord["OppExtClient2Dec"];
	 var vDec = "";
	 var vDecF = "";
	 if (DecMag == 'Intéressé' || DecFi == 'Intéressé') {
	  vDecF = "Intéressé";
	 } else if (DecMag == 'Non intéressé' || DecFi == 'Non intéressé') {
	  if (DecMag == 'Non intéressé') {
	   vDec = DecFi;
	  } else if (DecFi == 'Non intéressé') {
	   vDec = DecMag;
	  }
	  if (vDec != '' && vDec != null && vDec != undefined) {
	   vDecF = vDec;
	  }
	 } else if (DecMag == 'Non intéressé' && DecFi == 'Non intéressé') {
	  vDecF = "Non intéressé";
	 } else if (DecMag == 'Attente de décision' || DecFi == 'Attente de décision') {
	  if (DecFi == 'Attente de décision' && (DecMag == '' || DecMag == null)) {
	   vDec = DecFi;
	  } else if (DecMag == 'Non intéressé' && (DecFi == '' || DecFi == null)) {
	   vDec = DecMag;
	  }
	  if (vDec != '' && vDec != null && vDec != undefined) {
	   vDecF = vDec;
	  }
	 }
	 if (vDecF != '' && vDecF != null && vDecF != undefined) {
	  var vStatut = "";
	  switch (vDecF) {
	   case 'Intéressé':
	    vStatut = '4. Intéressé';
	    break;
	   case 'Non intéressé': //Lot Refusé
	    vStatut = '5. Non intéressé';
	    break;
	   case 'Attente de décision': //Lot Selectionné
	    vStatut = '3. En attente de décision';
	    break;
	   default:
	    '';
	  }
	  CurrentRecord["OppExtEtape"] = vStatut;
	 }
	}
	// HAS END 14/05/2021 : mise à jour etape sur niveau le plus optimiste
		//HAS DEB 25/05/2021 : définir le variable "OPP_ENVOIPJ_HUB" pour déclencher envoi de piece jointe vers le HUB
	try {
	 Session["OPP_ENVOIPJ_HUB"] = false;
	 if (CurrentRecord.IsUpdated("OppExtEtape") == true && CurrentRecord["OppExtEtape"].substring(0, 1) == "2" && CurrentRecord["OppExtLoadPj"] == '1') {
	  Session["OPP_ENVOIPJ_HUB"] = true;
	 }
	} catch (e) {
	 throw (" Add New Affaire ATYPIC SS_Opp_Create_Affaire_SAP: " + e);
	}
	//HAS END  25/05/2021 : définir le variable "OPP_ENVOIPJ_HUB" pour déclencher envoi de piece jointe vers le HUB
		//Ajout Echantillon
	Session["ADD_SAMPLE"] = false;
	try {
	 if (CurrentRecord["OppExtNumTrack"] != "" && CurrentRecord["OppExtNumTrack"] != null &&  CurrentRecord["OppExtNumTrack"] != undefined ) {
	  if (CurrentRecord.IsUpdated("OppExtNumTrack") == true ) {
	   Session["ADD_SAMPLE"] = true;
	  }
	 }
	} catch (e) {
	 Selligent.Library.Monitor.Tracer.Write("ERREUR ENVOI ECHANT" + e, false);
	}
	//FIN Ajout Echantillon
		return true;
}