function SS_Acn_AddNewActionProp()
{
	//SS_Acn_AddNewActionProp
	
	try
	  {
	if (Session["ResFunction"]!= "Back Office" && Session["ResFunction"]!= "Administrateur"){
	     var MyAcnObj = CreateSelligentObject("Action", CurrentSessionID, false);
	     MyAcnObj.New();
	     var mySelectionRow  = new SelectionRow();
	     mySelectionRow.Fields["AcnStatus"]       = "A FAIRE";
	     //HICH DEB: Si PROFILE ACTIVATEUR OWNER = PROSPECTEUR
	    if(Session["ResFunction"] == "Activateur"){
	    mySelectionRow.Fields["AcnOwner"]        = CurrentRecord["AcnExtProsp"];
	    mySelectionRow.Fields["AcnExtProsp"]       = CurrentRecord["AcnExtProsp"];
	    }else{
	      mySelectionRow.Fields["AcnOwner"]        = CurrentUserName;
	      }
	      //HICH FIN: Si PROFILE ACTIVATEUR OWNER = PROSPECTEUR
	
	     mySelectionRow.Fields["AcnNature"]       = "PROPO";
	     mySelectionRow.Fields["AcnType"]         = "LOT DETECTE" ;  
	     mySelectionRow.Fields["AcnObject"]       = CurrentRecord["AcnObject"];
	     mySelectionRow.Fields["AcnSubject"]      = CurrentRecord["AcnSubject"];
	     mySelectionRow.Fields["AcnCpyName"]      = CurrentRecord["AcnCpyName"];
	     mySelectionRow.Fields["AcnCpyNRID"]      = CurrentRecord["AcnCpyNRID"];
	     mySelectionRow.Fields["AcnPerName"]      = CurrentRecord["AcnPerName"];
	     mySelectionRow.Fields["AcnPerNRID"]      = CurrentRecord["AcnPerNRID"];
	     mySelectionRow.Fields["AcnPriority"]     = CurrentRecord["AcnPriority"];
	
	
	  mySelectionRow.Fields["AcnExtConsigne"] = CurrentRecord["AcnExtConsigne"];  //Consigne
	
	     mySelectionRow.Fields["AcnExtAtypique"]  = CurrentRecord["AcnExtAtypique"]; // Lot Atypique
	    mySelectionRow.Fields["AcnExtCampagne"]  = CurrentRecord["AcnExtCampagne"]; // Nom Campagne
	
	
	     // SC DELETE: 
	     //mySelectionRow.Fields["AcnExtCp"]             = CurrentRecord["AcnExtCp"];
	    // mySelectionRow.Fields["AcnExtEquipeCp"]       = CurrentRecord["AcnExtEquipeCp"];
	     mySelectionRow.Fields["AcnExtAcheteur"]       = CurrentRecord["AcnExtAcheteur"];
	     mySelectionRow.Fields["AcnExtEquipeAch"]      = CurrentRecord["AcnExtEquipeAch"];
	     //SC ADD:
	 if (CurrentRecord["AcnExtAcheteur"] == null && CurrentRecord["AcnExtAcheteur"] == '')
	 {
	      mySelectionRow.Fields["AcnExtProsp"]       = CurrentRecord["AcnExtProsp"];
	     mySelectionRow.Fields["AcnExtEquipeProspecteur"]      = CurrentRecord["AcnExtEquipeProspecteur"];
	}
	     mySelectionRow.Fields["AcnExtManager"] = CurrentRecord["AcnExtManager"];
	     mySelectionRow.Fields["AcnExtRelanceAuto"]      = 1;
	     mySelectionRow.Fields["AcnExtCommentaire"]      = CurrentRecord["AcnExtCommentaire"];
	     // SC ADD:
	      var date = new Date();
	      date.setDate(date.getDate());
	      var dayS = date.getDate();
	      var monthS = date.getMonth()+1;
	      var yearS = date.getFullYear();
	      var dateRs = new DateTime(yearS,monthS,dayS);
	      mySelectionRow.Fields["AcnStartDate"] =  dateRs;
	 // SC END ADD
	 mySelectionRow.Fields["AcnExtListeSalon"]= CurrentRecord["AcnExtListeSalon"];
	 mySelectionRow.Fields["AcnExtNote"]= CurrentRecord["AcnExtNote"];
	 mySelectionRow.Fields["AcnExtDateSalon"] = CurrentRecord["AcnExtDateSalon"]
	
	
	// HAS DEB 15/10/2020 : ajouter l'affaire AR
	    mySelectionRow.Fields["AcnExtAffairAR"] = CurrentRecord["AcnExtAffairAR"];
	// HAS END 15/10/2020 : ajouter l'affaire AR
	
	
	 
	
	
	
	  
	     MyAcnObj.SetAndSave(mySelectionRow);
	     var myxml=MyAcnObj.GetXml("AllFields");
	     var MyXmlDocument=InitXml(myxml);
	     var intAcnNRID  =  GetItemValue("AcnNRID",MyXmlDocument) ;
	     delete  MyAcnObj;
	     CurrentRecord["AcnAcnSubject"] = "" ;
	     CurrentRecord["AcnAcnNRID"]    = intAcnNRID  ;
	
	    //HICH DEB: INITIALISATION TO BE ACTIVATED DANS LE FRS
	    var myCompany = CreateSelligentObject("Company", CurrentSessionID, true);
	    var intNridCpy = CurrentRecord['AcnCpyNRID'];
	    var myselectionrow : SelectionRow = new SelectionRow();
	    myselectionrow.Fields["CpyExtActivation"] = 0;
	    myselectionrow.Fields["CpyExtActivateur"] = "";
	    myCompany.Open(intNridCpy);
	    myCompany.SetAndSave(myselectionrow);
	    delete  myCompany;
	    //HICH FIN: INITIALISATION TO BE ACTIVATED DANS LE FRS
	    //HICH : récupération activateur dans la PROPO
	    mySelectionRow.Fields["AcnExtActivateur"] = CurrentRecord["AcnExtActivateur"];
	
	}          
	  }
	  catch(e)
	  {
	    delete  MyAcnObj;
	    delete  myCompany;
	    throw " Erreur SS_Acn_AddNewActionPropo : " + e.message;
	  } 
	
	
	 
		return true;
}