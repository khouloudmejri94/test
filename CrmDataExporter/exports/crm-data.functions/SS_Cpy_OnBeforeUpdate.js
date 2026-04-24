function SS_Cpy_OnBeforeUpdate()
{
	//_gfctSendMail("admin-salon@ozeol.com","hassen.bouzouita@ozeol.com","Test email after update CPY","Bonjour...Corp Test email after update CPY")
		// Cpy - Renseignement de la date de modification et du modificateur
	CurrentRecord["CpyExtModif"] = CurrentUserName;
	CurrentRecord["CpyExtDateModif"] = DateTime.Now.ToString("dd/MM/yyyy");
	var ValidSAS = CurrentRecord["CpyExtValidSas"];
	var ValidAch = CurrentRecord["CpyExtValidAch"];
	var ValidCP = CurrentRecord["CpyExtValidMktg"];
	var ValidAdm = CurrentRecord["CpyExtValidAdm"];
	var CpyStatut = CurrentRecord["CpyType"];
	var EtatP = CurrentRecord["CpyExtEtatPepite"];
	var vCpyNrid = CurrentRecord["CpyNRID"];
	var vCpyCode = CurrentRecord["CpyCode"];
	var vCpyComp = CurrentRecord["CpyExtCOMPCd"];
	var vCpyName = CurrentRecord["CpyName"];
	var vOldName = CurrentRecord["CpyAddr2CpyName"];
	var vStatutAdt = CurrentRecord["CpyExtAuditStatus"];
	
	// HAS : mettre à jour la date de demande de validation de fiche
	
	if (CurrentRecord.IsUpdated("CpyExtValidSas") && ValidSAS == 'A VALIDER' && EtatP == 'SAS') {
	 CurrentRecord["CpyExtDateDemValid"] = DateTime.Now.ToString("dd/MM/yyyy");
	 // SIR : fill in demandeur de pepite
	 CurrentRecord["CpyExtDemandeurPepite"] = CurrentUserName;
	 //throw "Le code est $" +vCpyCode+"$";
	 if (vCpyCode.substring(0, 4) == 'COMP' && (vCpyComp == '' || vCpyComp == null || vCpyComp == undefined)) {
	  //throw "Le code est $" +vCpyCode+"$";
	  CurrentRecord["CpyExtCOMPCd"] = vCpyCode;
	 }
	 if (vOldName == '' || vOldName == null || vOldName == undefined) {
	  CurrentRecord["CpyAddr2CpyName"] = vCpyName;
	 }
	}
	
	
	
	// HAS : 20/09/2018 : demandeur de sortie de poubelle
	
	
	if (CurrentRecord.IsUpdated("CpyExtValidSas") && EtatP == 'POUBELLE' && ValidSAS == 'SORTIE POUBELLE') {
	 CurrentRecord["CpyExtDemandeurdepoubelle"] = CurrentUserName;
	}
	
	// HAS : Validation de demande de sortie de poubelle
	
	
	// HAS DEB - 14/04/2020 : si sortie de poubelle alors passer en validation directement et mettre à jour le demandeur et la date de demande
	
	
	if (EtatP == 'POUBELLE' && ValidAdm == 1 && ValidSAS == 'COMPLETE') {
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	 var vSQL = "select top 1 ct.change_date as totrash from ct0 ct where ct.colname= 'xvalid_sas' and ct.new_value = 'SORTIE POUBELLE' and ct.record_nrid = '" + CurrentRecord["CpyNRID"] + "' order by ct.change_date desc ";
	 var oRes = oQryObj.ExecuteSql(vSQL);
	 var oXmlDoc = InitXml(oRes);
	 var oRows = FindItem("Flds", oXmlDoc, true);
	 var vDatedem = GetItemValue("totrash", oRows[0]);
	 if (oRows.Count > 0) {
	  //throw "la date de demande sortie de poubelle est " + vDatedem;
	  CurrentRecord["CpyExtDateDemValid"] = vDatedem;
	 }
	 CurrentRecord["CpyExtEtatPepite"] = 'PEPITE';
	 CurrentRecord["CpyExtDemandeurPepite"] = CurrentRecord["CpyExtDemandeurdepoubelle"];
	 //B.O
	 CurrentRecord["CpyExtValideur"] = CurrentUserName;
	 CurrentRecord["CpyExtDatedevalidation"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["CpyExtPassPepite"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["CpyExtDateSortPoubel"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["CpyExtValidAdm"] = 0;
	 //delete oQryObj;
	 // libération mémoire objet “Selligent”
	 try {
	  oQryObj.Dispose();
	  FreeSelligentObject(oQryObj);
	 } catch (e) {
	  Selligent.Library.Monitor.Tracer.Write("################################ SS_Cpy_OnBeforeUpdate : échec libération objet “Selligent” #############################");
	 }
	}
	
	
	// HAS DEB - 14/04/2020 : si sortie de poubelle alors passer en validation directement et mettre à jour le demandeur et la date de demande
	
	
	// Le back office valide la demande de mise en poubelle effectué par l'acheteur
	
	
	if ((EtatP == 'PEPITE' || EtatP == 'SAS') && ValidSAS == 'METTRE EN POUBELLE' && ValidAdm == 1) {
	
	 try {
	  var MyQbeObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var Acn = CreateSelligentObject("Action", CurrentSessionID, false);
	  var MySql = "";
	  MySql += " select ";
	  MySql += "[AcnNRID] ";
	  MySql += "from [Acn] ";
	  MySql += "where [AcnStatus] = 'A FAIRE'";
	  MySql += " and [AcnCpyNRID] = '" + vCpyNrid + "'";
	
	
	  var result = MyQbeObj.ExecuteSql(MySql);
	  var MyXmlDoc = InitXml(result);
	  var Flds = FindItems("Flds", MyXmlDoc);
	  for (var i = 0; i < Flds.Count; i++) {
	   var row = new SelectionRow();
	   var AcnNrid = GetItemValue("AcnNRID", Flds[i]);
	   row.Fields["AcnStatus"] = 'FERME';
	   row.Fields["AcnStartDate"] = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
	   row.Fields["AcnExtModificateur"] = 'CLOSED';
	   Acn.OpenSetAndSave(parseInt(AcnNrid), row);
	  }
	  // libération mémoire objet “Selligent”
	  try {
	   MyQbeObj.Dispose();
	   FreeSelligentObject(MyQbeObj);
	   Acn.Dispose();
	   FreeSelligentObject(Acn);
	  } catch (e) {
	   Selligent.Library.Monitor.Tracer.Write("################################ SS_Cpy_OnBeforeUpdate : échec libération objet “Selligent” #############################");
	  }
	
	 } catch (e) {
	  throw " Erreur Maj Action : " + e.message;
	 }
	
	
	 CurrentRecord["CpyExtEtatPepite"] = 'POUBELLE';
	 //CurrentRecord["CpyMasterOrDel"] = '2';
	 CurrentRecord["CpyExtPassPoubelle"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["CpyExtValidAdm"] = 0;
	 CurrentRecord["CpyExtValideur"] = CurrentUserName;
	 //CurrentRecord["CpyExtPassPepite"]= '';
	 //CurrentRecord["CpyExtDatedevalidation"]= DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["CpyExtLotIm"] = 0;
	 // HAS DEB 18102022 : si audit alors mettre en COMPLETE
	
	 if (vStatutAdt != '' && vStatutAdt != null && vStatutAdt != undefined) {
	  CurrentRecord["CpyExtAuditStatus"] = 'Approuvé';
	 }
	}
	
	
	/////////////// demandeur en poubelle pour Audit
	if (CurrentRecord.IsUpdated("CpyExtAuditStatus") && vStatutAdt == 'A SUPPRIMER') {
	 CurrentRecord["CpyExtDemandeurEnPoubelle"] = CurrentUserName;
	}
	/////////////// demandeur en poubelle pour Audit
	
	
	
	// DEBUT HAS : Refus du back office de mettre le fournisseur en poubelle suite à une demande effectué par l'acheteur
	// Remettre le statut à COMPLET
	
	
	if (ValidSAS == 'COMPLETE' && ValidAdm == 1 && EtatP == 'PEPITE') {
	 CurrentRecord["CpyExtEtatPepite"] = 'PEPITE';
	 CurrentRecord["CpyExtValidAdm"] = 0;
	}
	
	
	// END HAS
	
	
	
	// HAS : Si la fiche est validée alors la validation Adm est réinitialisée et enregistré 
	
	
	try {
	 if (ValidSAS == 'COMPLETE' && ValidAdm == 1 && EtatP == 'SAS') {
	  CurrentRecord["CpyExtEtatPepite"] = 'PEPITE';
	  CurrentRecord["CpyExtValideur"] = CurrentUserName;
	  CurrentRecord["CpyExtPassPepite"] = DateTime.Now.ToString("dd/MM/yyyy");
	  CurrentRecord["CpyExtDatedevalidation"] = DateTime.Now.ToString("dd/MM/yyyy");
	  CurrentRecord["CpyExtValidAdm"] = 0;
	  CurrentRecord["CpyExtLotIm"] = 0;
	  if (CurrentRecord["CpyExtAcht"] != "" && CurrentRecord["CpyExtAcht"] != null && CurrentRecord["CpyExtSrc"] != "" && CurrentRecord["CpyExtSrc"] != null) {
	   CurrentRecord["CpyOwner"] = CurrentRecord["CpyExtAcht"];
	  }
	
	  //CurrentRecord["CpyExtValidAch"] = 0;
	  //CurrentRecord["CpyExtValidMktg"] = 0;
	  var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	  var nCpyNRID = CurrentRecord["CpyNRID"];
	  var vSQL = "select count(*) as Nbr from sysadm.hi0 hi0, sysadm.so0 so0 where hi0.status='A FAIRE'   and hi0.so0_nrid = '" + nCpyNRID + "'  and hi0.titulaire = so0.titulaire";
	  var oRes = oQryObj.ExecuteSql(vSQL);
	  var oXmlDoc = InitXml(oRes);
	  var oRows = FindItem("Flds", oXmlDoc, true);
	  if (GetItemValue("Nbr", oRows[0]) == 0) {
	   var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	   MyAcnObj.New();
	   var mySelectionRow = new SelectionRow();
	   mySelectionRow.Fields["AcnStatus"] = "A FAIRE";
	
	
	   mySelectionRow.Fields["AcnNature"] = "TEL";
	   mySelectionRow.Fields["AcnType"] = "RELANCE";
	   mySelectionRow.Fields["AcnObject"] = "CLASSIQUE";
	   mySelectionRow.Fields["AcnSubject"] = "";
	   mySelectionRow.Fields["AcnCpyName"] = CurrentRecord["CpyName"];
	   mySelectionRow.Fields["AcnCpyNRID"] = CurrentRecord["CpyNRID"];
	   mySelectionRow.Fields["AcnPerName"] = "";
	   mySelectionRow.Fields["AcnPerNRID"] = "";
	   mySelectionRow.Fields["AcnPriority"] = "";
	   mySelectionRow.Fields["AcnExtCreateur"] = "";
	   // Si le fournisseur est créé par un acheteur alors le champ acheteur est renseigné par le nom du créateur   
	   //mySelectionRow.Fields["AcnExtCp"]             = CurrentRecord["CpyExtCp"];
	   //mySelectionRow.Fields["AcnExtEquipeCp"]       = "" ;
	   mySelectionRow.Fields["AcnExtAcheteur"] = CurrentRecord["CpyExtAcht"];
	   mySelectionRow.Fields["AcnExtEquipeAch"] = "";
	   mySelectionRow.Fields["AcnExtRelanceAuto"] = 1;
	
	
	   //  HAS: envoi du prospecteur si fiche créée par un prospecteur
	   mySelectionRow.Fields["AcnExtProsp"] = CurrentRecord["CpyExtProsp"];
	   mySelectionRow.Fields["AcnStartDate"] = DateTime.Now.ToString("dd/MM/yyyy");
	
	   if (CurrentRecord["CpyExtAcht"] != '' && CurrentRecord["CpyExtAcht"] != null) {
	    mySelectionRow.Fields["AcnOwner"] = CurrentRecord["CpyExtAcht"];
	   } else if (CurrentRecord["CpyExtProsp"] != '' && CurrentRecord["CpyExtProsp"] != null) {
	    mySelectionRow.Fields["AcnOwner"] = CurrentRecord["CpyExtProsp"];
	   } else {
	    mySelectionRow.Fields["AcnOwner"] = CurrentUserName;
	    mySelectionRow.Fields["AcnExtAcheteur"] = CurrentUserName;
	   }
	   mySelectionRow.Fields["AcnExtCreateur"] = mySelectionRow.Fields["AcnOwner"];
	
	
	   MyAcnObj.SetAndSave(mySelectionRow);
	   var myxml = MyAcnObj.GetXml("AllFields");
	   var MyXmlDocument = InitXml(myxml);
	   var intAcnNRID = GetItemValue("AcnNRID", MyXmlDocument);
	   delete MyAcnObj;
	   CurrentRecord["AcnAcnSubject"] = "";
	   CurrentRecord["AcnAcnNRID"] = intAcnNRID;
	   //delete oQryObj;
	   // libération mémoire objet “Selligent”
	   try {
	    MyAcnObj.Dispose();
	    FreeSelligentObject(MyAcnObj);
	   } catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_Cpy_OnBeforeUpdate : échec libération objet “Selligent” #############################");
	   }
	
	  }
	  //else return true;
	
	  // libération mémoire objet “Selligent”
	  try {
	   oQryObj.Dispose();
	   FreeSelligentObject(oQryObj);
	  } catch (e) {
	   Selligent.Library.Monitor.Tracer.Write("################################ SS_Cpy_OnBeforeUpdate : échec libération objet “Selligent” #############################");
	  }
	 }
	} catch (e) {
	 delete MyAcnObj;
	 throw " Erreur SS_CPY_OnAfterInsert : " + e.message;
	}
	
	
	//Cpy - si coche/decoche NozBoutique renseignement de la date
	if (CurrentRecord.IsUpdated("CpyExtNozBout") && CurrentRecord["CpyExtNozBout"] == 1) {
	 CurrentRecord["CpyExtDateEntnozbout"] = DateTime.Now.ToString("dd/MM/yyyy");
	 CurrentRecord["CpyExtDateSortNozBout"] = null;
	}
	
	
	if (CurrentRecord.IsUpdated("CpyExtNozBout") && CurrentRecord["CpyExtNozBout"] == 0) {
	 CurrentRecord["CpyExtDateSortNozBout"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	
	if (CurrentRecord.IsUpdated("CpyIsBlackList")) {
	 if (CurrentRecord["CpyIsBlackList"] == '1') {
	  CurrentRecord["CpyIsBlackListDate"] = DateTime.Now.ToString("dd/MM/yyyy");
	  CurrentRecord["CpyExtUserBlackList"] = CurrentUserName;
	 }
	 if (CurrentRecord["CpyIsBlackList"] == '0') {
	  CurrentRecord["CpyExtDateOutBlackList"] = DateTime.Now.ToString("dd/MM/yyyy");
	  CurrentRecord["CpyExtUserOutBlackList"] = CurrentUserName;
	 }
	}
	
	
	if (CurrentRecord.IsUpdated("CpyExtLitige") && CurrentRecord["CpyExtLitige"] == 1) {
	 CurrentRecord["CpyExtDateLitige"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	
	if (CurrentRecord.IsUpdated("CpyExtValDirExport") == true && (CurrentRecord["CpyExtValDirExport"] == "Approuvé permanent" || CurrentRecord["CpyExtValDirExport"] == "Approuvé unique" || CurrentRecord["CpyExtValDirExport"] == "Rejeté")) {
	 CurrentRecord["CpyExtUserValDirExport"] = CurrentUserName;
	 CurrentRecord["CpyExtDateValDirExport"] = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
	 CurrentRecord["CpyExtFlgExpValid"] = '1';
	}
	
	// HAS DEB 25/12/2020 : mise à jour coordonnées valideur Agent export
	var vValidExport = CurrentRecord["CpyExtValidExporter"];
	if (CurrentRecord.IsUpdated("CpyExtValidExporter") && vValidExport == 'Approuvé') {
	 CurrentRecord["CpyExtUserValExport"] = CurrentUserName;
	 CurrentRecord["CpyExtDateValExport"] = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
	 CurrentRecord["CpyExtFlgExpValid"] = '1';
	
	
	 // HAS DEB 05/11/2021 : Reaffectation auto pour Agexp
	 if (CurrentRecord["CpyExtIsDestock"] != '1' && CurrentRecord["CpyExtIsExporter"] == '1') {
	  CurrentRecord["CpyExtAcht"] = 'Elena NASTASE';
	  CurrentRecord["CpyOwner"] = 'Elena NASTASE';
	  CurrentRecord["CpyExtFlagAffect"] = '1';
	 }
	}
	
	
	Session["CLOTURE_EXPORT"] = false;
	if (CurrentRecord.IsUpdated("CpyExtValDirExport") == true || CurrentRecord.IsUpdated("CpyExtValidExporter")) {
	 var vValDirExport = CurrentRecord["CpyExtValDirExport"];
	 if (vValidExport == 'Approuvé' || vValidExport == 'Non approuvé' || (vValDirExport != "" && vValDirExport != null && vValDirExport != undefined)) {
	  var pSo0_nrid = CurrentRecord["CpyNRID"];
	  //var pDc0_nrid = CurrentRecord["xxxxxx"];
	  var pOffer = CurrentRecord["CpyExtPour"];
	
	  var pAcces_Status = CurrentRecord["CpyExtValidExporter"]; //statut BO
	  var pDate_Req_Exp = CurrentRecord["CpyExtDateDemValExport"].ToString("dd/MM/yyyy hh:mm:ss");
	  var pUser_Req_Exp = CurrentRecord["CpyExtUserDemValExport"];
	
	  if (CurrentRecord["CpyExtDateValExport"] != '' && CurrentRecord["CpyExtDateValExport"] != null && CurrentRecord["CpyExtDateValExport"] != undefined) {
	   var pDate_Valid_BO = CurrentRecord["CpyExtDateValExport"].ToString("dd/MM/yyyy hh:mm:ss");
	  } else {
	   var pDate_Valid_BO = "01/01/1900";
	  }
	  //var pDate_Valid_BO = CurrentRecord["CpyExtDateValExport"].ToString("dd/MM/yyyy hh:mm:ss");
	  var pUser_Valid_BO = CurrentRecord["CpyExtUserValExport"];
	
	  if (CurrentRecord["CpyExtDateValDirExport"] != '' && CurrentRecord["CpyExtDateValDirExport"] != null && CurrentRecord["CpyExtDateValDirExport"] != undefined) {
	   var pDate_Val_Dir = CurrentRecord["CpyExtDateValDirExport"].ToString("dd/MM/yyyy hh:mm:ss");
	  } else {
	   var pDate_Val_Dir = "01/01/1900";
	  }
	  var pUser_Val_Dir = CurrentRecord["CpyExtUserValDirExport"];
	
	  Selligent.Library.Monitor.Tracer.Write("CpyExtDateValExport : " + CurrentRecord["CpyExtDateValExport"] + ";", false);
	  Selligent.Library.Monitor.Tracer.Write("CpyExtDateValDirExport : " + CurrentRecord["CpyExtDateValDirExport"] + ";", false);
	
	  var pValid_GiZone = CurrentRecord["CpyExtExportZone"];
	  var pVal_Dir = CurrentRecord["CpyExtValDirExport"];
	  var pRemarque = CurrentRecord["CpyExtFraisAnnexeText"];
	  var vResExp = SS_Cpy_InstUpdt_Access_Agexp(pSo0_nrid, pOffer, pAcces_Status, pDate_Req_Exp, pDate_Val_Dir, pDate_Valid_BO, pUser_Req_Exp, pUser_Val_Dir, pUser_Valid_BO, pValid_GiZone, pVal_Dir, pRemarque);
	  Selligent.Library.Monitor.Tracer.Write("HAAAAASS INSERT ACCESS REQ EXPORT : " + vResExp + ";", false);
	  if (vValidExport == 'Approuvé' || (vValDirExport != "" && vValDirExport != null && vValDirExport != undefined)) {
	   Session["CLOTURE_EXPORT"] = true;
	  }
	 }
	}
	
	
	// HAS DEB 25/12/2020 : mise à jour coordonnées valideur Agent export
	var vValisSas = CurrentRecord["CpyExtValidSas"];
	var vValisSRC = CurrentRecord["CpyExtValidSrc"];
	// HAS DEB 10/04/2023 - si TL SRC => fiche sourcing non approuvée alors process TO DELETE
	var vValisSRC = CurrentRecord["CpyExtValidSrc"];
	if (CurrentRecord.IsUpdated("CpyExtValidSrc") == true) {
	 if (vValisSRC == 'Non approuvé') {
	  CurrentRecord["CpyExtValidSas"] = "METTRE EN POUBELLE";
	  CurrentRecord["CpyExtDemandeurEnPoubelle"] = CurrentUserName;
	  //CurrentRecord["CpyExtAdtDatTodelete"] = DateTime.Now.ToString("dd/MM/yyyy");
	  //CurrentRecord["CpyExtAdtUserTodelete"] = CurrentUserName ;
	 }
	 if (vValisSRC == 'Approuvé' && vValisSas != "EN COURS") {
	  CurrentRecord["CpyExtValidSas"] = "EN COURS";
	 }
	}
	// HAS END 10/04/2023 - si TL SRC => fiche sourcing non approuvée alors process TO DELETE
	
	
	
	// HAS DEB 12/04/2023 - si BO met INCOMPLET pour demande mise en poubelle fiche non approuvée alors retur vers initial 
	/*if (CurrentRecord.IsUpdated("CpyExtValidSas") == true && CurrentRecord["CpyExtValidSrc"] != "Approuvé" && CurrentRecord["CpyExtValidSrc"] != "Non approuvé") {
	CurrentRecord["CpyExtValidSrc"] = "Initial";
	}*/
	// HAS END 12/04/2023 - si BO met INCOMPLET pour demande mise en poubelle fiche non approuvée alors retur vers initial
		// HAS DEB 13/04/2023 - si fiche proposee par SRC alors verouiller pendant 72 heures 
	if (CurrentRecord.IsUpdated("CpyExtPropAffectSrc") == true && CurrentRecord["CpyExtPropAffectSrc"] != "" && CurrentRecord["CpyExtPropAffectSrc"] != null) {
	 CurrentRecord["CpyExtSrcLock"] = '1';
	 CurrentRecord["CpyExtDatePropAffect"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	// HAS DEB 13/04/2023 - si fiche proposee par SRC alors verouiller pendant 72 heures
	
	if (CurrentRecord.IsUpdated("CpyOwner") == true) {
	  try {
	    var vToday = DateTime.Now.ToString("dd/MM/yyyy");
	    var vPRange = CurrentRecord["CpyExtFamilleProd"];
	    var vCountry = CurrentRecord["CpyAddr1Country"];
	    var isOkPr, isOkCn;
	    var vControl = 0;
	    var MySql = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var strSQL = "SELECT pl.date_start as dStart, pl.date_end dEnd, p_range as pRange, country as country ";
	    strSQL += " from sysadm.x_mng_src pl where ";
	    strSQL += " pl.users = '" + CurrentUserName + "' ";
	    strSQL += " and cast(getdate() as date) BETWEEN pl.date_start and pl.date_end ";
	  
	    var res = MySql.ExecuteSql(strSQL);
	  
	    var MyXmlDoc = InitXml(res);
	    var MyRows = FindItem("Flds", MyXmlDoc, true);
	    for (var i = 0; i < MyRows.Count; i++) {
	      var pStart = GetItemValue("dStart", MyRows[i]);
	      var pEnd = GetItemValue("dEnd", MyRows[i]);
	      var pPRange = GetItemValue("pRange", MyRows[i]);
	      var pCountry = GetItemValue("country", MyRows[i]);
	  
	      if (pPRange != 'ND') {
	        if (pPRange == vPRange) {
	          isOkPr = 1;
	        } else {
	          isOkPr = 0;
	        }
	      } else {
	        isOkPr = 2;
	      }
	  
	      if (pCountry != 'ND') {
	        if (pCountry == vCountry) {
	          isOkCn = 1;
	        } else {
	          isOkCn = 0;
	        }
	      } else {
	        isOkCn = 2;
	      }
	  
	      if (vToday >= pStart || vToday <= pEnd) {
	        if ((isOkPr == 1 || isOkPr == 2) && (isOkCn == 1 || isOkCn == 2)) {
	          vControl += 1;
	        }
	      }
	    }
	    if (vControl > 0) {
	      CurrentRecord["CpyExtValidSrc"] = 'Initial';
	    }
	  } catch (e) {
	    throw "HAS - Error on SS_Cpy_OnBeforeInsert Src Initial : " + e;
	  } finally{
	    MySql.Dispose();
	    FreeSelligentObject(MySql);
	  }
	}
	
	
	
		//si le numéro de téléphone saisie contient deux zéros en premier caractère, on les supprime
	
	if(CurrentRecord.IsUpdated("CpyPhoneNbr"))
	{
	  var vPhoneNbr = CurrentRecord["CpyPhoneNbr"];
	  if(vPhoneNbr.substring(0,2) == "00") CurrentRecord["CpyPhoneNbr"] = vPhoneNbr.substring(2);
	}
		var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var demtrans = CurrentRecord["CpyExtDdeTransfertCP"];
	var validtransfert = CurrentRecord["CpyExtVldtndtrnsfrt"];
	var utilisateur = CurrentRecord["CpyExtPourach"];
	var cible = "";
	var vTransTo = "";
	var flagaffect = CurrentRecord["CpyExtFlagAffect"];
	var isNonAffecte = false;
	
	// Vérification si la société est dans societe_non_affecte
	var SocNrid = CurrentRecord["CpyNRID"];
	var vSQL = "SELECT TOP 1 so0.nrid FROM sysadm.so0 so0 INNER JOIN sysadm.societe_non_affecte af ON so0.nrid = af.so0_nrid WHERE so0.nrid = '" + SocNrid + "'";
	var oRes = oQryObj.ExecuteSql(vSQL);
	var oXmlDoc = InitXml(oRes);
	var oRows = FindItem("Flds", oXmlDoc, true);
	if (oRows.Count >= 1) {
	    isNonAffecte = true;
	}
	
	if (utilisateur != '' && utilisateur != null && utilisateur != undefined) {
	    var vSQL = "select top 1 am0.fonction as fonction from am0 where am0.template is null and titulaire = '" + utilisateur + "' ";
	    var oRes = oQryObj.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	    if (oRows.Count == 1) {
	        var vFunction = GetItemValue("fonction", oRows[0]);
	        if (vFunction == "Negociateur" ) {
	            cible = 'NEG';
	            vTransTo = utilisateur;
	        } else if (vFunction == "Assistant Achat") {
	            cible = 'ASS';
	            vTransTo = utilisateur;
	        } else {
	            cible = 'PROS';
	            vTransTo = utilisateur;
	        }
	        
	
	    }
	
	
	// Modifie la condition pour inclure isNonAffecte
	if (demtrans == '1' && cible != '' && (validtransfert == 'Oui' || ( isNonAffecte &&  ( Session["ResFunction"] == "Team Leader Prospection" || Session["ResFunction"] == "Manager Achat Opérationnel" )))) {
	    
	    var vSQL = "select top 1 hi0.nrid as hi0nrid from hi0 where status = 'A FAIRE' and hi0.template is null and so0_nrid = '" + SocNrid + "' ";
	    var oRes = oQryObj.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	    if (oRows.Count == 1) {
	        var NridAct = GetItemValue("hi0nrid", oRows[0]);
	        var ObjSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var ProcParam: StoredProcParam[] = new StoredProcParam[3];
	        ProcParam[0] = new StoredProcParam("pAcnNRID", "NUMBER", "IN", 200, NridAct);
	        ProcParam[1] = new StoredProcParam("pTitulaire", "VARCHAR", "IN", 30, vTransTo);
	        ProcParam[2] = new StoredProcParam("pFunction", "VARCHAR", "IN", 30, cible);
	        var strResultProc = ObjSQL.ExecuteStoredProc("sp_affect_todo", ProcParam);
	    }
	    
	    if (cible == 'NEG') {
	        CurrentRecord["CpyExtAcht"] = vTransTo;
	    } else if (cible == 'PROS') {
	        CurrentRecord["CpyExtProsp"] = vTransTo;
	    } else if (cible == 'ASS') {
	        CurrentRecord["CpyExtSrc"] = vTransTo;
	
	        var vSQL2 = "select resmng.titulaire as buyer from sysadm.res_liees, sysadm.am0 resmng where res_liees.personne = resmng.titulaire and resmng.fonction = 'Negociateur' and res_liees.vue_ressource = '" + utilisateur + "' ";
	        var oRes2 = oQryObj.ExecuteSql(vSQL2);
	        var oXmlDoc2 = InitXml(oRes2);
	        var oRows2 = FindItem("Flds", oXmlDoc2, true);
	        if (oRows2.Count == 1) {
	            var vBuyer = GetItemValue("buyer", oRows2[0]);
	        }
	        if (vBuyer != "" && vBuyer != null) {
	            CurrentRecord["CpyExtAcht"] = vBuyer;
	        }
	    }
	
	            // Applique la logique pour flagaffect basée sur vFunction
	        if (vFunction == "Assistant Achat" || vFunction == "Sourceur") {
	            if (flagaffect == '1') {
	                CurrentRecord["CpyExtFlagAffect"] = '0';
	            }
	        } else {
	            CurrentRecord["CpyExtFlagAffect"] = '1';
	        }
	
	    
	
	    CurrentRecord["CpyOwner"] = vTransTo;
	    CurrentRecord["CpyExtDdeTransfertCP"] = '';
	    CurrentRecord["CpyExtValideurdetransfert"] = CurrentUserName;
	    CurrentRecord["CpyExtDatedetransfert"] = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["CpyExtDateAffect"] = DateTime.Now.ToString("dd/MM/yyyy");
	    CurrentRecord["CpyExtVldtndtrnsfrt"] = '';
	    CurrentRecord["CpyExtPourach"] = '';
	    
	}
	}
	
	if (CurrentRecord.IsUpdated("CpyExtVldtndtrnsfrt") && CurrentRecord["CpyExtVldtndtrnsfrt"] == 'Non') {
	    CurrentRecord["CpyExtDdeTransfertCP"] = '';
	    CurrentRecord["CpyExtPourach"] = '';
	    CurrentRecord["CpyExtVldtndtrnsfrt"] = '';
	}
	
	oQryObj.Dispose();
	FreeSelligentObject(oQryObj);
		// HAS : Mettre à jour le Manager Achat à partir du nouveau Acheteur
	
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	if (CurrentRecord["CpyExtAcht"] != "" && CurrentRecord["CpyExtAcht"] != null) {
	    var vSQL2 = "select titulaire as mngach   from sysadm.am0 res_mng where Template is null and bactive =1 and (res_mng.fonction like '%Team Leader%') and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire ='" + CurrentRecord["CpyExtAcht"] + "' and Template is null) ";
	    var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	    var oXmlDoc2 = InitXml(oRes2);
	    var oRows2 = FindItem("Flds", oXmlDoc2, true);
	    //if (GetItemValue("mngach", oRows2[0]) != "" && GetItemValue("mngach", oRows2[0]) != null && GetItemValue("mngach", oRows2[0]) != undefined)
	    if (oRows2.Count != 0) {
	        CurrentRecord["CpyExtManagerAchat"] = GetItemValue("mngach", oRows2[0]);
	    } else return true;
	}
	delete oQryObj2;
	// HAS : Mettre à jour le Manager Prospection à partir du nouveau Prospecteur
	var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var source = "";
	var vSrc = 0;
	var vPros = 0;
	if (CurrentRecord["CpyExtSrc"] != "" && CurrentRecord["CpyExtSrc"] != null) {
	    vSrc = 1;
	} 
	if (CurrentRecord["CpyExtProsp"] != "" && CurrentRecord["CpyExtProsp"] != null) {
	    vPros = 1;
	}
	if (vPros == 1) {
	    source = CurrentRecord["CpyExtProsp"];
	} else if (vPros == 0 && vSrc == 1) {
	    source = CurrentRecord["CpyExtSrc"];
	}
	
	
	
	if (source != "") {
	    var vSQL2 = "select titulaire as mngprosp   from sysadm.am0 res_mng where Template is null and bactive =1 and (res_mng.fonction like '%Team Leader%') and res_mng.team_name in (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire ='" + source + "' and Template is null) ";
	    var oRes2 = oQryObj2.ExecuteSql(vSQL2);
	    var oXmlDoc2 = InitXml(oRes2);
	    var oRows2 = FindItem("Flds", oXmlDoc2, true);
	    //if (GetItemValue("mngprosp", oRows2[0]) != "" && GetItemValue("mngprosp", oRows2[0]) != null && GetItemValue("mngprosp", oRows2[0]) != undefined)
	    if (oRows2.Count != 0) {
	        CurrentRecord["CpyExtManagerProspection"] = GetItemValue("mngprosp", oRows2[0]);
	    } else return true;
	}
	delete oQryObj2;
	
	
	
	// HAS: maj le stecteur du fournisseur à partir du secteur du nouveau titulaire
	var oQryObj3 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	if (CurrentRecord["CpyOwner"] != "" && CurrentRecord["CpyOwner"] != null) {
	    var vSQL = "select top 1 team_name as SecteurComp from am0 where titulaire ='" + CurrentRecord["CpyOwner"] + "' and Template is null";
	    var oRes = oQryObj3.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var vSecteur = GetItemValue("SecteurComp", oXmlDoc);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	    if (oRows.Count == 1) {
	        CurrentRecord["CpyExtSecteur"] = vSecteur; //GetItemValue("SecteurComp", oRows[0][0]);
	    }
	}
	delete oQryObj3;
	//CurrentRecord["CpyExtSecteur"] = "BEST TEAM";
	
	
	
	// HAS DEB ACHAT 2020 : Mettre à jour titulaire suite affectation prospection
	if (CurrentRecord.IsUpdated("CpyExtFlagAffect") && CurrentRecord["CpyExtFlagAffect"] == '1') {
	    if(vTransTo == "" || vTransTo == CurrentUserName){
	        CurrentRecord["CpyOwner"] = CurrentUserName;
	        CurrentRecord["CpyExtDateAffect"] = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss");
	    }
	}
	// HAS END ACHAT 2020 : Mettre à jour titulaire suite affectation prospection
	
	
	// Debut HAS : 13/11/2018 - gestion VD titulaire
	if (CurrentRecord.IsUpdated("CpyOwner")) {
	    //throw"un nouveau acheteur";
	    var objSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var nCpyNRID = CurrentRecord["CpyNRID"];
	    var vOwner = CurrentRecord["CpyOwner"];
	    var vSQL1 = "insert into sysadm.x_titulaire (Titulaire, so0_nrid , datemodif) values ('" + vOwner + "', '" + nCpyNRID + "' , getdate()) ";
	    var oRes1 = objSQL.ExecuteSql(vSQL1);
	    delete objSQL;
	}
	// END HAS : 13/11/2018 - gestion VD titulaire
		Session["SAP_UPDT_SIRET"] = false;
	if (CurrentRecord["CpyExtOutSrc"] == '1' && CurrentRecord.IsUpdated("CpyExtSiret") == true  )  //
	{
	  Session["SAP_UPDT_SIRET"] = true;
	}
		SS_Cpy_Audit_DateStatut();
		var vValidSrc = CurrentRecord["CpyExtValidSrc"];
	var vPotential = CurrentRecord["CpyExtFrsPotential"];
	if (CurrentRecord.IsUpdated("CpyExtValidSrc") && (vValidSrc == 'Approuvé' || vValidSrc == 'Non approuvé')) {
	    CurrentRecord["CpyExtDateValidSrc"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	
	
	
	if (CurrentRecord.IsUpdated("CpyExtFrsPotential") && vPotential != '' && vPotential != null) {
	    CurrentRecord["CpyExtFrsDatePotential"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
	
	
	
	if (CurrentRecord.IsUpdated("CpyExtValidTlSrc") && CurrentRecord["CpyExtValidTlSrc"] == '1') {
	    CurrentRecord["CpyExtDateValidTlSrc"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
	
		return true;
}