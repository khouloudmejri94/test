function SS_Quo_DV_CQ_BeforeInst()
{
	try {
	
	
	    var vStatutDem = CurrentRecord["ExtCntrlQltStatutdemCQ"];
	    if (vStatutDem != 'Demande sans CQ') {
	        if (CurrentRecord["ExtCntrlQltDetailsDemande"] == "" || CurrentRecord["ExtCntrlQltDetailsDemande"] == null || CurrentRecord["ExtCntrlQltNomContact"] == "" || CurrentRecord["ExtCntrlQltNomContact"] == null || CurrentRecord["ExtCntrlQltAdresseStock"] == "" || CurrentRecord["ExtCntrlQltAdresseStock"] == null || CurrentRecord["ExtCntrlQltNumTel"] == "" || CurrentRecord["ExtCntrlQltNumTel"] == null || CurrentRecord["ExtCntrlQltMail"] == "" || CurrentRecord["ExtCntrlQltMail"] == null) {
	            throw "TRY BLOC 1  !!!";
	        }
	    }
	} catch (e) {
	    throw "Please Complete All Fields  !!";
	}
	
	
	 
	
	
	/*
	try {
	    var vFonction = Session["ResFunction"];
	    var oQrySCH = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vSqlSCH = "select  count (*) as Nbr from dc0  where  template is null and xoldcmd ='1' and nrid = :QuoNRID  ";
	    var oResSCH = oQrySCH.ExecuteSql(vSqlSCH);
	    var oXmlDocSCH = InitXml(oResSCH);
	    var oRowsSCH = FindItem("Flds", oXmlDocSCH, true);
	    if ((vFonction == 'Negociateur' || vFonction == 'Team Leader Negociation') && GetItemValue("Nbr", oRowsSCH[0]) == 0) {
	        throw "This function is not autorised for negociators";
	        delete oQrySCH;
	        }
	} catch (e) {
	    throw "Only Supply Chain can do this request";
	}
	*/
	
	
	try {
	  var vFonction = Session["ResFunction"];
	  if (vFonction == 'Negociateur' || vFonction == 'Team Leader Negociation' || vFonction == 'Acheteur' || vFonction == 'Manager achat') {
	    throw "This function is not autorised for negociators";
	  }
	} catch (e) {
	  throw "This function is not autorised for negociators";
	}
	
	try {
	    var vValidStatut  = "Demande pré-CQ;Demande CQ;Demande sans CQ;Demande contre visite;Demande Loading Check";
	    var vStatut  = CurrentRecord["ExtCntrlQltStatutdemCQ"]
	    if (vValidStatut.indexOf(vStatut) == -1) {
	        throw "Erreur Edition", "The status " + CurrentRecord["ExtCntrlQltStatutdemCQ"] + " is not part of the choice list items!";
	    }
	} catch (e) {
	    throw e;
	}
	
	
	
		//init CurrentRecord
	// HAS : test format Email
	try {
	 if (CurrentRecord["ExtCntrlQltMail"] == "") var v1 = "";
	} catch (e) {
	 CurrentRecord["ExtCntrlQltMail"] = "";
	}
	var email = CurrentRecord["ExtCntrlQltMail"];
	var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	if (email) {
	 if (!email.match(re)) {
	  throw "Check the e-mail please! ";
	  return false;
	  delete oQryObj;
	 }
	}
	// HAS : test format num Tel
	try {
	 if (CurrentRecord["ExtCntrlQltNumTel"] == "") var v2 = "";
	} catch (e) {
	 CurrentRecord["ExtCntrlQltNumTel"] = "";
	}
	var re = /^\d+$/;
	var telNbr = CurrentRecord["ExtCntrlQltNumTel"];
	if (telNbr) {
	 if (!telNbr.match(re)) {
	  throw "Check the Telephone number please! ";
	  return false;
	  delete oQryObj;
	 }
	}
	try {
	 var v = "";
	 if (CurrentRecord["ExtCntrlQltNoCQ"] == "") v = "";
	} catch (e) {
	 CurrentRecord["ExtCntrlQltNoCQ"] = "10000";
	}
	
	try {
	 var v2 = "";
	 if (CurrentRecord["ExtCntrlQltStatutdemCQ"] == "") CurrentRecord["ExtCntrlQltStatutdemCQ"] = "";
	} catch (e) {
	 CurrentRecord["ExtCntrlQltStatutdemCQ"] = "";
	}
	
	try {
	 var v3 = "";
	 if (CurrentRecord["ExtCntrlQltDateDemande"] == "") v3 = "";
	} catch (e) {
	 CurrentRecord["ExtCntrlQltDateDemande"] = "";
	}
	try {
	 var v4 = "";
	 if (CurrentRecord["ExtCntrlQltHeureDemande"] == "") v4 = "";
	} catch (e) {
	 CurrentRecord["ExtCntrlQltHeureDemande"] = "";
	}
	// HAS Debut 06/09/2018 : si Frais taquet CQ = 0 alors acheteur peut faire seuelemtn tache SANS CQ oubien Loading Check
	var oQryObj3 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	//var vSQL3 = "  select count (*) as Nbr from dc0  where  template is null and nrid = :QuoNRID and XCQ in ('NON', 'NO') and XCOUTQUALITE = '0' ";
	var vSQL3 = "  select count (*) as Nbr from sysadm.dc0  where  template is null and do0_nrid = :nDocDossNRID and XSTATOFF not in ('3. Perdue','6. Annulée') and XCQ not in ('NON', 'NO') and XCOUTQUALITE != '0'  ";
	var oRes3 = oQryObj3.ExecuteSql(vSQL3);
	var oXmlDoc3 = InitXml(oRes3);
	var oRows3 = FindItem("Flds", oXmlDoc3, true);
	if  ( GetItemValue("Nbr", oRows3[0]) == 0 && CurrentRecord["ExtCntrlQltStatutdemCQ"] != "Demande sans CQ" && CurrentRecord["ExtCntrlQltStatutdemCQ"] != "Demande Loading Check" && CurrentRecord["ExtCntrlQltStatutdemCQ"] != "Demande pré-CQ") {
	 throw "You are not allowed to make this request as the taquet CQ value  = 0 !!";
	 return false;
	 delete oQryObj3;
	}
	// HAS Debut 28/10/2018 : si aucun sample valide alors bloquer insertion CQ
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL2 = "  select  count (*) as Nbr from sysadm.x_echantillon  where dc0_nrid = :QuoNRID and template is null and STATUS_ECHANTILLON in ('Validé sous condition', 'Confirmé sans échantillon', 'Validé')  ";
	var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	var oXmlDoc2 = InitXml(oRes2);
	var oRows2 = FindItem("Flds", oXmlDoc2, true);
	if (GetItemValue("Nbr", oRows2[0]) == 0) {
	 throw "You need a validated sample to make a CQ request !!";
	 return false;
	 delete oQryObj2;
	}
	
	// HAS : si demande acheteur en cours alors impossible de rajouter une autre demande
	var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = "  select  count (*) as Nbr from sysadm.x_controle_qualite  where dc0_nrid = :QuoNRID and template is null and STATUTCQ is null  ";
	var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	var oXmlDoc1 = InitXml(oRes1);
	var oRows1 = FindItem("Flds", oXmlDoc1, true);
	if (GetItemValue("Nbr", oRows1[0]) > 0) {
	 throw "Another CQ request is already in progress, Please follow it up";
	 return false;
	 delete oQryObj1;
	}
	
	var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL = "select  count (*) as Nbr from dc0  where  template is null and XSTATOFF not in ('3. Perdue','6. Annulée') and ((xstatutrt = 'Validé'  and (XSTATUTPACK = 'Validé' or XSTATUTPACK = 'Sans Packaging') and XRAPTEST = 'Obligatoire') or (XRAPTEST  = 'Non Obligatoire' ) or (xDerogation = 'OUI') ) and nrid = :QuoNRID  ";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	if (GetItemValue("Nbr", oRows[0]) == 0 && CurrentRecord["ExtCntrlQltStatutdemCQ"] != "Demande pré-CQ") {
	 throw "You Need a valid offer and Norms Validation before Requesting CQ !! ";
	 return false;
	 delete oQryObj;
	} else {
	
	 if (CurrentRecord["ExtCntrlQltNoCQ"] == "" || CurrentRecord["ExtCntrlQltNoCQ"] == null || CurrentRecord["ExtCntrlQltNoCQ"] == "10000" || CurrentRecord["ExtCntrlQltNoCQ"] == 1) {
	  var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var vSQL = "select max(isnull(no_CQ,0))+1 as mngach from  x_controle_qualite where template is null and  dc0_nrid = :QuoNRID";
	  var oRes = oQryObj.ExecuteSql(vSQL);
	  var oXmlDoc = InitXml(oRes);
	  var oRows = FindItem("Flds", oXmlDoc, true);
	
	  if (GetItemValue("mngach", oRows[0]) == "" || GetItemValue("mngach", oRows[0]) == null) CurrentRecord["ExtCntrlQltNoCQ"] = 1
	  else CurrentRecord["ExtCntrlQltNoCQ"] = GetItemValue("mngach", oRows[0]);
	  delete oQryObj;
	 }
	}
	//CurrentRecord["ExtCntrlQltStatutdemCQ"] = "";
	if (CurrentRecord["ExtCntrlQltStatutdemCQ"] != "" && CurrentRecord["ExtCntrlQltStatutdemCQ"] != null && CurrentRecord["ExtCntrlQltStatutdemCQ"] != "33333333333333333" && CurrentRecord.IsUpdated("ExtCntrlQltStatutdemCQ") == true) {
	 CurrentRecord["ExtCntrlQltDateDemande"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["ExtCntrlQltHeureDemande"] = DateTime.Now.ToString("HH:mm:ss");
	 CurrentRecord["ExtCntrlQltUserDemCQ"] = CurrentUserName;
	
	}
	//throw "dfgdfgdf"+ CurrentRecord["ExtCntrlQltStatutdemCQ"] ;
}