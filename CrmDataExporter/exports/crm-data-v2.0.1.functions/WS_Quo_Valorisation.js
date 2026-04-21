function WS_Quo_Valorisation(pQuoOppReference,pQuoCustReference,pQuoExtQteD,pQuoExtQteV,pQuoExtValeurAT,pQuoExtValeurVT,pQuoExtDeviseVA,pQuoExtDeviseVV,pQuoExtDatePreVal,pQuoExtDateDerVal,pQuoExtQteT,pQuoExtNbrPostEnv,pQuoExtNbrPostValid)
{
	// HAS : Début - Frilosité et valorisation : Insertion des valeurs depuis SAP en provenance des IDOCs
	try {
	 var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vRetour = '';
	 var vSQL = "SELECT * FROM SYSADM.dc0 WHERE vos_ref = '" + pQuoCustReference + "'";
	 var MyResult = MyQuery.ExecuteSql(vSQL);
	 var MyXmlDocument = InitXml(MyResult);
	 var MyRows = FindItem("Flds", MyXmlDocument, true);
	 if (MyRows.Count == 1) {
	 var vQuoExtValeurVT = GetItemValue("QuoExtValeurVT", MyXmlDocument);
	 
	 var nQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
	 var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	 var mySelectionRow: SelectionRow = new SelectionRow();
	 objQuotation.Open(nQuoNRID);
	 mySelectionRow.Fields["QuoExtQteD"] = pQuoExtQteD;
	 mySelectionRow.Fields["QuoExtQteV"] = pQuoExtQteV;
	 mySelectionRow.Fields["QuoExtValeurAT"] = pQuoExtValeurAT;
	  if ( (vQuoExtValeurVT != pQuoExtValeurVT  &&  pQuoExtValeurVT != "0.00" )  ||  vQuoExtValeurVT== null ) {
	   mySelectionRow.Fields["QuoExtValeurVT"] = pQuoExtValeurVT;
	  }
	  mySelectionRow.Fields["QuoExtDeviseVA"] = pQuoExtDeviseVA;
	
	  if (  pQuoExtDeviseVV != '' &&  pQuoExtDeviseVV != null ) {
	   mySelectionRow.Fields["QuoExtDeviseVV"] = pQuoExtDeviseVV;
	  }
	  mySelectionRow.Fields["QuoExtDatePreVal"] = pQuoExtDatePreVal;
	  mySelectionRow.Fields["QuoExtDateDerVal"] = pQuoExtDateDerVal;
	  mySelectionRow.Fields["QuoExtQteT"] = pQuoExtQteT;
	  mySelectionRow.Fields["QuoExtNbrPostEnv"] = pQuoExtNbrPostEnv;
	  mySelectionRow.Fields["QuoExtNbrPostValid"] = pQuoExtNbrPostValid;
	  objQuotation.SetValues(mySelectionRow);
	  objQuotation.Save();
	 } else {
	  if (MyRows.Count >= 1) {
	   vRetour = "Erreur : Il existe plusieurs offres avec ce numéro !! ";
	  } else {
	   vRetour = "Erreur : Ce numéro d'offre n’existe pas dans le CRM ! ";
	  }
	 }
	} catch (e) {
	 vRetour = e.description.substring(0, 2000);
	} finally {
	 var vMethode = "WS_Quo_Valorisation";
	 var vXmlRequest = pQuoOppReference + ";" + pQuoCustReference + ";" + pQuoExtQteD + ";" + pQuoExtQteV + ";" + pQuoExtValeurAT + ";" + pQuoExtValeurVT + ";" + pQuoExtDeviseVA + ";" + pQuoExtDeviseVV + ";" + pQuoExtDatePreVal + ";" + pQuoExtDateDerVal + ";" + pQuoExtQteT + ";" + pQuoExtNbrPostEnv + ";" + pQuoExtNbrPostValid;
	 vXmlRequest = vXmlRequest.replace(/'/g, "''");
	 MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	 delete MyQuery;
	 MyQuery.Dispose();
	 FreeSelligentObject(MyQuery);
	 return vRetour;
	}
	// FIN HAS : Frilosité et valorisation
}