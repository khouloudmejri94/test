function(pData)
{
	 /*************************************************************/
	  // Société                                : LUXHOLD INVEST SA
	  // Nom script                             : WS_MAJ_LotAtypique
	  // Infos Paramètres                       : 
	  // Auteur                                 : HAS                                          
	  // Chapitre concerné                      : Affaire  
	  // Date de création                       : 28/04/2021
	  // Modifié par                            :                                   
	  // Date de modification                   :  
	  // Commentaires                           : Maj lot HUB -> CDM
	  /*************************************************************/
		//MAJ LOT ATYPIQUE 38699761300348
	//   1044271|Agroalimentaire|AD|CAT MARKET|
	try {
	 var vdata = [];
	 vdata = pData.split('|');
	 var pOppReference = vdata[0];
	 var pOppExtCategorie = vdata[1];
	 var pStatut = vdata[2];
	 var pCatman1 = vdata[3];
	 var pCatman2 = vdata[4];
	 var vStatut = "";
	 switch (pStatut) {
	  case 'AD': //  Attente de decision
	   vStatut = 'Attente de décision';
	   break;
	  case 'LR': //Lot Refusé
	   vStatut = 'Non intéressé';
	   break;
	  case 'LS': //Lot Selectionné
	   vStatut = 'Intéressé';
	   break;
	  default:
	   '';
	 }
	 vRetour = '';
	 var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vRetour = '';
	 var vSQL = "SELECT * FROM SYSADM.do0 WHERE ref = '" + pOppReference + "'";
	 var MyResult = MyQuery.ExecuteSql(vSQL);
	 var MyXmlDocument = InitXml(MyResult);
	 var MyRows = FindItem("Flds", MyXmlDocument, true);
	 if (MyRows.Count == 1) {
	  var nOppNRID = GetItemValue("OppNRID", MyXmlDocument);
	  var objAffair = CreateSelligentObject("Opportunity", CurrentSessionID, true);
	  var mySelectionRow: SelectionRow = new SelectionRow();
	  objAffair.Open(nOppNRID);
	  mySelectionRow.Fields["OppExtCategorie"] = pOppExtCategorie;
	  if (pCatman1 != '' && pCatman1 != null) {
	   mySelectionRow.Fields["OppExtClient1Dec"] = vStatut;
	   mySelectionRow.Fields["OppExtClient1"] = pCatman1;
	   mySelectionRow.Fields["OppExtClient1DateDec"] = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
	  } else if (pCatman2 != '' && pCatman2 != null) {
	   mySelectionRow.Fields["OppExtClient2Dec"] = vStatut;
	   mySelectionRow.Fields["OppExtClient2"] = pCatman2;
	   mySelectionRow.Fields["OppExtClient2DateDec"] = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
	  }
	  objAffair.SetValues(mySelectionRow);
	  objAffair.Save();
	  //mySelectionRow.Dispose();
	  FreeSelligentObject(mySelectionRow);
	  vRetour = "S Affaire mise à jour dans le CRM";
	 } else {
	  if (MyRows.Count >= 1) {
	   vRetour = "Erreur : Il existe plusieurs affaire avec ce numéro !! ";
	  } else {
	   vRetour = "Ce numéro d’affaire n’existe pas dans le CRM ! ";
	  }
	 }
	} catch (e) {
	 vRetour = e.description.substring(0, 2000);
	} finally {
	 var vMethode = "WS_Opp_Maj_Lot";
	 var vXmlRequest = pOppReference + "|" + pOppExtCategorie + "|" + vStatut + "|" + pCatman1 + "|" + pCatman2;
	 vXmlRequest = vXmlRequest.replace(/'/g, "''");
	 MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	 MyQuery.Dispose();
	 FreeSelligentObject(MyQuery);
	 delete MyQuery;
	 return vRetour;
	}
}