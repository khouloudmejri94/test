function SS_Acn_OnBeforeUpdate()
{
	  /*************************************************************/
	  // Société                             : MASAO
	  // Nom script                          : SS_Acn_OnBeforeUpdate  
	  // Infos Paramètres                    :  
	  // Auteur                              : KEL                                                  
	  // Chapitre concerné                   : Acn
	  // Date de création                    : 28/05/2012
	  // Modifié par                         :                                                   
	  // Date de modification                :  
	  // Commentaires                        : si statut ="FAIT" alor il faut créer une nouvelle action 
	  //                                       et l'ouvrir en objet 'TEL' et  statut "A FAIRE" et date évènement du jour plus les champs obligatoire
	  // Règles de gestion                   : 
	  /*************************************************************/
	
	
	
	
	
	
	
		//SS_Acn_OnBeforeUpdate => Session
	
	Session["MyAcnStatut"] = false;
	
	
	
	
		
	//HAS : debut - si l'action n'est pas de type fermée suite à la mise en poubelle de la société alors on récupère l'utilisateur courant comme dernier modificateur
	
	if (CurrentRecord["AcnExtModificateur"] != 'CLOSED') {
	 CurrentRecord["AcnExtModificateur"] = CurrentUserName;
	}
	
	if(CurrentApplicationID != "100000000000001"){
	 CurrentRecord["AcnExtDateModif"] = DateTime.Now.ToString("dd/MM/yyyy");
	}
		if( CurrentRecord["AcnExtListeSalon"]  !=""  && CurrentRecord["AcnExtListeSalon"] != null )
	{
	 if( CurrentRecord["AcnExtDateSalon"]  ==""  || CurrentRecord["AcnExtDateSalon"] == null )
	 {
	  CurrentRecord["AcnExtDateSalon"] =  DateTime.Now.ToString("dd/MM/yyyy");
	 }
	}
		//var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	// SC Edit:
	try {
	 if (Session["ResFunction"] == "Prospecteur" || Session["ResFunction"] == "Manager Prospection" || Session["ResFunction"] == "Team Leader Prospection" || Session["ResFunction"] == "Sourceur") {
	  CurrentRecord["AcnExtAcheteur"] = "";
	 } else if (Session["ResFunction"] == "Acheteur" || Session["ResFunction"] == "Negociateur") {
	  CurrentRecord["AcnExtProsp"] = "";
	 } else if (Session["ResFunction"] == "Assistante Commerciale") {
	  CurrentRecord["AcnExtAssistante"] = CurrentUserName;
	  if (CurrentRecord["AcnExtProsp"] != null && CurrentRecord["AcnExtAcheteur"] == null) {
	   CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtProsp"];
	  } else if (CurrentRecord["AcnExtAcheteur"] != null && CurrentRecord["AcnExtProsp"] == null) {
	   CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtAcheteur"];
	  }
	 } else if (Session["ResFunction"] == "Manager Achat" || Session["ResFunction"] == "Team Leader Negociation") {
	  if (CurrentRecord["AcnExtProsp"] != null && CurrentRecord["AcnExtAcheteur"] == null) {
	   CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtProsp"];
	  } else if (CurrentRecord["AcnExtAcheteur"] != null && CurrentRecord["AcnExtProsp"] == null) {
	   CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtAcheteur"];
	  }
	 } else if (Session["ResFunction"] == "Administrateur") {
	  if (CurrentRecord["AcnExtProsp"] == CurrentUserName && CurrentRecord["AcnExtAcheteur"] == null) {
	   CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtProsp"];
	  } else if (CurrentRecord["AcnExtProsp"] == null && CurrentRecord["AcnExtAcheteur"] == CurrentUserName) {
	   CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtAcheteur"];
	  }
	 } else if (Session["ResFunction"] == "Assistant Achat") {
	  if (CurrentRecord["AcnNature"] == "RDV" && CurrentRecord["AcnStatus"] == "A FAIRE") {
	   CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtAcheteur"];
	   CurrentRecord["AcnExtAssistante"] = "";
	  }
	 }
	
	
	 if (CurrentRecord.IsUpdated("AcnExtAssistante") == true && CurrentRecord["AcnExtAssistante"] != "" && CurrentRecord["AcnExtAssistante"] != null) {
	  CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtAssistante"];
	 }
	
	} catch (e) {
	 throw "Error on SS_Acn_OnNewRecord " + e;
	}
		//SS_Acn_OnBeforeUpdate => IF
	
	try {
	
	
	
	if(CurrentRecord["AcnStatus"] =="FAIT" && CurrentRecord["AcnType"] != "A SUPPRIMER" && CurrentRecord["AcnType"] != "LOT DETECTE" && CurrentRecord["AcnObject"] != "SORTIE POUBELLE" && CurrentUserName != "SIM Integration" && CurrentRecord["AcnSubject"] != "Selligent Auto Presentation"  )
	   {
	    //NBr des actions avec la societe
	    if (CurrentRecord["AcnStatus"] =="FAIT" && ( CurrentRecord["AcnType"] == "INJOIGNABLE" || CurrentRecord["AcnType"] == "BARRAGE")  && CurrentUserName != "SIM Integration")
	        {
	        var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	        var nAcnCpyNRID = CurrentRecord["AcnCpyNRID"];
	
	        var vSQL = "select count(hi0.nrid) as NBR from sysadm.hi0 hi0 where hi0.so0_nrid = '" + nAcnCpyNRID + "' ";
	        var oResCpy = oQryObj.ExecuteSql(vSQL);
	        var oXmlDocCpy = InitXml(oResCpy);
	        var oRowsCpy = FindItem("Flds", oXmlDocCpy, true);
	
	        var vNbrAcn = GetItemValue("NBR", oRowsCpy[0]);  
	        if (vNbrAcn <= 1 )  
	            {
	                SS_Acn_NewMailDone()
	            }
	        }
	
	        SS_Acn_AddNewAction();
	    }
	    else if(CurrentRecord["AcnStatus"] =="FAIT" &&  CurrentRecord["AcnType"] == "LOT DETECTE" && CurrentRecord["AcnNature"] !="PROPO"  && CurrentUserName != "SIM Integration")
	     {
	        SS_Acn_AddNewActionProp();
	     }
	     else if(CurrentRecord["AcnStatus"] =="FAIT" &&  CurrentRecord["AcnType"] == "LOT DETECTE" && CurrentRecord["AcnNature"] =="PROPO" && CurrentUserName != "SIM Integration")
	     {
	        SS_Acn_AddNewAffaire();
	        SS_Acn_AddNewAction();
	     }
	     else if(CurrentRecord["AcnStatus"] =="ANNULE" && CurrentRecord["AcnNature"] =="PROPO" && CurrentUserName != "SIM Integration")
	    {
	        SS_Acn_AddNewAction();
	    }
	
	 
	} catch (e) {
	 throw " Erreur SS_Acn_OnBeforeUpdate: " + e.message;
	}    
		//on remplit le numéro de téléphone
	var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var nAcnCpyNRID = CurrentRecord["AcnCpyNRID"];
	if (nAcnCpyNRID != null && nAcnCpyNRID != '' && CurrentRecord.IsUpdated("AcnCpyNRID")) {
	 var vSQL = "select so0.tel1 as so0_tel1, so0.prefixe_int as so0_prefixe_int from sysadm.so0 so0 where so0.nrid = '" + nAcnCpyNRID + "' and so0.template is null";
	 var oResCpy = oQryObj.ExecuteSql(vSQL);
	 var oXmlDocCpy = InitXml(oResCpy);
	 var oRowsCpy = FindItem("Flds", oXmlDocCpy, true);
	 if (oRowsCpy.Count > 0) {
	  CurrentRecord["AcnExtTelephone"] = GetItemValue("so0_tel1", oRowsCpy[0]);
	  CurrentRecord["AcnExtIndicatif"] = GetItemValue("so0_prefixe_int", oRowsCpy[0]);
	 }
	}
		if( CurrentRecord["AcnExtDateDebStock"]  ==""  || CurrentRecord["AcnExtDateDebStock"] == null )
	 {
	  CurrentRecord["AcnExtDateDebStock"] =  CurrentRecord["AcnStartDate"];
	 }
		/*************************************************************/
	// Société                             : RA_Expansion
	// Nom script                          : SS_Acn_OnBeforeUpdate
	// Infos Paramètres                    :  
	// Auteur                              : Léo Callac                                                 
	// Chapitre concerné                   : Acn
	// Date de création                    : 11.06.2015
	// Modifié par                         :                                                   
	// Date de modification                :  
	// Commentaires                        : Lie une action a une affaire
	// Règles de gestion                   : 1 Litige = 1 Affaire / Si une référence de litige est renseigné et qu'il n'y a pas de référence affaire, alors on renseigne la référence affaire
	/*************************************************************/
	// Si une référence de litige est renseigné et qu'il n'y a pas de référence affaire
	if ( CurrentRecord["AcnReqReference"] != null && CurrentRecord["AcnOppReference"] == null )
	{
	     var strReq = CurrentRecord["AcnReqReference"];
	     var strOpp = strReq.substring(2,8);
	     CurrentRecord["AcnOppReference"] = strOpp;
	     // Requête qui récupère le NRID d'une affaire avec sa référence (qui est la référence litige sans le 'LI' au début)
	     var vSQL = "Select do0.nrid From sysadm.do0 Where ref ='"+strOpp+"'";
	     var vRes = oQryObj.ExecuteSql(vSQL);
	     var vXml = InitXml(vRes);
	     var vRows = FindItem("Flds", vXml, true);
	     var strOppNRID = GetItemValue("OppNRID", vRows[0]);
	     CurrentRecord["AcnOppNRID"] = strOppNRID;
	}
		//delete oQryObj;
	// libération mémoire objet “Selligent”
	try {
	    FreeSelligentObject(oQryObj);
	    oQryObj.Dispose();
	} catch (e) {
	    Selligent.Library.Monitor.Tracer.Write("################################ SS_Cpy_OnBeforeInsert : échec libération objet “Selligent” #############################");
	}
		return true;
}