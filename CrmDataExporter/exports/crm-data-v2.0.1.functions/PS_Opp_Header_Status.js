function PS_Opp_Header_Status()
{
	
	/************************************************************************************************************************************/
	  // Nom script                          : PS_Opp_Header_Status
	  // NRID                                : 30150865438283 
	  // Infos Paramètres                    :  
	  // Auteur                              : MASAO                             
	  // Chapitre concerné                   : Opp
	  // Date de création                    : 17/05/2013
	  // Modifié par                         : OZEOL                                               
	  // Date de modification                : 01/06/2018
	  // Commentaires                        : application des controles sur l'affaire 
	  /************************************************************************************************************************************/
		//PS_Opp_Header_Status
	var v_Type = top.MyApp.GetItemValue("OppStatus"); // Statut de l'affaire
	var v_Profil = top.MyApp.UserSetting.User.ProfileInitials; // Profil de l'utilisateur courant
	var v_Concurrence = top.MyApp.GetItemValue("OppExtConcLot"); // Concurrence
	var v_DelaiReponse = top.MyApp.GetItemValue("OppExtUrg"); // Délai de Réponse
	var v_MagasinsInterdits = top.MyApp.GetItemValue("OppExtMagasinsinterdits"); // Magasins interdits
	var v_Prenego = v_Type.substr(3, 1);
	var vOutSrc = top.MyApp.GetItemValue('OppExtOutSrc');
	var vCodepaysDep = top.MyApp.GetItemValue('OppExtcodepaysdepart');
	// Si l'objet est en mode recherche aucun contole n'est appliqué
	if (top.MyApp.CurrentSetting.nChapMode == "Reset") return true;
	if (top.MyApp.CurrentSetting.bConsultMode != true) {
	 // HAS DEB ACHAT 2020 : famille de produit obligatoire pour envoyer une demande avis 
	 if (v_Prenego == "A") {
	  // Prénégocation
	  top.MyApp._gfctSetClassName("OppExtFamille", "NM");
	 } else {
	  top.MyApp._gfctSetClassName("OppExtFamille", "UM");
	 }
	 // HAS FIN ACHAT 2020 : famille de produit obligatoire pour envoyer une demande avis 
	
	 //if (v_Type.substr(0, 2) >= '04') { // les champs suivants devinnent obligatoires si le statut est superiur à 03
	 if ((vOutSrc == '1' && v_Type.substr(0, 2) == "03") || v_Type.substr(0, 2) == "04" || v_Type.substr(0, 2) == "05" || v_Type.substr(0, 2) == "06" || v_Type.substr(0, 2) == "07" || v_Type.substr(0, 2) == "08" || v_Type.substr(0, 2) == "10") {
	  // les champs suivants devinnent obligatoires
	  // Origine du lot
	  top.MyApp._gfctSetClassName("OppExtOrgLot", "NM");
	  // Problématique du Lot     
	  top.MyApp._gfctSetClassName("OppExtProbLot", "NM");
	  // Concurrence sur le lot 
	  top.MyApp._gfctSetClassName("OppExtConcLot", "NM");
	  //Lot Global 
	  top.MyApp._gfctSetClassName("OppExtLotGlob", "NM");
	  // Nbre Palettes
	  top.MyApp._gfctSetClassName("OppExtNbPalettes", "NM");
	  
	 } else {
	  //Origine du lot
	  top.MyApp._gfctSetClassName("OppExtOrgLot", "UM");
	  //Problématique du Lot     
	  top.MyApp._gfctSetClassName("OppExtProbLot", "UM");
	  //Concurrence sur le lot 
	  top.MyApp._gfctSetClassName("OppExtConcLot", "UM");
	  //Lot Global 
	  top.MyApp._gfctSetClassName("OppExtLotGlob", "UM");
	  // Nbre Palettes
	  top.MyApp._gfctSetClassName("OppExtNbPalettes", "UM");
	  
	 }
	
	
	 if (v_Type.substr(0, 2) == "03" || v_Type.substr(0, 2) == "04") { // les champs suivants devinnent obligatoires si le statut est égale à 04
	  // Manager
	  top.MyApp._gfctSetClassName("OppExtChefproduit", "NM");
	  if (v_Concurrence == "Oui") {
	   // Si Concurrence
	   top.MyApp._gfctSetClassName("OppExtSiOui", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("OppExtSiOui", "UM");
	  }
	  // Délai de Réponse
	  top.MyApp._gfctSetClassName("OppExtUrg", "NM");
	  // Si Urgent
	  if (v_DelaiReponse == "Urgent") {
	   // Raisons de l'urgence
	   top.MyApp._gfctSetClassName("OppExtRaisUrg", "NM");
	   // Échéance
	   top.MyApp._gfctSetClassName("OppExtDateEcheance", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("OppExtRaisUrg", "UM");
	   top.MyApp._gfctSetClassName("OppExtDateEcheance", "UM");
	  }
	  //Si Mag. Interdits
	  if (v_MagasinsInterdits == "Oui") {
	   top.MyApp._gfctSetClassName("OppExtRaisInterd", "NM");
	  } else {
	   top.MyApp._gfctSetClassName("OppExtRaisInterd", "UM");
	  }
	 } else {
	  // Manager
	  top.MyApp._gfctSetClassName("OppExtChefproduit", "NM");
	
	
	  top.MyApp._gfctSetClassName("OppExtSiOui", "UM");
	  // Délai de Réponse
	  top.MyApp._gfctSetClassName("OppExtUrg", "UM");
	  // Si pas Urgent
	  top.MyApp._gfctSetClassName("OppExtRaisUrg", "UM");
	  //Si pas Mag. Interdits 
	  top.MyApp._gfctSetClassName("OppExtRaisInterd", "UM");
	
	  top.MyApp._gfctSetClassName("OppExtDateEcheance", "UM");
	 }
	
	 // HAS DEB 27/01/2025 si Pays de depart INDONESIE alors definir si contient BOIS
	 if (vCodepaysDep == "ID") {
	  top.MyApp._gfctSetClassName("OppExtBois", "NM");
	 } else {
	  top.MyApp._gfctSetClassName("OppExtBois", "UM");
	 }
	
	}
	
	if (v_Type.substr(0, 2) == "02") { // les champs suivants devinnent obligatoires si le statut est égale à 02
	 // Langue
	 top.MyApp._gfctSetClassName("OppExtLang", "NM");
	 // Raison
	 top.MyApp._gfctSetClassName("OppExtRaisonNS", "NM");
	 // Commentaire Non Suivi
	 top.MyApp._gfctSetClassName("OppExtRaisonComNS", "NM");
	} else {
	 top.MyApp._gfctSetClassName("OppExtRaisonNS", "UM");
	 top.MyApp._gfctSetClassName("OppExtRaisonComNS", "UM");
	 top.MyApp._gfctSetClassName("OppExtLang", "UM");
	 top.MyApp.SetItemValue("OppExtQuestion", "");
	}
	
	if (v_Type.substr(0, 2) == "03" || v_Type.substr(0, 2) == "06" || v_Type.substr(0, 2) == "07" || v_Type.substr(0, 2) == "04") { // Le champ acheteur est obligatoire dans l'une de ces statuts (03, 06, 07)
	 top.MyApp._gfctSetClassName("OppExtAcheteur", "NM");
	 top.MyApp._gfctSetClassName("OppExtNature", "NM");
	 //Dedouane
	 top.MyApp._gfctSetClassName("OppExtDedeoune", "NM");
	 //Bois
	 top.MyApp._gfctSetClassName("OppExtBois", "NM");
	} else {
	 // MODIF FS 1801  top.MyApp._gfctSetClassName("OppExtAcheteur", "B");
	 top.MyApp._gfctSetClassName("OppExtAcheteur", "UM");
	 top.MyApp._gfctSetClassName("OppExtNature", "UM");
	 //Dedouane
	 top.MyApp._gfctSetClassName("OppExtDedeoune", "UM");
	 //Bois
	 top.MyApp._gfctSetClassName("OppExtBois", "UM");
	}
	
	if (v_Type.substr(0, 4) == "01.D" ) { // Le champ acheteur est obligatoire dans le statut (01.D)
	 top.MyApp._gfctSetClassName("OppExtAcheteur", "NM");
	
	} else {
	
	 top.MyApp._gfctSetClassName("OppExtAcheteur", "UM");
	}
	
	if (v_Type.substr(0, 2) == "08") { // Si le statut est 08. SANS SUITE alors seules les profils administratifs (ADMT, ADMF) peuvent modifier l'affaire
	 var vListProfilsValides = "ADMT;ADMF;QUA";
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	 if (vListProfilsValides.indexOf(vProf) == -1) {
	  top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	 }
	}
	
	if (v_Type.substr(0, 2) == "09" || v_Type.substr(0, 2) == "10") { // HAS: si Incomplet(09,10) alors le champ de Réponse acheteur devient obligatoire
	 top.MyApp._gfctSetClassName("OppExtCommQu", "NM");
	} else {
	 // MODIF FS 1801   top.MyApp._gfctSetClassName("OppExtCommQu", "B");
	 top.MyApp._gfctSetClassName("OppExtCommQu", "UM");
	}
	
	if (top.CurrentSetting.nChapMode == "Open") { // Seulement ces profils on le droit d'editer le champ de Réponse acheteur: ADMF, ADMT, MAN_HA_TER, MAN_HA_ASS
	 var vUserProfile = top.MyApp.UserSetting.User.ProfileInitials;
	 if (vUserProfile == 'ADMF' || vUserProfile == 'ADMT' || vUserProfile == 'MAN_HA_TER' || vUserProfile == 'MAN_HA_ASS') {
	  if (top.MyApp.FindItem("OppExtCommQu")) {
	   top.MyApp.FindItem("OppExtCommQu", top.MyData_View).disabled = false;
	  }
	 } else {
	  if (top.MyApp.FindItem("OppExtCommQu")) {
	   top.MyApp.FindItem("OppExtCommQu", top.MyData_View).disabled = true;
	  }
	 }
	}
	
	//[Hichem]11/07/2018 Si statut = batch accepted alors le champs pays facturation devient obligatoire
	var vStatutaff = top.MyApp.GetItemValue("OppStatus"); // Statut de l'affaire
	if (vStatutaff.substr(0, 2) >= "05") {
	 top.MyApp._gfctSetClassName("OppExtPaysFacturation", "NM");
	} else {
	 top.MyApp._gfctSetClassName("OppExtPaysFacturation", "UM");
	}
		if (top.MyApp.GetItemValue("OppExtAtypique") != "1") {
	   top.MyApp.SetItem("OppExtClient1", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient1Dec", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1Dec", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient1DecBtn", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient2Dec", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2Dec", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient2DecBtn", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtEtape", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtEtape", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtEtapeBtn", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtCategorie", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtCategorie", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtCategorieBtn", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtDatePublication", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtDatePublication", "parentElement.previousSibling.style.visibility", "hidden");
	  } else {
	   top.MyApp.SetItem("OppExtClient1", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtClient1Dec", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1Dec", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtClient1DecBtn", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtClient2Dec", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2Dec", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtClient2DecBtn", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtEtape", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtEtape", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtEtapeBtn", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtCategorie", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtCategorie", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtCategorieBtn", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtDatePublication", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtDatePublication", "parentElement.previousSibling.style.visibility", "");
	  }
		return true;
}