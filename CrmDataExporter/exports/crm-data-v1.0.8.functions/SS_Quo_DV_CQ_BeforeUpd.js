function()
{
	//init CurrentRecord
	 
	try{
	  var vFonction = Session["ResFunction"];
	//throw "ma fonction est"+ vProfil;
	if (vFonction == 'Negociateur' || vFonction == 'Team Leader Negociation') {
	  throw "This function is not autorised for negociators";
	}
	}catch(e){
	   throw "Only Supply Chain can do this request";
	}
	 
	// [Hichem] controle qualité - Contrôle de saisie champ "E-mail de cde"
	var email = CurrentRecord["ExtCntrlQltMail"];
	var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	if (email) {
	 if (!email.match(re)) {
	  //alert("Vérifiez l'E-mail de commande, s'il vous plait.");
	  throw "Check the e-mail please! ";
	  return false;
	  delete oQryObj;
	 } else {
	  //return true;
	 }
	}
	// [Hichem] Contrôle de saisie champ "Num Tel"
	var re = /^\d+$/;
	var telNbr = CurrentRecord["ExtCntrlQltNumTel"];
	if (telNbr) {
	 if (!telNbr.match(re)) {
	  throw "Check the Telephone number please! ";
	  return false;
	  delete oQryObj;
	 } else {
	  //return true;
	 }
	}
	
	try {
	 var v = "";
	 if (CurrentRecord["ExtCntrlQltNoCQ"] == "") v = "";
	} catch (e) {
	 CurrentRecord["ExtCntrlQltNoCQ"] = "1000000000000";
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
	// Debut HAS : si demande complète alors alors impossible de l'éditer
	try {
	 var vRep = CurrentRecord["ExtCntrlQltStatutCQ"];
	 if (CurrentRecord.IsUpdated("ExtCntrlQltStatutdemCQ") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtCntrlQltStatutCQ"];
	 if (CurrentRecord.IsUpdated("ExtCntrlQltDetailsDemande") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtCntrlQltStatutCQ"];
	 if (CurrentRecord.IsUpdated("ExtCntrlQltNomContact") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtCntrlQltStatutCQ"];
	 if (CurrentRecord.IsUpdated("ExtCntrlQltAdresseStock") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtCntrlQltStatutCQ"];
	 if (CurrentRecord.IsUpdated("ExtCntrlQltNumTel") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtCntrlQltStatutCQ"];
	 if (CurrentRecord.IsUpdated("ExtCntrlQltMail") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	//Fin FAS: impossible de modifier une demande complète
	var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL = "select  count (*) as Nbr from dc0  where  template is null and XSTATOFF not in ('3. Perdue','6. Annulée') and ((xstatutrt = 'Validé' and (XSTATUTPACK = 'Validé' or XSTATUTPACK = 'Sans Packaging')  and XRAPTEST = 'Obligatoire') or (XRAPTEST  = 'Non Obligatoire' ) or (xDerogation = 'OUI') ) and nrid = :QuoNRID  ";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	if (GetItemValue("Nbr", oRows[0]) == 0 && CurrentRecord["ExtCntrlQltStatutdemCQ"] != "Demande pré-CQ") {
	 throw "You Need a valid offer and Norms Validation before Requesting CQ !! ";
	 return false;
	 delete oQryObj;
	} else {
	
	 //DEBUT FTC@MASAO MANTIS 14444 - 30/01/2018
	 //if(CurrentRecord["ExtCntrlQltNoCQ"] =="" || CurrentRecord["ExtCntrlQltNoCQ"] == null || CurrentRecord["ExtCntrlQltNoCQ"] =="1000000000000"  || CurrentRecord["ExtCntrlQltNoCQ"] == 1)
	 if (CurrentRecord["ExtCntrlQltNoCQ"] == "" || CurrentRecord["ExtCntrlQltNoCQ"] == null || CurrentRecord["ExtCntrlQltNoCQ"] == "1000000000000")
	 //END FTC@MASAO MANTIS 14444 - 30/01/2018
	 {
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
	}
	//throw "dfgdfgdf"+ CurrentRecord["ExtCntrlQltStatutdemCQ"] ;
}