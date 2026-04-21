function()
{
	//init CurrentRecord
	
	/*
	try{
	  var vFonction = Session["ResFunction"];
	//throw "ma fonction est"+ vProfil;
	if (vFonction == 'Negociateur' || vFonction == 'Team Leader Negociation') {
	  throw "This function is not autorised for negociators";
	}
	}catch(e){
	   throw "Only Supply Chain can do this request";
	}
	*/
	
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
	 
	
	
	
	// [Hichem] booking - Contrôle de saisie champ "E-mail de cde"
	var email = CurrentRecord["ExtLgstqMail"];
	var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	if (email)
	{
	 if (!email.match(re))
	 {
	 //alert("Vérifiez l'E-mail de commande, s'il vous plait.");
	    throw "Check the e-mail please! ";
	   return false;
	   delete oQryObj; 
	 }
	 else
	 {
	   //return true;
	 }
	}
	
	// [Hichem] booking Contrôle de saisie champ "Num Tel"
	var re = /^\d+$/;
	var rex = /^[0-9A-Za-z\s\-]+$/;
	var telNbr = CurrentRecord["ExtLgstqNumTel"];
	if (telNbr)
	{
	 if (!telNbr.match(re))
	 {
	    throw "Check the Telephone number please! ";
	   return false;
	   delete oQryObj; 
	 }
	 else
	 {
	   //return true;
	 }
	}
	try
	{
	     var v ="";
	     if(CurrentRecord["ExtLgstqNoBooking"] =="")  v ="";
	}
	catch(e)
	{
	     CurrentRecord["ExtLgstqNoBooking"]="1000000000000";
	}
	// DEB HAS : Si ligne complète alors impossible de modifier
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqStatutBooking") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqVolumeCBM") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqNomContact") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqAdresse") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqNumTel") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqMail") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqCodePaysDep") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	try {
	 var vRep = CurrentRecord["ExtLgstqValidateurBooking"];
	 if (CurrentRecord.IsUpdated("ExtLgstqPortChargement") == true ) {
	  if (vRep != '' && vRep != null && vRep != undefined){
	  throw "You can not change a validated request";
	  }
	 }
	} catch (e) {
	 throw "You can not change a validated request";
	}
	//Fin HAS : si ligne complète alors impossible de modifier
	
	if(CurrentRecord["ExtLgstqNoBooking"] =="" || CurrentRecord["ExtLgstqNoBooking"] == null || CurrentRecord["ExtLgstqNoBooking"] =="1000000000000")
	{ 
	     var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	     var vSQL = "select max(isnull(no_Booking,0))+1 as mngach   from x_logistique  where template is null and  dc0_nrid = :QuoNRID ";
	     var oRes = oQryObj.ExecuteSql(vSQL); 
	     var oXmlDoc = InitXml(oRes);   
	     var oRows = FindItem("Flds", oXmlDoc, true); 
	
	     if(GetItemValue("mngach", oRows[0]) =="" || GetItemValue("mngach", oRows[0]) ==null) CurrentRecord["ExtLgstqNoBooking"]= 1
	     
	     else CurrentRecord["ExtLgstqNoBooking"]= GetItemValue("mngach", oRows[0]); 
	     delete oQryObj; 
	}
	 // SIR: Mandatory fields
	  if((CurrentRecord["ExtLgstqVolumeCBM"] =="" || CurrentRecord["ExtLgstqVolumeCBM"] == null) || (CurrentRecord["ExtLgstqNomContact"] =="" || CurrentRecord["ExtLgstqNomContact"] == null) || (CurrentRecord["ExtLgstqNumTel"] =="" || CurrentRecord["ExtLgstqNumTel"] == null) || (CurrentRecord["ExtLgstqMail"] =="" || CurrentRecord["ExtLgstqMail"] == null) || (CurrentRecord["ExtLgstqCodePaysDep"] =="" || CurrentRecord["ExtLgstqCodePaysDep"] == null) || (CurrentRecord["ExtLgstqPortChargement"] =="") || (CurrentRecord["ExtLgstqPortChargement"] == null))
	  {
	    throw "Fill in the mandatory fields. ";
	     return false;
	   
	  }
	else
	{
	     return true;
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
	              throw("You're not allowed to Change the status "+CurrentRecord["ExtLgstqStatutBooking"]);
	      return false; 
	}
}