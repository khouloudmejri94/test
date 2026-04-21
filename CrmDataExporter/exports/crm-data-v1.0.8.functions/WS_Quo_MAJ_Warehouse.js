function(pQuoOppReference,pQuoCustReference,pQuoExtStatutWH,pQuoExtRepWH,pQuoExtDateLivWH)
{
	// SIR && HIC @ozeol 25/05/2018
	try
	 {
	 
	    var MyQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 
	    
	     var vStatutWh =""
	     switch (pQuoExtStatutWH) 
	     {
	      case 'IP' : vStatutWh =  "En cours";  break ;
	      case 'DR' : vStatutWh =  "Demande Réception";  break ;
	      case 'LV' : vStatutWh =  "Livré";  break ;
	      case 'ST' : vStatutWh =  "Stand by";  break ;
	     case 'AN' : vStatutWh =  "Annulé";  break ;
	   default: '';
	     }
	 
	   var vRetour = '';
	   var vSQL = "SELECT * FROM SYSADM.dc0 WHERE vos_ref = '"+ pQuoCustReference +"'";
	   var MyResult = MyQryObj.ExecuteSql(vSQL); 
	   var MyXmlDocument = InitXml(MyResult);
	   var MyRows = FindItem("Flds", MyXmlDocument, true);
	   if(MyRows.Count == 1)
	   {
	     var nQuoNRID = GetItemValue("QuoNRID", MyXmlDocument); 
	     var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	     var mySelectionRow : SelectionRow = new SelectionRow();
	     objQuotation.Open(nQuoNRID);
	     mySelectionRow.Fields["QuoExtStatutWH"] = vStatutWh;
	     mySelectionRow.Fields["QuoExtRepWH"] = pQuoExtRepWH;
	     mySelectionRow.Fields["QuoExtDateLivWH"] = pQuoExtDateLivWH;
	     objQuotation.SetValues(mySelectionRow);
	     objQuotation.Save();
	   }
	   else
	   {
	     if(MyRows.Count >= 1)
	     {
	       vRetour = "Erreur : Il existe plusieurs offres avec ce numéro !! ";          
	     }
	     else  
	     {
	       vRetour = "Erreur : Ce numéro d'offre n’existe pas dans le CRM ! ";
	     }
	   }
	 }
	 catch(e)
	 {
	   vRetour = e.description.substring(0, 2000);
	 }
	 finally 
	 {
	   var vMethode = "ZANSWER_WAREHOUSE";
	   var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pQuoExtStatutWH + ";" +pQuoExtRepWH + ";" +pQuoExtDateLivWH;
	   vXmlRequest = vXmlRequest.replace(/'/g, "''");
	   MyQryObj.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	   MyQryObj.Dispose();
	   FreeSelligentObject(MyQryObj);
	   //mySelect.Dispose();
	   //FreeSelligentObject(mySelect);
	   return vRetour; 
	 }
}