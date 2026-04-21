function AfterLoad_Header_1000081(p_ViewData)
{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vProfPros2020 = "LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN;LEAD_PROS";
	var vProf2020 = "PROS_SEN;PROS_JUN;MNG_PROS_JUN;PROS_OZ;ASS_SUP_CHN;LEAD_SUP_CHN;MNG_ACH_OPR;MNG_ACH_ZON;MNG_SRC;LEAD_PROS_JUN;LEAD_PROS_SEN;MNG_PROS_SEN;MNG_PROS_ZON;DIR_STG;DIR_OPR;NEG_JUN;NEG_SEN;LEAD_SRC;LEAD_PROS;PROS_CNF;LEAD_NEG;NEG_EXP;NEG_CNF";
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	
	// HAS DEB 13/05/2021 : HIDDEN catmen si lot pas atypique
	var oAtypic = top.MyApp.FindItem("OppExtAtypique", top.MyData_View);
	if (oAtypic) {
	 if (top.MyApp.GetItemValue("OppExtAtypique") != "1") {
	  top.MyApp.SetItem("OppExtClient1", "style.visibility", "hidden", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient1", "parentElement.previousSibling.style.visibility", "hidden");
	
	
	  top.MyApp.SetItem("OppExtClient1Dec", "style.visibility", "hidden", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient1Dec", "parentElement.previousSibling.style.visibility", "hidden");
	  top.MyApp.SetItem("OppExtClient1DecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtClient1DateDec", "style.visibility", "hidden", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient1DateDec", "parentElement.previousSibling.style.visibility", "hidden");
	  top.MyApp.SetItem("OppExtClient1DateDecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtClient2", "style.visibility", "hidden", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient2", "parentElement.previousSibling.style.visibility", "hidden");
	
	
	  top.MyApp.SetItem("OppExtClient2Dec", "style.visibility", "hidden", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient2Dec", "parentElement.previousSibling.style.visibility", "hidden");
	  top.MyApp.SetItem("OppExtClient2DecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtClient2DateDec", "style.visibility", "hidden", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient2DateDec", "parentElement.previousSibling.style.visibility", "hidden");
	  top.MyApp.SetItem("OppExtClient2DateDecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
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
	
	
	  top.MyApp.SetItem("OppExtClient1DateDec", "style.visibility", "", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient1DateDec", "parentElement.previousSibling.style.visibility", "");
	  top.MyApp.SetItem("OppExtClient1DateDecBtn", "style.visibility", "", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtClient2", "style.visibility", "", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient2", "parentElement.previousSibling.style.visibility", "");
	
	
	  top.MyApp.SetItem("OppExtClient2Dec", "style.visibility", "", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient2Dec", "parentElement.previousSibling.style.visibility", "");
	  top.MyApp.SetItem("OppExtClient2DecBtn", "style.visibility", "", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtClient2DateDec", "style.visibility", "", top.MyData_View);
	  top.MyApp.SetItem("OppExtClient2DateDec", "parentElement.previousSibling.style.visibility", "");
	  top.MyApp.SetItem("OppExtClient2DateDecBtn", "style.visibility", "", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtEtape", "style.visibility", "", top.MyData_View);
	  top.MyApp.SetItem("OppExtEtape", "parentElement.previousSibling.style.visibility", "");
	  top.MyApp.SetItem("OppExtEtapeBtn", "style.visibility", "", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtCategorie", "style.visibility", "", top.MyData_View);
	  top.MyApp.SetItem("OppExtCategorie", "parentElement.previousSibling.style.visibility", "");
	  top.MyApp.SetItem("OppExtCategorieBtn", "style.visibility", "", top.MyData_View);
	
	
	  top.MyApp.SetItem("OppExtDatePublication", "style.visibility", "", top.MyData_View);
	  top.MyApp.SetItem("OppExtDatePublication", "parentElement.previousSibling.style.visibility", "");
	 }
	 oAtypic.onchange = function() {
	  if (top.MyApp.GetItemValue("OppExtAtypique") != "1") {
	   top.MyApp.SetItem("OppExtClient1", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1", "parentElement.previousSibling.style.visibility", "hidden");
	
	
	   top.MyApp.SetItem("OppExtClient1Dec", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1Dec", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient1DecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtClient1DateDec", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1DateDec", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient1DateDecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtClient2", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2", "parentElement.previousSibling.style.visibility", "hidden");
	
	
	   top.MyApp.SetItem("OppExtClient2Dec", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2Dec", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient2DecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtClient2DateDec", "style.visibility", "hidden", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2DateDec", "parentElement.previousSibling.style.visibility", "hidden");
	   top.MyApp.SetItem("OppExtClient2DateDecBtn", "style.visibility", "hidden", top.MyData_View);
	
	
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
	
	
	   top.MyApp.SetItem("OppExtClient1DateDec", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient1DateDec", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtClient1DateDecBtn", "style.visibility", "", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtClient2", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2", "parentElement.previousSibling.style.visibility", "");
	
	
	   top.MyApp.SetItem("OppExtClient2Dec", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2Dec", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtClient2DecBtn", "style.visibility", "", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtClient2DateDec", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtClient2DateDec", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtClient2DateDecBtn", "style.visibility", "", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtEtape", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtEtape", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtEtapeBtn", "style.visibility", "", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtCategorie", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtCategorie", "parentElement.previousSibling.style.visibility", "");
	   top.MyApp.SetItem("OppExtCategorieBtn", "style.visibility", "", top.MyData_View);
	
	
	   top.MyApp.SetItem("OppExtDatePublication", "style.visibility", "", top.MyData_View);
	   top.MyApp.SetItem("OppExtDatePublication", "parentElement.previousSibling.style.visibility", "");
	  }
	 };
	}
	// HAS END 13/05/2021 : HIDDEN catmen si lot pas atypique
	
	
	//HAS DEB Achat 2020 Acces edition seulement pour le negocietur choisi par le team leader
	var strUser = top.MyApp.UserSetting.User.Name;
	//var strProfileInitials = top.MyApp.UserSetting.User.ProfileInitials;
	var vPros = top.MyApp.GetItemValue("OppExtProspecteur");
	var vAcht = top.MyApp.GetItemValue("OppExtAcheteur");
	var vStatut = top.MyApp.GetItemValue('OppStatus');
	
	if (vStatut == '01.A DEMANDE AVIS') {
	 if (top.MyApp.CustomSetting.ValidAffair == '1' || vProf == 'ADMT' || vProf == 'LEAD_NEG' || vProf == 'MNG_ACH_OPR' || vAcht == strUser) {
	  // if (top.MyApp.CustomSetting.ValidAffair == '1' || vProf == 'LEAD_NEG' || vProf == 'MNG_ACH_OPR' || vAcht == strUser) {
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
	}
	//HAS END Achat 2020 Acces edition seulement pour le negocietur choisi par le team leader
	if (vProfPros2020.indexOf(vProf) > -1) {
	 if (top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01. " || top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.C" || vStatut.substr(0, 2) == "09" || vStatut.substr(0, 2) == "03") {
	  top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	  top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	 } else {
	  top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	  top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	  //HAS top.MyApp.fraMenuBar.Execute("R_Consult");
	 }
	}
	
	var BtnDemAvis = top.MyApp.FindItem("Sht37140351506211", top.MyData_View);
	var BtnPrenego = top.MyApp.FindItem("Sht37801951566211", top.MyData_View);
	
	top.MyApp._gfctPutButton('OppExtChefproduit', "top.MyApp.PS_RempliChamp('OppExtChefproduit')", '', false, '...');
	top.MyApp._gfctPutButton('OppExtAcheteur', "top.MyApp.PS_RempliChamp('OppExtAcheteur')", '', false, '...');
	top.MyApp._gfctPutButton('OppExtAssCom', "top.MyApp.PS_RempliChamp('OppExtAssCom')", '', false, '...');
	
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	
	if (vProf == 'ASS_CO') {
	 var BtnIncomplet = top.MyApp.FindItem("Sht34399519667014", top.MyData_View);
	 if (BtnIncomplet) BtnIncomplet.disabled = true;
	}
	/*
	var vCpyName = top.MyApp.FindItem("OppCpyName",top.MyData_View);
	    if(vCpyName) vCpyName.disabled = true;
	*/
	// HAS DEB : 20/02/2019 - contrôle de creation affaire à partrir de la vue dynamique fournisseur.
	
	var vComment = top.MyApp.GetItemValue("OppComment");
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (vComment == '' || vComment == null || vComment == undefined) {
	  top.MyApp.OpenDlg("Alert", ["", "New affairs can only be created from Follow-ups !! "]);
	  top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	 }
	}
	// HAS FIN : 20/02/2019 - contrôle de creation affaire à partrir de la vue dynamique fournisseur.
	//top.MyApp.SetItem("OppExtAffairAR", "style.visibility", "hidden", top.MyData_View);
	//top.MyApp.SetItem("OppExtAffairAR", "parentElement.previousSibling.style.visibility", "hidden");
	top.MyApp.SetItem("OppExtRefLot", "style.visibility", "hidden", top.MyData_View);
	top.MyApp.SetItem("OppExtRefLot", "parentElement.previousSibling.style.visibility", "hidden");
	
	var BtnDemAvis = top.MyApp.FindItem("Sht37140351506211", top.MyData_View);
	var BtnPrenego = top.MyApp.FindItem("Sht37801951566211", top.MyData_View);
	
	if (vProf2020.indexOf(vProf) == -1 && vProf != 'ADMT') {
	 if (BtnDemAvis) top.MyApp.SetItem("Sht37140351506211", "style.visibility", "hidden", top.MyData_View);
	 if (BtnPrenego) top.MyApp.SetItem("Sht37801951566211", "style.visibility", "hidden", top.MyData_View);
	}
	
	if (vProfPros2020.indexOf(vProf) > -1) {
	 if (BtnPrenego) BtnPrenego.disabled = true;
	}
	
	if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true) {
	 // HAS DEB 29/04/2020 - Passer les affaire en standby CORONA
	 var vProfValSB = "LEAD_NEG;MAN_HA_TER;MNG_ACH_OPR;";
	 var oDemSbRep = top.MyApp.FindItem("OppExtSBReprise", top.MyData_View);
	 var OSbRep = top.MyApp.FindItem("OppExtRepSbReprise", top.MyData_View);
	 // gestion de la case demande de mise en SB Reprise activité
	 if (vProfNeg.indexOf(vProf) > -1 || vProf == 'ADMT' || vProf == 'ACH_TER' || vProf == 'MAN_HA_TER' || vProf == 'MNG_ACH_OPR') {
	  if (oDemSbRep) oDemSbRep.disabled = false;
	 } else {
	  if (oDemSbRep) oDemSbRep.disabled = true;
	 }
	 // gestion de la liste de choix de résponse sur demande SB Reprise
	 if (vProfValSB.indexOf(vProf) > -1 || vProf == 'ADMT') {
	  if (OSbRep) OSbRep.disabled = false;
	 } else {
	  if (OSbRep) OSbRep.disabled = true;
	 }
	 // HAS END 29/04/2020 - Passer les affaire en standby CORONA
	
	
	 // HAS DEB 07/05/2020 ajouter une étape de validation BUM pour 
	 var oValMngSbRep = top.MyApp.FindItem("OppExtValMngSBReprise", top.MyData_View);
	 if (vProf == 'MNG_ACH_OPR' || vProf == 'ADMT') {
	  if (oValMngSbRep) oValMngSbRep.disabled = false;
	 } else {
	  if (oValMngSbRep) oValMngSbRep.disabled = true;
	 }
	 // HAS END 07/05/2020 ajouter une étape de validation BUM pour 
	}
	
	var vEtape = top.MyApp.GetItemValue('OppExtEtape');
	
	if (vEtape == '2. Envoyé') {
	 top.MyApp.SetItemAttribute("OppExtEtape", "style.backgroundColor", "#AFFA8E");
	}
	if (vEtape == '1. Demande envoi') {
	 top.MyApp.SetItemAttribute("OppExtEtape", "style.backgroundColor", "#FFFF00");
	}
	
	// HAS DEB  : 21/05/2021 : desactiver la modification de l'étape du lot
	if (top.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true) {
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	 var vListProfilsValides = "ADMT;ADMF;ADMFT";
	 var oEtape = top.MyApp.FindItem("OppExtEtape", top.MyData_View);
	 var oEtapeBtn = top.MyApp.FindItem("OppExtEtapeBtn", top.MyData_View);
	 if (vListProfilsValides.indexOf(vProf) != -1) {
	  if (oEtape) oEtape.disabled = false;
	  if (oEtapeBtn) oEtapeBtn.disabled = false;
	  top.MyApp.SetItemAttribute("OppExtEtape", "className", "", top.MyData_View);
	  top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = 1;
	  top.MyApp.SetItem("OppExtEtape", "contentEditable", true, top.MyData_View);
	 } else {
	  if (oEtape) oEtape.disabled = false;
	  if (oEtapeBtn) oEtapeBtn.disabled = false;
	  top.MyApp.SetItemAttribute("OppExtEtape", "className", "disable", top.MyData_View);
	  top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = -1;
	  top.MyApp.SetItem("OppExtEtape", "contentEditable", false, top.MyData_View);
	 }
	 // HAS DEB  : 21/05/2021 : desactiver la modification de l'étape du lot
	
	 // HAS DEB  : 06/06/2021  : desactiver CAC atypique si Etape lot envoyé ou pluss
	 var oAtypique = top.MyApp.FindItem("OppExtAtypique", top.MyData_View);
	 if (vEtape >= '2') {
	  if (oAtypique) oAtypique.disabled = true;
	 } else {
	  if (oAtypique) oAtypique.disabled = false;
	 }
	 // HAS DEB  : 06/06/2021  : desactiver CAC atypique si Etape lot envoyé ou pluss
	}
		// DEBUT HAS : Statut grisé sauf pour ADMT et ADMF
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset' && top.MyApp.CurrentSetting.bConsultMode != true) {
	 var vUserProfile = top.MyApp.UserSetting.User.ProfileInitials;
	 if (vUserProfile == 'ADMT') {
	top.MyApp.CurrentSetting.Catalog["OppExtPaysFacturation"].Ed = 1;
	  top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	  top.MyApp.SetItem("OppBasicStatus", "disabled", false, top.MyData_View);
	  top.MyApp.SetItem("OppStatus", "disabled", false, top.MyData_View);
	  top.MyApp.SetItem("OppType", "disabled", false, top.MyData_View);
	  top.MyApp.SetItem("OppCfgSttsBasStts", "disabled", false, top.MyData_View);
	 } else {
	top.MyApp.CurrentSetting.Catalog["OppExtPaysFacturation"].Ed = 0;
	  top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	  top.MyApp.SetItem("OppBasicStatus", "disabled", true, top.MyData_View);
	  top.MyApp.SetItem("OppStatus", "disabled", true, top.MyData_View);
	  top.MyApp.SetItem("OppType", "disabled", true, top.MyData_View);
	  top.MyApp.SetItem("OppCfgSttsBasStts", "disabled", true, top.MyData_View);
	 }
	}
	// END HAS
	
	
	
	
	// DEBUT HAS: désactiver tous les boutons en mode consultation
	
	
	
	
	if (top.MyApp.CurrentSetting.nChapMode == 'Open' && top.MyApp.CurrentSetting.bConsultMode == true) {
	
	
	
	
	 var BtnCharger = top.MyApp.FindItem("Sht30592153170346", top.MyData_View);
	 var BtnNonSuivi = top.MyApp.FindItem("Sht34771314634310", top.MyData_View);
	 var BtnIncomplet = top.MyApp.FindItem("Sht34399519667014", top.MyData_View);
	 var BtnDeposerDos = top.MyApp.FindItem("Sht30930007342440", top.MyData_View);
	 var BtnDemValid = top.MyApp.FindItem("Sht34532019667014", top.MyData_View);
	 var BtnValidation = top.MyApp.FindItem("Sht34049119677014", top.MyData_View);
	 var BtnDemAvis = top.MyApp.FindItem("Sht37140351506211", top.MyData_View);
	 var BtnPrenego = top.MyApp.FindItem("Sht37801951566211", top.MyData_View);
	
	
	
	
	 if (BtnCharger) BtnCharger.disabled = true;
	 if (BtnNonSuivi) BtnNonSuivi.disabled = true;
	 if (BtnIncomplet) BtnIncomplet.disabled = true;
	 if (BtnDeposerDos) BtnDeposerDos.disabled = true;
	 if (BtnDemValid) BtnDemValid.disabled = true;
	 if (BtnValidation) BtnValidation.disabled = true;
	 if (BtnDemAvis) BtnDemAvis.disabled = true;
	 if (BtnPrenego) BtnPrenego.disabled = true;
	}
	
	
	
	
	// FIN HAS
	
	
	
	
	var typeHnd = top.MyApp.FindItem("OppStatus", p_ViewData.parentWindow);
	top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Opp_Header_Status);
	top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	
	
	
	
	
	//DEBUT FTC@MASAO - 27/12/2017 - MANTIS 14200  
	if (top.MyApp.CurrentSetting.nChapMode == 'Open') {
	 var strStatut = top.MyApp.FindItem("OppStatus");
	 var vUserProfile = top.MyApp.UserSetting.User.ProfileInitials;
	 if (strStatut) {
	  var vStatut = top.MyApp.GetItemValue("OppStatus");
	  var BtnCharger = top.MyApp.FindItem("Sht30592153170346", top.MyData_View);
	  var BtnNonSuivi = top.MyApp.FindItem("Sht34771314634310", top.MyData_View);
	  var BtnIncomplet = top.MyApp.FindItem("Sht34399519667014", top.MyData_View);
	  var BtnDeposerDos = top.MyApp.FindItem("Sht30930007342440", top.MyData_View);
	  var BtnDemValid = top.MyApp.FindItem("Sht34532019667014", top.MyData_View);
	  var BtnValidation = top.MyApp.FindItem("Sht34049119677014", top.MyData_View);
	  var BtnDemAvis = top.MyApp.FindItem("Sht37140351506211", top.MyData_View);
	  var BtnPrenego = top.MyApp.FindItem("Sht37801951566211", top.MyData_View);
	
	
	
	
	  if (vStatut.substr(0, 2) == "07") {
	   if (BtnCharger) BtnCharger.disabled = true;
	   if (BtnNonSuivi) BtnNonSuivi.disabled = true;
	   if (BtnIncomplet) BtnIncomplet.disabled = true;
	   if (BtnDeposerDos) BtnDeposerDos.disabled = true;
	   if (BtnDemValid) BtnDemValid.disabled = true;
	   if (BtnValidation) BtnValidation.disabled = true;
	   if (BtnDemAvis) BtnDemAvis.disabled = true;
	   if (BtnPrenego) BtnPrenego.disabled = true;
	  }
	
	
	
	
	  strStatut.onchange = function () {
	   if (top.MyApp.GetItemValue("OppStatus").substr(0, 2) == "07") {
	    if (BtnCharger) BtnCharger.disabled = true;
	    if (BtnNonSuivi) BtnNonSuivi.disabled = true;
	    if (BtnIncomplet) BtnIncomplet.disabled = true;
	    if (BtnDeposerDos) BtnDeposerDos.disabled = true;
	    if (BtnDemValid) BtnDemValid.disabled = true;
	    if (BtnValidation) BtnValidation.disabled = true;
	    if (BtnDemAvis) BtnDemAvis.disabled = true;
	    if (BtnPrenego) BtnPrenego.disabled = true;
	   }
	  };
	 }
	}
	//FIN FTC@MASAO - 27/12/2017 - MANTIS 14200
	
	// HAS DEB : 22/05/2021 : bloquer tous les boutons si Lot ATypique envoyé
	
	
	
	
	if (top.MyApp.CurrentSetting.nChapMode == 'Open') {
	 var strEtape = top.MyApp.FindItem("OppExtEtape");
	 if (strEtape) {
	  var vEtape = top.MyApp.GetItemValue("OppExtEtape");
	        var vAtypique = top.MyApp.GetItemValue("OppExtAtypique");
	
	
	
	
	  var BtnCharger = top.MyApp.FindItem("Sht30592153170346", top.MyData_View);
	  var BtnNonSuivi = top.MyApp.FindItem("Sht34771314634310", top.MyData_View);
	  var BtnIncomplet = top.MyApp.FindItem("Sht34399519667014", top.MyData_View);
	  var BtnDeposerDos = top.MyApp.FindItem("Sht30930007342440", top.MyData_View);
	  var BtnDemValid = top.MyApp.FindItem("Sht34532019667014", top.MyData_View);
	  var BtnValidation = top.MyApp.FindItem("Sht34049119677014", top.MyData_View);
	  var BtnDemAvis = top.MyApp.FindItem("Sht37140351506211", top.MyData_View);
	  var BtnPrenego = top.MyApp.FindItem("Sht37801951566211", top.MyData_View);
	
	
	
	
	  if (vEtape.substr(0, 1) == "2" && vAtypique == '1') {
	   if (BtnCharger) BtnCharger.disabled = true;
	   if (BtnNonSuivi) BtnNonSuivi.disabled = true;
	   if (BtnIncomplet) BtnIncomplet.disabled = true;
	   if (BtnDeposerDos) BtnDeposerDos.disabled = true;
	   if (BtnDemValid) BtnDemValid.disabled = true;
	   if (BtnValidation) BtnValidation.disabled = true;
	   if (BtnDemAvis) BtnDemAvis.disabled = true;
	   if (BtnPrenego) BtnPrenego.disabled = true;
	  }
	
	
	
	
	  strEtape.onchange = function () {
	   if (vEtape.substr(0, 1) == "2" && vAtypique == '1') {
	    if (BtnCharger) BtnCharger.disabled = true;
	    if (BtnNonSuivi) BtnNonSuivi.disabled = true;
	    if (BtnIncomplet) BtnIncomplet.disabled = true;
	    if (BtnDeposerDos) BtnDeposerDos.disabled = true;
	    if (BtnDemValid) BtnDemValid.disabled = true;
	    if (BtnValidation) BtnValidation.disabled = true;
	    if (BtnDemAvis) BtnDemAvis.disabled = true;
	    if (BtnPrenego) BtnPrenego.disabled = true;
	   }
	  };
	 }
	}
	
	
	
	
	// HAS END : 22/05/2021 : bloquer tous les boutons si Lot ATypique envoyé
	
		//AfterLoad_Header_1000081 (Affaire) => vérif status
	var vStatut = top.MyApp.GetItemValue("OppStatus");
	
	var vUserName = top.MyApp.UserSetting.User.Name;
	
	//commentaire ok
	
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials
	
	    var vProfPros2020 = "LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN;LEAD_PROS";
	
	    var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	
	    //var vn = vProf.substr(0, 3);
	
	    top.MyApp.CustomSetting.OppStatus = vStatut;
	
	    if (vProf != 'ADMT' && vProf != 'ADMF' && vProf != 'QUA') {
	
	        /*if (vProf == "ACH_TER" || vProf == "ASS_ACH" || vProf == "MAN_HA_TER" || vProf == "NEG_SEN" || vProf == "NEG_JUN") {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	
	        } else if (vProf == "ASS_CO" || vProf == "MAN_HA_ASS") {
	
	            if (vStatut.substr(0, 2) == "01" || vStatut.substr(0, 2) == "09" || vStatut.substr(0, 2) == "03") {
	
	                top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	
	                top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	
	            } else {
	
	                top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	
	                top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	
	                top.MyApp.fraMenuBar.Execute("R_Consult");
	
	            }
	
	        }*/
	
	        if (vStatut.substr(0, 2) == "02" || vStatut.substr(0, 2) == "07" || vStatut.substr(0, 2) == "08" || vStatut.substr(0, 2) == "11" || vStatut.substr(0, 2) == "12") {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	
	            top.MyApp.fraMenuBar.Execute("R_Consult");
	
	        } else {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	
	        }
	
	        if ((vStatut.substr(0, 4) == "01.A" || vStatut.substr(0, 4) == "01.B" || vStatut.substr(0, 4) == "01.0" ) && (vProfPros2020.indexOf(vProf) != -1)) {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	
	            top.MyApp.fraMenuBar.Execute("R_Consult");
	
	        } else {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	
	        }
	
	        if ((vStatut.substr(0, 4) == "01.D") && (vProf != "LEAD_PROS" )) {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	
	            top.MyApp.fraMenuBar.Execute("R_Consult");
	
	        } else {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	
	        }        
	
	        if (vStatut.substr(0, 4) == "01.C" && vProfNeg.indexOf(vProf) != -1) {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'Di');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'Di');
	
	            //FS  top.MyApp.fraMenuBar.Execute("R_Consult");
	
	        } else {
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	
	            top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	
	        }
	
	    } else {
	
	        top.MyApp.fraMenuBar.UpdateMenuItem('R_Edit', 'E');
	
	        top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	
	    }
	
	    if (vProfPros2020.indexOf(vProf) > -1) { //(vProf != 'ADMT' && vProf != 'NEG_SEN' ) {
	
	        if (top.MyApp.FindItem("OppExtAcheteurBtn", top.MyData_View)) top.MyApp.FindItem("OppExtAcheteurBtn", top.MyData_View).disabled = true;
	
	    } else {
	
	        if (top.MyApp.FindItem("OppExtAcheteurBtn", top.MyData_View)) top.MyApp.FindItem("OppExtAcheteurBtn", top.MyData_View).disabled = false;
	
	    }
	
	}
		PS_Opp_Header_Status();
	
	
	var typeHnd = top.MyApp.FindItem("OppExtAtypique", top.MyData_View);
	if (typeHnd) {
	 top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Opp_Header_Status);
	 top.MyApp.fctAddEvent(typeHnd, "change", PS_Opp_Header_Status);
	}
	
		//AfterLoad_Header_1000081 (affaire) => raccourci MKT
	if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true) {
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	
	
	 var BtnChargerListingAchats = top.MyApp.FindItem("Sht30592153170346");
	 var BtnDeposerDossier = top.MyApp.FindItem("Sht30930007342440");
	 var BtnValidation = top.MyApp.FindItem("Sht34049119677014");
	 var BtnIncomplet = top.MyApp.FindItem("Sht34399519667014");
	 var BtnDemandevalidation = top.MyApp.FindItem("Sht34532019667014");
	 var BtnNonSuivi = top.MyApp.FindItem("Sht34771314634310");
	 var BtnDemandeavis = top.MyApp.FindItem("Sht37140351506211");
	 var BtnPrenegociation = top.MyApp.FindItem("Sht37801951566211");
	
	
	 //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	 if (top.MyApp.GetItemValue("OppStatus").substr(0, 2) != "06" && top.MyApp.GetItemValue("OppStatus").substr(0, 2) != "07") {
	  //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	
	
	  // DEBUT MASAO@FNA - 15/12/2017 - Mantis #14184 - [Affaire] - RG7 : Statut = 05-DEPOSE
	  var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER";
	
	
	  if (vListProfilsValides.indexOf(vProf) != -1) {
	   //if (vProf == "CH_PRO" || vProf == "DIR_MKT" || vProf == "ASS_MKT" || vProf == "MAN_POLE" || vProf == "CH_MAR" || vProf == 'ADMT' || vProf == 'ADMF') {
	   // FIN MASAO@FNA - 15/12/2017 - Mantis #14184 
	
	
	   //Demande d'infos
	   //var vSth = top.MyApp.FindItem("Sht30709307622438")
	   //if(vSth) vSth.disabled = false;
	
	
	   //Déposer Dossier
	   //HASV9 vSth = top.MyApp.FindItem("Sht30930007342440")
	   //HASV9 if (vSth) vSth.disabled = false;
	
	
	   //A l'étude
	   //vSth = top.MyApp.FindItem("Sht30050207362440")
	   //if(vSth) vSth.disabled = false;
	
	
	   //Sans suite
	   //vSth = top.MyApp.FindItem("Sht31188102166546")
	   //if(vSth) vSth.disabled = false;
	
	
	   //FIDAM
	   //vSth = top.MyApp.FindItem("Sht31078406602456")
	   //if(vSth) vSth.disabled = false;
	
	
	   //Mail Admin FRS
	   //vSth = top.MyApp.FindItem("Sht31501092660450")
	   //if(vSth) vSth.disabled = true;
	
	
	   //Statut
	   //vSth = top.MyApp.FindItem("OppStatus")
	   //if(vSth) vSth.disabled = false;
	
	
	  } else {
	   //Demande d'infos
	   //var vSth = top.MyApp.FindItem("Sht30709307622438")
	   //if(vSth) vSth.disabled = true;
	
	
	   //Déposer Dossier
	   //HASV9 vSth = top.MyApp.FindItem("Sht30930007342440")
	   //HASV9 if (vSth) vSth.disabled = true;
	
	
	   //A l'étude
	   //vSth = top.MyApp.FindItem("Sht30050207362440")
	   //if(vSth) vSth.disabled = true;
	
	
	   //Sans suite
	   //vSth = top.MyApp.FindItem("Sht31188102166546")
	   //if(vSth) vSth.disabled = true;
	
	
	   //FIDAM
	   //vSth = top.MyApp.FindItem("Sht31078406602456")
	   //if(vSth) vSth.disabled = false;
	
	
	   //Mail Admin FRS
	   //vSth = top.MyApp.FindItem("Sht31501092660450")
	   //if(vSth) vSth.disabled = true;
	
	
	   //Statut
	   //vSth = top.MyApp.FindItem("OppStatus")
	   //if(vSth) vSth.disabled = false;
	  }
	
	
	
	 } else {
	  //Demande d'infos
	  //var vSth = top.MyApp.FindItem("Sht30709307622438")
	  //if(vSth) vSth.disabled = true;
	
	
	  //Déposer Dossier
	  //HASV9 vSth = top.MyApp.FindItem("Sht30930007342440")
	  //HASV9 if (vSth) vSth.disabled = true;
	
	
	  //A l'étude
	  //vSth = top.MyApp.FindItem("Sht30050207362440")
	  //if(vSth) vSth.disabled = true;
	
	
	  //Sans suite
	  //vSth = top.MyApp.FindItem("Sht31188102166546")
	  //if(vSth) vSth.disabled = true;
	
	
	  //FIDAM
	  //vSth = top.MyApp.FindItem("Sht31078406602456")
	  //if(vSth) vSth.disabled = false;
	
	
	  //Mail Admin FRS
	  //vSth = top.MyApp.FindItem("Sht31501092660450")
	  //if(vSth) vSth.disabled = false;
	
	
	  //Statut
	  //vSth = top.MyApp.FindItem("OppStatus")
	  //if(vSth) vSth.disabled = true;
	 }
	
	
	
	 // HAS Achat 2020 : si statut DEMANDE AVIS alors désactiver les boutons: demande validation, Load bying listing, 
	
	
	 if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.A") {
	  var vProfPros = "PROS_SEN;PROS_JUN;MNG_PROS_ZON;MNG_PROS_SEN;MNG_PROS_JUN;LEAD_PROS_JUN;LEAD_PROS_SEN;MNG_ACH_OPR;LEAD_PROS";
	  var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	  if (vProfNeg.indexOf(vProf) != -1) {
	   if (BtnNonSuivi) BtnNonSuivi.disabled = true;
	   //if (BtnIncomplet) BtnIncomplet.disabled = true;
	   if (BtnDeposerDossier) BtnDeposerDossier.disabled = true;
	   if (BtnDemandevalidation) BtnDemandevalidation.disabled = true;
	   if (BtnValidation) BtnValidation.disabled = true;
	   if (BtnDemandeavis) BtnDemandeavis.disabled = true;
	  }
	 }
	
	
	
	 // HAS Achat 2020 : si statut PRENEGOCIATION alors désactiver les boutons: demande validation, depsoer, demande avis, prenego, 
	
	
	 if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.B") {
	  var vProfPros = "PROS_SEN;PROS_JUN;MNG_PROS_ZON;MNG_PROS_SEN;MNG_PROS_JUN;LEAD_PROS_JUN;LEAD_PROS_SEN;MNG_ACH_OPR;LEAD_PROS";
	  var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	  if (vProfNeg.indexOf(vProf) != -1 || vProfPros.indexOf(vProf) != -1) {
	   if (BtnDeposerDossier) BtnDeposerDossier.disabled = true;
	   if (BtnDemandevalidation) BtnDemandevalidation.disabled = true;
	   if (BtnDemandeavis) BtnDemandeavis.disabled = true;
	   if (BtnPrenegociation) BtnPrenegociation.disabled = true;
	   if (BtnIncomplet) BtnIncomplet.disabled = true;
	
	
	  } else {
	   if (BtnDeposerDossier) BtnDeposerDossier.disabled = false;
	   if (BtnDemandevalidation) BtnDemandevalidation.disabled = false;
	   if (BtnDemandeavis) BtnDemandeavis.disabled = false;
	   if (BtnPrenegociation) BtnPrenegociation.disabled = false;
	   if (BtnIncomplet) BtnIncomplet.disabled = false;
	  }
	 }
	
	
	
	 // HAS Achat 2020 : si statut OK CRV alors désactiver les boutons: listing, incomplet, deposer, validation, demande avis, prenego 
	
	
	 if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.C") {
	  var vProfPros = "PROS_SEN;PROS_JUN;MNG_PROS_ZON;MNG_PROS_SEN;MNG_PROS_JUN;LEAD_PROS_JUN;LEAD_PROS_SEN;MNG_ACH_OPR;LEAD_PROS";
	  var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	  if (vProfPros.indexOf(vProf) != -1) {
	   if (BtnDeposerDossier) BtnDeposerDossier.disabled = true;
	   if (BtnDemandeavis) BtnDemandeavis.disabled = true;
	   if (BtnPrenegociation) BtnPrenegociation.disabled = true;
	  } else {
	   if (BtnDeposerDossier) BtnDeposerDossier.disabled = false;
	   if (BtnDemandeavis) BtnDemandeavis.disabled = false;
	   if (BtnPrenegociation) BtnPrenegociation.disabled = false;
	  }
	 }
	
	
	
	}
	
	
	// HAS : si statut COMPLET alors désactiver le bouton demande validation
	var vBoutonDemVal = top.MyApp.FindItem("Sht34532019667014");
	if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.GetItemValue("OppStatus").substr(0, 2) == "04") {
	 //var vListProfilsValides = "ADMT;ADMF";
	 var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER";
	 var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF;MNG_ACH_OPR";
	 if (vListProfilsValides.indexOf(vProf) != -1) {
	  if (BtnDemandevalidation) BtnDemandevalidation.disabled = false;
	  if (BtnDemandeavis) BtnDemandeavis.disabled = false;
	  if (BtnPrenegociation) BtnPrenegociation.disabled = false;
	  if (BtnValidation) BtnValidation.disabled = false;
	 } else {
	  if (BtnDemandevalidation) BtnDemandevalidation.disabled = true;
	  if (BtnDemandeavis) BtnDemandeavis.disabled = true;
	  if (BtnPrenegociation) BtnPrenegociation.disabled = true;
	  if (BtnValidation) BtnValidation.disabled = true;
	 }
	
	
	 if (vProfNeg.indexOf(vProf) != -1 || vListProfilsValides.indexOf(vProf) != -1) {
	  if (BtnDeposerDossier) BtnDeposerDossier.disabled = false;
	  //if (BtnDemandeavis) BtnDemandeavis.disabled = false;
	  //if (BtnPrenegociation) BtnPrenegociation.disabled = false;
	 } else {
	  if (BtnDeposerDossier) BtnDeposerDossier.disabled = true;
	  //if (BtnDemandeavis) BtnDemandeavis.disabled = true;
	  //if (BtnPrenegociation) BtnPrenegociation.disabled = true;
	 }
	}
	
	
	
	// HAS : si statut COMPLET alors désactiver le bouton demande validation
	var vBoutonDemVal = top.MyApp.FindItem("Sht34532019667014");
	if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.GetItemValue("OppStatus").substr(0, 2) == "05") {
	 var vListProfilsValides = "ADMT;ADMF";
	 var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	 if (vListProfilsValides.indexOf(vProf) != -1 || vProfNeg.indexOf(vProf) != -1) {
	  if (BtnDeposerDossier) BtnDeposerDossier.disabled = true;
	  if (BtnValidation) BtnValidation.disabled = true;
	  if (BtnDemandeavis) BtnDemandeavis.disabled = true;
	  if (BtnPrenegociation) BtnPrenegociation.disabled = true;
	 }
	}
	
	
	
	// HAS : si statut EN CONSTITUTION alors désactiver le bouton demande validation
	var vBoutonDemVal = top.MyApp.FindItem("Sht34532019667014");
	var vAtypic = top.MyApp.GetItemValue("OppExtAtypique");
	var oAtypic = top.MyApp.FindItem("OppExtAtypique");
	if (top.MyApp.CurrentSetting.nChapMode == "Open" && top.MyApp.CurrentSetting.bConsultMode != true && top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01. ") {
	 var vProfPros = "PROS_SEN;PROS_JUN;MNG_PROS_ZON;MNG_PROS_SEN;MNG_PROS_JUN;LEAD_PROS_JUN;LEAD_PROS_SEN;LEAD_PROS";
	 if (vProfPros.indexOf(vProf) != -1 && vAtypic != '1') {
	  if (vBoutonDemVal) vBoutonDemVal.disabled = true;
	 }
	    oAtypic.onchange = function(){
	        var vBoutonDemVal = top.MyApp.FindItem("Sht34532019667014");
	        var vAtypic = top.MyApp.GetItemValue("OppExtAtypique");
	        if (vProfPros.indexOf(vProf) != -1 && vAtypic != '1') {
	      if (vBoutonDemVal) vBoutonDemVal.disabled = true;
	     } else {
	            if (vBoutonDemVal) vBoutonDemVal.disabled = false;
	        }
	    };
	}
	
	
	
	// DEBUT MASAO@FNA - 19/12/2017 - Mantis #14183 - [Affaire] - RG6 : Statut=04-COMPLET
	// HAS 20/04/2018 : MAJ - desactiver le bouton validation si manager achat ou acheteur , et statut ENCONSTITUTION
	// OZ 29/05/2018  : MAJ - désactiver le bouton validation sauf lorsque statut est demande validation
	
	
	var vBoutonValidation = top.MyApp.FindItem("Sht34049119677014");
	var vListProfilsValides = "ADMT;ADMF;MAN_HA_ASS;MAN_HA_TER";
	if (top.MyApp.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true && (top.MyApp.GetItemValue("OppStatus").substr(0, 2) == "03" || top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.B" || top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.D")) {
	 var vListProfilsValides = "ADMT;ADMF;MAN_HA_ASS;MAN_HA_TER";
	 var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	 var vProfPros = "PROS_SEN;MNG_PROS_ZON;MNG_PROS_SEN;MNG_PROS_JUN;LEAD_PROS_JUN;LEAD_PROS_SEN;MNG_ACH_OPR;LEAD_PROS";
	 if (BtnDeposerDossier) BtnDeposerDossier.disabled = true;
	 if (BtnPrenegociation) BtnPrenegociation.disabled = true;
	 if (BtnDemandeavis) BtnDemandeavis.disabled = true;
	 if (BtnDemandevalidation) BtnDemandevalidation.disabled = true;
	 if (vListProfilsValides.indexOf(vProf) != -1 || vProfPros.indexOf(vProf) != -1 || vProfNeg.indexOf(vProf) != -1) {
	  if (BtnValidation) BtnValidation.disabled = false;
	 } else {
	  if (BtnValidation) BtnValidation.disabled = true;
	 }
	 if (top.MyApp.GetItemValue("OppStatus").substr(0, 4) == "01.D" && vProf == 'LEAD_PROS') {
	    if (BtnValidation) BtnValidation.disabled = true;
	    if (BtnDemandeavis) BtnDemandeavis.disabled = false;
	 }
	}
	
	
	
	/*
	var vBoutonValidation = top.MyApp.FindItem("Sht34049119677014");
	   
	if (top.MyApp.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true && (top.MyApp.GetItemValue("OppStatus").substr(0, 2) != "04" && top.MyApp.GetItemValue("OppStatus").substr(0, 2) != "07")) {
	 var vListProfilsValides = "ADMT;ADMF;MAN_HA_ASS;MAN_HA_TER";
	   
	 if (vListProfilsValides.indexOf(vProf) != -1 &&  top.MyApp.GetItemValue("OppStatus").substr(0, 2) != "01" ) {
	  if (vBoutonValidation) vBoutonValidation.disabled = false;
	 } else {
	  if (vBoutonValidation) vBoutonValidation.disabled = true;
	 }
	} else {
	 if (vBoutonValidation) vBoutonValidation.disabled = true;
	}
	// FIN MASAO@FNA - 19/12/2017 - Mantis #14183
	*/
		// DEBUT HAS : Supprimer la note d'affaire
	/*
	if(top.MyApp.CurrentSetting.nChapMode != "Reset")
	{
	 top.MyApp.SetItem("OppExtNoteAff", "disabled", true, top.MyData_View);
	 top.MyApp.SetItemAttribute("OppExtNoteAff", "className", "", top.MyData_View);
	 top.MyApp.CurrentSetting.Catalog.OppExtNoteAff.Ed = -1;
	 top.MyApp.SetItem("OppExtNoteAff", "contentEditable", false, top.MyData_View);
	 top.MyApp.SetItemAttribute("OppExtInfoMarktListe", "className", "", top.MyData_View);
	 top.MyApp.CurrentSetting.Catalog.OppExtInfoMarktListe.Mn=-1;
	  top.MyApp.SetItem("OppExtRaisonSS", "disabled", true, top.MyData_View);
	  top.MyApp.SetItem("OppExtRaisonSSCom", "disabled", true, top.MyData_View);
	
	}
	*/
		/* DEB HAS 
	var vSthSendMail   = top.MyApp.FindItem("Sht31501092660450");
	var vSthDerogation = top.MyApp.FindItem("OppExtDerogPerm");
	var vSthFactPF     = top.MyApp.FindItem("OppExtFactureProforma");
	if(top.CurrentSetting.nChapMode=="Open")
	{
	       var vCurrentUser = top.MyApp.UserSetting.User.Name;
	       var vAcheteur    = top.MyApp.GetItemValue('OppExtAcheteur') ;
	       var vAssComm     = top.MyApp.GetItemValue('OppExtAssCom') ; 
	       var vProfilInit  = top.MyApp.UserSetting.User.ProfileInitials;  
	END HAS*/
	          ////14.12.2015 -> CBA #464
	          /*
	          if( vProfilInit == "ADMT" || vProfilInit == "ADMF")
	          {
	          vSth = top.MyApp.FindItem("Sht32769319157546");
	          if(vSth) vSth.disabled = false;
	          }else
	          {          
	          vSth = top.MyApp.FindItem("Sht32769319157546");
	          if(vSth) vSth.disabled = true;          
	          }
	          */
	/* DEB HAS
	          vSth = top.MyApp.FindItem("Sht32769319157546");
	          if(vSth) vSth.disabled = false;
	          ////14.12.2015 -> CBA #464  
	       ////11.05.2016 MH #861 DEBLOQUER MAIL ADMIN
	       var vAchfourn    = "select titulaire from sysadm.so0 where nrid = '"+top.MyApp.GetItemValue("OppCpyNRID", top.MyData_View)+"'";
	       var vAchfourn2 = top.MyApp._gfctExtReq(vAchfourn);
	       //alert(vAchfourn2);
	       ////11.05.2016 MH #861 DEBLOQUER MAIL ADMIN  
	      ////30.11.2016 MH  DEBLOQUER MAIL ADMIN RESLIEES
	       var vAchresliees    = "select personne from sysadm.res_liees where vue_ressource = '"+vAcheteur+"' and personne = '+vCurrentUser+'";
	       var vAchresliees2 = top.MyApp._gfctExtReq(vAchresliees);
	       //alert(vAchfourn2);
	       ////30.11.2016 MH DEBLOQUER MAIL ADMIN RESLIEES       
	       
	       if((vAcheteur == vCurrentUser || vAchfourn2 == vCurrentUser || vAchresliees == vCurrentUser || vAssComm == vCurrentUser || vProfilInit=="ADMT" || vProfilInit=="ADMF" || vProfilInit=="LTG" || vProfilInit=="LTG3") && top.MyApp.GetItemValue('OppExtMailSend') != 1 )
	       {      
	       
	              var vSQL = "select s.xderog_perm "
	                            +", (select top 1 1 from sysadm.dc0 where dc0.do0_nrid =d.nrid and  xStatOff='05. COMMANDEE') as Offre "
	                            +" from sysadm.do0  d "
	                            +" join sysadm.so0 s on d.so0_nrid =s.nrid  "
	                            +" left join sysadm.am0 a on a.titulaire = d.xacheteur" 
	                            +" where d.nrid='"+top.MyApp.GetItemValue("OppNRID", top.MyData_View)+"' "            
	              var arrRes = top.MyApp._gfctExtReq(vSQL);
	                          
	              if( arrRes[0][0] == 1)
	              {       
	                     if(top.MyApp.GetItemValue('OppExtDerogPerm') != 1)
	                     {
	                            top.MyApp.SetItemValue("OppExtDerogPerm","1");
	                     } 
	                     else
	                     {
	                             if(vSthDerogation) vSthDerogation.disabled = true;
	                     }              
	              }
	     
	  
	              if(arrRes[0][1] == 1 && top.MyApp.GetItemValue('OppExtDerogPerm') == 1 && top.MyApp.GetItemValue('OppExtFactureProforma') ==1 && top.MyApp.GetItemValue('OppExtMailSend') !=1)
	              {
	                     if(vSthSendMail) vSthSendMail.disabled = false;
	                     
	                     top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView1.fraData.document.getElementById("tblMain"),12,6,1,1,'<IMG style="CURSOR: hand; COLOR: blue; TEXT-DECORATION: underline" src="https://'+location.host+top.MyApp.AppSetting.RootPath+'__Images/_mail.gif"  HEIGHT="16" WIDTH="19" />',false);
	              }
	              else
	              {
	                     if(vSthSendMail) vSthSendMail.disabled = true;
	                     
	                     top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView1.fraData.document.getElementById("tblMain"),12,6,1,1,'<IMG style="CURSOR: hand; COLOR: blue; TEXT-DECORATION: underline" src="https://'+location.host+top.MyApp.AppSetting.RootPath+'__Images/_mail.gif" HEIGHT="16" WIDTH="19" />',false);
	              }
	       }
	       else
	       {
	         
	              if(vSthSendMail) vSthSendMail.disabled = true;
	              if(vSthFactPF) vSthFactPF.disabled = true;
	              if(vSthDerogation) vSthDerogation.disabled = true;
	              if(top.MyApp.GetItemValue('OppExtMailSend') == 1 )
	              {  
	                    top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView1.fraData.document.getElementById("tblMain"),12,6,1,1,'<IMG style="CURSOR: hand; COLOR: blue; TEXT-DECORATION: underline" src="https://'+location.host+top.MyApp.AppSetting.RootPath+'__Images/mail_ok.png" HEIGHT="16" WIDTH="19" />',false);         
	              }  
	              else
	              {  
	                    top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView1.fraData.document.getElementById("tblMain"),12,6,1,1,'<IMG style="CURSOR: hand; COLOR: blue; TEXT-DECORATION: underline" src="https://'+location.host+top.MyApp.AppSetting.RootPath+'__Images/_mail.gif" HEIGHT="16" WIDTH="19" />',false);         
	              }  
	 
	       }   
	}  
	else
	{
	          ////14.12.2015 -> CBA #464
	          vSth = top.MyApp.FindItem("Sht32769319157546");
	          if(vSth) vSth.disabled = true;
	          ////14.12.2015 -> CBA #464     
	         if(vSthSendMail) vSthSendMail.disabled = true;
	}  
	  END HAS 
	*/
	 
	 
	 
		// >>>>>>>>GI LOT 2 <<<<<<
	/*
	top.MyApp.SetItem("Sht33160707467352", "style.visibility",  "hidden", top.MyData_View);
	top.MyApp.SetItem("OppExtCountPush", "style.visibility",  "hidden", top.MyData_View);
	*/
		
	// DEBUT MASAO@FNA - 13/12/2017 - Mantis #14182 - [Affaire] - RG3 : Statut = 02-NON SUIVI
	top.MyApp.Custom_NonSuiviBtn = false;
	// FIN MASAO@FNA - 13/12/2017 - Mantis #14182
	// DEBUT MASAO@FNA - 15/12/2017 - Mantis #14184 - [Affaire] - RG7 : Statut = 05-DEPOSE
	top.MyApp.Custom_DeposerDossBtn = false;
	// FIN MASAO@FNA - 15/12/2017 - Mantis #14184
	// DEBUT MASAO@FNA - 18/12/2017 - Mantis #14203 - [Affaire] - RG12 : Statut=09-INCOMPLET PROSP
	top.MyApp.Custom_IncompletBtn = false;
	// FIN MASAO@FNA - 18/12/2017 - Mantis #14203
	// DEBUT MASAO@FNA - 18/12/2017 - Mantis #14214 - [Affaire] - RG4 : Bouton="Demande de validation"
	top.MyApp.Custom_DemandeValidationBtn = false;
	// FIN MASAO@FNA - 18/12/2017 - Mantis #14214
	// DEBUT MASAO@FNA - 19/12/2017 - Mantis #14183 - [Affaire] - RG6 : Statut=04-COMPLET
	top.MyApp.Custom_ValidationBtn = false;
	// FIN MASAO@FNA - 19/12/2017 - Mantis #14183
		
	if(top.CurrentSetting.nChapMode == "Open") 
	{
	  
	  var vUserProfile = top.MyApp.UserSetting.User.ProfileInitials;
	 
	  if (vUserProfile == 'ADMF' || vUserProfile == 'ADMFT' ||  vUserProfile == 'ADMT' || vUserProfile == 'MAN_HA_TER' || vUserProfile == 'MAN_HA_ASS'  ) 
	  {
	      if (top.MyApp.FindItem("OppExtCommQu")) 
	   {
	           top.MyApp.FindItem("OppExtCommQu", top.MyData_View).disabled = false;
	      }
	      
	      if (top.MyApp.FindItem("OppExtInfoMarkt")) 
	   {
	           top.MyApp.FindItem("OppExtInfoMarkt", top.MyData_View).disabled = false;
	      } 
	  }
	  else 
	  {
	   if (top.MyApp.FindItem("OppExtCommQu")) 
	   {
	           top.MyApp.FindItem("OppExtCommQu", top.MyData_View).disabled = true;
	      }
	      
	      if (top.MyApp.FindItem("OppExtInfoMarkt")) 
	   {
	           top.MyApp.FindItem("OppExtInfoMarkt", top.MyData_View).disabled = true;
	      } 
	  }
	 }
}