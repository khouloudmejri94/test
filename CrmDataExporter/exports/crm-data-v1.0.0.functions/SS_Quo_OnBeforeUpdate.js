function SS_Quo_OnBeforeUpdate(QuoNRID)
{
	//DEBUT FTC@MASAO - MANTIS 14405 - 10/01/2018   
	if (CurrentRecord.IsUpdated("QuoExtRapTest") == true && (CurrentRecord["QuoExtRapTest"] == "Non Obligatoire" || CurrentRecord["QuoExtRapTest"] == "Obligatoire")) {
	    //CurrentRecord["QuoExtDebutNorms"] = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["QuoExtDateDebVal"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	//END FTC@MASAO - MANTIS 14405 - 10/01/2018
	// Debut HAS : si dérogation = 'OUI' alors Insertion date dérogation 
	if (CurrentRecord.IsUpdated("QuoExtDerogation") == true && CurrentRecord["QuoExtDerogation"] == "OUI") {
	    CurrentRecord["QuoExtDateDerog"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// End HAS : insertion date derogation
	
	
	
	// Debut HAS : Insertion date conformite
	var vValidConf = CurrentRecord["QuoExtValidationNormes"];
	if (CurrentRecord.IsUpdated("QuoExtValidationNormes") == true && vValidConf != null && vValidConf != "") {
	    CurrentRecord["QuoExtDateConformite"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// End HAS : date conformité 
	
	
	// HAS : Insérer l'utilisateur valideur
	/*
	var RapTest = CurrentRecord["QuoExtStatutRT"];
	 
	if (CurrentRecord.IsUpdated("QuoExtStatutRT") == true  && RapTest != null && RapTest != "")
	  {
	   CurrentRecord["QuoExtPriseEnChargeNorms"] = CurrentUserName;
	  }
	*/
	// HAS : Prise en chare Packaging
	var StatPack = CurrentRecord["QuoExtStatutPack"];
	
	
	if (CurrentRecord.IsUpdated("QuoExtStatutPack") == true && StatPack != null && StatPack != "") {
	    CurrentRecord["QuoExtPriseEnChargePack"] = CurrentUserName;
	}
	
	
	//SIR: xRapTest Not Mandatoy when ..
	/*
	var vListFamille = "Animalerie;Chaussants et chaussettes;Chaussures;Collants;Confection enfants;Confection femmes;Lingerie;Lot mixé confection (USA);Maroquinerie";
	var vFamille = CurrentRecord["QuoExtfamille"];
	
	
	
	if(vListFamille.indexOf(vFamille) != -1 && vFamille != null)  
	{
	   CurrentRecord["QuoExtRapTest"]="Non Obligatoire";
	}
	*/
	/*
	// HAS : RT -> Not mandatory si famille de produit appartient à la liste
	if( vFamille == "Animalerie"  || vFamille == "Chaussants et chaussettes" || vFamille == "Chaussures" || vFamille == "Collants" || vFamille == "Confection enfants" || vFamille == "Confection femmes" || vFamille == "Confection Hommes" || vFamille == "Lingerie" || vFamille == "Lot mixé confection (USA)" || vFamille == "Maroquinerie"  ) 
	{
	   CurrentRecord["QuoExtRapTest"]="Non Obligatoire";
	}
	
	
	
	*/
	// HAS : Prise en charge Norms
	var StatNorms = CurrentRecord["QuoExtValidationNormes"];
	
	
	if (CurrentRecord.IsUpdated("QuoExtValidationNormes") == true && StatNorms != null && StatNorms != "") {
	    CurrentRecord["QuoExtPriseEnCharge"] = CurrentUserName;
	}
	
	
	// HAS END EDIT
	
	
	//HAS : si RT obligatoire alors status non reçu + Prise en charge norms
	
	
	var Vstatut = CurrentRecord["QuoExtstatoff"];
	var RapTest = CurrentRecord["QuoExtRapTest"];
	
	
	if (CurrentRecord.IsUpdated("QuoExtRapTest") == true) {
	    CurrentRecord["QuoExtPriseEnChargeNorms"] = CurrentUserName;
	    if (RapTest == 'Obligatoire' && Vstatut != '5. Commandée' && Vstatut != '6. Annulée') {
	        CurrentRecord["QuoExtStatutRT"] = 'Non reçu';
	        // HAS Debut : 04122018 : ajouter le statut packaging par defaut pour ces familles
	        CurrentRecord["QuoExtStatutPack"] = "Non reçu";
	    }
	    // HAS DEB 28/10/2019 : si RT non Obligatoire alors Validatio normes = Sans Normes
	    if (RapTest == 'Non Obligatoire') {
	        CurrentRecord["QuoExtValidationNormes"] = 'Sans Normes';
	    }
	}
	 
	// HAS DEB 10/10/2019 : si Statut RT "En test laboratoire" alors "Sample Recevied" à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutRT") == true && CurrentRecord["QuoExtStatutRT"] == 'En test laboratoire') {
	    CurrentRecord["QuoExtLabDateRec"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut RT "En test laboratoire" alors "Sample Recevied" à la date du jour
	 
	
	
	 // HAS DEB 10/10/2019 : si Statut RT "Non conforme" alors remplir si les dates vides
	if (CurrentRecord.IsUpdated("QuoExtStatutRT") == true && CurrentRecord["QuoExtStatutRT"] == 'Non conforme') {
	    if (CurrentRecord["QuoExtDateRecNS"] == '' || CurrentRecord["QuoExtDateRecNS"] == null ) {
	        CurrentRecord["QuoExtDateRecNS"] = DateTime.Now.ToString("dd/MM/yyyy");
	    }
	    if (CurrentRecord["QuoExtDebutNorms"] == '' || CurrentRecord["QuoExtDebutNorms"] == null ) {
	        CurrentRecord["QuoExtDebutNorms"] = DateTime.Now.ToString("dd/MM/yyyy");
	    }
	}
	// HAS END 10/10/2019 : si Statut RT "Non conforme" alors remplir si les dates vides
	
	
	// HAS DEB 10/10/2019 : si Statut RT "Envoyé pour validation" alors "Sending to MKT" à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutRT") == true && CurrentRecord["QuoExtStatutRT"] == 'Envoyé pour validation') {
	    CurrentRecord["QuoExtDateEnvoiMKT"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut RT "Envoyé pour validation" alors "Sending to MKT" à la date du jour
	
	
	// HAS DEB 10/10/2019 : si Statut RT "A réviser" alors remplir à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutRT") == true && CurrentRecord["QuoExtStatutRT"] == 'A réviser') {
	    CurrentRecord["QuoExtDateRecNS"] = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["QuoExtDebutNorms"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut RT "A réviser" alors "Sending to MKT" à la date du jour
	
	
	// HAS DEB 10/10/2019 : si Statut RT "En test laboratoire" alors "Sample Recevied" à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutRT") == true && CurrentRecord["QuoExtStatutRT"] == 'Validé') {
	    CurrentRecord["QuoExtDateValidMKT"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut RT "En test laboratoire" alors "Sample Recevied" à la date du jour
	
	
	// HAS DEB 10/10/2019 : si Statut PACK "Envoyé pour validation" alors à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutPack") == true && CurrentRecord["QuoExtStatutPack"] == 'Envoyé pour validation') {
	    CurrentRecord["QuoExtDateEnMKT"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut PACK "Envoyé pour validation" alors à la date du jour
	
	
	
	// HAS DEB 10/10/2019 : si Statut PACK "En attente" alors à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutPack") == true && CurrentRecord["QuoExtStatutPack"] == 'En attente') {
	    CurrentRecord["QuoExtDateRecPack"] = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["QuoExtDateDebPack"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut PACK "En attente" alors à la date du jour
	
	
	
	// HAS DEB 10/10/2019 : si Statut PACK "En stand by" alors à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutPack") == true && CurrentRecord["QuoExtStatutPack"] == 'En stand by') {
	    CurrentRecord["QuoExtDateDebPack"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut PACK "En stand by" alors à la date du jour
	
	
	// HAS DEB 10/10/2019 : si Statut PACK "Non Validé" alors à la date du jour
	if (CurrentRecord.IsUpdated("QuoExtStatutPack") == true && (CurrentRecord["QuoExtStatutPack"] == 'Validé' || CurrentRecord["QuoExtStatutPack"] == 'Non Validé') ) {
	    CurrentRecord["QuoExtDateValidMKTNormes"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS END 10/10/2019 : si Statut PACK "Non Validé" alors à la date du jour
	
	
	
	if (CurrentRecord.IsUpdated("QuoExtLabDateEstime") == true  &&  CurrentRecord.IsUpdated("QuoExtLabDateRec") == true &&  CurrentRecord["QuoExtLabDateEstime"] != null && CurrentRecord["QuoExtLabDateRec"] != null )
	{
	   var dateEstime = new Date(CurrentRecord["QuoExtLabDateEstime"]);
	    var dateRec = new Date(CurrentRecord["QuoExtLabDateRec"]);
	
	    var diffMs = dateEstime - dateRec;
	    var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	
	    CurrentRecord["QuoExtTrtPar"] = diffDays;
	}
	
		// HAS : si Demande de passage commande alors récupérer l'heure
	if (CurrentRecord.IsUpdated("QuoExtDateDemande") == true) {
	    //CurrentRecord["QuoExtHeureDemande"] = DateTime.Now.ToString("HH:mm:ss");
	}
	// HAS: fin demande
	
	
	
	// HAS DEB 14/11/2019: vérification et mise à jour des dates systeme
	var vHeurePremDem = CurrentRecord["QuoExtHeureDemande"];
	var vDatePremDem = CurrentRecord["QuoExtDateDemande"];
	var vHeureDerDem = CurrentRecord["QuoExtHeureDemPassDer"];
	var vDateDerDem = CurrentRecord["QuoExtDateDemPassDer"];
	var vDateSB = CurrentRecord["QuoExtCmdSBdate"];
	if (CurrentRecord.IsUpdated("QuoExtDateDemande") == true || CurrentRecord.IsUpdated("QuoExtDateDemPassDer") == true) {
	    if (vDateSB == '' || vDateSB == null || vDateSB == undefined) {
	        CurrentRecord["QuoExtHeureDemande"] = DateTime.Now.ToString("HH:mm:ss");
	        CurrentRecord["QuoExtDateDemande"] = DateTime.Now.ToString("dd/MM/yyyy");
	    } else {
	        CurrentRecord["QuoExtHeureDemPassDer"] = DateTime.Now.ToString("HH:mm:ss");
	        CurrentRecord["QuoExtDateDemPassDer"] = DateTime.Now.ToString("dd/MM/yyyy");
	    }
	}
	
	// HAS FIN 14/11/2019: vérification et mise à jour des dates systeme
	
	// TEST code Before Insert
	
	// HAS : Initialiser le Manager Achat à partir du nom de l'acheteur
	
	/*var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	if (CurrentRecord["QuoExtAcht"] != "" && CurrentRecord["QuoExtAcht"] != null) {
	
	
	  var vSQL2 = "select titulaire as mngach   from sysadm.am0 res_mng where Template is null and (res_mng.fonction like '%Manager%' or res_mng.fonction like '%Team Leader%')  and res_mng.bactive = 1  and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire ='" + CurrentRecord["QuoExtAcht"] + "' and Template is null) ";
	  var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	  var oXmlDoc2 = InitXml(oRes2);
	  var oRows2 = FindItem("Flds", oXmlDoc2, true);
	 // if (GetItemValue("mngach", oRows2[0]) != "" && GetItemValue("mngach", oRows2[0]) != null && GetItemValue("mngach", oRows2[0]) != undefined)
	if(oRows2.Count != 0) 
	{
	    CurrentRecord["QuoExtManager"] = GetItemValue("mngach", oRows2[0]);
	  } else return true;
	  delete oQryObj2;
	}*/
	
	// HAS: Initialiser l'équipe du de l'acheteur 
	
	var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL = "select team_name as TeamAcht from sysadm.am0 where titulaire ='" + CurrentRecord["QuoExtAcht"] + "' and Template is null   ";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	if (GetItemValue("TeamAcht", oRows[0]) != "" && GetItemValue("TeamAcht", oRows[0]) != null && GetItemValue("TeamAcht", oRows[0]) != undefined) {
	    CurrentRecord["QuoExtTeam"] = GetItemValue("TeamAcht", oRows[0]);
	}
	/////delete oQryObj;
	// HAS: Initialiser le salon 
	/////var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL = "select xsalon as salon  from sysadm.do0 where ref= '" + CurrentRecord["QuoOppReference"] + "' and Template is null  ";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows2 = FindItem("Flds", oXmlDoc, true);
	if (GetItemValue("salon", oRows2[0]) != "" && GetItemValue("salon", oRows2[0]) != null && GetItemValue("salon", oRows2[0]) != undefined) {
	    CurrentRecord["QuoExtSalon"] = GetItemValue("salon", oRows2[0]);
	}
	/////delete oQryObj;
	// HAS: Initialiser la famille de produit 
	/////var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = "select xfamille as famille  from sysadm.do0 where ref= '" + CurrentRecord["QuoOppReference"] + "' and Template is null  ";
	var oRes1 = oQryObj.ExecuteSql(vSQL1);
	var oXmlDoc1 = InitXml(oRes1);
	var oRows1 = FindItem("Flds", oXmlDoc1, true);
	if (GetItemValue("famille", oRows2[0]) != "" && GetItemValue("famille", oRows2[0]) != null && GetItemValue("famille", oRows2[0]) != undefined) {
	    CurrentRecord["QuoExtfamille"] = GetItemValue("famille", oRows1[0]);
	}
	/////delete oQryObj;
	// SIR && HIC @ozeol 25/05/2018
	if (CurrentRecord["QuoExtStatutWH"] == "Demande Réception" && CurrentRecord.IsUpdated("QuoExtStatutWH")) {
	    CurrentRecord["QuoExtDateDemRecWH"] = DateTime.Now.ToString("dd/MM/yyyy");
	    // HAS DEB 17/01/2020: demandeur WH
	    CurrentRecord["QuoExtUserDemWH"] = CurrentUserName;
	}
	//  HAS DEB : 03/07/2019 - Insertion auto de la date validation de Contrat Arrangement
	if (CurrentRecord.IsUpdated("QuoExtStatutCA") && CurrentRecord["QuoExtStatutCA"] == "Accepté") {
	    CurrentRecord["QuoExtDateValidCA"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	//  HAS END : 03/07/2019 - Insertion auto de la date validation de Contrat Arrangement
	/*
	var Vdatesaisie= CurrentRecord["QuoExtDebutNorms"];
	var Vsaisie = Vdatesaisie.ToString("yyyy/mm/dd");
	 if (CurrentRecord.IsUpdated("QuoExtDebutNorms") == true && CurrentRecord["QuoExtDebutNorms"] != "" && CurrentRecord["QuoExtDebutNorms"] != null && CurrentRecord["QuoExtDebutNorms"] != undefined) {
	
	           //var vDate = DateTime.Now.ToString("yyyy/mm/dd");
	     var vDate = new date();
	     throw "la date est"+vDate;
	     
	      if (vDate != Vsaisie){
	      throw "la date du jour est   "+vDate + "est différente de la date saisie est  "+Vsaisie;
	      
	     } 
	 }
	*/
	
	// HAS DEB : concaténer les commentaires de demande desposit
	/////var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var nDc0NRID = CurrentRecord["QuoNRID"];
	var vSQL = "select dc0.XDETAILSDEM as detaildem from dc0 dc0 where dc0.nrid = '" + nDc0NRID + "'";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	if (CurrentRecord.IsUpdated("QuoExtDetailsDem") && oRows.Count != 0) {
	    CurrentRecord["QuoExtUserDemDep"] = CurrentUserName;
	    if (GetItemValue("detaildem", oRows[0]) != '' && GetItemValue("detaildem", oRows[0]) != null && GetItemValue("detaildem", oRows[0]) != undefined) {
	        CurrentRecord["QuoExtDetailsDem"] = GetItemValue("detaildem", oRows[0]) + '\r' + DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + CurrentRecord["QuoExtDetailsDem"];
	    } else {
	        CurrentRecord["QuoExtDetailsDem"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + CurrentRecord["QuoExtDetailsDem"];
	    }
	}
	//////delete oQryObj;
	// HAS FIN : concaténer les commentaires de demande desposit
	
	// HAS DEB : concaténer les commentaires de demande de passage commande
	/////var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var nDc0NRID = CurrentRecord["QuoNRID"];
	var vSQL = "select dc0.xDetailDemande as detaildem from dc0 dc0 where dc0.nrid = '" + nDc0NRID + "'";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	if (CurrentRecord.IsUpdated("QuoExtDetailDemande") && oRows.Count != 0) {
	    if (GetItemValue("detaildem", oRows[0]) != '' && GetItemValue("detaildem", oRows[0]) != null && GetItemValue("detaildem", oRows[0]) != undefined) {
	        CurrentRecord["QuoExtDetailDemande"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + CurrentRecord["QuoExtDetailDemande"] + '\r' + GetItemValue("detaildem", oRows[0]);
	    } else {
	        CurrentRecord["QuoExtDetailDemande"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + CurrentRecord["QuoExtDetailDemande"];
	    }
	}
	///////delete oQryObj;
	// HAS FIN : concaténer les commentaires de demande de passage commande
	
	//CurrentRecord["QuoExtResuNego"] += '\r' + CurrentRecord["QuoExtstatoff"] ;
	/*
	var vOldResponse =  CurrentRecord["QuoExtRepPaiement"];
	//throw"la dernière chaine est" +vOldResponse;
	  var ArrResponse = [];
	  if (vOldResponse != '' && vOldResponse != null && vOldResponse != undefined) {
	    ArrResponse = vOldResponse.split("\r");
	    var count = ArrResponse.length;
	    var lastRow = ArrResponse[count-1];
	    //throw"le nombre de lignes est : " +count;
	    var lastRow1 = lastRow.substr(19,(vOldResponse.length)-19);
	    throw"la dernière chaine custom est" +lastRow1;
	   }
	*/
	 // libération mémoire objet “Selligent”
	try {
	    FreeSelligentObject(oQryObj);
	    oQryObj.Dispose();
	} catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_Quo_OnBeforeUpdate : échec libération objet “Selligent” #############################");
	}
		// HAS DEB - date demande prealable deposit negocieteur + user
	
	if (CurrentRecord.IsUpdated("QuoExtDemValDep")) {
	    CurrentRecord["QuoExtUserDemValDep"] = CurrentUserName;
	    CurrentRecord["QuoExtDateDemValDep"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	if (CurrentRecord.IsUpdated("QuoExtValDepOPR")) {
	    CurrentRecord["QuoExtUserValDepOPR"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValDepOPR"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	if (CurrentRecord.IsUpdated("QuoExtValDepSCH")) {
	    CurrentRecord["QuoExtUserValDepSCH"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValDepSCH"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	// HAS DEB 31/01/2020 Insertion du TL-SCH et la date affectation SCH
	
	if (CurrentRecord.IsUpdated("QuoExtSupChain")) {
	    CurrentRecord["QuoExtUserAffectSCH"] = CurrentUserName;
	    CurrentRecord["QuoExtDateAffectSCH"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	// HAS DEB 20/06/2020 Insertion de la date  + heure demande de derogation MDP pour passage commande
	
	var Vmdp = CurrentRecord["QuoExtDemDerogMdp"];
	if (CurrentRecord.IsUpdated("QuoExtDelPai") && Vmdp != '' && Vmdp != null && Vmdp != undefined) {
	    CurrentRecord["QuoExtUserDemDerogMdp"] = CurrentUserName;
	    CurrentRecord["QuoExtHeureDemDerogMdp"] = DateTime.Now.ToString("HH:mm:ss");
	    CurrentRecord["QuoExtDateDemDerogMdp"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	// HAS DEB 12/08/2020 Insertion de la date  + heure validation MngZone pour derogation MDP
	
	/*var ValMngMdp = CurrentRecord["QuoExtValAchDerogMdp"];
	
	if (CurrentRecord.IsUpdated("QuoExtValAchDerogMdp") && ValMngMdp != '' && ValMngMdp != null && ValMngMdp != undefined) {
	    CurrentRecord["QuoExtUserValAchDerogMdp"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValAchDerogMdp"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}*/
	
	// HAS END 12/08/2020 Insertion de la date  + heure validation MngZone pour derogation MDP
	
	
	
	
	// HAS DEB 31/10/2023 Insertion de la date  + heure validation MNGZ pour derogation MDP
	var ValTlMdp = CurrentRecord["QuoExtValTlDerogMdp"];
	if (CurrentRecord.IsUpdated("QuoExtValTlDerogMdp") && ValTlMdp != '' && ValTlMdp != null && ValTlMdp != undefined) {
	    CurrentRecord["QuoExtUserValTlDerogMdp"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValTlDerogMdp"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END 31/10/2023 Insertion de la date  + heure validation MNGZ pour derogation MDP
	
	
	// HAS DEB 31/10/2023 Insertion de la date  + heure validation BUM pour derogation MDP
	var ValBumMdp = CurrentRecord["QuoExtValAchDerogMdp"];
	if (CurrentRecord.IsUpdated("QuoExtValAchDerogMdp") && ValBumMdp != '' && ValBumMdp != null && ValBumMdp != undefined) {
	    CurrentRecord["QuoExtUserValAchDerogMdp"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValAchDerogMdp"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END 31/10/2023 Insertion de la date  + heure validation BUM pour derogation MDP
	
	
	// HAS DEB 31/10/2023 Insertion de la date  + heure validation MNGZ pour derogation MDP
	var ValMngZ = CurrentRecord["QuoExtValMngzDerogMdp"];
	if (CurrentRecord.IsUpdated("QuoExtValMngzDerogMdp") && ValMngZ != '' && ValMngZ != null && ValMngZ != undefined) {
	    CurrentRecord["QuoExtUserValMngzDerogMdp"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValMngzDerogMdp"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END 31/10/2023 Insertion de la date  + heure validation MNGZ pour derogation MDP
	
	
	// HAS DEB 12/08/2020 Insertion de la date  + heure validation DirOp pour derogation MDP
	var ValDir = CurrentRecord["QuoExtValDirDerogMdp"];
	if (CurrentRecord.IsUpdated("QuoExtValDirDerogMdp") && ValDir != '' && ValDir != null && ValDir != undefined) {
	    CurrentRecord["QuoExtUserValDirDerogMdp"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValDirDerogMdp"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END 12/08/2020 Insertion de la date  + heure validation DirOp pour derogation MDP
	
	////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	// HAS DEB 24/11/2020 purger la case de demande 
	var vValStockPrior = CurrentRecord["QuoExtValidStockPrior"];
	if (CurrentRecord.IsUpdated("QuoExtValidStockPrior") && vValStockPrior == 'Non approuvé') {
	    CurrentRecord["QuoExtStockPrior"] = "";
	}
	// HAS END 24/11/2020 purger la case de demande
	
	// HAS DEB 24/11/2020 Insertion de la date+demandeur pour Stock prioritaire 
	var vStockPrior = CurrentRecord["QuoExtStockPrior"];
	if (CurrentRecord.IsUpdated("QuoExtStockPrior") && vStockPrior == '1') {
	    CurrentRecord["QuoExtUserDemStockPrior"] = CurrentUserName;
	    CurrentRecord["QuoExtDateDemStockPrior"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END 24/11/2020 Insertion de la date+demandeur pour Stock prioritaire 
	
	// HAS DEB 24/11/2020 Insertion de la date+demandeur pour Stock prioritaire 
	var vValStockPrior = CurrentRecord["QuoExtValidStockPrior"];
	if (CurrentRecord.IsUpdated("QuoExtValidStockPrior") && vValStockPrior == 'Approuvé') {
	    CurrentRecord["QuoExtUserValidStockPrior"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValidStockPrior"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END 24/11/2020 Insertion de la date+demandeur pour Stock prioritaire
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
		// HAS DEB 27/08/2021 Insertion date et user valideur derogation niveau 1
	var vValDeorg1 = CurrentRecord["QuoExtStatDerog1"];
	if (CurrentRecord.IsUpdated("QuoExtStatDerog1") && vValDeorg1 != '') {
	    CurrentRecord["QuoExtUserValDerog1"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValDerog1"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	    if (vValDeorg1 == 'Approuvé') {
	        CurrentRecord["QuoExtAppelDerog"] = 1;
	    }
	}
	// HAS END 27/08/2021 Insertion date et user valideur derogation niveau 1
	
	
	
	// HAS DEB 27/08/2021 Insertion date et user valideur derogation niveau 2
	var vValDeorg2 = CurrentRecord["QuoExtStatDerog2"];
	if (CurrentRecord.IsUpdated("QuoExtStatDerog2") && vValDeorg2 != '') {
	    CurrentRecord["QuoExtUserValDerog2"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValDerog2"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	    if (vValDeorg2 == 'Approuvé') {
	        CurrentRecord["QuoExtAppelDerog"] = 1;
	    }
	}
	// HAS END 27/08/2021 Insertion date et user valideur derogation niveau 2
	
	
	
	// HAS DEB 27/08/2021 Insertion date et user valideur derogation niveau 3
	var vValDeorg3 = CurrentRecord["QuoExtStatDerog3"];
	if (CurrentRecord.IsUpdated("QuoExtStatDerog3") && vValDeorg3 != '') {
	    CurrentRecord["QuoExtUserValDerog3"] = CurrentUserName;
	    CurrentRecord["QuoExtDateValDerog3"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	    if (vValDeorg3 == 'Approuvé') {
	        CurrentRecord["QuoExtAppelDerog"] = 1;
	    }
	}
	// HAS END 27/08/2021 Insertion date et user valideur derogation niveau 3
	
	
	// HAS DEB 30/08/2021 Insertion date et user demandeur derogation
	var vMntDerog = CurrentRecord["QuoExtValDepassDerog"];
	if (CurrentRecord.IsUpdated("QuoExtValDepassDerog") && vMntDerog != '' && vMntDerog != null) {
	    CurrentRecord["QuoExtUserDemDerog"] = CurrentUserName;
	    CurrentRecord["QuoExtDateDemDerog"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
	}
	// HAS END 30/08/2021 Insertion date et user demandeur derogation
	
	
	
	 
	
		Session["SAP_SATUT_NEGO"] = false;
	var vStatus = CurrentRecord["QuoExtStatOff"].substring(0,1) 
	if (CurrentRecord.IsUpdated("QuoExtStatOff") == true ) {  
	    //if (vStatus == "2" || vStatus == "3"  )
	    if (vStatus == "2" || vStatus == "3"  || vStatus == "8"){
	        Session["SAP_SATUT_NEGO"] = true;
	    }
	}
		var vQuoLitige = CurrentRecord["QuoExtTypeLtg"];
	if (CurrentRecord.IsUpdated("QuoExtTypeLtg") == true && vQuoLitige != "" && vQuoLitige != null) {
	    try {
	        var ObjSupplier = CreateSelligentObject("Company", CurrentSessionID, true);
	        var mySelectionRow: SelectionRow = new SelectionRow();
	        var Cpynrid = CurrentRecord["QuoCpyNRID"];//catch the current record nrid of supplier
	        mySelectionRow.Fields["CpyExtLitige"] = "1";
	        mySelectionRow.Fields["CpyExtDateLitige"] = DateTime.Now.ToString("dd/MM/yyyy");
	        ObjSupplier.OpenSetAndSave(Cpynrid, mySelectionRow);
	    } catch (e) {
	        throw ("Update supplier litigation error " + e);
	    } finally {
	        FreeSelligentObject(ObjSupplier);
	        ObjSupplier.Dispose();
	    }
	}
		// HAS DEB : 21/10/2020 - vérifier l'identité de l'agent export
	try {
	 Session["QUO_CREATE_AGEXP"] = false;
	 if (CurrentRecord.IsUpdated("QuoExtFrsExport") && CurrentRecord["QuoExtFrsExport"] != '') {
	  var vAgExport = CurrentRecord["QuoExtFrsExport"];
	  var vAgExpNrid = CurrentRecord["QuoExtFrsExpNrid"];
	  var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID); //'" + vAgExport + "'
	  var vSQL = "select TOP 1 so0.cd as code , x.Acces_Status as Valid, SUBSTRING(ValDirExport, 1,4) as ValDirExport from sysadm.v_so0 so0 left join sysadm.x_access_agexp x on x.so0_nrid = so0.nrid where so0.template is null and so0.nrid = '" + vAgExpNrid + "' and (Acces_Status = 'Approuvé' OR ValDirExport like 'Approuvé%') order by x.dmod desc";
	  var MyResult = oQryObj.ExecuteSql(vSQL);
	  //throw (MyResult);
	  var MyXmlDocument = InitXml(MyResult);
	  var MyRows = FindItem("Flds", MyXmlDocument, true);
	  if (MyRows.Count == 1) {
	   var CodeAgtExp = GetItemValue("code", MyRows[0]);
	   var Approuve = GetItemValue("Valid", MyRows[0]);
	            var ValDirExport = GetItemValue("ValDirExport", MyRows[0]);
	   //CurrentRecord["QuoExtFrsExpNrid"] = NridAgtExp;
	   //CurrentRecord["QuoExtFrsExpCd"] = CodeAgtExp;
	   //throw "Export Agent code is: " +CodeAgtExp;
	   if (CodeAgtExp.substring(0, 4) == 'COMP' && (Approuve == 'Approuvé' || ValDirExport == 'Appr')) {
	    try {
	     // Exécution de la procédure stockée pour affecter un numéro de fournisseur avant création de l'affaire
	     var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	     var ProcParam: StoredProcParam[] = new StoredProcParam[1];
	     var p_NRID = parseInt(vAgExpNrid);
	     ProcParam[0] = new StoredProcParam("pCpyNRID", "NUMBER", "IN", 200, p_NRID);
	     var strResultProc = ObjSQL.ExecuteStoredProc("sp_seq_four_new", ProcParam);
	    } catch (e) {
	     throw ("Agent_Export_Offre sp_seq_four_new " + e);
	    }
	    // HAS Session["QUO_CREATE_AGEXP"] = true;
	   }
	   Session["QUO_CREATE_AGEXP"] = true; // HAS
	  }
	  delete oQryObj;
	 }
	} catch (e) {
	 throw ("Erreur Agent Export COMP StoredProc " + e);
	} finally { // libération mémoire objet “Selligent”
	 FreeSelligentObject(oQryObj);
	 oQryObj.Dispose();
	}
	// HAS END : 21/10/2020 - vérifier l'identité de l'agent export
		Session["SAP_VALID_NORM"] = false;
	if (CurrentRecord.IsUpdated("QuoExtCommPack") == true  || CurrentRecord.IsUpdated("QuoExtStatutPack") == true  || CurrentRecord.IsUpdated("QuoExtStatutRT") == true  || CurrentRecord.IsUpdated("QuoExtRapTest") == true  || CurrentRecord.IsUpdated("QuoExtNorDoc") == true  || CurrentRecord.IsUpdated("QuoExtValidationNormes") == true )  //
	{
	    Session["SAP_VALID_NORM"] = true;
	}
		Session["SAP_DETAIL_DEM"] = false;
	if (CurrentRecord.IsUpdated("QuoExtDetailsDem") == true  )  //
	{
	  //Session["SAP_DETAIL_DEM"] = true;
	  //CurrentRecord["QuoExtDemdep"] = 1 ;
	}
	
		/*
	
	Session["SAP_FICHE_TAQ"] = false;
	
	try
	
	{
	
	  //Selligent.Library.Monitor.Tracer.Write("FTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", false);
	
	  if( CurrentRecord.IsUpdated("QuoExtSendFicheTaquet") == true  )  
	
	  {
	
	    Session["SAP_FICHE_TAQ"] = true;
	
	    //Selligent.Library.Monitor.Tracer.Write("FT11111111111111111111111111111111111", false);
	
	  }
	
	}
	
	catch(e)
	
	{
	
	  Selligent.Library.Monitor.Tracer.Write("KELLLLLLLLLLLLLLLLLLLLFTTTTTTTTTTTTTTTTTTTTT"+ e, false);
	
	}
	
	*/
	 //  07/10/2024 disable sending the taquet details from crm to sap
	//Session["SAP_FICHE_TAQ"] = false;
	
	try {
	
	  // HAS : Début - 01/01/2018 modifier declencheur webservice envoi fiche taquet
	
	  if (CurrentRecord.IsUpdated("QuoExtPaysMarchandises") == true || CurrentRecord.IsUpdated("QuoExtPaysProvenance") == true || CurrentRecord.IsUpdated("QuoExtVolumeCBM") == true || CurrentRecord.IsUpdated("QuoExtIncotermAchat") == true || CurrentRecord.IsUpdated("QuoExtCodePaysDep") == true || CurrentRecord.IsUpdated("QuoExtPort") == true || CurrentRecord.IsUpdated("QuoExtValeurAchat1") == true || CurrentRecord.IsUpdated("QuoExtDeviseAchat") == true || CurrentRecord.IsUpdated("QuoExtCoutTrans") == true || CurrentRecord.IsUpdated("QuoExtCoutDouane") == true || CurrentRecord.IsUpdated("QuoExtValeurVente1") == true || CurrentRecord.IsUpdated("QuoExtCQ") == true || CurrentRecord.IsUpdated("QuoExtCoutQualite") == true || CurrentRecord.IsUpdated("QuoExtAssurance") == true) {
	
	    // HAS DEB : 01/11/2023 - reinitialiser le flux de validation
	
	    CurrentRecord["QuoExtValAchDerogMdp"] = "";
	
	    CurrentRecord["QuoExtDateValAchDerogMdp"] = "";
	
	    CurrentRecord["QuoExtUserValAchDerogMdp"] = "";
	
	    CurrentRecord["QuoExtValDirDerogMdp"] = "";
	
	    CurrentRecord["QuoExtUserValDirDerogMdp"] = "";
	
	    CurrentRecord["QuoExtDateValDirDerogMdp"] = "";
	
	    CurrentRecord["QuoExtValMngzDerogMdp"] = "";
	
	    CurrentRecord["QuoExtUserValMngzDerogMdp"] = "";
	
	    CurrentRecord["QuoExtDateValMngzDerogMdp"] = "";
	
	    CurrentRecord["QuoExtValTlDerogMdp"] = "";
	
	    CurrentRecord["QuoExtUserValTlDerogMdp"] = "";
	
	    CurrentRecord["QuoExtDateValTlDerogMdp"] = "";
	
	    // HAS END : 01/11/2023 - reinitialiser le flux de validation
	
	    // HAS : Début - 01/01/2018 modifier declencheur webservice envoi fiche taquet
	    //  07/10/2024 disable sending the taquet details from crm to sap
	    //Session["SAP_FICHE_TAQ"] = true;
	
	  }
	
	} catch (e) {
	
	  throw ("HAS - Error calling WS for taquet file "+ e);
	
	  //Selligent.Library.Monitor.Tracer.Write("KELLLLLLLLLLLLLLLLLLLLFTTTTTTTTTTTTTTTTTTTTT" + e, false);
	
	} 
		/*
	Session["SAP_DETAIL_COM"] = false;
	if (CurrentRecord.IsUpdated("QuoExtDateDemande") == true  )  //
	{
	  Session["SAP_DETAIL_COM"] = true;
	}
	*/
	
	
	Session["SAP_DETAIL_COM"] = false;
	if ( (CurrentRecord.IsUpdated("QuoExtDateDemande") == true ||  CurrentRecord.IsUpdated("QuoExtDetailDemande") == true ) && CurrentRecord["QuoExtDateDemande"] != null && CurrentRecord["QuoExtDateDemande"] != '' && CurrentRecord["QuoExtDetailDemande"] != null && CurrentRecord["QuoExtDetailDemande"] != '' )  //
	{
	  Session["SAP_DETAIL_COM"] = true;
	}
		
	// SIR & HIC @OZEOL 24/05/2018
	 Session["SAP_WH_INS"] = false;
	    Session["SAP_WH_UP"] = false;
	  if (CurrentRecord.IsUpdated("QuoExtStatutWH") == true  )  //
	  {
	    Session["SAP_WH_INS"] = true;
	  }
	  else if (CurrentRecord.IsUpdated("QuoExtNomContact") == true  || CurrentRecord.IsUpdated("QuoExtNumTel") == true || CurrentRecord.IsUpdated("QuoExtDateLivPrevWH") == true || CurrentRecord.IsUpdated("QuoExtEmailWH") == true || CurrentRecord.IsUpdated("QuoExtVolumeCbmWH") == true)  //
	  {
	    Session["SAP_WH_UP"] = true;
	  }
	
	SS_Quo_MAJ_Date_Statut();
		Session["Z_CRM_AFF_SUPPLYC"] = false;
	if (CurrentRecord.IsUpdated("QuoExtSupChain") == true )  //
	{
	  Session["Z_CRM_AFF_SUPPLYC"] = true;
	}
		// HAS DEB 14/12/2020 recupérer le code de lAgent Export 
	var vAgExport = CurrentRecord["QuoExtFrsExport"];
	var vAgExpNrid = CurrentRecord["QuoExtFrsExpNrid"];
	var vCodeAgExp = CurrentRecord["QuoExtFrsExpCd"];
	var SocNRID = CurrentRecord["QuoCpyNRID"];
	if (CurrentRecord.IsUpdated("QuoExtFrsExport") == true) {
	    if (vAgExport != '' && vAgExport != null && vAgExport != undefined) {
	        CurrentRecord["QuoExtValMngzDerogMdp"] = "";
	        CurrentRecord["QuoExtUserValMngzDerogMdp"] = "";
	        CurrentRecord["QuoExtDateValMngzDerogMdp"] = "";
	        CurrentRecord["QuoExtValTlDerogMdp"] = "";
	        CurrentRecord["QuoExtUserValTlDerogMdp"] = "";
	        CurrentRecord["QuoExtDateValTlDerogMdp"] = "";
	        CurrentRecord["QuoExtValAchDerogMdp"] = "";
	        CurrentRecord["QuoExtDateValAchDerogMdp"] = "";
	        CurrentRecord["QuoExtUserValAchDerogMdp"] = "";
	        CurrentRecord["QuoExtValDirDerogMdp"] = "";
	        CurrentRecord["QuoExtUserValDirDerogMdp"] = "";
	        CurrentRecord["QuoExtDateValDirDerogMdp"] = "";
	        CurrentRecord["QuoExtDelPai"] = "";
	        var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var vSQL = "select so0.cd as code from v_so0 so0 where so0.nrid = '" + vAgExpNrid + "' and so0.template is null ";
	        var MyResult = oQryObj.ExecuteSql(vSQL);
	        var MyXmlDocument = InitXml(MyResult);
	        var MyRows = FindItem("Flds", MyXmlDocument, true);
	        if (MyRows.Count == 1) {
	            var CpyCode = GetItemValue("code", MyRows[0]);
	            var vSubCode = CpyCode.substring(0, 4);
	            if (CpyCode.substring(0, 4) != 'COMP') {
	                CurrentRecord["QuoExtFrsExpCd"] = CpyCode;
	            }
	        }
	        delete oQryObj;
	    }
	}
	// HAS END 14/12/2020 recupérer le code de lAgent Export
	// HAS END 22/05/2022 Mettre à jour type fournisseur à reception de la commande
	if (CurrentRecord.IsUpdated("QuoExtStatOff") == true && CurrentRecord["QuoExtStatOff"].substring(0, 1) == '5') {
	    var vTransTo = CurrentRecord["QuoExtAcht"];
	    var oQryObjSup = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vSQL = "select titulaire as owner, xAcht as buyer from v_so0 so0 where so0.nrid = '" + SocNRID + "' and so0.template is null";
	    var MyResult = oQryObjSup.ExecuteSql(vSQL);
	    var MyXmlDocument = InitXml(MyResult);
	    var MyRows = FindItem("Flds", MyXmlDocument, true);
	    if (MyRows.Count == 1) {
	        var vOwner = GetItemValue("owner", MyRows[0]);
	        var vBuyer = GetItemValue("buyer", MyRows[0]);
	        //throw "le ........ est $" + vOwner + "$";
	        if (vOwner != vBuyer && vOwner != vTransTo) {
	            var vSQL1 = "select count(*) as NbrCmd from v_dc0 where so0_nrid = '" + SocNRID + "' and xacht = '" + vBuyer + "' and xstatoff like '5%' ";
	            var MyResult1 = oQryObjSup.ExecuteSql(vSQL1);
	            var MyXmlDocument1 = InitXml(MyResult1);
	            var MyRows1 = FindItem("Flds", MyXmlDocument1, true);
	            if (MyRows1.Count == 1) {
	                var vCount = GetItemValue("NbrCmd", MyRows1[0]);
	                if (vCount == '' || vCount == null || vCount == undefined || vCount == 0) {
	                    var myCompany = CreateSelligentObject("Company", CurrentSessionID, true);
	                    var myselectionrow: SelectionRow = new SelectionRow();
	                    //myselectionrow.Fields["CpyExtTypefrs"] = "FOURNISSEUR";
	                    //myselectionrow.Fields["CpyType"] = "ACTIF";
	                    myselectionrow.Fields["CpyOwner"] = vTransTo;
	                    myselectionrow.Fields["CpyExtAcht"] = vTransTo;
	                    myselectionrow.Fields["CpyExtProsp"] = '';
	                    myselectionrow.Fields["CpyExtDdeTransfertCP"] = '';
	                    myselectionrow.Fields["CpyExtValideurdetransfert"] = CurrentUserName;
	                    myselectionrow.Fields["CpyExtDatedetransfert"] = DateTime.Now.ToString("dd/MM/yyyy");
	                    myCompany.Open(parseInt(SocNRID));
	                    myCompany.SetAndSave(myselectionrow);
	                    delete myCompany;
	                    // Transfert de la Open TO DO
	                    var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	                    var vSQL = "select top 1 hi0.nrid as hi0nrid from hi0 where status = 'A FAIRE' and hi0.template is null and so0_nrid = '" + SocNRID + "' ";
	                    var oRes = oQryObj.ExecuteSql(vSQL);
	                    var oXmlDoc = InitXml(oRes);
	                    var oRows = FindItem("Flds", oXmlDoc, true);
	                    if (oRows.Count == 1) {
	                        var NridAct = GetItemValue("hi0nrid", oRows[0]);
	                        var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	                        var ProcPrm: StoredProcParam[] = new StoredProcParam[3];
	                        ProcPrm[0] = new StoredProcParam("pAcnNRID", "NUMBER", "IN", 200, NridAct);
	                        ProcPrm[1] = new StoredProcParam("pTitulaire", "VARCHAR", "IN", 30, vTransTo);
	                        ProcPrm[2] = new StoredProcParam("pFunction", "VARCHAR", "IN", 30, 'NEG');
	                        var strResultProc = ObjSQL.ExecuteStoredProc("sp_affect_todo", ProcPrm);
	                        delete ObjSQL;
	                    }
	                    delete oQryObj;
	                }
	            }
	        }
	    }
	    delete oQryObjSup;
	}
	// HAS END 22/05/2022 Mettre à jour type fournisseur à reception de la commande
		/* Session["SAP_ENVOI_DEROG"] = false;
	if (CurrentRecord.IsUpdated("QuoExtAppelDerog") == true && CurrentRecord["QuoExtAppelDerog"] == '1') //
	{
	 Session["SAP_ENVOI_DEROG"] = true;
	}
	Session["CLOTURE_DEROG"] = false;
	if ((CurrentRecord.IsUpdated("QuoExtStatDerog1") == true || CurrentRecord.IsUpdated("QuoExtStatDerog2") == true || CurrentRecord.IsUpdated("QuoExtStatDerog3") == true)) {
	 var vStatDerog1 = CurrentRecord["QuoExtStatDerog1"];
	 var vStatDerog2 = CurrentRecord["QuoExtStatDerog2"];
	 var vStatDerog3 = CurrentRecord["QuoExtStatDerog3"];
	 var vTypeDerog = CurrentRecord["QuoExtTypeDerog"];
	 if (vStatDerog1 == 'Approuvé' || vStatDerog1 == 'Refusé' || vStatDerog2 == 'Approuvé' || (vStatDerog2 == 'Non approuvé' && (vTypeDerog == 'Controle qualité' || vTypeDerog == 'Emballage et stickers')) || vStatDerog2 == 'Refusé' || vStatDerog3 == 'Approuvé' || vStatDerog3 == 'Non approuvé') {
	  Session["CLOTURE_DEROG"] = true;
	 }
	}
	*/
	
	Session["SAP_ENVOI_DEROG"] = false;
	if (CurrentRecord.IsUpdated("QuoExtAppelDerog") == true && CurrentRecord["QuoExtAppelDerog"] == '1') //
	{
	 Session["SAP_ENVOI_DEROG"] = true;
	}
	Session["CLOTURE_DEROG"] = false;
	if ((CurrentRecord.IsUpdated("QuoExtStatDerog1") == true || CurrentRecord.IsUpdated("QuoExtStatDerog2") == true || CurrentRecord.IsUpdated("QuoExtStatDerog3") == true)) {
	 var vStatDerog1 = CurrentRecord["QuoExtStatDerog1"];
	 var vStatDerog2 = CurrentRecord["QuoExtStatDerog2"];
	 var vStatDerog3 = CurrentRecord["QuoExtStatDerog3"];
	 var vTypeDerog = CurrentRecord["QuoExtTypeDerog"];
	 if (vStatDerog1 == 'Approuvé' || vStatDerog1 == 'Refusé' || vStatDerog2 == 'Approuvé' || (vStatDerog2 == 'Non approuvé' && vTypeDerog == 'Controle qualité' ) || vStatDerog2 == 'Refusé' || vStatDerog3 == 'Approuvé' || vStatDerog3 == 'Non approuvé') {
	  Session["CLOTURE_DEROG"] = true;
	 }
	}
		try {
		var nQuoNRID = CurrentRecord["QuoNRID"];
		var objReq = CreateSelligentObject("SqlHelper", CurrentSessionID);
		//INSERT INTO XDEROGATION
		var vDateValDerog1 = CurrentRecord["QuoExtDateValDerog1"].ToString("dd/MM/yyyy hh:mm:ss");
		var vDateValDerog2 = CurrentRecord["QuoExtDateValDerog2"].ToString("dd/MM/yyyy hh:mm:ss");
		var vDateValDerog3 = CurrentRecord["QuoExtDateValDerog3"].ToString("dd/MM/yyyy hh:mm:ss");
		var vDeviseDerogTq = CurrentRecord["QuoExtDeviseDerogTq"];
		var vDetailDemDerog = CurrentRecord["QuoExtDetailDemDerog"];
		var vStatDerog3 = CurrentRecord["QuoExtStatDerog3"];
		var vUserValDerog2 = CurrentRecord["QuoExtUserValDerog2"];
		var vDeviseDerogPi = CurrentRecord["QuoExtDeviseDerogPi"];
		var vStatDerog1 = CurrentRecord["QuoExtStatDerog1"];
		var vMntDerogPi = CurrentRecord["QuoExtMntDerogPi"];
		var vMntDerogAnego = CurrentRecord["QuoExtMntDerogAnego"];
		var vDetailValDerog1 = CurrentRecord["QuoExtDetailValDerog1"];
		var vStatDerog2 = CurrentRecord["QuoExtStatDerog2"];
		var vDetailValDerog3 = CurrentRecord["QuoExtDetailValDerog3"];
		var vUserValDerog1 = CurrentRecord["QuoExtUserValDerog1"];
		var vDetailValDerog2 = CurrentRecord["QuoExtDetailValDerog2"];
		var vMntDerogMarge = CurrentRecord["QuoExtMntDerogMarge"];
		var vTypeDerog = CurrentRecord["QuoExtTypeDerog"];
		var vDeviseDepassDerog = CurrentRecord["QuoExtDeviseDepassDerog"];
		var vDeviseDerogMarge = CurrentRecord["QuoExtDeviseDerogMarge"];
		var vUserValDerog3 = CurrentRecord["QuoExtUserValDerog3"];
		var vAppelDerog = CurrentRecord["QuoExtAppelDerog"];
		var vMntDerogTq = CurrentRecord["QuoExtMntDerogTq"];
		var vValDepassDerog = CurrentRecord["QuoExtValDepassDerog"];
		var vMntDerogNego = CurrentRecord["QuoExtMntDerogNego"];
		if (vDateValDerog2 == '' || vDateValDerog2 == null || vDateValDerog2 == undefined) {
			vDateValDerog2 = '';
		} else {
			vDateValDerog2 = vDateValDerog2.ToString("dd/MM/yyyy hh:mm:ss");
		}
		if (vDateValDerog3 == '' || vDateValDerog3 == null || vDateValDerog3 == undefined) {
			vDateValDerog3 = '';
		} else {
			vDateValDerog3 = vDateValDerog3.ToString("dd/MM/yyyy hh:mm:ss");
		}
		if (vDeviseDerogTq == null) vDeviseDerogTq = '';
		if (vDetailDemDerog == null) vDetailDemDerog = '';
		if (vStatDerog3 == null) vStatDerog3 = '';
		if (vUserValDerog2 == null) vUserValDerog2 = '';
		if (vDeviseDerogPi == null) vDeviseDerogPi = '';
		if (vStatDerog1 == null) vStatDerog1 = '';
		if (vMntDerogPi == null) vMntDerogPi = '';
		if (vMntDerogAnego == null) vMntDerogAnego = '';
		if (vDetailValDerog1 == null) vDetailValDerog1 = '';
		if (vStatDerog2 == null) vStatDerog2 = '';
		if (vDetailValDerog3 == null) vDetailValDerog3 = '';
		if (vUserValDerog1 == null) vUserValDerog1 = '';
		if (vDetailValDerog2 == null) vDetailValDerog2 = '';
		if (vMntDerogMarge == null) vMntDerogMarge = '';
		if (vTypeDerog == null) vTypeDerog = '';
		if (vDeviseDepassDerog == null) vDeviseDepassDerog = '';
		if (vDeviseDerogMarge == null) vDeviseDerogMarge = '';
		if (vUserValDerog3 == null) vUserValDerog3 = '';
		if (vAppelDerog == null) vAppelDerog = '';
		if (vMntDerogTq == null) vMntDerogTq = '';
		if (vValDepassDerog == null) vValDepassDerog = '';
		if (vMntDerogNego == null) vMntDerogNego = '';
	
		if (CurrentRecord.IsUpdated("QuoExtStatDerog1") == true || CurrentRecord.IsUpdated("QuoExtStatDerog2") == true || CurrentRecord.IsUpdated("QuoExtStatDerog3") == true) {
			if (vStatDerog1 == 'Approuvé' || vStatDerog1 == 'Refusé' || vStatDerog2 == 'Approuvé' || vStatDerog2 == 'Refusé' || (vStatDerog2 == 'Non approuvé' && vTypeDerog == 'Controle qualité') || vStatDerog3 == 'Approuvé' || vStatDerog3 == 'Non approuvé') {
				var strSQL = "INSERT INTO x_derogation (dc0_nrid, xDateValDerog1, xDateValDerog3, xDeviseDerogTq, xDetailDemDerog, xStatDerog3, xUserValDerog2, xDeviseDerogPi, xStatDerog1, xMntDerogPi, xMntDerogAnego, xDateValDerog2, xDetailValDerog1, xStatDerog2, xDetailValDerog3, xUserValDerog1, xDetailValDerog2, xMntDerogMarge, xTypeDerog, xDeviseDepassDerog, xDeviseDerogMarge, xUserValDerog3, xAppelDerog, xMntDerogTq, xValDepassDerog, xMntDerogNego)" +
					" VALUES ('" + nQuoNRID + "' , '" + vDateValDerog1 + "' , '" + vDateValDerog3 + "', '" + vDeviseDerogTq + "', '" + vDetailDemDerog + "', '" + vStatDerog3 + "', '" + vUserValDerog2 + "', '" + vDeviseDerogPi + "', '" + vStatDerog1 + "', '" + vMntDerogPi + "', '" + vMntDerogAnego + "', '" + vDateValDerog2 + "', '" + vDetailValDerog1 + "', '" + vStatDerog2 + "', '" + vDetailValDerog3 + "', '" + vUserValDerog1 + "', '" + vDetailValDerog2 + "', '" + vMntDerogMarge + "', '" + vTypeDerog + "', '" + vDeviseDepassDerog + "', '" + vDeviseDerogMarge + "', '" + vUserValDerog3 + "', '" + vAppelDerog + "', '" + vMntDerogTq + "', '" + vValDepassDerog + "', '" + vMntDerogNego + "')";
				objReq.ExecuteSql(strSQL);
			}
		}
	} catch (e) {
		return strSQL + e.description;
	} finally {
		FreeSelligentObject(objReq);
		objReq.Dispose();
	 }
	
		// -- BUYER ? QuoExtSRReqReason updated -------------------------------
	var vSRReqReason = CurrentRecord["QuoExtSRReqComment"];
	if (CurrentRecord.IsUpdated("QuoExtSRReqComment") && vSRReqReason != '' && vSRReqReason != null && vSRReqReason != undefined) {
	    CurrentRecord["QuoExtSRReqDate"]   = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["QuoExtSRRequester"] = CurrentUserName;
	}
	
	// -- TL ? QuoExtSRTLStatus updated -----------------------------------
	var vSRTLStatus = CurrentRecord["QuoExtSRTLStatus"];
	if (CurrentRecord.IsUpdated("QuoExtSRTLStatus") && vSRTLStatus != '' && vSRTLStatus != null && vSRTLStatus != undefined) {
	    CurrentRecord["QuoExtSRTLValidator"] = CurrentUserName;
	    CurrentRecord["QuoExtSRTLValDate"]   = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	// -- REGIONAL DIRECTOR ? QuoExtSRDIRStatus updated -------------------
	var vSRDIRStatus = CurrentRecord["QuoExtSRDIRStatus"];
	if (CurrentRecord.IsUpdated("QuoExtSRDIRStatus") && vSRDIRStatus != '' && vSRDIRStatus != null && vSRDIRStatus != undefined) {
	    CurrentRecord["QuoExtSRDIRValidator"] = CurrentUserName;
	    CurrentRecord["QuoExtSRDIRValDate"]   = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	if (CurrentRecord.IsUpdated("QuoExtSRDIRStatus") && vSRDIRStatus == 'Approuvé' ) {
	    CurrentRecord["QuoException"] = 1 ;
	} else { CurrentRecord["QuoException"] = 0 ; }
}