function AfterLoad_FP_34991773386507()
{
	/*
	//DEBUT FTC@MASAO - MANTIS 14414 - 12/01/2018
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var Sql = "select count(nrid) from sysadm.x_echantillon where  template is null and RESPONSABLE_ECH is not null " +
	  "and STATUS_ECHANTILLON in ('SansEchantillon','Sans échantillon','Validé sous condition','valide_sous_condition','Validé','valide', 'Confirmé sans échantillon') " +
	  "and DC0_NRID ='" + top.MyApp.GetItemValue('QuoNRID') + "' and Template is null ";
	 var arrRes = top.MyApp._gfctExtReq(Sql);
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	 if (vProf != 'ADMT' && vProf != 'ADMF') {
	  if ((top.MyApp.GetItemValue("QuoExtStatOff") == "5. Commandée") && (arrRes[0][0] > 0)) {
	   var vHeureDemande = top.MyApp.FindItem("QuoExtDateDemDeposit", top.MyData_View);
	   var v_DateDeposit = top.MyApp.GetItemValue("QuoExtDateEnvoiDep");
	
	
	
	   if (vHeureDemande) {
	    if (top.MyApp.GetItemValue("QuoExtDateDemDeposit") != '') {
	     top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "Mandatory");
	     //top.MyApp.FindItem("Sht34960578390608").disabled = true;
	    } else {
	     top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "");
	     //top.MyApp.FindItem("Sht34960578390608").disabled = false;
	    }
	
	
	    vHeureDemande.onchange = function () {
	     if (top.MyApp.GetItemValue("QuoExtDateDemDeposit") != '') {
	      top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "Mandatory");
	      //top.MyApp.FindItem("Sht34960578390608").disabled = true;
	      top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = 1;
	     } else {
	      top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "");
	      //top.MyApp.FindItem("Sht34960578390608").disabled = false;
	      top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = -1;
	     }
	    }
	   }
	   
	  } else {
	   //top.MyApp.FindItem("Sht34960578390608").disabled = true;
	   top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	  }
	 } else {
	  //top.MyApp.FindItem("Sht34960578390608").disabled = false;
	  top.MyApp.FindItem("QuoExtDetailsDem").disabled = false;
	 }
	}
	//FIN FTC@MASAO - MANTIS 14414 - 12/01/2018
	
	
	*/
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	//var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF;MNG_ACH_OPR;ACH_TER;ASS_ACH;MAN_HA_TER";
	var vProfSCH = "ASS_SUP_CHN;LEAD_SUP_CHN";
	top.MyApp.SetItem("QuoExtAppelDeposit", "style.visibility", 'Hidden');
	//top.MyApp.SetItem("QuoExtAppelDeposit", "parentElement.previousSibling.style.visibility", "hidden");
	var vSendPo = top.MyApp.GetItemValue("QuoExtDateEnvPO");
	var vRecPo = top.MyApp.GetItemValue("QuoExtDateRecPO");
	var vPO = '';
	if(vSendPo == '' || vSendPo == null || vSendPo == undefined || vRecPo == '' || vRecPo == null || vRecPo == undefined) {
	 vPO = '0';
	} else {
	 vPO = '1';
	}
	//alert("autorise suite PO : "+vPO);
	//DEBUT FTC@MASAO - MANTIS 14414 - 12/01/2018
	if(top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 var Sql = "select count(nrid) from sysadm.x_echantillon where  template is null and RESPONSABLE_ECH is not null " + "and STATUS_ECHANTILLON in ('SansEchantillon','Sans échantillon','Validé sous condition','valide_sous_condition','Validé','valide', 'Confirmé sans échantillon') " + "and DC0_NRID ='" + top.MyApp.GetItemValue('QuoNRID') + "' and Template is null ";
	 var arrRes = top.MyApp._gfctExtReq(Sql);
	 if(vProf != 'ADMT' && vProf != 'ADMF') {
	  if((top.MyApp.GetItemValue("QuoExtStatOff") == "5. Commandée") && (arrRes[0][0] > 0) && (vProfNeg.indexOf(vProf) == -1)) {
	   var vHeureDemande = top.MyApp.FindItem("QuoExtDateDemDeposit", top.MyData_View);
	   var v_DateDeposit = top.MyApp.GetItemValue("QuoExtDateEnvoiDep");
	   if(vHeureDemande) {
	    if(top.MyApp.GetItemValue("QuoExtDateDemDeposit") != '') {
	     //top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "Mandatory");
	     //top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = 1;
	     top.MyApp._gfctSetClassName("QuoExtDetailsDem", "NM");
	     top.MyApp.FindItem("Sht34960578390608").disabled = true;
	     top.MyApp.FindItem("QuoExtDetailsDem").disabled = false;
	    } else {
	     top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "");
	     top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = -1;
	     top.MyApp.FindItem("Sht34960578390608").disabled = false;
	     top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	    }
	    vHeureDemande.onchange = function() {
	     if(top.MyApp.GetItemValue("QuoExtDateDemDeposit") != '') {
	      //top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "Mandatory");
	      top.MyApp.FindItem("Sht34960578390608").disabled = true;
	      //top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = 1;
	      top.MyApp._gfctSetClassName("QuoExtDetailsDem", "NM");
	      top.MyApp.FindItem("QuoExtDetailsDem").disabled = false;
	     } else {
	      top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "");
	      top.MyApp.FindItem("Sht34960578390608").disabled = false;
	      top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = -1;
	      top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	     }
	    }
	   }
	   /*
	   if (top.MyApp.GetItemValue("QuoExtDateEnvoiDep") != '') {
	    top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	   }*/
	   if((top.MyApp.GetItemValue("QuoExtAppelDeposit") == '0' || top.MyApp.GetItemValue("QuoExtAppelDeposit") == null || top.MyApp.GetItemValue("QuoExtAppelDeposit") == '' ) && vPO == '1') {
	    top.MyApp.FindItem("Sht34960578390608").disabled = false;
	    top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Ed = 1;
	   } else {
	    top.MyApp.FindItem("Sht34960578390608").disabled = true;
	    top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Ed = -1;
	   }
	  } else {
	   // desactiver bouton si pas echant valide
	   top.MyApp.FindItem("Sht34960578390608").disabled = true;
	   top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	  }
	 } else {
	  top.MyApp.FindItem("Sht34960578390608").disabled = false;
	  top.MyApp.FindItem("QuoExtDetailsDem").disabled = false;
	 }
	}
	if(top.MyApp.CurrentSetting.nChapMode == 'Open' && top.MyApp.CurrentSetting.bConsultMode != true) {
	 var Normes = top.MyApp.GetItemValue("QuoExtRapTest");
	 var vValidOPR = top.MyApp.GetItemValue("QuoExtValDepOPR");
	 var oDemValidDep = top.MyApp.FindItem("QuoExtDemValDep", top.MyData_View);
	 var oValidSCH = top.MyApp.FindItem("QuoExtValDepSCH", top.MyData_View);
	 var oValidOPR = top.MyApp.FindItem("QuoExtValDepOPR", top.MyData_View);
	 if(vProfSCH.indexOf(vProf) != -1) {
	  if(Normes == 'Obligatoire') {
	   if(vValidOPR != '1') {
	    top.MyApp.FindItem("Sht34960578390608").disabled = true;
	    top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	   } else {
	    top.MyApp.FindItem("Sht34960578390608").disabled = false;
	    top.MyApp.FindItem("QuoExtDetailsDem").disabled = false;
	   }
	  }
	 }
	 // HAS DEB : Achat 2020 RG activation CAC demande validation deposit
	 if(vProf != 'LEAD_SUP_CHN') {
	  if(oValidSCH) oValidSCH.disabled = true;
	 } else {
	  if(oValidSCH) oValidSCH.disabled = false;
	 }
	 if(vProf != 'MNG_ACH_OPR') {
	  if(oValidOPR) oValidOPR.disabled = true;
	 } else {
	  if(oValidOPR) oValidOPR.disabled = false;
	 }
	 // HAS END : Achat 2020 RG activation CAC demande validation deposit
	}
	if(top.MyApp.CurrentSetting.nChapMode == 'Reset' || top.MyApp.CurrentSetting.bConsultMode == true) {
	 top.MyApp.FindItem("Sht34960578390608").disabled = true;
	 /* just decom  */
	 top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	}
	//FIN FTC@MASAO - MANTIS 14414 - 12/01/2018
	if(top.MyApp.CurrentSetting.nChapMode == 'Open' && top.MyApp.CurrentSetting.bConsultMode == true) {
	 var DetailDem = top.MyApp.FindItem("QuoExtDetailsDem");
	 if(DetailDem) DetailDem.disabled = true;
	}
	//var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	// HAS DEB : Achat 2020 : si supply chain alors impossible de faire la demande de deposit
	var vOldCmd = top.MyApp.GetItemValue("QuoExtOldCmd");
	if(vProfNeg.indexOf(vProf) != -1 && vOldCmd != '1') {
	 top.MyApp.FindItem("Sht34960578390608").disabled = true;
	 top.MyApp.FindItem("QuoExtDetailsDem").disabled = true;
	}
	// HAS END : Achat 2020 : si supply chain alors impossible de faire la demande de deposit
	/*
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset' && top.MyApp.CurrentSetting.bConsultMode != true) {
	  var vDateDem = top.MyApp.GetItemValue("QuoExtDateDemDeposit");
	  var DetailDem = top.MyApp.FindItem("QuoExtDetailsDem");
	  var DateDem = top.MyApp.FindItem("QuoExtDateDemDeposit");
	  if (DateDem) {
	    if (vDateDem == '' || vDateDem == null || vDateDem == undefined) {
	      DetailDem.disabled = true;
	    } else {
	      DetailDem.disabled = false;
	    }
	    DateDem.onchange = function () {
	      var vDateDem = top.MyApp.GetItemValue("QuoExtDateDemDeposit", top.MyData_View);
	      if (vDateDem != '' && vDateDem != null && vDateDem != undefined) {
	        var DetailDem = top.MyApp.FindItem("QuoExtDetailsDem", top.MyData_View);
	        if (DetailDem) DetailDem.disabled = false;
	        //top.MyApp.SetItem("QuoExtDetailsDem", "contentEditable", false, top.MyData_View);
	      } else {
	        var DetailDem = top.MyApp.FindItem("QuoExtDetailsDem", top.MyData_View);
	        if (DetailDem) DetailDem.disabled = true;
	        //top.MyApp.SetItem("QuoExtDetailsDem", "contentEditable", true, top.MyData_View);
	      }
	    }
	  }
	}
	*/
}