function WS_Quo_Creation_Manuelle(pQuoCustReference,pQuoOppReference,pQuoCreationDate,pQuoExtHeureCreation,pQuoExtStatOff,pQuoExtCreateur,pQuoExtCPAff,pQuoExtClient,pQuoExtDateAValider,pQuExtSocCAENom,pQuoExtArgNeg,pQuoExtNotAFF,pQuoExtComSpec,pQuoCpyCODE)
{
	 try
	{
	  var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var vRetour = 'OK';
	  var vSQL = "SELECT nrid FROM SYSADM.do0 WHERE ref = '"+ pQuoOppReference +"'";
	  var MyResult = MyQuery.ExecuteSql(vSQL);
	  var MyXmlDocument = InitXml(MyResult);
	  var nOppNRID = GetItemValue("OppNRID", MyXmlDocument);
	
	   var vStatusOffre =""
	   switch (pQuoExtStatOff ) 
	   {
	    case 'VL' : vStatusOffre =  '1. Valorisé';  break ;
	    case 'NG' : vStatusOffre =  '2. Négocié';  break ;
	    case 'PE' : vStatusOffre =  '3. Perdue';  break ;
	    case 'AC' : vStatusOffre =  '4. Acceptée';  break ;
	    case 'CC' : vStatusOffre =  '5. Commandée';  break ;
	    case 'AN' : vStatusOffre =  '6. Annulée';  break ;
	    default: '';
	   }
	   
	
	  //Fournissuer
	  var nCpyNRID = "";
	  var vCpyName = "";
	  var vCpyCode = ""; 
	  //on va chercher le so0.nrid et le so0.societe
	  var vSQL = "select so0.nrid, so0.societe,so0.cd from so0 so0 where so0.cd = '" + pQuoCpyCODE + "'";
	  MyResult = MyQuery.ExecuteSql(vSQL);
	  MyXmlDocument = InitXml(MyResult);
	  nCpyNRID = GetItemValue("CpyNRID",MyXmlDocument);
	  vCpyName = GetItemValue("CpyName",MyXmlDocument);
	  vCpyCode = GetItemValue("CpyCode",MyXmlDocument);  
	  
	
	
	
	  var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	  var mySelectionRow : SelectionRow = new SelectionRow();
	  objQuotation.New();
	  mySelectionRow.Fields["QuoCustReference"] = pQuoCustReference;
	  mySelectionRow.Fields["QuoOppReference"] = pQuoOppReference;
	  mySelectionRow.Fields["QuoOppNRID"] = nOppNRID;
	  mySelectionRow.Fields["QuoCreationDate"] = pQuoCreationDate;
	  mySelectionRow.Fields["QuoExtHeureCreation"] = pQuoExtHeureCreation;
	  mySelectionRow.Fields["QuoExtStatOff"] =  vStatusOffre   ;
	  mySelectionRow.Fields["QuoExtCreateur"] = pQuoExtCreateur;
	
	  mySelectionRow.Fields["QuoExtCPAff"] =  pQuoExtCPAff ;
	  mySelectionRow.Fields["QuoExtClient"] =  pQuoExtClient ;
	  mySelectionRow.Fields["QuoExtDateAValider"] =  pQuoExtDateAValider ;
	  mySelectionRow.Fields["QuoExtSocCAENom"] =  pQuExtSocCAENom ;
	  mySelectionRow.Fields["QuoExtArgNeg"] =  pQuoExtArgNeg ;
	  mySelectionRow.Fields["QuoExtNotAFF"] =  pQuoExtNotAFF ;
	  mySelectionRow.Fields["QuoExtComSpec"] =  pQuoExtComSpec ;
	  mySelectionRow.Fields["QuoCpyName"] =  vCpyName  ;
	  mySelectionRow.Fields["QuoCpyNRID"] =  nCpyNRID  ;
	  mySelectionRow.Fields["QuoExtNumFour"] =  vCpyCode ;
	
	
	  objQuotation.SetValues(mySelectionRow);
	  objQuotation.Save();
	}
	catch(e)
	{
	  vRetour = e.description.substring(0, 2000);
	}
	finally 
	{
	  var vMethode = "WS_Quo_Creation_Manuelle";
	  var vXmlRequest = pQuoCustReference + ";" + pQuoOppReference + ";" + pQuoCreationDate + ";" + pQuoExtHeureCreation + ";" + pQuoExtStatOff + ";" + pQuoExtCreateur
	  + ";" +pQuoExtCPAff 
	  + ";" +pQuoExtClient 
	+ ";" +pQuoExtDateAValider 
	+ ";" +pQuExtSocCAENom 
	+ ";" +pQuoExtArgNeg 
	+ ";" +pQuoExtNotAFF 
	+ ";" +pQuoExtComSpec 
	+ ";" +vCpyName  
	+ ";" +nCpyNRID  
	+ ";" +vCpyCode  ;
	
	  vXmlRequest = vXmlRequest.replace(/'/g, "''");
	  MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + pQuExtSocCAENom.replace(/'/g, "''") + "', getdate())");
	  delete MyQuery;
	  return vRetour ;
	}
}