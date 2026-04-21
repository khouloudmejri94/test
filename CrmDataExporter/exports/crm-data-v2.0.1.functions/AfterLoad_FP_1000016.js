function AfterLoad_FP_1000016()
{
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	 _oCurWnd = top.MyData_View;
	} else {
	 _oCurWnd = top.MyApp.wizardWindow;
	}
	
	PS_Quo_Header_Status();
	var typeHnd = top.MyApp.FindItem("QuoExtDelPai", _oCurWnd);
	if (typeHnd)
	{
	 top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Quo_Header_Status);
	 top.MyApp.fctAddEvent(typeHnd, "change", PS_Quo_Header_Status);
	}
	
	var typeHnd = top.MyApp.FindItem("QuoExtRaisonOffre", _oCurWnd);
	if (typeHnd)
	{
	 top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Quo_Header_Status);
	 top.MyApp.fctAddEvent(typeHnd, "change", PS_Quo_Header_Status);
	}
	
	
		PS_Quo_Header_Status();
	var typeHnd = top.MyApp.FindItem("QuoExtDelPai", _oCurWnd);
	if (typeHnd )
	{
	    top.MyApp.fctRemoveEvent(typeHnd, "change",  PS_Quo_Header_Status);
	    top.MyApp.fctAddEvent(typeHnd, "change", PS_Quo_Header_Status);
	}
		var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vUser = top.MyApp.UserSetting.User.Name
	var vMDM_Nego = top.MyApp.FindItem("QuoExtDateMDM", top.MyData_View);
	var vMDM_NegoBtn = top.MyApp.FindItem("QuoExtDateMDMBtn", top.MyData_View);
	var vMDM_SCH = top.MyApp.FindItem("QuoExtDateMDMSCH", top.MyData_View);
	var vMDM_SCHBtn = top.MyApp.FindItem("QuoExtDateMDMSCHBtn", top.MyData_View);
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	var vProfAch = "ADMT;MAN_HA_TER;ACH_TER;ASS_ACH";
	var vProfSCH = "ADMT;ASS_SUP_CHN;LEAD_SUP_CHN";
	var vDateMDM = top.MyApp.GetItemValue("QuoExtDateMDM");
	var vAppelcmd = top.MyApp.GetItemValue("QuoExtAppelCmd");
	var Vstatut = top.MyApp.GetItemValue("QuoExtStatOff");
	var vFunction = top.MyApp.UserSetting.User.Function;
	var vTypeDerogMdp = top.MyApp.GetItemValue("QuoExtTypeDerogMdp");
	var vValidHealthCheck = top.MyApp.GetItemValue("QuoExtPtValidFlag");
	var oValDirDerogMdp = top.MyApp.FindItem("QuoExtValDirDerogMdp", top.MyData_View);
	var nTypeDerogMdp = vTypeDerogMdp.substr(0, 1);
	// Debut HAS : V1: AfterLoad résultat de negociation : mettre anné forecast sur anné en cours si la semaine est selectionnée
	top.MyApp.SetItem("QuoExtDemDerogMdp", "style.visibility", 'Hidden');
	//top.MyApp.SetItem("QuoExtDemDerogMdp", "parentElement.previousSibling.style.visibility","hidden");
	top.MyApp.SetItem("QuoExtDemDerogMdp", "parentElement.style.visibility", "hidden");
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var vForecastYear = top.MyApp.FindItem("QuoExtForecastYear", top.MyData_View);
	 if (vForecastYear) {
	  top.MyApp.FindItem("QuoExtForecastYear").disabled = true;
	  //top.MyApp.CurrentSetting.Catalog["QuoExtForecastYear"].Ed=0;
	  //top.MyApp.SetItem("QuoExtForecastYear","disabled",true,top.MyData_View);
	 }
	 // Debut HAS : V1: AfterLoad résultat de negociation : mettre anné forecast sur anné en cours si la semaine est selectionnée
	 if (vProfSCH.indexOf(vProf) > -1) {
	  top.MyApp.FindItem("QuoExtDateMDM").disabled = true;
	  top.MyApp.CurrentSetting.Catalog.QuoExtDateMDM.Ed = -1;
	  top.MyApp.SetItem("QuoExtDateMDM", "contentEditable", false, top.MyData_View);
	 }
	 if (vProfNeg.indexOf(vProf) > -1 || vProfAch.indexOf(vProf) > -1) {
	  top.MyApp.FindItem("QuoExtDateMDMSCH").disabled = true;
	  top.MyApp.CurrentSetting.Catalog.QuoExtDateMDMSCH.Ed = -1;
	  top.MyApp.SetItem("QuoExtDateMDMSCH", "contentEditable", false, top.MyData_View);
	 }
	 // vDateMDM - date mise à disposition marchandise de l'acheteur
	 if (vDateMDM != null && vDateMDM != '' && vDateMDM != undefined) {
	  top.MyApp.FindItem("QuoExtDateMDM").disabled = true;
	  top.MyApp.CurrentSetting.Catalog.QuoExtDateMDM.Ed = 0;
	  top.MyApp.SetItem("QuoExtDateMDM", "contentEditable", false, top.MyData_View);
	 } else {
	  top.MyApp.FindItem("QuoExtDateMDM").disabled = false;
	  top.MyApp.CurrentSetting.Catalog.QuoExtDateMDM.Ed = 1;
	  top.MyApp.SetItem("QuoExtDateMDM", "contentEditable", true, top.MyData_View);
	 }
	}
	// HAS DEB 22/06/2020 : modification des champs mode de paiement
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var vValBumDerogMdp = top.MyApp.GetItemValue("QuoExtValAchDerogMdp");
	 var vValDirDerogMdp = top.MyApp.GetItemValue("QuoExtValDirDerogMdp");
	 var vValTlDerogMdp = top.MyApp.GetItemValue("QuoExtValTlDerogMdp");
	 var vValMngzDerogMdp = top.MyApp.GetItemValue("QuoExtValMngzDerogMdp");
	 var oPaymTerm = top.MyApp.FindItem("QuoExtDelPai");
	 var oDeposit = top.MyApp.FindItem("QuoExtDepMDP");
	 // label du mode de paiement
	 /*if (top.MyApp.CustomSetting.ValidMdpAch == '1') {
	 top.MyApp.FindItem("QuoExtValAchDerogMdp").disabled = false;
	 } else {
	 top.MyApp.FindItem("QuoExtValAchDerogMdp").disabled = true;
	 }*/
	 /*if ((vValDirDerogMdp != null && vValDirDerogMdp != '' && vValDirDerogMdp != undefined) || vAppelcmd == '1') {
	 top.MyApp.FindItem("QuoExtDelPai").disabled = true;
	 top.MyApp.FindItem("QuoExtDepMdp").disabled = true;
	 } else {
	 top.MyApp.FindItem("QuoExtDelPai").disabled = false;
	 top.MyApp.FindItem("QuoExtDepMdp").disabled = false;
	 }*/
	 // HAS DEB 31/10/2023 - IF the call to place order made OR validation done for payterm THEN no more changes for payterm
	
	    var fieldDelPai = top.MyApp.FindItem("QuoExtDelPai");
	    var fieldDepMdp = top.MyApp.FindItem("QuoExtDepMdp");
	
	
	    var hasDir  = (vValDirDerogMdp  != null && vValDirDerogMdp  != '' && vValDirDerogMdp  != undefined);
	    var hasMngz = (vValMngzDerogMdp != null && vValMngzDerogMdp != '' && vValMngzDerogMdp != undefined);
	    var hasBum  = (vValBumDerogMdp  != null && vValBumDerogMdp  != '' && vValBumDerogMdp  != undefined);
	    var hasTl   = (vValTlDerogMdp   != null && vValTlDerogMdp   != '' && vValTlDerogMdp   != undefined);
	
	    // Default ? enable
	    fieldDelPai.disabled = false;
	    fieldDepMdp.disabled = false;
	
	    if (vProf != 'ADMT') {
	
	    
	    if (vValidHealthCheck == '1' || vAppelcmd == '1') {
	
	        fieldDelPai.disabled = true;
	        fieldDepMdp.disabled = true;
	
	    } else if (nTypeDerogMdp == '4') {
	
	        if (hasDir) {
	        fieldDelPai.disabled = true;
	        fieldDepMdp.disabled = true;
	        }
	
	    } else if (nTypeDerogMdp == '3') {
	
	        if (hasDir || hasMngz) {
	        fieldDelPai.disabled = true;
	        fieldDepMdp.disabled = true;
	        }
	
	    } else if (nTypeDerogMdp == '2') {
	
	        if (hasDir || hasMngz || hasBum) {
	        fieldDelPai.disabled = true;
	        fieldDepMdp.disabled = true;
	        }
	
	    } else if (nTypeDerogMdp == '1') {
	
	        if (hasDir || hasMngz || hasBum || hasTl) {
	        fieldDelPai.disabled = true;
	        fieldDepMdp.disabled = true;
	        }
	
	    }
	    }
	 // HAS DEB 31/10/2023 - IF the call to place order made OR validation done for payterm THEN no more changes for payterm
	}
	// HAS DEB 22/06/2020 : modification des champs mode de paiement
	// HAS DEB 23/10/2023 : Gestion des droits de validation des MDP en fonction des niveau
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	
	  // If HealthCheck is not valid -> disable everything
	  if (vValidHealthCheck != 1) {
	
	    top.MyApp.FindItem("QuoExtValDirDerogMdp").disabled = true;
	    top.MyApp.FindItem("QuoExtValMngzDerogMdp").disabled = true;
	    top.MyApp.FindItem("QuoExtValAchDerogMdp").disabled = true;
	    top.MyApp.FindItem("QuoExtValTlDerogMdp").disabled = true;
	
	  } else {
	
	    if (!(vProf == 'ADMT' || top.MyApp.CustomSetting.ValidMdpAch == '1')) {
	
	      // Directeur operations OR Regional director
	      if (vFunction == 'Directeur operations' || vFunction == 'Regional director') {
	        top.MyApp.FindItem("QuoExtValDirDerogMdp").disabled = false;
	      } else {
	        top.MyApp.FindItem("QuoExtValDirDerogMdp").disabled = true;
	      }
	
	      // Manager Zone
	      if (vFunction == 'Manager Zone' && vUser != top.MyApp.GetItemValue("QuoExtAcht")) {
	        top.MyApp.FindItem("QuoExtValMngzDerogMdp").disabled = false;
	      } else {
	        top.MyApp.FindItem("QuoExtValMngzDerogMdp").disabled = true;
	      }
	
	      // BUM
	      if (vProf == 'MNG_ACH_OPR') {
	        top.MyApp.FindItem("QuoExtValAchDerogMdp").disabled = false;
	      } else {
	        top.MyApp.FindItem("QuoExtValAchDerogMdp").disabled = true;
	      }
	
	      // Team Lead
	      if (vProf == 'LEAD_NEG') {
	        top.MyApp.FindItem("QuoExtValTlDerogMdp").disabled = false;
	      } else {
	        top.MyApp.FindItem("QuoExtValTlDerogMdp").disabled = true;
	      }
	
	    }
	
	  }
	}
	// HAS END 23/10/2023 : Gestion des droits de validation des MDP en fonction des niveau
	// HAS DEB 18/08/2020 : desactiver saisie champ deposit estimé et type derogation
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var oDepMdp = top.MyApp.FindItem("QuoExtDelPai");
	 var oTypeDerog = top.MyApp.FindItem("QuoExtTypeDerogMdp");
	 if (vProf != 'ADMT') {
	  if (oDepMdp) top.MyApp.FindItem("QuoExtDepMdp").disabled = true;
	  if (oTypeDerog) top.MyApp.FindItem("QuoExtTypeDerogMdp").disabled = true;
	 } else {
	  if (oDepMdp) top.MyApp.FindItem("QuoExtDepMdp").disabled = false;
	  if (oTypeDerog) top.MyApp.FindItem("QuoExtTypeDerogMdp").disabled = false;
	 }
	}
	// HAS DEB 18/08/2020 : desactiver saisie champ deposit estimé et type derogation
	// HAS DEB 24/11/2020 : regle de saisie pour la partie Stock Priority
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var oStockPrior = top.MyApp.FindItem("QuoExtStockPrior");
	 var oValidStockPrior = top.MyApp.FindItem("QuoExtValidStockPrior");
	 if (vAppelcmd != '1') {
	  if (vProf != 'ADMT' && vProf != 'LEAD_NEG' && vProf != 'NEG_SEN' && vProf != 'MNG_ACH_OPR') {
	   if (oStockPrior) top.MyApp.FindItem("QuoExtStockPrior").disabled = true;
	  } else {
	   if (oStockPrior) top.MyApp.FindItem("QuoExtStockPrior").disabled = false;
	  }
	 } else {
	  if (oStockPrior) top.MyApp.FindItem("QuoExtStockPrior").disabled = true;
	 }
	 if (oValidStockPrior) {
	  if (vProf != 'ADMT' && vProf != 'LEAD_NEG' && vProf != 'MNG_ACH_OPR') {
	   top.MyApp.FindItem("QuoExtValidStockPrior").disabled = true;
	   top.MyApp.CurrentSetting.Catalog.QuoExtValidStockPrior.Ed = -1;
	   top.MyApp.SetItem("QuoExtValidStockPrior", "contentEditable", false, top.MyData_View);
	  }
	 }
	}
	// HAS END 24/11/2020 : regle de saisie pour la partie Stock Priority
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 if (Vstatut.substr(0, 1) == "5" || Vstatut.substr(0, 1) == "6") {
	  if (top.MyApp.FindItem("QuoExtLieuCQ")) {
	   top.MyApp.FindItem("QuoExtLieuCQ").disabled = true;
	  }
	 }
	}
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 if (vAppelcmd == '1') {
	  top.MyApp.FindItem("QuoExtValDirDerogMdp").disabled = true;
	  top.MyApp.FindItem("QuoExtValMngzDerogMdp").disabled = true;
	  top.MyApp.FindItem("QuoExtValAchDerogMdp").disabled = true;
	  top.MyApp.FindItem("QuoExtValTlDerogMdp").disabled = true;
	 }
	 /* else {
	         top.MyApp.FindItem("QuoExtValDirDerogMdp").disabled = false;
	         top.MyApp.FindItem("QuoExtValMngzDerogMdp").disabled = false;
	         top.MyApp.FindItem("QuoExtValAchDerogMdp").disabled = false;
	         top.MyApp.FindItem("QuoExtValTlDerogMdp").disabled = false;
	     }*/
	}
		if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var OstatOff = top.MyApp.FindItem("QuoExtStatOff", top.MyData_View);
	 var VstatOff = top.MyApp.GetItemValue("QuoExtStatOff").substring(0, 1);
	
	 if (OstatOff) {
	  if (VstatOff == "8") {
	   if (top.MyApp.GetItemValue("QuoExtComm") == "" || top.MyApp.GetItemValue("QuoExtComm") == null) {
	    top.MyApp._gfctSetClassName("QuoExtComm", "NM");
	   } else {
	    top.MyApp._gfctSetClassName("QuoExtComm", "UM");
	   }
	  }
	  VstatOff.onchange = function() {
	   if (VstatOff == "8") {
	    if (top.MyApp.GetItemValue("QuoExtComm") == "" || top.MyApp.GetItemValue("QuoExtComm") == null) {
	     top.MyApp._gfctSetClassName("QuoExtComm", "NM");
	    } else {
	     top.MyApp._gfctSetClassName("QuoExtComm", "UM");
	    }
	   }
	
	  }
	 }
	}
}