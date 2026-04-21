function WS_Quo_Offre(p_num_offre,p_statut,p_dt_creation,p_valeur_achat_offre,p_valeur_vente_offre,p_devise,p_cd_fournisseur,p_num_affaire,p_code_acheteur,p_code_cp,p_code_ass,p_Date_echeance,p_GRP_MKT,p_Statut_Affaire,p_ArgumentsCles,p_Commentaires,p_FI,p_CommFI,p_DelaisPaiement,p_Transport,p_Prtageable,p_DateValOffre,p_Valideur,p_SocCAE,p_DevOffre,p_TxChange,p_ExtNoffre,p_ExtClient,p_ExtRefAR)
{
	var param = " p_num_offre : " + p_num_offre +
	 " p_statut : " + p_statut +
	 " p_dt_creation : " + p_dt_creation +
	 " p_valeur_achat_offre : " + p_valeur_achat_offre +
	 " p_valeur_vente_offre : " + p_valeur_vente_offre +
	 " p_devise : " + p_devise +
	 " p_cd_fournisseur : " + p_cd_fournisseur +
	 " p_num_affaire : " + p_num_affaire +
	 " p_code_acheteur : " + p_code_acheteur +
	 " p_code_cp : " + p_code_cp +
	 " p_code_ass : " + p_code_ass +
	 " p_Date_echeance : " + p_Date_echeance +
	 " p_GRP_MKT : " + p_GRP_MKT +
	 " p_Statut_Affaire : " + p_Statut_Affaire +
	 " p_ArgumentsCles : " + p_ArgumentsCles +
	 " p_Commentaires : " + p_Commentaires +
	 " p_FI : " + p_FI +
	 " p_CommFI : " + p_CommFI +
	 " p_DelaisPaiement : " + p_DelaisPaiement +
	 " p_Transport : " + p_Transport +
	 " p_Prtageable : " + p_Prtageable +
	 " p_DateValOffre : " + p_DateValOffre +
	 " p_Valideur : " + p_Valideur +
	 " p_SocCAE : " + p_SocCAE +
	 " p_DevOffre : " + p_DevOffre +
	 " p_TxChange : " + p_TxChange +
	 " p_ExtNoffre : " + p_ExtNoffre +
	 " p_ExtClient :" + p_ExtClient
	var xdebug = p_num_offre + ";" + p_statut + ";" + p_dt_creation + ";" + p_valeur_achat_offre + ";" + p_valeur_vente_offre + ";" + p_devise + ";" + p_cd_fournisseur + ";" + p_num_affaire + ";" + p_code_acheteur + ";" + p_code_cp + ";" + p_code_ass + ";" + p_Date_echeance + ";" + p_GRP_MKT + ";" + p_Statut_Affaire + ";" + p_ArgumentsCles + ";" + p_Commentaires + ";" + p_FI + ";" + p_CommFI + ";" + p_DelaisPaiement + ";" + p_Transport + ";" + p_Prtageable + ";" + p_DateValOffre + ";" + p_Valideur + ";" + p_SocCAE + ";" + p_DevOffre + ";" + p_TxChange + ";" + p_ExtNoffre + ";" + p_ExtClient
	
	var MyQuery = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var objReq = CreateSelligentObject("SelectionList", CurrentSessionID);
	var objQuo = CreateSelligentObject("Quotation", CurrentSessionID, true);
	var objOpp = CreateSelligentObject("Opportunity", CurrentSessionID, false);
	var vMethode = "WS_Quo_Offre";
	var vRetour = "";
	
	//MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + param.replace(/'/g, "''") + "', '" + vRetour + "', '" + xdebug.replace(/'/g, "''")  + "', getdate())");
	//delete MyQuery;
	////// HAS : Début  ajout LOG Insertion Offre 
	var vMethode = 'WS_Quo_NewOffre'
	var vXmlRequest = " p_num_offre : " + p_num_offre +
	 " p_statut : " + p_statut +
	 +" p_valeur_achat_offre : " + p_valeur_achat_offre +
	 " p_valeur_vente_offre : " + p_valeur_vente_offre +
	 " p_devise : " + p_devise +
	 " p_cd_fournisseur : " + p_cd_fournisseur +
	 " p_num_affaire : " + p_num_affaire +
	 " p_code_acheteur : " + p_code_acheteur +
	 " p_code_cp : " + p_code_cp +
	 " p_code_ass : " + p_code_ass +
	 " p_Date_echeance : " + p_Date_echeance +
	 " p_GRP_MKT : " + p_GRP_MKT +
	 " p_Statut_Affaire : " + p_Statut_Affaire +
	 " p_FI : " + p_FI +
	 " p_DelaisPaiement : " + p_DelaisPaiement +
	 " p_Transport : " + p_Transport +
	 " p_Prtageable : " + p_Prtageable +
	 " p_DateValOffre : " + p_DateValOffre +
	 " p_Valideur : " + p_Valideur +
	 " p_SocCAE : " + p_SocCAE +
	 " p_DevOffre : " + p_DevOffre +
	 " p_TxChange : " + p_TxChange +
	 " p_ExtNoffre : " + p_ExtNoffre +
	 " p_ExtClient :" + p_ExtClient
	
	//MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + vRetour + "', '" + xdebug.replace(/'/g, "''") + "', getdate())");
	//delete MyQuery;
	/////// HAS : Fin ajout LOG Insertion Offre
	
	try {
	 var nCpyNRID = "";
	 var vCpyName = "";
	 var vCpyCode = "";
	 var nOppNRID = "";
	 var nQuoNRID = "";
	 var vAcheteur = "";
	 var vChefproduit = "";
	 var vAssCom = "";
	 var vtelAch = "";
	 var vTelAco = "";
	 var vTelCP = "";
	 var xObjAct = "";
	 var sujet = "";
	 var xNoteAff = "";
	 var xproblot = "";
	 var vMsgErreur = "";
	 var vPaysFact = "";
	
	 try {
	  //on va chercher le so0.nrid et le so0.societe
	  var vSQL = "select so0.nrid, so0.societe,so0.cd from so0 so0 where so0.cd = '" + p_cd_fournisseur + "'";
	  objReq.Open(0, -1, vSQL);
	  var vXmlCpy = objReq.GetXml("AllFields");
	  var oXmlCpy = InitXml(vXmlCpy);
	  var oNodesCpy = FindItem("Flds", oXmlCpy, true);
	
	  if (oNodesCpy.Count > 0) {
	   nCpyNRID = GetItemValue("CpyNRID", oNodesCpy[0]);
	   vCpyName = GetItemValue("CpyName", oNodesCpy[0]);
	   vCpyCode = GetItemValue("CpyCode", oNodesCpy[0]);
	  }
	 } catch (e) {
	  return "E" + e.description
	 }
	 try {
	  var vSQL = "select nrid, ref,xObjAct,sujet,xNoteAff,xproblot,xAssCom, xPaysFacturation from sysadm.do0 where ref = '" + p_num_affaire + "'";
	  objReq.Open(0, -1, vSQL);
	  var vXmlOpp = objReq.GetXml("AllFields");
	  var oXmlOpp = InitXml(vXmlOpp);
	  var oNodes = FindItem("Flds", oXmlOpp, true);
	
	  if (oNodes.Count > 0) {
	   nOppNRID = GetItemValue("OppNRID", oNodes[0]);
	   xObjAct = GetItemValue("OppExtObjAct", oNodes[0]);
	   sujet = GetItemValue("OppComment", oNodes[0]);
	   xNoteAff = GetItemValue("OppExtNoteAff", oNodes[0]);
	   xproblot = GetItemValue("OppExtProbLot", oNodes[0]);
	   vAssCom = GetItemValue("OppExtAssCom", oNodes[0]);
	   vPaysFact = GetItemValue("OppExtPaysFacturation", oNodes[0]);
	  }
	 } catch (e) {
	  return "E" + e.description
	 }
	
	 try {
	  //on va chercher l'acheteur cp, ass com
	  if (p_code_acheteur == "" || p_code_acheteur == null) p_code_acheteur = "XXXXX";
	  if (p_code_cp == "" || p_code_cp == null) p_code_cp = "XXXXX";
	  //if(p_code_ass      == "" || p_code_ass      == null ) p_code_ass      = "XXXXX";
	  var strSQLRes = "select (select titulaire from sysadm.am0 where xcode_sap ='" + p_code_acheteur + "' and fonction='Acheteur'  and bactive = 1) as Acheteur, (select top 1 titulaire from sysadm.am0 where xcode_sap='" + p_code_cp + "' and fonction='Chef Produit') as CP ,  (select top 1 titulaire from sysadm.am0 where xcode_sap='" + p_code_ass + "' and fonction='Assistant Commercial' ) as ASS"
	
	  objReq.Open(0, -1, strSQLRes);
	  var vXmlRes = objReq.GetXml("AllFields");
	  var oXmlRes = InitXml(vXmlRes);
	  var oNodesRes = FindItem("Flds", oXmlRes, true);
	
	  if (oNodesRes.Count > 0) {
	   vAcheteur = GetItemValue("Unknown", oNodesRes[0]);
	   vChefproduit = GetItemValue("Unknown-1", oNodesRes[0]);
	   //vAssCom      = GetItemValue("Unknown-2",oNodesRes[0]); 
	  }
	 } catch (e) {
	  return "E" + e.description
	 }
	
	
	 try {
	
	  var vStatusOffre = ""
	  switch (p_statut) {
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
	   case 'RV':
	    vStatusOffre = '1.1 Revalorisée';
	    break;
	   default:
	    '';
	  }
	
	
	
	  var myselectionrow: SelectionRow = new SelectionRow();
	  myselectionrow.Fields["QuoCustReference"] = p_num_offre;
	  myselectionrow.Fields["QuoExtStatOff"] = vStatusOffre;
	  myselectionrow.Fields["QuoCreationDate"] = p_dt_creation;
	  if (p_valeur_achat_offre != "" && p_valeur_achat_offre != null) myselectionrow.Fields["QuoTotWtVatLocCurr"] = p_valeur_achat_offre;
	
	  // HAS DEB : 02/04/2019 eliminer insertion de ces valeurs avec IDOC dans onglet fiche taquet  
	  //if( p_valeur_achat_offre !="" && p_valeur_achat_offre != null ) myselectionrow.Fields["QuoExtValeurAchat1"]    =  p_valeur_achat_offre;   
	  //if( p_valeur_vente_offre !="" && p_valeur_vente_offre != null ) myselectionrow.Fields["QuoExtValeurVente1"]    =  p_valeur_vente_offre;   
	  // HAS FIN : 02/04/2019  eliminer insertion de ces valeurs avec IDOC dans onglet fiche taquet   
	
	  if (p_devise != "" && p_devise != null) myselectionrow.Fields["QuoLocCurr"] = p_devise;
	  myselectionrow.Fields["QuoCpyName"] = vCpyName;
	  myselectionrow.Fields["QuoCpyNRID"] = nCpyNRID;
	  myselectionrow.Fields["QuoExtNumFour"] = vCpyCode;
	  myselectionrow.Fields["QuoOppReference"] = p_num_affaire;
	  myselectionrow.Fields["QuoOppNRID"] = nOppNRID;
	  //DEBUT FTC@MASAO - MANTIS 10/01/2018
	  //myselectionrow.Fields["QuoExtObjAcc"]         =  xObjAct;
	  //END FTC@MASAO - MANTIS 10/01/2018
	  myselectionrow.Fields["QuoExtDesLot"] = sujet;
	  // myselectionrow.Fields["QuoExtNotAff"]         =  xNoteAff;
	
	  ////// Début O.Robin - 07/03/2018 - Note de l'offre et non celle de l'affaire
	  //  myselectionrow.Fields["QuoExtNOTAFF"]         =  xNoteAff;
	  myselectionrow.Fields["QuoExtNOTAFF"] = p_ExtNoffre;
	
	  ////// Fin O.Robin - 07/03/2018
	
	  myselectionrow.Fields["QuoExtDateAValider"] = p_Date_echeance;
	  if (vAcheteur != "" && vAcheteur != null) myselectionrow.Fields["QuoExtAcht"] = vAcheteur;
	
	  ////// Début O.Robin - 07/03/2018 - Contact du client
	  //if( vChefproduit !="" && vChefproduit != null )  myselectionrow.Fields["QuoExtCPAff"]          =  vChefproduit;
	  myselectionrow.Fields["QuoExtCPAff"] = p_code_cp;
	  ////// Fin O.Robin - 07/03/2018
	
	
	  if (vAssCom != "" && vAssCom != null) myselectionrow.Fields["QuoExtAssComm"] = vAssCom;
	
	  if (vPaysFact.substring(0, 2) == "FR") {
	   myselectionrow.Fields["QuoExtPaysFacturation"] = "Europe";
	   myselectionrow.Fields["QuoExtConsignee"] = "ONLY SOUTH STOCK";
	  } else if (vPaysFact.substring(0, 2) == "ZZ") {
	   myselectionrow.Fields["QuoExtPaysFacturation"] = "Autres";
	   myselectionrow.Fields["QuoExtConsignee"] = "HELVETICA SWISS TRADING SA";
	  }
	
	
	
	  //Argumentaire
	  p_ArgumentsCles = p_ArgumentsCles.replace(/<_CUT_\/>/g, "\n");
	  //p_ArgumentsCles = p_ArgumentsCles.replace(/'/g, "''").replace(/&/g, "&&");
	  //p_ArgumentsCles = p_ArgumentsCles.replace(/'/g,"''").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	  p_Commentaires = p_Commentaires.replace(/<_CUT_\/>/g, "\n");
	  //p_Commentaires  = p_Commentaires.replace(/'/g, "''").replace(/&/g, "&&");
	  //p_Commentaires  = p_Commentaires.replace(/'/g,"''").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	
	  myselectionrow.Fields["QuoExtArgNeg"] = p_ArgumentsCles;
	  myselectionrow.Fields["QuoExtComSpec"] = p_Commentaires;
	  myselectionrow.Fields["QuoExtFI"] = p_FI;
	  myselectionrow.Fields["QuoExtComm"] = p_CommFI;
	  myselectionrow.Fields["QuoExtDelPai"] = p_DelaisPaiement;
	  myselectionrow.Fields["QuoExtTrans"] = p_Transport;
	  myselectionrow.Fields["QuoExtPartCom"] = p_Prtageable;
	  myselectionrow.Fields["QuoExtDatLVO"] = p_DateValOffre;
	  myselectionrow.Fields["QuoExtProbLot"] = xproblot;
	  myselectionrow.Fields["QuoExtValideur"] = p_Valideur;
	  myselectionrow.Fields["QuoExtSocCAE"] = p_SocCAE;
	  myselectionrow.Fields["QuoExtDeviseOffre"] = p_DevOffre; //#698 
	  myselectionrow.Fields["QuoExtTxchange"] = p_TxChange; //#698 
	
	  myselectionrow.Fields["QuoExtNoff"] = p_ExtNoffre;
	  myselectionrow.Fields["QuoExtClient"] = p_ExtClient;
	  myselectionrow.Fields["QuoExtRefAR"] = p_ExtRefAR;
	
	  var vSQL = "select nrid from sysadm.dc0 where   vos_ref= '" + p_num_offre + "' and no_dossier = '" + p_num_affaire + "' ";
	  objReq.Open(0, -1, vSQL);
	  var vXmlRes = objReq.GetXml("AllFields");
	  var oXmlRes = InitXml(vXmlRes);
	  var oNodes = FindItem("Flds", oXmlRes, true);
	  if (oNodes.Count > 0) {
	   var nCpyNRID = GetItemValue("QuoNRID", oNodes[0]);
	   objQuo.Open(nCpyNRID);
	   objQuo.SetAndSave(myselectionrow);
	  } else {
	   objQuo.New();
	   objQuo.SetAndSave(myselectionrow);
	  }
	
	 } catch (e) {
	  return "Erreur WS_Quo_NewOffre : " + e.description;
	  vRetour = e.description.substring(0, 2000);
	  MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + param.replace(/'/g, "''") + "', '" + vRetour + "', '" + xdebug.replace(/'/g, "''") + "', getdate())");
	  // delete MyQuery; 
	 }
	 try {
	  var myselectionrowOpp: SelectionRow = new SelectionRow();
	  var vListOwner = p_GRP_MKT.replace(/<_CUT_\/>/g, ";");
	
	  // Statut Affaire
	  var vStatusAffaire = "";
	  switch (p_Statut_Affaire) {
	   case 'X':
	    vStatusAffaire = "11. SUIVI D'OFFRE(S)";
	    break;
	   default:
	    '';
	  }
	
	  if (vStatusAffaire != null && vStatusAffaire != "") myselectionrowOpp.Fields["OppStatus"] = vStatusAffaire; // p_Statut_Affaire;
	
	  //myselectionrowOpp.Fields["OppOwner"]      =  vListOwner ;
	  myselectionrowOpp.Fields["OppExtDateEcheanceValid"] = p_dt_creation;
	  objOpp.Open(nOppNRID);
	  objOpp.SetAndSave(myselectionrowOpp);
	 } catch (e) {
	  return "E" + e.description;
	 }
	 return "I";
	
	 // HAS : début  ajout LOG Insertion Offre 
	 //MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + param.replace(/'/g, "''") + "', '" + vRetour + "', '" + xdebug.replace(/'/g, "''") + "', getdate())");
	 //delete MyQuery;
	 // HAS : fin ajout LOG Insertion Offre 
	
	} catch (e) {
	 //return "Erreur WS_Quo_NewOffre : " + e.description;
	 vRetour = e.description.substring(0, 2000);
	} finally {
	 MyQuery.ExecuteSql("insert into xlog_ws (xmethod, xappel, xretour, xdebug, xdate_log) values('" + vMethode + "', '" + vXmlRequest.replace(/'/g, "''") + "', '" + vRetour + "', '" + xdebug.replace(/'/g, "''") + "', getdate())");
	
	 FreeSelligentObject(MyQuery);
	 MyQuery.Dispose();
	
	 FreeSelligentObject(objReq);
	 objReq.Dispose();
	
	 FreeSelligentObject(objQuo);
	 objQuo.Dispose();
	
	 FreeSelligentObject(objOpp);
	 objOpp.Dispose();
	}
	return true;
		return true;
}