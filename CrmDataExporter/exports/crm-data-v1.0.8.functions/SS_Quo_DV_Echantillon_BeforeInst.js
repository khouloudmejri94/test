function()
{
	//SS_Quo_DV_Echantillon_BeforeInst   35420756429215
	//HAS DEB : 09/07/2019  : Si il existe un echatillon pour valorisation non cloturé alors l'acheterur ne peut pas créer une tache sur l'offre
	
	try {
	 var v1 = "";
	 if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == "") CurrentRecord["ExtEchntlln1StatusEchantillon"] = "";
	} catch (e) {
	 CurrentRecord["ExtEchntlln1StatusEchantillon"] = "";
	}
	
	try {
	 var oQryObj3 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 
	 var vSQL3 = "select count (*) as Nbr  from sysadm.x_echantillon_Affair "
	            +"inner join sysadm.do0 on do0.nrid = do0_nrid "
	            +"where  no_tracking is not null  and ( status_echantillon  not in ('Validé', 'Validé sous condition' , 'Annulé') or  status_echantillon is null) "
	            +"and do0.ref = :dfDocDossier ";
	
	 var oRes3 = oQryObj3.ExecuteSql(vSQL3);
	 var oXmlDoc3 = InitXml(oRes3);
	 var oRows3 = FindItem("Flds", oXmlDoc3, true);
	    //HAS DEB Liberer object SQL
	    try {
	        FreeSelligentObject(oQryObj3);
	        oQryObj3.Dispose();
	    } catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_Quo_DV_Echantillon_BeforeInst : échec libération objet “Selligent” #############################");
	    }
	    //HAS DEB Liberer object SQL
	
	 if (GetItemValue("Nbr", oRows3[0]) > 0) {
	  throw "You have a sample request in your affair that is not validated \n You need validation to create this task";
	 }
	 //delete oQryObj3;
	} catch (e) {
	 throw "Echantillon Valorisation Error2!! \r" + e;
	}
	//init CurrentRecord
	try {
	 var v = "";
	 if (CurrentRecord["ExtEchntlln1NoEchantillon"] == "") v = "";
	} catch (e) {
	 CurrentRecord["ExtEchntlln1NoEchantillon"] = "10000";
	}
	
	try {
	 var vStatutDem = CurrentRecord["ExtEchntlln1StatusEchantillon"];
	 if (vStatutDem != 'Commande avant échantillon' && vStatutDem != 'Sans échantillon' && (CurrentRecord["ExtEchntlln1NoTracking"] == "" || CurrentRecord["ExtEchntlln1NoTracking"] == null))
	  throw "TRY BLOC 1  !!!";
	} catch (e) {
	 throw "Please insert a valid Tracking Number  !!";
	}
	
	// HAS DEB : 27/07/2020 - ajouter un controle sur la saisie du type echantillon
	
	try {
	 //var vTypeEcht = CurrentRecord["ExtEchntlln1TypeEcht"];
	 if (CurrentRecord["ExtEchntlln1TypeEcht"] == "" || CurrentRecord["ExtEchntlln1TypeEcht"] == null || CurrentRecord["ExtEchntlln1TypeEcht"] == undefined)
	  throw "TRY BLOC 2  !!!";
	} catch (e) {
	 throw "The sample type is mandatory, Please complete it !!";
	}
	
	// HAS END : 27/07/2020 - ajouter un controle sur la saisie du type echantillon
	
	// HAS debut : 28/10/2018 tester si le numero de tracking est numérique
	/*
	try {
	    if (CurrentRecord["ExtEchntlln1NoTracking"] == "") var v2 = "";
	} catch (e) {
	    CurrentRecord["ExtEchntlln1NoTracking"] = "";
	}
	
	var re = /^\d+$/;
	var vTrack = CurrentRecord["ExtEchntlln1NoTracking"];
	if (vTrack) {
	    if (!vTrack.match(re)) {
	        throw "Invalid Tracking Number.. Please check it !! ";
	    }
	}
	
	*/
	
	// HAS Fin : 28/10/2018 tester si le numero de tracking est numérique
	
	//vérification statut de l'offre = Négocié [Hichem]
	
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL2 = "select  count (*) as Nbr from dc0  where  template is null and XSTATOFF != '8. A Revaloriser' and XSTATOFF != '2. Négocié' and XSTATOFF != '4. Acceptée' and XSTATOFF != '5. Commandée'  and nrid = :QuoNRID";
	var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	var oXmlDoc2 = InitXml(oRes2);
	var oRows2 = FindItem("Flds", oXmlDoc2, true);
	//HAS DEB Liberer object SQL
	try {
	    FreeSelligentObject(oQryObj2);
	    oQryObj2.Dispose();
	} catch (e) {
	Selligent.Library.Monitor.Tracer.Write("################################ SS_Quo_DV_Echantillon_BeforeInst : échec libération objet “Selligent” #############################");
	}
	//HAS DEB Liberer object SQL
	if (GetItemValue("Nbr", oRows2[0]) == 1) {
	 throw "Only status To Revalue and Negociated are accepted to makea sample";
	 //delete oQryObj2;
	}
	
	// HAS : si demande acheteur en cours alors impossible de rajouter une autre demande
	
	var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = " select  count (*) as Nbr from x_echantillon  where dc0_nrid = :QuoNRID and template is null and (STATUS_ECHANTILLON in ('Demande d''envoi' , 'Envoyé', 'Commande avant échantillon', 'Réceptionné', 'Déposé') or (STATUS_ECHANTILLON = 'Sans échantillon'  and RESPONSABLE_ECH is null ) ) ";
	var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	
	var oXmlDoc1 = InitXml(oRes1);
	var oRows1 = FindItem("Flds", oXmlDoc1, true);
	if (GetItemValue("Nbr", oRows1[0]) == 1) {
	 throw "Another Sample request is already in progress, Please follow it up";
	 //delete oQryObj1;
	} else {
	 // END HAS : Suivi demande 
	 if (CurrentRecord["ExtEchntlln1NoEchantillon"] == "" || CurrentRecord["ExtEchntlln1NoEchantillon"] == null || CurrentRecord["ExtEchntlln1NoEchantillon"] == "10000" || CurrentRecord["ExtEchntlln1NoEchantillon"] == 1) {
	  var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var vSQL = "select max(isnull(no_echantillon,0))+1 as mngach   from x_echantillon  where dc0_nrid = :QuoNRID ";
	  var oRes = oQryObj1.ExecuteSql(vSQL);
	  var oXmlDoc = InitXml(oRes);
	  var oRows = FindItem("Flds", oXmlDoc, true);
	  if (GetItemValue("mngach", oRows[0]) == "" || GetItemValue("mngach", oRows[0]) == null) {
	   CurrentRecord["ExtEchntlln1NoEchantillon"] = 1
	  } else {
	   CurrentRecord["ExtEchntlln1NoEchantillon"] = GetItemValue("mngach", oRows[0]);
	   //delete oQryObj1;
	  }
	 }
	}
	//HAS DEB Liberer object SQL
	try {
	    FreeSelligentObject(oQryObj1);
	    oQryObj1.Dispose();
	} catch (e) {
	Selligent.Library.Monitor.Tracer.Write("################################ SS_Quo_DV_Echantillon_BeforeInst : échec libération objet “Selligent” #############################");
	}
	//HAS DEB Liberer object SQL
	
	try {
	 var v2 = "";
	 if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == "") CurrentRecord["ExtEchntlln1StatusEchantillon"] = "";
	} catch (e) {
	 CurrentRecord["ExtEchntlln1StatusEchantillon"] = "";
	}
	
	try {
	 var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSQL1 = "select set_us_profile_init as usr from sysadm.set_us1  where template is null and nom = :strUserNom";
	 var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	 var oXmlDoc1 = InitXml(oRes1);
	 var oRows1 = FindItem("Flds", oXmlDoc1, true);
	 var profil = GetItemValue("usr", oRows1[0]);
	 if ((CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Réceptionné' || CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Déposé') && profil != 'QUA' && profil != 'ADMT') {
	  throw "You need a QUALITY Profile to make this request";
	 } else if ((CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Réceptionné' || CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Déposé') && (profil == 'QUA' || profil == 'ADMT')) {
	  CurrentRecord["ExtEchntlln1DateReception"] = DateTime.Now.ToString("dd/MM/yyyy");
	 }
	 if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Envoyé' || CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Commande avant échantillon') {
	  CurrentRecord["ExtEchntlln1DateEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy");
	 }
	
	 if (CurrentRecord["ExtEchntlln1StatusEchantillon"] == 'Sans échantillon') {
	  CurrentRecord["ExtEchntlln1DateDemEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy");
	  CurrentRecord["ExtEchntlln1DateEnvoi"] = DateTime.Now.ToString("dd/MM/yyyy");
	 }
	    //HAS DEB Liberer object SQL
	    try {
	        FreeSelligentObject(oQryObj1);
	        oQryObj1.Dispose();
	    } catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_Quo_DV_Echantillon_BeforeInst : échec libération objet “Selligent” #############################");
	    }
	    //HAS DEB Liberer object SQL
	
	} catch (e) {
	 throw e + " !! Access Denied";
	}
	
	//try {
	    var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vSQL1 = "select xstatoff as statoff from sysadm.dc0 where nrid = :QuoNRID";
	    var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	    var oXmlDoc1 = InitXml(oRes1);
	    var oRows1 = FindItem("Flds", oXmlDoc1, true);
	    var vStatus = GetItemValue("statoff", oRows1[0]);
	    //HAS DEB Liberer object SQL
	    try {
	        FreeSelligentObject(oQryObj1);
	        oQryObj1.Dispose();
	    } catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_Quo_DV_Echantillon_BeforeInst : échec libération objet “Selligent” #############################");
	    }
	    //HAS DEB Liberer object SQL
	    if (vStatus == "8. A Revaloriser" && CurrentRecord["ExtEchntlln1TypeEcht"] != "Echant pour revalorisation") {
	        throw "Sample type should be 'Sample for Price revaluation', Please correct your request";
	    }
	    if (vStatus == "2. Négocié" && CurrentRecord["ExtEchntlln1TypeEcht"] != "Echant pour validation") {
	        throw "Sample type should be 'Sample for validation', Please correct your request";
	    }
	//} catch (e) {
	// throw e + " Error control sample type";
	//}
}