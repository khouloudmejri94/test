function()
{
	
	
	try
	{
	     if(CurrentRecord["ExtPmntSldDetailsDemande"] =="") var v1 ="";
	}
	catch(e)
	{
	     CurrentRecord["ExtPmntSldDetailsDemande"]= "";
	}
	if(CurrentRecord["ExtPmntSldDetailsDemande"] =="") 
	{
	     throw "la colonne  Détail de la demande est obligatoire "
	     return false
	}
	/*
	try {
	    var vFonction = Session["ResFunction"];
	    var oQrySCH = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var vSqlSCH = "select  count (*) as Nbr1 from dc0  where  template is null and xoldcmd ='1' and nrid = :QuoNRID  ";
	    var oResSCH = oQrySCH.ExecuteSql(vSqlSCH);
	    var oXmlDocSCH = InitXml(oResSCH);
	    var oRowsSCH = FindItem("Flds", oXmlDocSCH, true);
	    if (vFonction == 'Negociateur' || vFonction == 'Team Leader Negociation')  {
	        if (GetItemValue("Nbr1", oRowsSCH[0]) == 0) {
	        throw "This function is not autorised for negociators";
	        delete oQrySCH;
	        }
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
		//init CurrentRecord
	try {
	    var v = "";
	    if (CurrentRecord["ExtPmntSldNoDemande"] == "") v = "";
	} catch (e) {
	    CurrentRecord["ExtPmntSldNoDemande"] = "10000";
	}
	// HAS : si demande acheteur en cours alors impossible de rajouter une autre demande
	var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = "  select count (*) as Nbr  from sysadm.x_paiement_solde  where template is null and STATUT_SOLDE = 'Demande envoyée' and dc0_nrid = :QuoNRID ";
	var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	var oXmlDoc1 = InitXml(oRes1);
	var oRows1 = FindItem("Flds", oXmlDoc1, true);
	if (GetItemValue("Nbr", oRows1[0]) > 0) {
	 throw "Another Balance request is already in progress, Please follow it up";
	 return false;
	 delete oQryObj1;
	}
	 
	// HAS : Si offre avec statut Commandée + Validation normes +  Validation CQ= "Validé" ou "Sans CQ"  => alors l'acheteur peut faire la demande de solde
	var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = "select  count (*) as Nbr from x_controle_qualite  where dc0_nrid = :QuoNRID and template is null and STATUTCQ in ('','Validé tot', 'Validé partiel', 'Sans CQ' , 'PréCQ validé' , 'Validation before Loading Check' ) ";
	var vSQL2 = "select  count (*) as Nbr2 from dc0  where  template is null and XVALIDATIONNORMES != 'Non validé' and XSTATOFF = '5. Commandée' and nrid = :QuoNRID  ";
	var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	var oXmlDoc1 = InitXml(oRes1);
	var oRows1 = FindItem("Flds", oXmlDoc1, true);
	var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	var oXmlDoc2 = InitXml(oRes2);
	var oRows2 = FindItem("Flds", oXmlDoc2, true);
	
	if (GetItemValue("Nbr", oRows1[0]) == 0 || GetItemValue("Nbr2", oRows2[0]) == 0) {
	    throw "You need Offer status 5. Order, CQ Validation and Norms Validation before requesting for Booking";
	    return false;
	    delete oQryObj1;
	    delete oQryObj2;
	} else {
	
	    // END HAS : Suivi demande 
	    if (CurrentRecord["ExtPmntSldNoDemande"] == "" || CurrentRecord["ExtPmntSldNoDemande"] == null || CurrentRecord["ExtPmntSldNoDemande"] == "10000" || CurrentRecord["ExtPmntSldNoDemande"] == 1) {
	
	     CurrentRecord["ExtPmntSldUserDemSolde"] = CurrentUserName;
	     //throw "kjksdfsdfsdfsdfsdjkj" + CurrentRecord["ExtPmntSldNoDemande"] ;
	        var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var vSQL = "select max(isnull(no_demande,0))+1 as mngach  from x_paiement_solde where template is null and dc0_nrid = :QuoNRID ";
	        var oRes = oQryObj.ExecuteSql(vSQL);
	        var oXmlDoc = InitXml(oRes);
	        var oRows = FindItem("Flds", oXmlDoc, true);
	
	        if (GetItemValue("mngach", oRows[0]) == "" || GetItemValue("mngach", oRows[0]) == null) CurrentRecord["ExtPmntSldNoDemande"] = 1
	        else CurrentRecord["ExtPmntSldNoDemande"] = GetItemValue("mngach", oRows[0]);
	        delete oQryObj;
	    }
	}
	 
		try
	{
	     var v2 ="";
	     if(CurrentRecord["ExtPmntSldStatutSolde"] =="") CurrentRecord["ExtPmntSldStatutSolde"] ="";
	}
	catch(e)
	{
	     CurrentRecord["ExtPmntSldStatutSolde"]="";
	}
	try
	{
	     var v3 ="";
	     if(CurrentRecord["ExtPmntSldDateDemandeSolde"] =="") v3 ="";
	}
	catch(e)
	{
	     CurrentRecord["ExtPmntSldDateDemandeSolde"]="";
	}
	  
	//CurrentRecord["ExtPmntSldStatutSolde"] = "";
	if(CurrentRecord["ExtPmntSldStatutSolde"] == "Demande envoyée" && CurrentRecord.IsUpdated("ExtPmntSldStatutSolde") ==true )
	{
	           CurrentRecord["ExtPmntSldDateDemandeSolde"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
}