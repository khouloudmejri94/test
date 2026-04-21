function()
{
	  /*************************************************************/
	  // Société                             : MASAO
	  // Nom script                          : SS_Acn_OnBeforeInsert  
	  // Infos Paramètres                    :  
	  // Auteur                              : KEL                                                  
	  // Chapitre concerné                   : Acn
	  // Date de création                    : 28/05/2012
	  // Modifié par                         :                                                   
	  // Date de modification                :  
	  // Commentaires                        : si statut ="FAIT" alor il faut créer une nouvelle action 
	  //                                       et l'ouvrir en objet 'TEL' et  statut "A FAIRE" et date évènement du jour plus les champs obligatoire
	  // Règles de gestion                   : remplir champs titulaire : sauf si l'utilisateur choisit le titulaire : si l'action est rendez vous, ou propo, ou direct alors titulaire = acheteur + chef de produit de la fiche fournisseur. Sinon utilisateur connecté.
	  /*************************************************************/
		// SC Remove:
	//Session["MyAcnStatut"]   = false ;
		if( CurrentRecord["AcnExtListeSalon"]  !=""  && CurrentRecord["AcnExtListeSalon"] != null )
	{
	 if( CurrentRecord["AcnExtDateSalon"]  ==""  || CurrentRecord["AcnExtDateSalon"] == null )
	 {
	  CurrentRecord["AcnExtDateSalon"] =  DateTime.Now.ToString("dd/MM/yyyy");
	 }
	}
		// SS_Acn_OnBeforeInsert => Pros et Acheteur
	// Sets default values and team assignments for a new record based on user role and SQL queries.
	
	try {
	
	        if (Session["ResFunction"] == "Activateur") {
	      // Create SQL helper object
	      var oQryObj2 = CreateSelligentObject("SqlHelper", CurrentSessionID);
	      var nCpyNRID = CurrentRecord["AcnCpyNRID"];
	      // HICH: Select Owner Company
	      var vSQL = "select Titulaire as Titulaire from sysadm.so0 where nrid ="+ nCpyNRID ;
	      var oRes = oQryObj2.ExecuteSql(vSQL);
	      var oXmlDoc = InitXml(oRes);
	      var oRows = FindItem("Flds", oXmlDoc, true);
	      
	      if (oRows.Count != 0) {
	          var vOwnerCompany = GetItemValue("Titulaire", oRows[0])
	          }
	
	        FreeSelligentObject(oQryObj2);
	        oQryObj2.Dispose();   
	      }
	
	    // Set default values based on user role (ResFunction)
	    try {
	        if (Session["ResFunction"] == "Prospecteur" || Session["ResFunction"] == "Sourceur") {
	            CurrentRecord["AcnOwner"] = CurrentUserName;
	            CurrentRecord["AcnExtProsp"] = CurrentUserName;
	            CurrentRecord["AcnExtAcheteur"] = "";
	        } else if (Session["ResFunction"] == "Manager Prospection" || Session["ResFunction"] == "Team Leader Prospection") {
	            CurrentRecord["AcnOwner"] = CurrentUserName;
	            CurrentRecord["AcnExtProsp"] = CurrentUserName;
	            CurrentRecord["AcnExtAcheteur"] = "";
	        } else if (Session["ResFunction"] == "Activateur" && CurrentRecord["AcnStatus"] != "FAIT" &&  CurrentRecord["AcnType"] != "LOT DETECTE") {
	        CurrentRecord["AcnExtActivateur"] = CurrentUserName;
	        CurrentRecord["AcnOwner"] = CurrentUserName;
	        CurrentRecord["AcnExtProsp"] = vOwnerCompany;        
	        } else if (Session["ResFunction"] == "Acheteur" || Session["ResFunction"] == "Negociateur") {
	            CurrentRecord["AcnOwner"] = CurrentUserName;
	            CurrentRecord["AcnExtAcheteur"] = CurrentUserName;
	            CurrentRecord["AcnExtProsp"] = "";
	        } else if (Session["ResFunction"] == "Assistante Commerciale") {
	            CurrentRecord["AcnExtAssistante"] = CurrentUserName;
	            if (CurrentRecord["AcnExtProsp"] != null) {
	                CurrentRecord["AcnExtAcheteur"] = "";
	                CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtProsp"];
	            } else if (CurrentRecord["AcnExtAcheteur"] != null && CurrentRecord["AcnExtProsp"] == null) {
	                CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtAcheteur"];
	            }
	        } else if (Session["ResFunction"] == "Manager Achat" || Session["ResFunction"] == "Team Leader Negociation") {
	            CurrentRecord["AcnExtAcheteur"] = CurrentUserName;
	            if (CurrentRecord["AcnExtProsp"] != null) {
	                CurrentRecord["AcnExtAcheteur"] = "";
	                CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtProsp"];
	            } else if (CurrentRecord["AcnExtProsp"] == null) {
	                CurrentRecord["AcnOwner"] = CurrentRecord["AcnExtAcheteur"];
	            }
	        }
	    } catch (e) {
	        throw "Error on SS_Acn_OnNewRecord " + e;
	    }
	
	    // SC: Select buyer and prospector team names
	    // Create SQL helper object
	    var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	    var nCpyNRID = CurrentRecord["AcnCpyNRID"];
	
	    var vSQL = "select (select top 1 team_name from sysadm.am0 where titulaire = '" + CurrentRecord["AcnExtAcheteur"] + "') as EquipeAch, (select top 1 team_name from sysadm.am0 where titulaire = '" + CurrentRecord["AcnExtProsp"] + "') as EquipePros";
	    var oRes = oQryObj.ExecuteSql(vSQL);
	    var oXmlDoc = InitXml(oRes);
	    var oRows = FindItem("Flds", oXmlDoc, true);
	    
	    if (oRows.Count != 0) {
	        if (GetItemValue("EquipePros", oRows[0]) != "" && GetItemValue("EquipePros", oRows[0]) != null) {
	            CurrentRecord["AcnExtEquipeProspecteur"] = GetItemValue("EquipePros", oRows[0]);
	        }
	        if (GetItemValue("EquipeAch", oRows[0]) != "" && GetItemValue("EquipeAch", oRows[0]) != null) {
	            CurrentRecord["AcnExtEquipeAch"] = GetItemValue("EquipeAch", oRows[0]);
	        }
	    }
	} catch (e) {
	    throw "SS_Acn_OnBeforeInsert: " + e.message;
	} finally {
	    // Release Selligent object memory
	    FreeSelligentObject(oQryObj);
	    oQryObj.Dispose();
	
	}
		//SS_Acn_OnBeforeInsert => IF
	
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
	 throw " Erreur SS_Acn_OnBeforeUpdate : " + e.message;
	}    
		//on remplit le numéro de téléphone
	 var oQryObj = CreateSelligentObject("SqlHelper", CurrentSessionID);
	var nAcnCpyNRID = CurrentRecord["AcnCpyNRID"];
	if(nAcnCpyNRID != null && nAcnCpyNRID != '' && CurrentRecord.IsUpdated("AcnCpyNRID"))
	{
	  var vSQL = "select so0.tel1 as so0_tel1, so0.prefixe_int as so0_prefixe_int , so0.xConsigne AS Consigne from sysadm.so0 so0 where so0.nrid = '" + nAcnCpyNRID + "' and so0.template is null"; 
	  var oResCpy = oQryObj.ExecuteSql(vSQL);
	  var oXmlDocCpy = InitXml(oResCpy);  
	  var oRowsCpy = FindItem("Flds", oXmlDocCpy, true);
	  if(oRowsCpy.Count > 0)
	  {
	    CurrentRecord["AcnExtTelephone"] = GetItemValue("so0_tel1", oRowsCpy[0]);
	    CurrentRecord["AcnExtIndicatif"] = GetItemValue("so0_prefixe_int", oRowsCpy[0]);
	
	
	//HICH : récupération consigne frs
	
	    if (CurrentRecord["AcnExtConsigne"] == '' || CurrentRecord["AcnExtConsigne"] == null ){
	
	    CurrentRecord["AcnExtConsigne"] = GetItemValue("Consigne", oRowsCpy[0]);
	
	    }
	
	  }
	}
	//si le numéro de téléphone saisie contient un 0 en premier caractère, on le supprime
	/*TEMP COMMENTAIRE
	if(CurrentRecord.IsUpdated("AcnExtTelephone"))
	{
	  var vPhoneNbr = CurrentRecord["AcnExtTelephone"];
	  if(vPhoneNbr.substring(0,1) == "0") CurrentRecord["AcnExtTelephone"] = vPhoneNbr.substring(1);
	}
	*/
	
	// SC: if action is done or canceled the action date takes today's date
	if(CurrentRecord["AcnStatus"] =="FAIT" || CurrentRecord["AcnStatus"] =="ANNULE" )
	{
	   CurrentRecord["AcnStartDate"]= DateTime.Now.ToString("dd/MM/yyyy");
	}
		/*************************************************************/
	// Société                             : RA_Expansion
	// Nom script                          : SS_Acn_OnBeforeInsert  
	// Infos Paramètres                    :  
	// Auteur                              : Léo Callac                                                 
	// Chapitre concerné                   : Acn
	// Date de création                    : 11.06.2015
	// Modifié par                         :                                                   
	// Date de modification                :  
	// Commentaires                        : Lie une action a une affaire
	// Règles de gestion                   : 1 Litige = 1 Affaire / Si une référence de litige est renseigné et qu'il n'y a pas de référence affaire, alors on renseigne la référence affaire
	/*************************************************************/
	try{
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
	
	} catch(e){
	     throw("beforeInsert oppRef !!! "+e.message);
	}
	/*
	// CODE POSTAL 10.11.2015 CBA
	if ( CurrentRecord["AcnExtCodePost"] ==  "")
	{
	     var vNRID = CurrentRecord["AcnCpyNRID"];
	     var vSQL = "Select so0.code_post_2 From sysadm.so0 Where nrid='"+vNRID+"'";
	     var vRes = oQryObj.ExecuteSql(vSQL);
	     var vXml = InitXml(vRes);
	     var vRows = FindItem("Flds", vXml, true);
	     var strPostCode = GetItemValue("AcnExtCodePost", vRows[0]);
	     CurrentRecord["AcnExtCodePost"] = strPostCode;
	}
	*/
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