function AfterLoad_Header_1000083()
{
	// HAS DEB - 2024- add a green flag text if PI is sent
	var vPI = top.MyApp.GetItemValue("QuoExtSentPI");
	var oPI = top.MyApp.FindItem("Label41538485360944");
	if (oPI) {
	 if (vPI == '1') {
	  oPI.innerHTML = "<a id='DsiplayPhoto' >   PI CONFIRM </a> ";
	  oPI.style = "cursor:pointer";
	  oPI.style.fontWeight = 'bold';
	  oPI.style.color = '#228B22';
	  oPI.style.backgroundColor = 'white';
	  oPI.style.border = '10px';
	  oPI.style.textAlign = 'center';
	  oPI.style.textDecorationUnderline = true;
	 } else {
	  oPI.innerHTML = "";
	 }
	}
	// HAS DEB - 2024- add a green flag text if PI is sent
	top.MyApp.AppSetting.CurrentData_View['DisableWorkspace'] = false;
	// debut HAS : 19/09/2018 : 
	var vOfferStat = top.MyApp.GetItemValue("QuoExtStatOff");
	var vPayTerm = top.MyApp.GetItemValue("QuoExtDelPai");
	var ShtPI = top.MyApp.FindItem("Sht41478158391240");
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	 if (ShtPI) {
	  if (vOfferStat.substr(0, 1) != "2" && vOfferStat.substr(0, 1) != "7"&& vOfferStat.substr(0, 1) != "5") {
	   ShtPI.disabled = true;
	  } else {
	   ShtPI.disabled = false;
	   ShtPI.onclick = function() {
	    if (vPayTerm == null || vPayTerm == "" || vPayTerm == undefined) {
	     alert("Payment term is missing");
	    } else {
	     var sentPI = top.MyApp.GetItemValue("QuoExtSentPI");
	     var vStrSQL = "select count (nrid) as nbrLine  from sysadm.x_quotes where template is null and dc0_nrid='" + top.MyApp.GetItemValue('QuoNRID') + "' and XQTE_NEGO > 0 and (xgloss_fr ='' or xgloss_noz='' or xpriach_frs ='0.000000000')";
	     var res = top.MyApp.ExecuteServerScript(30231053360342, [vStrSQL]);
	     var objXmlRes = top.MyApp.InitXmlCli(res);
	     var objCountElement = objXmlRes.getElementsByTagName("nbrLine");
	     var nNbrPostError = objCountElement[0].getAttribute("Val");
	     //alert(nNbrPostError);
	     if (nNbrPostError > 0) {
	      top.MyApp.OpenDlg("Alert", ["Attention", "You have '" + nNbrPostError + "' posts with missing informations \n Please Verify: \n -Glossary FR\n -Glossary Client\n -Negociated price"]);
	      return false;
	     } else {
	            if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "blnModified") == "true") {
	              top.MyApp.OpenDlg("Alert", ["Attention", "Please save modifications before making the request"]);
	              return false;
	            } else {
	              var arrParams = [];
	              arrParams[0] = top.MyApp;
	              arrParams[1] = top.bWizard;
	              top.MyApp.OpenDlg('41971853578536', arrParams, top, undefined, undefined, undefined, undefined, function() {});
	            }
	     }
	    }
	   }
	  }
	 }
	}
	//top.MyApp.AppSetting.CurrentData_View['DisableWorkspace'] = false;
	// debut HAS : 19/09/2018 :  HIDE CHANGE TRACKER DYNAMIC VIEW FOR SOME USER PROFILES
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (vProf == 'ADMT' || vProf == 'ADMF' || vProf == 'MAN_HA_TER' || vProf == 'ADMFT' || vProf == 'MNG_ACH_OPR' || vProf == 'QUA') {
	  var arrShowVD = [];
	  arrShowVD["Tab_35408475158812"] = [];
	  arrShowVD["Tab_30900557696350"] = [];
	  top.MyApp.fctShowTabs(arrShowVD, "Quo", "Group_26453602570911");
	 } else {
	  var arrShowVD = [];
	  arrShowVD["Tab_30900557696350"] = [];
	  top.MyApp.fctShowTabs(arrShowVD, "Quo", "Group_26453602570911");
	  var arrHideVD = [];
	  arrHideVD["Tab_35408475158812"] = [];
	  top.MyApp.fctHideTabs(arrHideVD, "Quo", "Group_26453602570911");
	
	 }
	} else {
	 var arrShowVD = [];
	 arrShowVD["Tab_35408475158812"] = [];
	 arrShowVD["Tab_30900557696350"] = [];
	 top.MyApp.fctShowTabs(arrShowVD, "Quo", "Group_26453602570911");
	}
	
	
	//////////////////////////////////
	
	
	
	/*
	if(top.MyApp.CurrentSetting.nChapMode == "Open")  
	{
	 var vNumOffre = top.MyApp.FindItem("QuoCustReference");
	 //debugger;
	 if(vNumOffre)
	 {
	   vNumOffre.style.cssText="CURSOR:hand;COLOR:blue;TEXT-DECORATION:underline";  
	   top.MyApp.FindItem("QuoCustReference").readOnly= true;
	   vNumOffre.onclick = function()
	   {
	
	
	       var strOffre = top.MyApp.GetItemValue("QuoCustReference");
	       if(strOffre !="")
	       {
	          PS_Quo_Sht_Open_Offre_SAP(strOffre );
	       }
	   }
	 }
	
	
	}
	*/
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	 var vNumOffre = top.MyApp.FindItem("QuoCustReference");
	 //debugger;
	 //ouvrir une offre a partie du champ annule et remplace
	 /*if (vNumOffre) {
	  vNumOffre.style.cssText = "CURSOR:hand;COLOR:blue;TEXT-DECORATION:underline";
	  top.MyApp.FindItem("QuoCustReference").readOnly = true;
	  vNumOffre.onclick = function() {
	
	
	   var strOffre = top.MyApp.GetItemValue("QuoCustReference");
	   if (strOffre != "") {
	    PS_Quo_Sht_Open_Offre_SAP(strOffre);
	   }
	  }
	 }*/
	 //OPEN CANCEL AND REPLACE OFFER BY CLICKING////
	 var vNumAR = top.MyApp.FindItem("QuoExtRefAR");
	 var NumAR = top.MyApp.GetItemValue("QuoExtRefAR");
	 if (vNumAR != '' && vNumAR != null && vNumAR != undefined) {
	  vNumAR.style.cssText = "CURSOR:hand;COLOR:blue;TEXT-DECORATION:underline";
	  top.MyApp.FindItem("QuoExtRefAR").readOnly = true;
	  var strSQLRes = "select nrid as arnrid from sysadm.dc0 where vos_ref = '" + top.MyApp.GetItemValue("QuoExtRefAR") + "' and template is null "
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	  var vARnrid = arrRes[0][0];
	  vNumAR.onclick = function() {
	   top.MyApp.OpenData_View("Quo", vARnrid, "Open", '', '', '');
	  };
	 }
	 //fin nchapmode 
	}
	
	// HAS DEB 17/12/2020 : ADD SELECTOR FRO EXPORT AGENT WEB DYNA SCREEN
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (top.MyApp.FindItem("QuoExtFrsExport")) {
	  top.MyApp.FindItem("QuoExtFrsExport").onfocus = function() {
	   //alert(' appel fonction PS_Quo_AgentExport');
	   PS_Quo_AgentExport();
	  }
	 }
	}
	// HAS END 17/12/2020 :  ADD SELECTOR FRO EXPORT AGENT WEB DYNA SCREEN
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (vProf == 'ADMT' || vProf == 'ADMF' || vProf == 'MAN_HA_TER' || vProf == 'ADMFT' || vProf == 'MNG_ACH_OPR' || vProf == 'QUA') {
	  var arrShowVD = [];
	  arrShowVD["Tab_35408475158812"] = [];
	  arrShowVD["Tab_30900557696350"] = [];
	  top.MyApp.fctShowTabs(arrShowVD, "Quo", "Group_26453602570911");
	
	
	  //var arrHideVD = [];
	  //arrHideVD["Tab_30900557696350"] = [];
	  //top.MyApp.fctHideTabs(arrHideVD, "Quo", "Group_26453602570911");
	 } else {
	  var arrShowVD = [];
	  arrShowVD["Tab_30900557696350"] = [];
	  top.MyApp.fctShowTabs(arrShowVD, "Quo", "Group_26453602570911");
	  var arrHideVD = [];
	  arrHideVD["Tab_35408475158812"] = [];
	  top.MyApp.fctHideTabs(arrHideVD, "Quo", "Group_26453602570911");
	 }
	} else {
	 var arrShowVD = [];
	 arrShowVD["Tab_35408475158812"] = [];
	 arrShowVD["Tab_30900557696350"] = [];
	 top.MyApp.fctShowTabs(arrShowVD, "Quo", "Group_26453602570911");
	}
	
	//////////////////////////////////
	/*
	if(top.MyApp.CurrentSetting.nChapMode == "Open")  
	{
	 var vNumOffre = top.MyApp.FindItem("QuoCustReference");
	 //debugger;
	 if(vNumOffre)
	 {
	   vNumOffre.style.cssText="CURSOR:hand;COLOR:blue;TEXT-DECORATION:underline";  
	   top.MyApp.FindItem("QuoCustReference").readOnly= true;
	   vNumOffre.onclick = function()
	   {
	
	
	       var strOffre = top.MyApp.GetItemValue("QuoCustReference");
	       if(strOffre !="")
	       {
	          PS_Quo_Sht_Open_Offre_SAP(strOffre );
	       }
	   }
	 }
	
	
	}
	*/
		var Btnegocie = top.MyApp.FindItem("Sht30881202270246");
	var Btnperdue = top.MyApp.FindItem("Sht30041611601156");
	var Btnexport = top.MyApp.FindItem("Sht30401304440152"); //export
	var Btnimport = top.MyApp.FindItem("Sht30220409292940"); //import
	var Btnrevalue = top.MyApp.FindItem("Sht41000053169946"); //revalue
	var BtnExportPi = top.MyApp.FindItem("Sht41478158391240"); //revalue
	var vStatoff = top.MyApp.GetItemValue("QuoExtStatOff").substr(0, 1); ///.match(/^\d+(\.\d+)?/)[0];
	var vAppelcmd = top.MyApp.GetItemValue("QuoExtAppelCmd");
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials
	 var vStatut = top.MyApp.GetItemValue("QuoExtStatOff");
	
	 if (vProf != 'ADMT' && vProf != 'ADMF') {
	  top.MyApp.FindItem("QuoExtCompteur").disabled = true;
	  top.MyApp.FindItem("QuoExtPaysFacturation", top.MyData_View).disabled = true;
	 } else {
	  top.MyApp.FindItem("QuoExtCompteur").disabled = false;
	  top.MyApp.FindItem("QuoExtPaysFacturation", top.MyData_View).disabled = false;
	 }
	 var Supchn = top.MyApp.FindItem("QuoExtSupChain");
	 var BtnSupchn = top.MyApp.FindItem("QuoExtSupChainBtn");
	 if (vProf != 'ADMT' && vProf != 'LEAD_SUP_CHN') {
	  if (BtnSupchn) BtnSupchn.disabled = true;
	 } else {
	  if (BtnSupchn) BtnSupchn.disabled = false;
	 }
	}
	
	// DEBUT HAS: Gestion des boutons négicié et perdue
	if (top.MyApp.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.bConsultMode != true) {
	 if (vProf != 'ADMT' && vProf != 'ADMF' && vProf != 'ADMFT') {
	  if (vAppelcmd != 1) {
	   if (vStatoff != "1" && vStatoff != "2" && vStatoff != "9") {
	    if (vStatoff == "8") {
	     if (Btnperdue) Btnperdue.disabled = false;
	     if (Btnegocie) Btnegocie.disabled = false;
	     if (Btnimport) Btnimport.disabled = true;
	     if (Btnexport) Btnexport.disabled = false;
	     if (Btnrevalue) Btnrevalue.disabled = true;
	     if (BtnExportPi) BtnExportPi.disabled = true;
	    } else if (vStatoff == "1.1") {
	     if (Btnexport) Btnexport.disabled = false;
	     if (Btnegocie) Btnegocie.disabled = true;
	     if (Btnperdue) Btnperdue.disabled = false;
	     if (Btnimport) Btnimport.disabled = true;
	     if (Btnrevalue) Btnrevalue.disabled = true;
	     if (BtnExportPi) BtnExportPi.disabled = true;
	    } else if (vStatoff == "4") {
	     if (Btnexport) Btnexport.disabled = true;
	     if (Btnegocie) Btnegocie.disabled = true;
	     if (Btnperdue) Btnperdue.disabled = true;
	     if (Btnimport) Btnimport.disabled = true;
	     if (Btnrevalue) Btnrevalue.disabled = true;
	     if (BtnExportPi) BtnExportPi.disabled = true;
	    } else if (vStatoff == "3" || vStatoff == "5") {
	     if (Btnexport) Btnexport.disabled = true;
	     if (Btnegocie) Btnegocie.disabled = true;
	     if (Btnperdue) Btnperdue.disabled = true;
	     if (Btnimport) Btnimport.disabled = true;
	     if (Btnrevalue) Btnrevalue.disabled = true;
	     if (BtnExportPi) BtnExportPi.disabled = true;
	    } else if (vStatoff == "7") {
	     if (Btnegocie) Btnegocie.disabled = true;
	     if (Btnrevalue) Btnrevalue.disabled = false;
	     if (Btnexport) Btnexport.disabled = false;
	     if (Btnimport) Btnimport.disabled = false;
	     if (Btnperdue) Btnperdue.disabled = false;
	    }
	   } else if (vStatoff == "1") {
	    if (Btnegocie) Btnegocie.disabled = true;
	    if (Btnimport) Btnimport.disabled = true;
	    if (Btnperdue) Btnperdue.disabled = false;
	    if (Btnexport) Btnexport.disabled = false;
	   } else if (vStatoff == "9") {
	    if (Btnexport) Btnexport.disabled = false;
	    if (Btnegocie) Btnegocie.disabled = false;
	    if (Btnimport) Btnimport.disabled = false;
	    if (Btnperdue) Btnperdue.disabled = false;
	   } else if (vStatoff == "2") {
	    if (Btnexport) Btnexport.disabled = false;
	    if (Btnegocie) Btnegocie.disabled = true;
	    if (Btnperdue) Btnperdue.disabled = false;
	    if (Btnimport) Btnimport.disabled = false;
	   }
	  } else if (vAppelcmd == 1 && (vStatoff == "4" || vStatoff == "5" || vStatoff == "6")) {
	   if (Btnexport) Btnexport.disabled = true;
	   if (Btnimport) Btnimport.disabled = true;
	   if (Btnrevalue) Btnrevalue.disabled = true;
	   if (Btnegocie) Btnegocie.disabled = true;
	   if (BtnExportPi) BtnExportPi.disabled = false;
	   if (Btnperdue) Btnperdue.disabled = true;
	  } else {
	   if (Btnexport) Btnexport.disabled = true;
	   if (Btnimport) Btnimport.disabled = true;
	   if (Btnrevalue) Btnrevalue.disabled = true;
	   if (Btnegocie) Btnegocie.disabled = true;
	   if (BtnExportPi) BtnExportPi.disabled = false;
	   if (Btnperdue) Btnperdue.disabled = false;
	  }
	 } else {
	  if (Btnexport) Btnexport.disabled = false;
	  if (Btnimport) Btnimport.disabled = false;
	  if (Btnrevalue) Btnrevalue.disabled = false;
	  if (BtnExportPi) BtnExportPi.disabled = false;
	  if (Btnegocie) Btnegocie.disabled = false;
	  if (Btnperdue) Btnperdue.disabled = false;
	 }
	} else {
	 if (Btnegocie) Btnegocie.disabled = true;
	 if (Btnperdue) Btnperdue.disabled = true;
	 if (Btnexport) Btnexport.disabled = true;
	 if (Btnimport) Btnimport.disabled = true;
	 if (Btnrevalue) Btnrevalue.disabled = true;
	 if (BtnExportPi) BtnExportPi.disabled = true;
	}
	
	
	// END HAS : griser boutons Disable buttons//
	/////////// 
	try {
	 if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	  var vDelai = top.MyApp.GetItemValue("QuoExtDelaiOffre");
	  var vDelaiOffre = parseInt(vDelai);
	  var vQnrid = top.MyApp.GetItemValue("QuoNRID");
	
	
	  if (vStatut.substr(0, 1) == "1") {
	   if (vDelaiOffre > '7' && vDelaiOffre <= '28') {
	    top.MyApp.SetItemAttribute("QuoExtDelaiOffre", "style.backgroundColor", "#AFFA8E"); //Vert
	   } else if (vDelaiOffre <= '7') {
	    top.MyApp.SetItemAttribute("QuoExtDelaiOffre", "style.backgroundColor", "#ED5C5C"); //Rouge
	   }
	  }
	  if (vStatut.substr(0, 1) == "2") {
	   var strSQLRes = "select count (*) from sysadm.x_echantillon  where template is null and dc0_nrid  = '" + vQnrid + "' ";
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   // top.MyApp.OpenDlg("Alert", ["Attention", "PB REQUETE NEGOCIE -- " + arrRes[0][0]]);
	   if (arrRes[0][0] > 0) {
	    if (vDelaiOffre > '7' && vDelaiOffre <= '35') {
	     top.MyApp.SetItemAttribute("QuoExtDelaiOffre", "style.backgroundColor", "#AFFA8E"); //Vert
	    } else if (vDelaiOffre <= '7') {
	     top.MyApp.SetItemAttribute("QuoExtDelaiOffre", "style.backgroundColor", "#ED5C5C"); //Rouge
	    }
	   } else {
	    if (vDelaiOffre > '15') {
	     top.MyApp.SetItemAttribute("QuoExtDelaiOffre", "style.backgroundColor", "#AFFA8E"); //Vert
	    } else if (vDelaiOffre <= '15') {
	     top.MyApp.SetItemAttribute("QuoExtDelaiOffre", "style.backgroundColor", "#ED5C5C"); //Rouge
	    }
	   }
	  }
	 }
	} catch (e) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "PB REQUETE NEGOCIE -- " + e.description]);
	}
	////////////
	//   mise à jour couleur champ compteur Counter timer of offer//
	/////////////////////////////////////
	
	try {
	 if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	  var vCompt = top.MyApp.GetItemValue("QuoExtCompteur");
	  var vCmd = top.MyApp.GetItemValue("QuoExtDateDemande");
	  var vVCompt = parseInt(vCompt);
	  var vQnrid = top.MyApp.GetItemValue("QuoNRID");
	  if (vStatut.substr(0, 1) == "1") {
	   if (vVCompt > '7' && vVCompt <= '28') {
	    top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#AFFA8E"); //Vert
	   } else if (vVCompt <= '7') {
	    top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#ED5C5C"); //Rouge
	   }
	  }
	  if (vStatut.substr(0, 1) == "2") {
	   var strSQLRes = "select count (*) from sysadm.x_echantillon  where template is null and dc0_nrid  = '" + vQnrid + "' ";
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   //top.MyApp.OpenDlg("Alert", ["Attention", "PB REQUETE NEGOCIE -- " + arrRes[0][0]]);
	   if (arrRes[0][0] < 1) {
	    if (vVCompt < '0') {
	     top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#ED5C5C"); //Rouge
	    } else if (vVCompt > '7' && vVCompt <= '35') {
	     top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#AFFA8E"); //Vert
	    } else if (vVCompt >= '0' && vVCompt <= '7') {
	     top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#ED5C5C"); //Rouge
	    }
	   } else {
	    if (vCmd == null || vCmd == '' || vCmd == undefined) {
	     if (vVCompt <= '15') {
	      top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#AFFA8E"); //Vert
	     } else if (vVCompt > '15') {
	      top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#ED5C5C"); //Rouge
	     }
	    } else {
	     top.MyApp.SetItemValue("QuoExtCompteur", 'Congratulation!');
	     top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#AFFA8E"); //Vert
	    }
	   }
	  }
	  if (vStatut.substr(0, 1) == "5") {
	   top.MyApp.SetItemValue("QuoExtCompteur", 'Congratulation!');
	   top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#AFFA8E"); //Vert
	  }
	  if (vStatut.substr(0, 1) == "3") {
	   top.MyApp.SetItemValue("QuoExtCompteur", 'EXPIRED!');
	   top.MyApp.SetItemAttribute("QuoExtCompteur", "style.backgroundColor", "#ED5C5C"); //Rouge
	  }
	 }
	} catch (e) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "PB REQUETE NEGOCIE -- " + e.description]);
	}
	
	///////////////////////////
		/*
	if( top.MyApp.GetItemValue("QuoExtStatOff") =="03. A NEGOCIER" && top.MyApp.CurrentSetting.nChapMode == "Open")
	{
	 var vSth = top.MyApp.FindItem("Sht30881202270246")
	 if(vSth) vSth.disabled = false;
	}
	else
	{
	 var vSth = top.MyApp.FindItem("Sht30881202270246")
	 if(vSth) vSth.disabled = true;
	}
	*/
		PS_Quo_Header_Status();
	if(top.MyApp.CurrentSetting.nChapMode == "Reset")  
	{
	 //top.MyApp._gfctPutButton('QuoExtCPAff', "top.MyApp.PS_RempliChamp('QuoExtCPAff')", '', true, '...');
	  top.MyApp._gfctPutButton('QuoExtAcht', "top.MyApp.PS_RempliChamp('QuoExtAcht')", '', true, '...');
	 top.MyApp._gfctPutButton('QuoExtAssComm', "top.MyApp.PS_RempliChamp('QuoExtAssComm')", '', true, '...');
	 top.MyApp._gfctPutButton('QuoCpyName', "top.MyApp.PS_RempliChamp('QuoCpyName')", '', true, '...');
	}
		 var vProf = top.MyApp.UserSetting.User.ProfileInitials
	 //var vListProfilMKT  = "CH_PRO;DIR_MKT;ASS_MKT;MAN_POLE;CH_MAR;ADMT;ADMF" ;
	 var vStatut = top.MyApp.GetItemValue("QuoExtStatOff");
	 //FTC: Activer les boutons
	//if( (vListProfilMKT.indexOf(vProf) >= -1) && top.MyApp.CurrentSetting.nChapMode == "Open" && vStatut == "04. NEGOCIE")
	/*{
	 var vSth = top.MyApp.FindItem("Sht30041611601156")
	 if(vSth) vSth.disabled = false;
	}
	else
	{
	 var vSth = top.MyApp.FindItem("Sht30041611601156")
	 if(vSth) vSth.disabled = true;
	}*/
	var vValidCQ = top.MyApp.FindItem("QuoExtValidationCQ",top.MyData_View);
	   if(vValidCQ) vValidCQ.disabled = true;
	//END FTC@MASAO MANTIS 14297
	 // SIR : Status CQ Update
	if(top.MyApp.CurrentSetting.nChapMode == "Open")  
	{
	
	 var QuoSQL = "select STATUTCQ  from sysadm.x_controle_qualite where DC0_NRID=:QuoNRID  and dmod = (select max(dmod) from sysadm.x_controle_qualite where DC0_NRID=:QuoNRID  and STATUTCQ is not null) ";
	 var strResultat =  top.MyApp._gfctExtReq(QuoSQL);
	 if (strResultat.length >0)
	 {
	   var ancienCQ =  top.MyApp.GetItemValue("QuoExtValidationCQ");
	   if (ancienCQ != strResultat )
	   {
	     top.MyApp._SetItemValue("QuoExtValidationCQ",strResultat);
	     top.MyApp.fraMenuBar.Execute("R_Save");
	
	   }
	  }
	}
		//DEBUT FTC@MASAO - MANTIS 14414 - 12/01/2018
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    var vHeureDemande = top.MyApp.FindItem("QuoExtHeureDemand", top.MyData_View);
	    top.MyApp.Custom_DemandeBtn = false;
	    if (vHeureDemande) {
	        vHeureDemande.onchange = function() {
	            var btnDemandePassage = top.MyApp.FindItem("Sht34598083433118", top.MyData_View);
	            if (btnDemandePassage) btnDemandePassage.disabled = true;
	        }
	    }
	}
	/*
	var btnDeposit = top.MyApp.FindItem("Sht34960578390608");
	if (top.MyApp.GetItemValue("QuoExtDateDemDeposit") != "") {
	    top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = 1;
	    top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "Mandatory");
	    if (btnDeposit) btnDeposit.disabled = true;
	} else {
	    top.MyApp.CurrentSetting.Catalog["QuoExtDetailsDem"].Mn = 0;
	    top.MyApp.SetItemAttribute("QuoExtDetailsDem", "className", "");
	    if (btnDeposit) btnDeposit.disabled = false;
	}
	*/
	//FIN FTC@MASAO - MANTIS 14414 - 12/01/2018
		if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	    var MyListing = top.MyApp.$("#Label38001993368156", top.MyApp.fraData_View.ifrView1.fraData.document);
	    MyListing.fadeTo(500, 0.3).fadeTo(500, 1).fadeTo(500, 0.3).fadeTo(500, 1).fadeTo(500, 0.3).fadeTo(500, 1).fadeTo(500, 0.3).fadeTo(500, 1).fadeTo(500, 0.3).fadeTo(500, 1).fadeTo(500, 0.3).fadeTo(500, 1);
	    var oDisplay = top.MyApp.FindItem("Label38001993368156");
	    if (oDisplay) {
	        oDisplay.innerHTML = "<a id='DsiplayPhoto' > Listing Marketing </a> ";
	        //top.MyApp.ModifyLayout(top.MyApp.fraData_View.ifrView2.fraData.document.getElementById("tblMain"),5,8,10,1,'<SPAN id=CpyMyComment style="font-size:smaller ;" name =comment Cn="8" DT="0"> Listing Marketing </SPAN>',false);
	        oDisplay.style = "cursor:pointer";
	        oDisplay.style.fontWeight = 'bold';
	        oDisplay.style.color = 'blue';
	        oDisplay.style.backgroundColor = 'white';
	        oDisplay.style.border = '10px';
	        oDisplay.style.textAlign = 'center';
	        oDisplay.style.textDecorationUnderline = true;
	        oDisplay.onclick = function() {
	            Appel_WDS_ListingMKT();
	            //alert('Your photo will be displayed');
	        }
	    }
	}
}