function WS_Quo_MAJ_Statut(pQuoCustReference,pQuoExtStatOff,pQuoExtRefAR,pQuoExtDatePerdue,pQuoExtRaisonOffre,pQuoExtResDemande,pQuoExtCmdSBraison,pQuoExtCmdSBdate,pQuoExtCmdSBheure)
{
	try {
	 var vStatusOffre = ""
	 switch (pQuoExtStatOff) {
	  case 'VL':
	   vStatusOffre = '1. Valorisé';
	   break;
	  case 'NG':
	   vStatusOffre = '2. Négocié';
	   break;
	  case 'PE':
	   vStatusOffre = '3. Perdue';
	   break;
	  case 'AC':
	   vStatusOffre = '4. Acceptée';
	   break;
	  case 'CC':
	   vStatusOffre = '5. Commandée';
	   break;
	  case 'AN':
	   vStatusOffre = '6. Annulée';
	   break;
	  case 'SB':
	   vStatusOffre = '7. StandBy';
	   break;
	  case 'RV':
	   vStatusOffre = '1.1 Revalorisée';
	   break;
	  default:
	   '';
	 }
	
	 var vRaisonOffre = ""
	 switch (pQuoExtRaisonOffre) {
	  case '01':
	   vRaisonOffre = 'Perdue/ Stock Client';
	   break;
	  case '02':
	   vRaisonOffre = 'Perdue/Doublon';
	   break;
	  case '03':
	   vRaisonOffre = 'N.C/Prix';
	   break;
	  case '04':
	   vRaisonOffre = 'N.C/Quatité';
	   break;
	  case '05':
	   vRaisonOffre = 'N.C/Stock vendu';
	   break;
	  case '06':
	   vRaisonOffre = 'N.C/Réactivité Client';
	   break;
	  case '07':
	   vRaisonOffre = 'N.C/Quantité';
	   break;
	  case '08':
	   vRaisonOffre = 'N.C/Provenance';
	   break;
	  case '09':
	   vRaisonOffre = 'N.C/Modalité de paiement';
	   break;
	  case '10':
	   vRaisonOffre = 'N.C/Echantillon';
	   break;
	  case '11':
	   vRaisonOffre = 'N.C/Conformité';
	   break;
	  case '12':
	   vRaisonOffre = 'Annulée';
	   break;
	  case '13':
	   vRaisonOffre = 'Perdue Auto OZ';
	   break;
	  default:
	   '';
	 }
	
	 var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vRetour = '';
	 var vSQL = "SELECT * FROM SYSADM.dc0 WHERE vos_ref = '" + pQuoCustReference + "'";
	 var MyResult = MyQuery.ExecuteSql(vSQL);
	
	 var MyXmlDocument = InitXml(MyResult);
	 var MyRows = FindItem("Flds", MyXmlDocument, true);
	
	 if (MyRows.Count == 1) {
	  var nQuoNRID = GetItemValue("QuoNRID", MyXmlDocument);
	  var vOldResponse = GetItemValue("QuoExtResDemande", MyXmlDocument);
	  var objQuotation = CreateSelligentObject("Quotation", CurrentSessionID, true);
	  var mySelectionRow: SelectionRow = new SelectionRow();
	  objQuotation.Open(nQuoNRID);
	  if (mySelectionRow.Fields["QuoExtStatOff"] != vStatusOffre) {
	   mySelectionRow.Fields["QuoExtStatOff"] = vStatusOffre;
	  }
	  // Debut HAS : Ajouter annule et remplace 
	  mySelectionRow.Fields["QuoExtRefAR"] = pQuoExtRefAR;
	  // Debut HAS : Ajouter date perdue et motif
	  mySelectionRow.Fields["QuoExtDatePerdue"] = pQuoExtDatePerdue;
	  mySelectionRow.Fields["QuoExtRaisonOffre"] = vRaisonOffre;
	  //Debut HAS: 02/01/2019 - mettre compteur EXPIRED! si on reçoit la mise en PERDU AUTO
	  if (pQuoExtRaisonOffre == '13') {
	   mySelectionRow.Fields["QuoExtCompteur"] = 'EXPIRED!';
	  }
	
	  // HAS DEB - 02/08/2019 : ajouter les nouveau champ de mise en standby + reactiver les appels acheteur
	  if (pQuoExtStatOff == 'SB') {
	
	   // HAS DEB : test insertion dans la table do6
	   ///////////////////////////var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	   //var pQuoExtCmdSBraison = "01 02";
	   //////////////////////////var nQuoNRID =  pQuoCustReference ; //CurrentRecord["QuoNRID"];
	   var ArrRaisonSB = [];
	   if (pQuoExtCmdSBraison != '' && pQuoExtCmdSBraison != null && pQuoExtCmdSBraison != undefined) {
	    ArrRaisonSB = pQuoExtCmdSBraison.split(' ');
	    var count = ArrRaisonSB.length;
	    //throw "le nombre des elements de la chaine est : " +count;
	
	
	    if (ArrRaisonSB.length > 0) {
	     try {
	      var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	      var ProcParam1: StoredProcParam[] = new StoredProcParam[1];
	
	
	      ProcParam1[0] = new StoredProcParam("pdc0_nrid", "NUMBER", "IN", 200, nQuoNRID);
	      var strResultProc = ObjSQL.ExecuteStoredProc("Reset_SB_Commande", ProcParam1);
	     } catch (e) {
	      //Selligent.Library.Monitor.Tracer.Write(nQuoNRID  , false);
	      throw (e.message);
	     }
	
	     var vListRaison = "";
	     for (var i = 0; i < ArrRaisonSB.length; i++) {
	      var strRaison = ArrRaisonSB[i];
	      //throw "le numero de la première raison est : " +strRaison;
	      var vRaisonSbCmd = "";
	      switch (strRaison) {
	       case '01':
	        vRaisonSbCmd = 'Manque E-mail de confirmation';
	        break;
	       case '02':
	        vRaisonSbCmd = 'Commande non rentable';
	        break;
	       case '03':
	        vRaisonSbCmd = 'Désignation erronée';
	        break;
	       case '04':
	        vRaisonSbCmd = 'Prix erroné';
	        break;
	       case '05':
	        vRaisonSbCmd = 'Document mal rempli';
	        break;
	       case '06':
	        vRaisonSbCmd = 'Manque document';
	        break;
	       case '07':
	        vRaisonSbCmd = 'Autre motif SB commande';
	        break;
	       case '08':
	        vRaisonSbCmd = 'Mise a jour offre';
	        break;
	       default:
	        '';
	      }
	
	      // HAS DEB  - 02/09/2019 - Ajouter la liste des motifs dans le champ commentaire avec retour a la ligne
	      var tRaisonSbCmd = "";
	      switch (strRaison) {
	       case '01':
	        tRaisonSbCmd = 'Missing confirmation e-mail';
	        break;
	       case '02':
	        tRaisonSbCmd = 'Order is unprofitable';
	        break;
	       case '03':
	        tRaisonSbCmd = 'Description is not conform';
	        break;
	       case '04':
	        tRaisonSbCmd = 'Wrong price';
	        break;
	       case '05':
	        tRaisonSbCmd = 'Files is not properly filled';
	        break;
	       case '06':
	        tRaisonSbCmd = 'Lack of document';
	        break;
	       case '07':
	        tRaisonSbCmd = 'Other StandBy reason';
	        break;
	       case '08':
	        tRaisonSbCmd = 'Update offer';
	        break;
	       default:
	        '';
	      }
	      if (vListRaison != '') {
	       vListRaison = vListRaison + '\r' + '- ' + tRaisonSbCmd;
	      } else {
	       vListRaison = '- ' + tRaisonSbCmd;
	      }
	
	
	      var MyQueryAff = CreateSelligentObject("SqlHelper", CurrentSessionID);
	      var vSqlAffaire = " select (select max(isnull(nrid,0))+1  from sysadm.dc6 ) as vNRID, (select top 1 rid from sysadm.dc6 order by dmod desc) as vRID ";
	
	      var MyResultAff = MyQueryAff.ExecuteSql(vSqlAffaire);
	      var MyXmlCompareAff = InitXml(MyResultAff);
	      var MyRowsAff = FindItem("Flds", MyXmlCompareAff, true);
	      if (MyRowsAff.Count == 1) {
	       var nNRID = GetItemValue("vNRID", MyRowsAff[0]);
	       var nRID = GetItemValue("vRID", MyRowsAff[0]);
	       //throw "NEW NRID  " + nNRID + '\r' + "RID  " + nRID;
	      }
	
	      // HAS : récuperer le rowid de chaque item
	      var MyQueryAp01 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	      var vSqlAp01 = " SELECT  row_id as rowap01 FROM ap01 WHERE name = '" + vRaisonSbCmd + "' ";
	      var MyResultAp01 = MyQueryAp01.ExecuteSql(vSqlAp01);
	      var MyXmlap01 = InitXml(MyResultAp01);
	      var MyRowsAp01 = FindItem("Flds", MyXmlap01, true);
	      if (MyRowsAp01.Count == 1) {
	       var vap01_row_id = GetItemValue("rowap01", MyRowsAp01[0]);
	       //throw "ID de la ligne dans AP01 est :" + vap01_row_id;
	      }
	      // HAS : récuperer le rowid de chaque item
	      try {
	       var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	       var ProcParam: StoredProcParam[] = new StoredProcParam[5];
	       ProcParam[0] = new StoredProcParam("pnrid", "NUMBER", "IN", 200, nNRID);
	       ProcParam[1] = new StoredProcParam("prid", "VARCHAR", "IN", 50, nRID);
	       ProcParam[2] = new StoredProcParam("pap01_row_id", "NUMBER", "IN", 200, vap01_row_id);
	       ProcParam[3] = new StoredProcParam("pap01_name", "VARCHAR", "IN", 30, vRaisonSbCmd);
	       ProcParam[4] = new StoredProcParam("pdc0_nrid", "NUMBER", "IN", 200, nQuoNRID);
	       var strResultProc = ObjSQL.ExecuteStoredProc("StandByCommande", ProcParam);
	      } catch (e) {
	       throw (e.message);
	      }
	     }
	    }
	   }
	   mySelectionRow.Fields["QuoExtAppelCmd"] = '0';
	   mySelectionRow.Fields["QuoExtCmdSBdate"] = pQuoExtCmdSBdate;
	   mySelectionRow.Fields["QuoExtCmdSBheure"] = pQuoExtCmdSBheure;
	   //mySelectionRow.Fields["QuoExtCmdSBraison"] = vRaisonSbCmd;
	   var vNewResponse = pQuoExtResDemande + '\r' + vListRaison;
	
	
	   // HAS DEB : 05/09/2019 : concaténer les réponse de paiements de déposit 
	   if (pQuoExtResDemande != '' && pQuoExtResDemande != null && pQuoExtResDemande != undefined) {
	    if (vOldResponse != '' && vOldResponse != null && vOldResponse != undefined) {
	     mySelectionRow.Fields["QuoExtResDemande"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + vNewResponse + '\r' + vOldResponse;
	    } else {
	     mySelectionRow.Fields["QuoExtResDemande"] = DateTime.Now.ToString("dd/MM/yyyy HH:mm") + ' : ' + vNewResponse;
	    }
	   }
	   // HAS DEB : 05/09/2019 : concaténer les réponse de paiements de déposit
	  }
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
	 var vMethode = "WS_Quo_MAJ_Statut";
	 var vXmlRequest = pQuoCustReference + ";" + vStatusOffre + ";" + pQuoExtRefAR + ";" + pQuoExtDatePerdue + ";" + pQuoExtRaisonOffre + ";" + pQuoExtResDemande + ";" + pQuoExtCmdSBraison + ";" + pQuoExtCmdSBdate + ";" + pQuoExtCmdSBheure;
	 vXmlRequest = vXmlRequest.replace(/'/g, "''");
	 MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest + "', '" + vRetour.replace(/'/g, "''") + "', '" + vRetour.replace(/'/g, "''") + "', getdate())");
	 delete MyQuery;
	 MyQuery.Dispose();
	 FreeSelligentObject(MyQuery);
	 //return vRetour;
	}
	// HAS DEB: si référence AR Offre reçue sur une affaire différente alors faire les changements sur Offre et Affaire
	var vCompareAffaire = 0;
	var MyQueryAff = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var vSqlAffaire = " SELECT (SELECT  no_dossier FROM dc0 WHERE vos_ref = '" + pQuoCustReference + "') as AFF2, (SELECT  no_dossier FROM dc0 WHERE dc0.vos_ref='" + pQuoExtRefAR + "') as AFF1 ";
	
	
	var MyResultAff = MyQueryAff.ExecuteSql(vSqlAffaire);
	
	
	var MyXmlCompareAff = InitXml(MyResultAff);
	var MyRowsAff = FindItem("Flds", MyXmlCompareAff, true);
	if (MyRowsAff.Count == 1) {
	 var vAFF1 = GetItemValue("AFF1", MyRowsAff[0]);
	 var vAFF2 = GetItemValue("AFF2", MyRowsAff[0]);
	 //throw "Affaire1  "+vAFF1 + "Affaire2  "+vAFF2 ;
	 if (vAFF1 != vAFF2) {
	  vCompareAffaire = 1;
	 }
	}
	//throw "les affaires sont différentes: "+vCompareAffaire;
	delete MyQueryAff;
	MyQueryAff.Dispose();
	FreeSelligentObject(MyQueryAff);
	
	
	if (vCompareAffaire == 1) {
	 var MyQueryAff1 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSqlLot = " SELECT * FROM SYSADM.do0 WHERE do0.ref = '" + vAFF1 + "'  ";
	 var MyResult1 = MyQueryAff1.ExecuteSql(vSqlLot);
	 var MyXmlDocument1 = InitXml(MyResult1);
	 var MyRows1 = FindItem("Flds", MyXmlDocument1, true);
	
	
	 var vRefLot1 = GetItemValue("OppExtRefLot", MyXmlDocument1);
	 var vOppNRID1 = GetItemValue("OppNRID", MyXmlDocument1);
	 var vAffaire1 = GetItemValue("OppReference", MyXmlDocument1);
	 // throw "Ref affaire mere : "+vAffaire1;  //  throw "Ref Lot existant : "+vRefLot1;  //  throw "NRID affaire mere : "+vOppNRID1;  // Si ref lot vide sur affaire 1 alors mettre à jour la réf lot sur affaire 1
	 var vLigne = MyRows1.Count;
	 //throw "nombre affaire mere = "+vLigne;
	 if (MyRows1.Count == 1) {
	  if (vRefLot1 == null || vRefLot1 == '' || vRefLot1 == undefined) {
	   var LOT1 = CreateSelligentObject("Opportunity", CurrentSessionID, false);
	   if (vAFF1 != '' && vAFF1 != null && vAFF1 != undefined) {
	    var row = new SelectionRow();
	    row.Fields["OppExtRefLot"] = vAFF1;
	    vRefLot1 = vAFF1;
	
	
	    LOT1.OpenSetAndSave(parseInt(vOppNRID1), row);
	   }
	  }
	 }
	 delete MyQueryAff1;
	 MyQueryAff1.Dispose();
	 FreeSelligentObject(MyQueryAff1);
	
	
	 // Mettre à jouter le lien entre Affire 1 et affire 2 + mettre à jour la réf lot sur affaire 2
	 var MyQueryAff2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSqlAff2 = " SELECT * FROM SYSADM.do0 WHERE do0.ref = '" + vAFF2 + "'  ";
	 var MyResult2 = MyQueryAff2.ExecuteSql(vSqlAff2);
	 var MyXmlDocument2 = InitXml(MyResult2);
	 var MyRows2 = FindItem("Flds", MyXmlDocument2, true);
	
	
	 var vRefAff2 = GetItemValue("OppReference", MyXmlDocument2);
	 var vOppNRID2 = GetItemValue("OppNRID", MyXmlDocument2);
	 // si ref lot vide sur affaire 1 alors mettre à jour la réf lot sur affaire 1
	 if (MyRows2.Count == 1) {
	  var OP2 = CreateSelligentObject("Opportunity", CurrentSessionID, false);
	  var row2 = new SelectionRow();
	  row2.Fields["OppExtRefLot"] = vRefLot1;
	  row2.Fields["OppExtAffairAR"] = vAFF1;
	  OP2.OpenSetAndSave(parseInt(vOppNRID2), row2);
	 }
	 delete MyQueryAff2;
	 MyQueryAff2.Dispose();
	 FreeSelligentObject(MyQueryAff2);
	}
}