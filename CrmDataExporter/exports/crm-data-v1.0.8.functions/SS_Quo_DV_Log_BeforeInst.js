function()
{
	 try
	{
	    
	    if( (CurrentRecord["ExtLgstqStatutBooking"] =="" || CurrentRecord["ExtLgstqStatutBooking"] == null) || (CurrentRecord["ExtLgstqVolumeCBM"] =="" || CurrentRecord["ExtLgstqVolumeCBM"] == null) || (CurrentRecord["ExtLgstqNomContact"] =="" || CurrentRecord["ExtLgstqNomContact"] == null) || (CurrentRecord["ExtLgstqNumTel"] =="" || CurrentRecord["ExtLgstqNumTel"] == null) || (CurrentRecord["ExtLgstqMail"] =="" || CurrentRecord["ExtLgstqMail"] == null) || (CurrentRecord["ExtLgstqCodePaysDep"] =="" || CurrentRecord["ExtLgstqCodePaysDep"] == null) || (CurrentRecord["ExtLgstqPortChargement"] =="") || (CurrentRecord["ExtLgstqPortChargement"] == null))
	 throw "TRY BLOC 1  !!!";  
	}
	catch(e)
	{
	     throw "Please Complete All Fields  !!";
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
	
	// HAS : test format Email
	try {
	    if (CurrentRecord["ExtLgstqMail"] == "") var v1 = "";
	} catch (e) {
	    CurrentRecord["ExtLgstqMail"] = "";
	}
	var email = CurrentRecord["ExtLgstqMail"];
	var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	if (email != '' && email != undefined)
	{
	 if (!email.match(re))
	 {
	    throw "Check the e-mail please! ";
	   return false;
	 }
	}
	
	 // HAS : test format Num Tel
	try {
	    if (CurrentRecord["ExtLgstqNumTel"] == "") var v2 = "";
	} catch (e) {
	    CurrentRecord["ExtLgstqNumTel"] = "";
	} 
	 var re = /^\d+$/;
	var rex = /^[0-9A-Za-z\s\-]+$/;
	var telNbr = CurrentRecord["ExtLgstqNumTel"];
	if (telNbr != '' && telNbr != undefined)
	{
	 if (!telNbr.match(re))
	 {
	    throw "Check the Telephone number please! ";
	   return false; 
	 }
	}
	 
		try {
	    var v = "";
	    if (CurrentRecord["ExtLgstqNoBooking"] == "") v = "";
	} catch (e) {
	    CurrentRecord["ExtLgstqNoBooking"] = "10000";
	}
	// HAS : si demande acheteur en cours alors impossible de rajouter une autre demande
	var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = " select  count (*) as Nbr from sysadm.x_logistique  where template is null and STATUT_BOOKING = 'Demande de booking' and dc0_nrid = :QuoNRID ";
	var oRes1 = oQryObj1.ExecuteSql(vSQL1);
	var oXmlDoc1 = InitXml(oRes1);
	var oRows1 = FindItem("Flds", oXmlDoc1, true);
	if (GetItemValue("Nbr", oRows1[0]) > 0) {
	 throw "Another Logistic request is already in progress, Please follow it up";
	 return false;
	 delete oQryObj1;
	}
	
	// HAS : Si statut commandée + Validation normes +  Validation CQ= "Validé" ou "Sans CQ"  => alors l'acheteur peut faire la demande booking
	var oQryObj1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSQL1 = "select  count (*) as Nbr from x_controle_qualite  where dc0_nrid = :QuoNRID and template is null and STATUTCQ in ('Validé tot', 'Validé partiel', 'Sans CQ'  , 'Validation before Loading Check') ";
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
	    if (CurrentRecord["ExtLgstqNoBooking"] == "" || CurrentRecord["ExtLgstqNoBooking"] == null || CurrentRecord["ExtLgstqNoBooking"] == "10000" || CurrentRecord["ExtLgstqNoBooking"] == 1) {
	          CurrentRecord["ExtLgstqUserDemBK"] = CurrentUserName;
	        var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var vSQL = "select max(isnull(no_Booking,0))+1 as mngach   from x_logistique  where template is null and  dc0_nrid = :QuoNRID ";
	        var oRes = oQryObj.ExecuteSql(vSQL);
	        var oXmlDoc = InitXml(oRes);
	        var oRows = FindItem("Flds", oXmlDoc, true);
	
	        if (GetItemValue("mngach", oRows[0]) == "" || GetItemValue("mngach", oRows[0]) == null) CurrentRecord["ExtLgstqNoBooking"] = 1
	        else CurrentRecord["ExtLgstqNoBooking"] = GetItemValue("mngach", oRows[0]);
	        delete oQryObj;
	    }
	}
	 
		try
	{
	     var v2 ="";
	     if(CurrentRecord["ExtLgstqStatutBooking"] =="") CurrentRecord["ExtLgstqStatutBooking"] ="";
	}
	catch(e)
	{
	     CurrentRecord["ExtLgstqStatutBooking"]="";
	}
	try
	{
	     var v3 ="";
	     if(CurrentRecord["ExtLgstqDateDemandeBooking"] =="") v3 ="";
	}
	catch(e)
	{
	     CurrentRecord["ExtLgstqDateDemandeBooking"]="";
	}
	  
	//CurrentRecord["ExtLgstqStatutBooking"] = "";
	if(CurrentRecord["ExtLgstqStatutBooking"] == "Demande de booking" && CurrentRecord.IsUpdated("ExtLgstqStatutBooking")==true)
	{
	           CurrentRecord["ExtLgstqDateDemandeBooking"] = DateTime.Now.ToString("dd/MM/yyyy");
	
	}
}