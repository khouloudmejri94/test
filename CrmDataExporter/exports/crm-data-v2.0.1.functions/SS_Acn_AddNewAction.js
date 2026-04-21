function SS_Acn_AddNewAction()
{
	  /*************************************************************/
	  // Société                             : MASAO
	  // Nom script                          : SS_Acn_AddNewAction  
	  // Infos Paramètres                    :  
	  // Auteur                              : KEL                                                  
	  // Chapitre concerné                   : Acn
	  // Date de création                    : 28/05/2012
	  // Modifié par                         :                                                   
	  // Date de modification                :  
	  // Commentaires                        : si statut ="FAIT" alor il faut créer une nouvelle action 
	  //                                       et l'ouvrir en objet 'TEL' et  statut "A FAIRE" et date évènement du jour plus les champs obligatoire
	  // Règles de gestion                   : 
	  /*************************************************************/
		//Selligent.Library.Monitor.Tracer.Write('KELLLLLLLLLLLLLLLLLLLLLLLLLL adddddddddddddddddddddddddd newwwwwwwwwwwwwwwwwww acttttttttttttttttttttttttttttion', false);
	try {
	 if (Session["ResFunction"] != "Back Office" && Session["ResFunction"] != "Administrateur" && CurrentUserName != "SRM Web Service") {
	  var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	  MyAcnObj.New();
	  var mySelectionRow = new SelectionRow();
	  mySelectionRow.Fields["AcnStatus"] = "A FAIRE";
	  mySelectionRow.Fields["AcnOwner"] = CurrentUserName;
	  mySelectionRow.Fields["AcnNature"] = "TEL";
	  mySelectionRow.Fields["AcnType"] = "RELANCE";
	  mySelectionRow.Fields["AcnObject"] = "CLASSIQUE";
	  // HAS 10/06/2022
	  mySelectionRow.Fields["AcnSubject"] = "";
	
	
	  mySelectionRow.Fields["AcnExtConsigne"] = CurrentRecord["AcnExtConsigne"];
	  
	  mySelectionRow.Fields["AcnCpyNRID"] = CurrentRecord["AcnCpyNRID"];
	  mySelectionRow.Fields["AcnPerName"] = CurrentRecord["AcnPerName"];
	  mySelectionRow.Fields["AcnPerNRID"] = CurrentRecord["AcnPerNRID"];
	  mySelectionRow.Fields["AcnPriority"] = CurrentRecord["AcnPriority"];
	
	    mySelectionRow.Fields["AcnCpyName"] = CurrentRecord["AcnCpyName"];
	
	
	  // SC ADD:
	  var date = new Date();
	  //HICH : SI INJOIGNABLE PLANIFIER RELANCE APRES 48 H
	     if (CurrentRecord["AcnType"] == "BARRAGE" || CurrentRecord["AcnType"] == "INJOIGNABLE"){
	         date.setDate(date.getDate()+2);
	  } else {
	   date.setDate(date.getDate());
	   }
	  var dayS = date.getDate();
	  var monthS = date.getMonth() + 1;
	  var yearS = date.getFullYear();
	  var dateRs = new DateTime(yearS, monthS, dayS);
	  mySelectionRow.Fields["AcnStartDate"] = dateRs;
	
	
	  // SC END ADD
	  // SC DELETE: 
	  //mySelectionRow.Fields["AcnExtCp"]             = CurrentRecord["AcnExtCp"];
	  // mySelectionRow.Fields["AcnExtEquipeCp"]       = CurrentRecord["AcnExtEquipeCp"];
	  mySelectionRow.Fields["AcnExtAcheteur"] = CurrentRecord["AcnExtAcheteur"];
	  mySelectionRow.Fields["AcnExtEquipeAch"] = CurrentRecord["AcnExtEquipeAch"];
	  //SC ADD:
	  if (CurrentRecord["AcnExtAcheteur"] == null && CurrentRecord["AcnExtAcheteur"] == '') {
	   // mySelectionRow.Fields["AcnExtProsp"]       = CurrentRecord["AcnExtProsp"];
	   //mySelectionRow.Fields["AcnExtEquipeProspecteur"]      = CurrentRecord["AcnExtEquipeProspecteur"];
	  }
	  mySelectionRow.Fields["AcnExtManager"] = CurrentRecord["AcnExtManager"];
	  mySelectionRow.Fields["AcnExtRelanceAuto"] = 1;
	
	
	  //     gestion des salons 
	  // SC DELETE: 
	  // if(CurrentRecord["AcnNature"] =="TEL" || CurrentRecord["AcnNature"] =="MAIL" || CurrentRecord["AcnNature"] =="MAIL-ENT" || CurrentRecord["AcnNature"] =="DIRECT" || CurrentRecord["AcnNature"] =="TEL-ENT" || CurrentRecord["AcnNature"] =="TEL-SALON")
	
	
	  if (CurrentRecord["AcnExtDateSalon"] == "" || CurrentRecord["AcnExtDateSalon"] == null) {
	   //mySelectionRow.Fields["AcnExtListeSalon"]= CurrentRecord["AcnExtListeSalon"];
	   //mySelectionRow.Fields["AcnExtDateSalon"] = CurrentRecord["AcnExtDateSalon"]
	  } else {
	   var vDateSalon = CurrentRecord["AcnExtDateSalon"];
	   var dtDateSalon = new DateTime(vDateSalon.Year, vDateSalon.Month, vDateSalon.Day, 0, 0, 0);
	   var duration = new TimeSpan(180, 0, 0, 0);
	   var dtDateSalon6Mois = dtDateSalon.Add(duration);
	   var vDateDiff = DateTime.Compare(DateTime.Now, dtDateSalon6Mois);
	   if (vDateDiff == -1) {
	    //mySelectionRow.Fields["AcnExtListeSalon"]= CurrentRecord["AcnExtListeSalon"];
	    //mySelectionRow.Fields["AcnExtDateSalon"] = CurrentRecord["AcnExtDateSalon"]
	   }
	
	
	  }
	  // fin gestion des salons
	
	
	
	  /*[D]Test Suede*/
	  //----------Gestion des relances auto
	  //----------RLM : 30/06/2015
	  /* var objXmlRes,  objNodes, vResReq, objNodesTmp, objSQL;
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
	     //----------Fin Gestion des relances auto*/
	  /*[F]*/
	
	
	
	  MyAcnObj.SetAndSave(mySelectionRow);
	  var myxml = MyAcnObj.GetXml("AllFields");
	  var MyXmlDocument = InitXml(myxml);
	  var intAcnNRID = GetItemValue("AcnNRID", MyXmlDocument);
	  delete MyAcnObj;
	  CurrentRecord["AcnAcnSubject"] = "";
	  CurrentRecord["AcnAcnNRID"] = intAcnNRID;
	 }
	} catch (e) {
	 delete MyAcnObj;
	 throw " Erreur SS_Acn_AddNewAction : " + e.message;
	}
		return true;
}