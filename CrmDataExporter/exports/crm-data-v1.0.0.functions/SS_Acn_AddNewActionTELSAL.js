function SS_Acn_AddNewActionTELSAL()
{
	/*************************************************************/
	  // Société                             : RAE
	  // Nom script                          : SS_Acn_AddNewActionTELSAL  
	  // Infos Paramètres                    :  
	  // Auteur                              : MH                                                  
	  // Chapitre concerné                   : Acn
	  // Date de création                    : 03/08/2015
	  // Modifié par                         :                                                   
	  // Date de modification                :  
	  // Commentaires                        : si statut ="FAIT" et "ACT-SALON" alor il faut créer une nouvelle action 
	  //                                       et l'ouvrir en objet 'TEL-SALON' et  statut "A FAIRE" et date évènement du jour plus les champs obligatoire
	  // Règles de gestion                   : 
	  /*************************************************************/
		// SC DELETE : on n'a pas d'action "TEL-SALON"
	/*
	try
	{
	
	   var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	   MyAcnObj.New();
	   var mySelectionRow  = new SelectionRow();
	   mySelectionRow.Fields["AcnStatus"]       = "A FAIRE";
	   mySelectionRow.Fields["AcnOwner"]        = CurrentUserName;
	   mySelectionRow.Fields["AcnNature"]       = "TEL-SALON";
	   mySelectionRow.Fields["AcnType"]         = "FICHE SALON" ; 
	   mySelectionRow.Fields["AcnObject"]       = CurrentRecord["AcnObject"]; 
	   mySelectionRow.Fields["AcnSubject"]      = "";
	   mySelectionRow.Fields["AcnCpyName"]      = CurrentRecord["AcnCpyName"];
	   mySelectionRow.Fields["AcnOppReference"] = CurrentRecord["AcnOppReference"];
	   mySelectionRow.Fields["AcnCpyNRID"]      = CurrentRecord["AcnCpyNRID"];
	   mySelectionRow.Fields["AcnPerName"]      = CurrentRecord["AcnPerName"];
	   mySelectionRow.Fields["AcnPerNRID"]      = CurrentRecord["AcnPerNRID"];
	   mySelectionRow.Fields["AcnPriority"]     = CurrentRecord["AcnPriority"];
	   
	   mySelectionRow.Fields["AcnExtCp"]             = CurrentRecord["AcnExtCp"];
	   mySelectionRow.Fields["AcnExtEquipeCp"]       = CurrentRecord["AcnExtEquipeCp"];
	   mySelectionRow.Fields["AcnExtAcheteur"]       = CurrentRecord["AcnExtAcheteur"];
	   mySelectionRow.Fields["AcnExtEquipeAch"]      = CurrentRecord["AcnExtEquipeAch"];
	   mySelectionRow.Fields["AcnExtRelanceAuto"]      = 1;
	/*
	     //Ne pas decommenter jusque á gestion salons complet 
	     //--------Gestion salons
	    var objXmlRes,  objNodes, vResReq, objNodesTmp, objSQL;
	    objSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);     
	    objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	    vResReq = objSQL.ExecuteSql("select MAX(h.xliste_salon) as salon from sysadm.hi0 h , sysadm.cosa0 c where h.xliste_salon = c.xcode_edit and c.xstatut = 'En suivi' and h.so0_nrid = '"+CurrentRecord["AcnCpyNRID"]+"'");
	    
	    objXmlRes.async=false;
	    objXmlRes.loadXML(vResReq);
	    objNodes = objXmlRes.getElementsByTagName("Flds");
	    objNodesTmp=objNodes[0].childNodes;
	
	    if(objNodesTmp.length > 0){
	     mySelectionRow.Fields["AcnExtListeSalon"] = objNodesTmp[0].getAttribute("Val");
	    }
	    //----------Fin Gestion salons
	 
	    //[D]Test Suede
	    //----------Gestion des relances auto
	    var objXmlRes,  objNodes, vResReq, objNodesTmp, objSQL;
	    objSQL = CreateSelligentObject("SqlHelper", CurrentSessionID);     
	    objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	    vResReq = objSQL.ExecuteSql("select max(t1.titulaire) as titulaire from sysadm.so0 t1, sysadm.am0 t2 where t1.titulaire = t2.titulaire and t2.xcategorie = 'Groupe' and t1.nrid = '"+CurrentRecord["AcnCpyNRID"]+"'");
	    
	    objXmlRes.async=false;
	    objXmlRes.loadXML(vResReq);
	    objNodes = objXmlRes.getElementsByTagName("Flds");
	    objNodesTmp=objNodes[0].childNodes;
	
	    if(objNodesTmp.length > 0){
	     mySelectionRow.Fields["AcnExtAcheteur"] = objNodesTmp[0].getAttribute("Val");
	     mySelectionRow.Fields["AcnExtGroupe"] = 1;
	    }
	    //----------Fin Gestion des relances auto
	    //[F]
	 
	 
	 
	   MyAcnObj.SetAndSave(mySelectionRow);
	   var myxml=MyAcnObj.GetXml("AllFields");
	   var MyXmlDocument=InitXml(myxml);
	   var intAcnNRID  =  GetItemValue("AcnNRID",MyXmlDocument) ;
	   CurrentRecord["AcnAcnSubject"] = "" ;
	   CurrentRecord["AcnAcnNRID"]    = intAcnNRID  ;
	   delete  MyAcnObj;
	}
	catch(e)
	{
	  delete  MyAcnObj;
	  throw " Erreur SS_Acn_AddNewActionTELSAL : " + e.message;
	} 
	 */
	
	// SC END DELETE:
}