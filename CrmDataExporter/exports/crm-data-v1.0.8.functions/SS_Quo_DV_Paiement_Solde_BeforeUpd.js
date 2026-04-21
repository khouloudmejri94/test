function()
{
	try {
	  if (CurrentRecord["ExtPmntSldDetailsDemande"] == "") var v1 = "";
	} catch (e) {
	  CurrentRecord["ExtPmntSldDetailsDemande"] = "";
	}
	if (CurrentRecord["ExtPmntSldDetailsDemande"] == "") {
	  throw "la colonne  Détail de la demande est obligatoire "
	  return false
	}
	
	// DEB HAS : Si ligne complète alors impossible de modifier
	try {
	  var vRep = CurrentRecord["ExtPmntSldReponseTraitement"];
	  if (CurrentRecord.IsUpdated("ExtPmntSldStatutSolde") == true || CurrentRecord.IsUpdated("ExtPmntSldDetailsDemande") == true) {
	    if (vRep != '' && vRep != null && vRep != undefined) {
	      throw "You can not change a validated request";
	    }
	  }
	} catch (e) {
	  throw "You can not change a validated request";
	}
	
	try{
	  var vFonction = Session["ResFunction"];
	//throw "ma fonction est"+ vProfil;
	if (vFonction == 'Negociateur' || vFonction == 'Team Leader Negociation') {
	  throw "This function is not autorised for negociators";
	}
	}catch(e){
	   throw "Only Supply Chain can do this request";
	}
	
	
	/*
	try
	{
	    var vStatut = CurrentRecord["ExtPmntSldStatutSolde"];
	 var vRep = CurrentRecord["ExtPmntSldReponsePaiement"];
	    if(CurrentRecord.IsUpdated("ExtPmntSldStatutSolde") == true  && (vRep != '' || vRep != null || vRep != undefined)) {
	  throw "You can not change a validated request";
	 }
	}
	catch(e)
	{
	     throw "You can not change a validated request";
	}
	 
	try
	{
	    var vStatut = CurrentRecord["ExtPmntSldStatutSolde"];
	 var vRep = CurrentRecord["ExtPmntSldReponsePaiement"];
	    if(CurrentRecord.IsUpdated("ExtPmntSldStatutSolde") == true  && (vRep != '' || vRep != null || vRep != undefined)) {
	  throw "You can not change a validated request";
	 }
	}
	catch(e)
	{
	     throw "You can not change a validated request";
	}
	*/
		//init CurrentRecord
	try
	{
	     var v ="";
	     if(CurrentRecord["ExtPmntSldNoDemande"] =="")  v ="";
	}
	catch(e)
	{
	     CurrentRecord["ExtPmntSldNoDemande"]="1000000000000";
	}
	
	if(CurrentRecord["ExtPmntSldNoDemande"] =="" || CurrentRecord["ExtPmntSldNoDemande"] == null || CurrentRecord["ExtPmntSldNoDemande"] =="1000000000000")
	{ 
	 //throw "kjksdfsdfsdfsdfsdjkj" + CurrentRecord["ExtPmntSldNoDemande"] ;
	     var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	     var vSQL = "select max(isnull(no_demande,0))+1 as mngach  from x_paiement_solde where template is null and dc0_nrid = :QuoNRID ";
	     var oRes = oQryObj.ExecuteSql(vSQL); 
	     var oXmlDoc = InitXml(oRes);   
	     var oRows = FindItem("Flds", oXmlDoc, true); 
	
	     if(GetItemValue("mngach", oRows[0]) =="" || GetItemValue("mngach", oRows[0]) ==null) CurrentRecord["ExtPmntSldNoDemande"]= 1
	     
	     else CurrentRecord["ExtPmntSldNoDemande"]= GetItemValue("mngach", oRows[0]); 
	     delete oQryObj; 
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