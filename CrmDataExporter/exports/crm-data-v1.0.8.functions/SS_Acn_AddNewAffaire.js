function()
{
	  /*************************************************************/
	   // Nom script                          : SS_Acn_AddNewAffaire  
	   // Infos Paramètres                    :  
	   // Auteur                              : MASAO                                                  
	   // Chapitre concerné                   : Acn
	   // Date de création                    : 28/05/2012
	   // Modifié par                         : Ozeol                                                  
	   // Date de modification                : 27/03/2018
	   // Commentaires                        : si objet = « PROPO »  et statut=  « FAIT » et Raison / Résultat = « LOT DETECTE »
	   //            alors une affaire est crée
	   /*************************************************************/
		//SS_Acn_AddNewAffaire
	try {
	    // Exécution de la procédure stockée pour affecter un numéro de fournisseur avant création de l'affaire
	    var ObjSql = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var ProcParam: StoredProcParam[] = new StoredProcParam[1];
	    var p_NRID = CurrentRecord["AcnCpyNRID"];
	    ProcParam[0] = new StoredProcParam("pCpyNRID", "NUMBER", "IN", 200, p_NRID);
	    var strResultProc = ObjSql.ExecuteStoredProc("sp_seq_four_new", ProcParam);
	} catch (e) {
	    throw ("addNewAffaire sp_seq_four_new " + e);
	}
	
	// Creation de l'objet affaire (Opportunity) avec les donées venant de l'action
	try {
	    var MyOppObj = CreateSelligentObject("Opportunity", CurrentSessionID, false);
	    MyOppObj.New();
	    var mySelectionRow = new SelectionRow();
	    mySelectionRow.Fields["OppPerName"] = CurrentRecord["AcnPerName"]; // nom du contact
	    mySelectionRow.Fields["OppPerNRID"] = CurrentRecord["AcnPerNRID"]; // ID du contact
	    mySelectionRow.Fields["OppComment"] = CurrentRecord["AcnSubject"]; // Descriptif du lot
	
	    mySelectionRow.Fields["OppStatus"] = "01. EN CONSTITUTION"; // Statut de l'affaire
	
	/* 
	    //HICH DEB : 24/06/2025 - PROSPECTOR NESTING PROFILE 
	        if (Session["ResFunction"] == "Prospecteur") {
	            var vSQL = "select count(am0.nrid) as nbr  from sysadm.am0 am0 where am0.template is null and am0.bactive =1 and am0.xZone = 'Coach prospection' and   (am0.fonction ='Team Leader Prospection')  and  am0.team_name = (select res_user.team_name  from sysadm.am0 res_user where res_user.titulaire ='" + CurrentUserName + "')";
	            var oRes = ObjSql.ExecuteSql(vSQL);
	            var oXmlDoc = InitXml(oRes);
	            var oRows = FindItem("Flds", oXmlDoc, true);
	            if (oRows.Count != 0) {
	                mySelectionRow.Fields["OppStatus"] = "01.D Dmd.VALID COACH"; // Statut de l'affaire
	            } else {
	                mySelectionRow.Fields["OppStatus"] = "01. EN CONSTITUTION"; // Statut de l'affaire 
	                }
	        }
	    //HICH END : 24/06/2025 - PROSPECTOR NESTING PROFILE
	
	*/
	
	
	    mySelectionRow.Fields["OppOwner"] = CurrentRecord["AcnOwner"]; // Titulaire de l'action
	    mySelectionRow.Fields["OppType"] = CurrentRecord["AcnNature"]; // Nature de l'action
	    mySelectionRow.Fields["OppExtChefProduit"] = CurrentRecord["AcnExtManager"]; // Manager de titulaire
	    mySelectionRow.Fields["OppExtAtypique"] = CurrentRecord["AcnExtAtypique"]; // Lot Atypique
	    mySelectionRow.Fields["OppExtCampagne"] = CurrentRecord["AcnExtCampagne"]; // Nom Campagne
	
	    //HAS DEB : 18/06/2025 - Set Pair name as Buyer
	    if (Session["ResFunction"] == "Prospecteur") {
	        var vSQL = "select top 1 titulaire_ref2 as LibBuyer from x_pairs_pros_neg where template is null and titulaire_ref1 = '" + CurrentUserName + "' and End_date >= getdate() order by dmod desc";
	        var oRes = ObjSql.ExecuteSql(vSQL);
	        var oXmlDoc = InitXml(oRes);
	        var oRows = FindItem("Flds", oXmlDoc, true);
	        if (oRows.Count != 0) {
	            mySelectionRow.Fields["OppExtAcheteur"] = GetItemValue("LibBuyer", oRows[0]);
	        }
	    }
	    //HAS END : 18/06/2025 - Set Pair name as Buyer
	
	
	    // SC Ajout:  récupérer le statut de l'action qui a créé l'affaire avant l'action du Propo / FAIT
	    var ThisAcnNRID = CurrentRecord["AcnNRID"];
	    var vSQLA = "select hi0.ref from hi0 hi0 where hi0.hi0_nrid = '" + ThisAcnNRID + "'";
	    /////////////var oQryObjA = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var oResA = ObjSql.ExecuteSql(vSQLA);
	    var oXmlDocA = InitXml(oResA);
	    var oRowsA = FindItem("Flds", oXmlDocA, true);
	    if (oRowsA.Count != 0) {
	        mySelectionRow.Fields["OppExtObjAct"] = GetItemValue("AcnNature", oRowsA[0]);
	    }
	    if (CurrentRecord["AcnExtAssistante"] != '' && CurrentRecord["AcnExtAssistante"] != null) {
	        mySelectionRow.Fields["OppExtAssCom"] = CurrentRecord["AcnExtAssistante"]; // L'assistante commerciale
	    }
	    if (CurrentRecord["AcnExtAcheteur"] != '' && CurrentRecord["AcnExtAcheteur"] != null) {
	        mySelectionRow.Fields["OppExtAcheteur"] = CurrentRecord["AcnExtAcheteur"]; // L'acheteur
	    }
	    if (CurrentRecord["AcnExtProsp"] != '' && CurrentRecord["AcnExtProsp"] != null) {
	        mySelectionRow.Fields["OppExtProspecteur"] = CurrentRecord["AcnExtProsp"]; // Le prospecteur
	    }
	    mySelectionRow.Fields["OppExtOrgLot"] = CurrentRecord["AcnObject"]; // Origine du lot
	    if (CurrentRecord["AcnExtListeSalon"] != '' && CurrentRecord["AcnExtListeSalon"] != null) {
	        mySelectionRow.Fields["OppExtSalon"] = CurrentRecord["AcnExtListeSalon"]; // Le nom du Salon
	    }
	
	    // HAS DEB 15/10/2020 : ajouter affaire replaced
	    if (CurrentRecord["AcnExtAffairAR"] != '' && CurrentRecord["AcnExtAffairAR"] != null) {
	        mySelectionRow.Fields["OppExtAffairAR"] = CurrentRecord["AcnExtAffairAR"]; // Le nom du Salon
	    }
	    // HAS DEB 15/10/2020 : ajouter affaire replaced
	
	// Hich : récupération Consigne du l'action PROPO
	
	mySelectionRow.Fields["OppExtConsigne"] = CurrentRecord["AcnExtConsigne"] ;
	
	
	
	    // Récupération des données du fournisseur
	    if (CurrentRecord["AcnCpyNRID"] != "" && CurrentRecord["AcnCpyNRID"] != null) {
	        /////////////var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var vSQL = "select so0.societe,so0.cd, so0.xOutSrc, so0.xconsigne from so0 so0 where so0.nrid = '" + CurrentRecord["AcnCpyNRID"] + "'";
	        var oRes = ObjSql.ExecuteSql(vSQL);
	        var oXmlDoc = InitXml(oRes);
	        var oRows = FindItem("Flds", oXmlDoc, true);
	        if (oRows.Count != 0) {
	            mySelectionRow.Fields["OppCpyName"] = GetItemValue("CpyName", oRows[0]); // Nom de Fournisseur
	            mySelectionRow.Fields["OppCpyNRID"] = CurrentRecord["AcnCpyNRID"]; // ID de Fournisseur
	            mySelectionRow.Fields["OppExtCodeFour"] = GetItemValue("CpyCode", oRows[0]) //Code de Fournisseur
	            mySelectionRow.Fields["OppExtOutSrc"] = GetItemValue("CpyExtOutSrc", oRows[0]) //Flag fournisseur sous traitance
	            //mySelectionRow.Fields["OppExtConsigne"] = GetItemValue("CpyExtConsigne", oRows[0]) //Consigne fournisseur
	        }
	        //delete oQryObj;
	    }
	    MyOppObj.SetAndSave(mySelectionRow);
	} catch (e) {
	    //throw ("addNewAffaire create and save the opp " + e);
	    // Debut HAS : 20/11/2018: changement du message derreur suite changement des donnees du contact
	    //throw ("The contact associated to this action has been changed..please select again the contact of this action!! " + e);
	    throw ("The contact name has been changed.. Please select it again!! " + e);
	}
	
	try { //Récupération de l'ID et numéro de la nouvelle affaire
	    var myxml = MyOppObj.GetXml("AllFields");
	    var MyXmlDocument = InitXml(myxml);
	    var intOppNRID = GetItemValue("OppNRID", MyXmlDocument); // ID de l'affaire
	    var strOppRef = GetItemValue("OppReference", MyXmlDocument); // Numéro de l'affaire
	    // libération mémoire objet “Selligent”
	    try {
	        MyOppObj.Dispose();
	        FreeSelligentObject(MyOppObj);
	    } catch (e) {
	        Selligent.Library.Monitor.Tracer.Write("################################ SS_Acn_AddNewAffaire : échec libération objet “Selligent” #############################");
	    }
	    // Remplissage des informatiions de l'affaire dans l'action
	    CurrentRecord["AcnOppReference"] = strOppRef;
	    CurrentRecord["AcnOppNRID"] = intOppNRID;
	    var MyNRID = CurrentRecord["AcnNRID"];
	    var MyAcn = CreateSelligentObject("Action", CurrentSessionID, false);
	} catch (e) {
	    throw ("addNewAffaire edit and save the action " + e);
	}
	
	try { // définir le variable "ACN_CREATE_OPP" pour déclencher la création de l'affaire dans SAP 
	    if (CurrentRecord["AcnExtAtypique"] != '1') {
	        Session["ACN_CREATE_OPP"] = true; //SS_Opp_Create_Affaire_SAP(strOppRef);
	    }
	} catch (e) {
	    throw (" Add New Affaire SS_Opp_Create_Affaire_SAP: " + e);
	}
	
	// delete ObjSql;
	// libération mémoire objet “Selligent”
	try {
	    ObjSql.Dispose();
	    FreeSelligentObject(ObjSql);
	} catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_Acn_AddNewAffaire : échec libération objet “Selligent” #############################");
	}
		return true;
}