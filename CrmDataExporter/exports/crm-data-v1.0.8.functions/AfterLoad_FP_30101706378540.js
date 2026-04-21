function()
{
	  /*************************************************************/
	   // Société                             : MASAO
	   // Nom script                          : AfterLoad_FP_29079765639752
	   // Infos Paramètres                    :  
	   // Auteur                              : CCO                                                  
	   // Chapitre concerné                   : Fournisseur
	   // Date de création                    : 29/05/2012
	   // Modifié par                         :                                                   
	   // Date de modification                :  
	   // Commentaires                        : 
	   // Règles de gestion                   : 
	   /*************************************************************/
	
	
	
	
	
	
	
		// HAS DEB - 2025-02-05 - add a green flag text if Zone GI is Autorised OR Red in the opposite
	//alert("Hello")
	var vGiZ = top.MyApp.GetItemValue("CpyExtGi");
	var oGiZ = top.MyApp.FindItem("Label42191953705764");
	//alert("vGiZ = "+vGiZ)
	if (oGiZ) {
	 if (vGiZ == '1') {
	  oGiZ.innerHTML = "<a id='GiZone'>       Autorised Zone </a> ";
	  oGiZ.style = "cursor:pointer";
	  oGiZ.style.fontWeight = 'bold';
	  oGiZ.style.color = '#228B22';
	  oGiZ.style.backgroundColor = 'white';
	  oGiZ.style.border = '10px';
	  oGiZ.style.textAlign = 'center';
	  oGiZ.style.textDecorationUnderline = true;
	 } else if (vGiZ == '0') {
	  oGiZ.innerHTML = "<a id='GiZone'> Derogation Zone </a> ";
	  oGiZ.style = "cursor:pointer";
	  oGiZ.style.fontWeight = 'bold';
	  oGiZ.style.color = '#f75141';
	  oGiZ.style.backgroundColor = 'white';
	  oGiZ.style.border = '10px';
	  oGiZ.style.textAlign = 'center';
	  oGiZ.style.textDecorationUnderline = true;
	 } else {
	  oGiZ.innerHTML = "";
	 }
	}
	// HAS END - 2025-02-05 - add a green flag text if Zone GI is Autorised OR Red in the opposite
		var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	
	var oCommVlSrc = top.MyApp.FindItem("CpyExtCommVlSrc");
	var oValidTlSrc = top.MyApp.FindItem("CpyExtValidTlSrc");
	
	var vValidTlSrc = top.MyApp.GetItemValue("CpyExtValidTlSrc");
	
	var oFrsPotentialBtn = top.MyApp.FindItem("CpyExtFrsPotentialBtn");
	
	var oFrsPotential = top.MyApp.FindItem("CpyExtFrsPotential");
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (vProfiluser != "ADMT" && vProfiluser != "LEAD_PROS" && vProfiluser != "LEAD_SRC" && vProfiluser != "MNG_ACH_OPR" && vProfiluser != "LEAD_ASS_ACH") {
	
	  top.MyApp.FindItem("CpyExtCommVlSrc").disabled = true;
	
	  top.MyApp.FindItem("CpyExtValidTlSrc").disabled = true;
	
	 }
	
	 if (vProfiluser != "ADMT" && vProfiluser != "ADMF" && vProfiluser != "ADMFT" && vProfiluser != "LEAD_PROS" && vProfiluser != "LEAD_SRC" && vProfiluser != "MNG_ACH_OPR" && vProfiluser != "LEAD_ASS_ACH") {
	
	  if (vProfiluser == "PROS_SEN" && vValidTlSrc != '1') {
	
	   top.MyApp.FindItem("CpyExtFrsPotential").disabled = false;
	
	   //&top.MyApp.FindItem("CpyExtFrsPotentialBtn").disabled = false;
	
	  } else {
	
	   top.MyApp.FindItem("CpyExtFrsPotential").disabled = true;
	
	   //top.MyApp.FindItem("CpyExtFrsPotentialBtn").disabled = true;
	
	  }
	
	 } else {
	
	  top.MyApp.FindItem("CpyExtFrsPotential").disabled = false;
	
	  //top.MyApp.FindItem("CpyExtFrsPotentialBtn").disabled = false;
	
	 }
	
	
	
	}
		var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	//top.MyApp.FindItem("CpyExtValidTlSrc").disabled = true;
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (vProfiluser != 'ADMF' && vProfiluser != 'ADMFT' && vProfiluser != 'ADMT') {
	  top.MyApp.FindItem("CpyExtCmmntrRfsAdmn", top.MyData_View).disabled = true;
	  top.MyApp.FindItem("CpyExtVldtndtrnsfrt", top.MyData_View).disabled = true;
	  top.MyApp.FindItem("CpyExtCmmntrRfsTrnsfrt", top.MyData_View).disabled = true;
	  top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View).disabled = true;
	  //top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View).disabled = true;
	 }
	}
	
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	 var vUserName = top.MyApp.UserSetting.User.Name;
	 //   var vChefdeProduit = top.MyApp.GetItemValue("CpyExtCp");
	 var vAcheteur = top.MyApp.GetItemValue("CpyOwner");
	 var vRessCP = "";
	 var vRessAC = "";
	 var nbRow = top.MyApp.CustomSetting.VueRessource.length;
	 var vEtatPepite = top.MyApp.GetItemValue("CpyExtEtatPepite");
	 var vValidSAS = top.MyApp.GetItemValue("CpyExtValidSas");
	 var vValidation = top.MyApp.GetItemValue("CpyExtValidAdm");
	 //   var vValidMng = top.MyApp.GetItemValue("CpyExtValidationManager");
	 for (var j = 0; j < nbRow; j++) {
	  //    if(top.MyApp.CustomSetting.VueRessource[j][0] == vChefdeProduit){
	  //      vRessCP = top.MyApp.CustomSetting.VueRessource[j][0];
	  //    }
	  if (top.MyApp.CustomSetting.VueRessource[j][0] == vAcheteur) {
	   vRessAC = top.MyApp.CustomSetting.VueRessource[j][0];
	  }
	 }
	
	 //code bizarre 
	 if (vProfiluser != 'ADMF' && vProfiluser != 'ADMFT' && vProfiluser != 'ADMT') {
	  //top.MyApp.FindItem("CpyExtCommRefusCP", top.MyData_View).disabled = true;
	  top.MyApp.FindItem("CpyExtCmmntrRfsAdmn", top.MyData_View).disabled = true;
	  //top.MyApp.FindItem("CpyExtValidtransprosp", top.MyData_View).disabled = true;
	  top.MyApp.FindItem("CpyExtValidAdm", top.MyData_View).disabled = true;
	  //top.MyApp.FindItem("CpyExtValidationManager", top.MyData_View).disabled = true;
	  top.MyApp.FindItem("CpyExtVldtndtrnsfrt", top.MyData_View).disabled = true;
	  top.MyApp.FindItem("CpyExtCmmntrRfsTrnsfrt", top.MyData_View).disabled = true;
	 }
	 //code bizarre 
	 if ((vProfiluser == 'ADMFT') || (vProfiluser == 'ADMF') || (vProfiluser == 'ADMT')) {
	  if ((vValidation == 0 && vValidSAS == 'COMPLETE' && vEtatPepite == 'SAS') || (vValidation == 1 && vValidSAS != 'COMPLETE' && vValidSAS != 'METTRE EN POUBELLE' && vEtatPepite == 'SAS')) {
	   // (vValidation == 0 && vValidSAS == 'METTRE EN POUBELLE'  && vEtatPepite == 'PEPITE'  ) ||   (vValidation == 1 && ( vValidSAS != 'METTRE EN POUBELLE' ||  vValidSAS != 'COMPLETE'  )  )
	   // top.MyApp.OpenDlg("Alert", ["Pour Passer la fiche en PEPITE, \n Merci de cocher la Validation Administrative et de choisir COMPLETE "]);
	   // return false;
	   top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Merci de respecter les conditions de validation."]]);
	   return false;
	  }
	 }
	
	 // HAS DEB 08/04/2023 : ajouter controle sur l'onglet qualification fiche 
	 PS_Cpy_Valid_AddEvent();
	 var typeHnd = top.MyApp.FindItem("CpyExtValidSrc", top.MyData_View);
	 if (typeHnd) {
	  top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_Valid_AddEvent);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_Valid_AddEvent);
	 }
	 // HAS END 08/04/2023 : ajouter controle sur l'onglet qualification fiche
	 // HAS DEB 15/09/2023 : ajouter controle sur l'onglet qualification fiche 
	 var typeHnd = top.MyApp.FindItem("CpyExtValidSas", top.MyData_View);
	 if (typeHnd) {
	  top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Cpy_Valid_AddEvent);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Cpy_Valid_AddEvent);
	 }
	}
	
	// HAS DEB 26102022 : Aduit - si demande de suppression alors champ commenatire obligatoire
	/*if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    var oApprSrc = top.MyApp.FindItem("CpyExtValidSrc", top.MyData_View);
	    var vApprSrc = top.MyApp.GetItemValue("CpyExtValidSrc");
	    if (oApprSrc) {
	        if (vApprSrc == "Approuvé" || vApprSrc == "Incomplet" || vApprSrc == "Non approuvé") {
	            top.MyApp._gfctSetClassName("CpyExtCommVlSrc", "NM");
	        } else {
	            top.MyApp._gfctSetClassName("CpyExtCommVlSrc", "UM");
	        }
	        oApprSrc.onchange = function() {
	            var oApprSrc = top.MyApp.FindItem("CpyExtValidSrc", top.MyData_View);
	            var vApprSrc = top.MyApp.GetItemValue("CpyExtValidSrc");
	            if (oApprSrc) {
	                if (vApprSrc == "Approuvé" || vApprSrc == "Incomplet" || vApprSrc == "Non approuvé") {
	                    top.MyApp._gfctSetClassName("CpyExtCommVlSrc", "NM");
	                } else {
	                    top.MyApp._gfctSetClassName("CpyExtCommVlSrc", "UM");
	                }
	            }
	        };
	    }
	}*/
	// HAS END 26102022 : Aduit - si demande de suppression alors champ commenatire obligatoire
		return true;
}