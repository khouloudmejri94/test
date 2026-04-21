function()
{
	if (top.MyApp.CurrentSetting.nChapMode != "Reset" && vProfiluser != 'ADMT') {
	 if (top.MyApp.FindItem("AcnExtVlidBF", top.MyData_View)) top.MyApp.SetItem('AcnExtVlidBF', "disabled", true, top.MyData_View);
	 if (top.MyApp.FindItem("AcnExtCheckBF", top.MyData_View)) top.MyApp.SetItem('AcnExtCheckBF', "disabled", true, top.MyData_View);
	}
		/************************************************************************************************************/
	// Société                             : MASAO
	// Nom script                          : AfterLoad_Header_1000080  
	// Infos Paramètres                    :  
	// Auteur                              : KEL                                                  
	// Chapitre concerné                   : Acn
	// Date de création                    : 28/05/2012
	// Modifié par                         :                                                   
	// Date de modification                :  
	// Commentaires                        : si statut = fait alors pas de modification possible
	// Règles de gestion                   : 
	/*************************************************************************************************************/
		/// HAS DEB 15/08/2023 - si POPO annulée alors champ motif annulation obligatoire
	 PS_Acn_Header_Status();
	 var typeHnd = top.MyApp.FindItem("AcnStatus", top.MyData_View);
	 if (typeHnd) {
	   top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Acn_Header_Status);
	   top.MyApp.fctAddEvent(typeHnd, "change", PS_Acn_Header_Status);
	 }
	/// HAS END 15/08/2023 - si POPO annulée alors champ motif annulation obligatoire
		var strStatut = top.MyApp.GetItemValue("AcnStatus", top.MyData_View);
	var strProfileInitials = top.MyApp.UserSetting.User.ProfileInitials;
	var strNote = top.MyApp.GetItemValue("AcnExtNote", top.MyData_View);
	
	// SC Edit: le test va eliminer le profil Vis de l'edition d'une action
	//if( strStatut != "FAIT" || strProfileInitials =='ADMF' || strProfileInitials  == 'ADMT' || strProfileInitials =="MAN_HA_ASS"|| strProfileInitials  == "MAN_HA_SED" || strProfileInitials == "COMP" || strProfileInitials == "LTG" || strProfileInitials == "MAN_PROS_VEO"|| strProfileInitials == "SUPP")
	if ((strStatut != "FAIT" && strStatut != "ANNULE" && strStatut != "FERME") || strProfileInitials == 'ADMF' || strProfileInitials == 'ADMT') {
	 if (top.MyApp.CurrentSetting.bConsultMode == true) {
	  top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	  top.MyApp.fraMenuBar.Execute("R_Edit");
	 }
	} else {
	 if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "blnModified") != "true") {
	  if (top.MyApp.CurrentSetting.bConsultMode == false || top.MyApp.CurrentSetting.bConsultMode == undefined) {
	   top.MyApp.fraMenuBar.Execute("R_Consult");
	  }
	  top.MyApp.fraMenuBar.UpdateMenuItem("R_Edit", 'Di');
	 }
	}
	/*
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "AcnNature") == "true") {
	  if (top.MyApp.GetItemValue("AcnNature", top.MyData_View) == 'ACT-SALON' && strStatut == 'FAIT') {
	   if (strNote == '' || strNote == null || strNote == undefined) {
	    top.MyApp.SetItemAttribute("AcnExtNote", "className", "Mandatory");
	    top.MyApp.CurrentSetting.Catalog["AcnExtNote"].Mn = 1;
	   } else {
	    top.MyApp.SetItemAttribute("AcnExtNote", "className", "");
	    top.MyApp.CurrentSetting.Catalog["AcnExtNote"].Mn = -1;
	   }
	  }
	 }
	}
	*/
	
	// HAS DEB 26/10/2020 controle accés liste de choix qualif appel
	if (strProfileInitials != 'ADMT') {
	    top.MyApp.CurrentSetting.Catalog.AcnExtQualification.Ed = 0;
	}
	// HAS DEB 26/10/2020 controle accés liste de choix qualif appel
		try {
	
	 var nCpyNRID = top.MyApp.GetItemValue("AcnCpyNRID", top.MyData_View);
	 //SC Add : controle sur la selection d'acheteur, prospecteur et fournisseur
	 var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	 if (vProfiluser != 'ADMF' && vProfiluser != 'ADMT') {
	  if (top.MyApp.FindItem("AcnExtAcheteurBtn", top.MyData_View)) top.MyApp.FindItem("AcnExtAcheteurBtn", top.MyData_View).disabled = true;
	  if (top.MyApp.FindItem("AcnExtProspBtn", top.MyData_View)) top.MyApp.FindItem("AcnExtProspBtn", top.MyData_View).disabled = true;
	  if (top.MyApp.FindItem("AcnCpyNameBtn", top.MyData_View)) top.MyApp.FindItem("AcnCpyNameBtn", top.MyData_View).disabled = true;
	 }
	 if (vProfiluser == 'MAN_HA_TER') {
	  if (top.MyApp.FindItem("AcnExtAcheteurBtn", top.MyData_View)) top.MyApp.FindItem("AcnExtAcheteurBtn", top.MyData_View).disabled = false;
	 }
	
	
	
	 //SC End Add:
	 if (top.MyApp.CurrentSetting.nChapMode == "New" && top.MyApp.AppSetting["Cpy"].Record_XML && nCpyNRID != "") {
	  // SC Delete : On n'a pas de CP
	  /*var strAcnExtCp       = top.MyApp.GetItemValue("AcnExtCp",top.MyData_View); 
	  if(strAcnExtCp =="")
	  {
	   var strCPFournisseur = top.MyApp.GetItemAttributeFromXML(top.MyApp.AppSetting["Cpy"].Record_XML,"CpyExtCp","Val");
	   top.MyApp.SetItemValue("AcnExtCp",strCPFournisseur,top.MyData_View); 
	  }*/
	  // SC End Delete
	  var strAcnExtAcheteur = '';
	  if (vProfiluser != "ASS_CO" && vProfiluser != "MAN_HA_ASS" && vProfiluser != "ASS_ACH") {
	   strAcnExtAcheteur = top.MyApp.GetItemValue("AcnExtAcheteur", top.MyData_View);
	  }
	  if (strAcnExtAcheteur == "" && vProfiluser != "ASS_CO" && vProfiluser != "MAN_HA_ASS") {
	   var strAchFournisseur = top.MyApp.GetItemAttributeFromXML(top.MyApp.AppSetting["Cpy"].Record_XML, "CpyExtAcht", "Val");
	   top.MyApp.SetItemValue("AcnExtAcheteur", strAchFournisseur, top.MyData_View);
	  }
	  // SC Edit : Remplacer l'assistant par le Prospecteur
	  /*if( strProfileInitials == "ASS_CO" || strProfileInitials =='ASS_MKT' )
	  {
	   top.MyApp.SetItemValue("AcnExtAssistante",top.MyApp.UserSetting.User.Name,top.MyData_View);     
	  }*/
	  if (strAcnExtAcheteur == null && strAcnExtAcheteur == '') {
	   var strAcnExtProspecteur = top.MyApp.GetItemValue("AcnExtProsp", top.MyData_View);
	   if (strAcnExtProspecteur == "") {
	    var strProsFournisseur = top.MyApp.GetItemAttributeFromXML(top.MyApp.AppSetting["Cpy"].Record_XML, "CpyExtProsp", "Val");
	    top.MyApp.SetItemValue("AcnExtProsp", strProsFournisseur, top.MyData_View);
	   }
	  }
	  // SC End Edit: 
	
	
	 }
	} catch (e) {
	 alert('1000080 ' + e.message);
	}
		 // SC Delete: following "Regle de gestion Dico Action'
	   /*[D]Blocage TEL*/
	 /* try{
	  if(top.MyApp.CurrentSetting.nChapMode == "Open")
	  {
	       var vobjet = top.MyApp.GetItemValue("AcnNature");
	       var vnrid  = top.MyApp.GetItemValue("AcnAcnNRID");
	       var strProfileInitials = top.MyApp.UserSetting.User.ProfileInitials; 
	       if(vobjet == 'RDV' || vobjet == 'DIRECT' || vobjet == 'PROPO')
	        {
	            if(strProfileInitials !='ADMF' && strProfileInitials !='ADMFT' && strProfileInitials  != 'ADMT'){
	  
	              top.MyApp.SetItem("AcnNature", "disabled", true, top.MyData_View);
	              top.MyApp.SetItem("AcnNature", "contentEditable", false, top.MyData_View);
	  
	            }
	  
	            top.MyApp.SetItemValue("AcnExtRelanceAuto",1); 
	        }
	  }
	  }catch(e){
	       alert(e.message);
	  }*/
	  // SC End Delete:
		if(!top.MyApp.CurrentSetting.bConsultMode)
	{
	  top.MyApp._gfctPutButton('AcnPerName', "top.MyApp.PS_RempliChamp('AcnPerName')", '', true, '...');
	}
		return true;
}