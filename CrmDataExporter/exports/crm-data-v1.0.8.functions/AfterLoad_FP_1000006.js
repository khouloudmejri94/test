function()
{
	//Auteur : Pierre-Louis EGAUD
	//Société : MASAO
	//Date de création : 10/09/2012
	//Description : Acn: Afterload de la page Général
		// SC delete: the following will be removed because we're not using cti
	/*if(top.MyApp.FindItem("AcnExtTelephoneBtn"))
	  {
	    top.MyApp.FindItem("AcnExtTelephoneBtn").onclick = function()
	    {
	      top.MyApp.CustomSetting.AcnExtIndicatif = top.MyApp.GetItemValue("AcnExtIndicatif", top.MyData_View);
	      top.MyApp.fraMenuBar.fctCtiAction('OpenDialOut', this); 
	    }
	  }*/
	
	
	// SC add: If AcnExtTelephoneBtn is found it should be invisible
	if (top.MyApp.FindItem("AcnExtTelephoneBtn")) {
	 top.MyApp.FindItem("AcnExtTelephoneBtn").disabled = true;
	}
	
	
	// SC hide: We're note working on the Risque scenario just yet
	top.MyApp.SetItem("AcnExtRisque", "parentElement.style.visibility", "hidden");
	/*//// #936 - Classement Risqué Litige - CBA 09.05.2017
	if (top.MyApp.CurrentSetting.nChapMode == "Reset") {
	 top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.display = 'none';
	} else {
	 if ((top.MyApp.GetItemValue("AcnCpyNRID") != "")) {
	  vSQL = "SELECT xclass_fourn FROM sysadm.so0 where nrid =" + top.MyApp.GetItemValue("AcnCpyNRID");
	  var arrRes = top.MyApp._gfctExtReq(vSQL);
	  
	  if (arrRes[0][0] == 'Risqué') {
	   top.CurrentSetting.Catalog.AcnExtRisque.Ed = 1;
	   if (top.MyApp.GetItemValue("AcnExtRisque") != 'RISQUE') {
	    top.MyApp.SetItemValue("AcnExtRisque", 'RISQUE');
	   }
	   top.CurrentSetting.Catalog.AcnExtRisque.Ed = 0;
	   top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.display = 'inline';
	   top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.color = 'white';
	   top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.backgroundColor = 'red';
	   top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.border = '0px';
	   top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.fontWeight = 'bold';
	   top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.textAlign = 'center';
	  } else {
	   top.MyApp.FindItem("AcnExtRisque", top.MyData_View).style.display = 'none';
	  }
	 }
	}*/
	//RLM 16.09.2014
	try {
	
	
	 if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	
	
	  //SC ADD:
	  var strProfileInitials = top.MyApp.UserSetting.User.ProfileInitials;
	  if (strProfileInitials != 'ADMT' && strProfileInitials != 'ADMF' && strProfileInitials != 'ADMFT' && top.MyApp.GetItemValue("AcnNature") == 'PROPO') {
	   top.MyApp.FindItem("AcnNature").disabled = true;
	  }
	  //SC end add
	  top.MyApp._gfctPutButtonGauche('AcnSubject', "top.MyApp._gfctAfficheInfos('" + top.MyApp.GetItemValue("AcnNRID") + "','hi0','sujet')", '', false, '?');
	  top.MyApp._gfctPutButtonGauche('AcnExtCommentaire', "top.MyApp._gfctAfficheInfos('" + top.MyApp.GetItemValue("AcnNRID") + "','hi0','xcommentaire')", '', false, '?');
	 }
	
	
	} catch (e) {
	 alert("AfterLoad_FP_1000006 " + e.message);
	}
	
	
	
	// HAS DEB 16/10/2020 ajouter bouton de seleteur d'affaire AR
	top.MyApp._gfctPutButton('AcnExtAffairAR', "top.MyApp.PS_RempliChamp('AcnExtAffairAR')", '', true, '...');
	// HAS DEB 16/10/2020 ajouter bouton de seleteur d'affaire AR
	
	
	// HAS DEB 16/10/2020 champ affaire replaced seulement accessible par le bouton de selecteur
	if (top.MyApp.FindItem("AcnExtAffairAR")) {
	 top.MyApp.FindItem("AcnExtAffairAR").disabled = true;
	 //top.MyApp.CurrentSetting.Catalog.AcnExtAffairAR.Ed = -1;
	}
	// HAS END 16/10/2020 champ affaire replaced seulement accessible par le bouton de selecteur
	
	
	// HAS DEB 16/10/2020 diable bouton mail
	/*if (top.MyApp.FindItem("Sht37721369463709")) {
	    if (strProfileInitials != 'ADMT' && top.MyApp.CustomSetting.Equipe != 'VIETNAMTEAM') {
	     top.MyApp.FindItem("Sht37721369463709").disabled = true;
	    }
	}*/
	
	
	
	// HAS DEB 21/01/2021 diable champ téléphone frs
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 if (top.MyApp.FindItem("AcnExtTelephone")) {
	  top.MyApp.FindItem("AcnExtTelephone").disabled = true;
	 }
	 if (top.MyApp.FindItem("AcnExtTelContact")) {
	  top.MyApp.FindItem("AcnExtTelContact").disabled = true;
	 }
	}
	// HAS END 16/10/2020 diable bouton mail
	
	
	
	// HAS DEB 29/09/2020 : Remplir le champ Téléphone du contact chargé contact
	/* if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 var vContact = top.MyApp.GetItemValue("AcnPerName");
	 if (vContact != '' && vContact != null && vContact != undefined) {
	
	
	  var vPerson = top.MyApp.GetItemValue("AcnPerName");
	  var vCpyNrid = top.MyApp.GetItemValue("AcnCpyNRID");
	  var strSQLRes = "select mobile_phone, sp0.e_mail, so0.tel1 from sysadm.sp0, sysadm.so0 where so0.nrid = sp0.so0_nrid and personne = '" + vPerson.replace(/'/g, "''") + "' and so0_nrid = '" + vCpyNrid + "' ";
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	  var nTelContact = arrRes[0][0];
	  var vEmailContact = arrRes[0][1];
	  var nTesFrs = arrRes[0][2];
	  if (!isNaN(nTelContact)) {
	   top.MyApp.SetItemValue("AcnExtTelContact", nTelContact);
	  }
	  if (!isNaN(nTesFrs)) {
	   top.MyApp.SetItemValue("AcnExtTelephone", nTesFrs);
	  }
	  top.MyApp.SetItemValue("AcnExtMailContact", vEmailContact);
	 }
	} */
	// HAS END 29/09/2020 : Remplir le champ Téléphone du contact chargé contact
	
	
	
	// HAS DEB 29/09/2020 : Remplir le champ Téléphone du contact chargé contact
	var strStatus = top.MyApp.GetItemValue("AcnStatus");
	var vUserName = top.MyApp.UserSetting.User.Name;
	
	/**/
	
	if (vUserName != 'SIM Integration') {
	 if (top.MyApp.CurrentSetting.nChapMode != "Reset" && top.MyApp.CurrentSetting.nChapMode != "New") {
	  if (strStatus == 'A FAIRE') {
	   var vContact = top.MyApp.GetItemValue("AcnPerName");
	   var vPerson = top.MyApp.GetItemValue("AcnPerName");
	   var vCpyNrid = top.MyApp.GetItemValue("AcnCpyNRID");
	   var strSQLRes = "select mobile_phone, sp0.e_mail, so0.tel1, so0.prefixe_int, sp0.tel from sysadm.so0 left join sysadm.sp0 on so0.nrid = sp0.so0_nrid and personne = '" + vPerson.replace(/'/g, "''") + "' where so0.nrid = '" + vCpyNrid + "' ";
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   var nTelContact = arrRes[0][0];
	   var vEmailContact = arrRes[0][1];
	   var nTelFrs = arrRes[0][2];
	   var nIndFrs = arrRes[0][3];
	            var nFixContact = arrRes[0][4];
	   if (vContact != '' && vContact != null && vContact != undefined) {
	    if (top.MyApp.GetItemValue("AcnExtTelContact") != nTelContact) {
	     if (!isNaN(nTelContact)) {
	      top.MyApp.SetItemValue("AcnExtTelContact", nTelContact);
	      var Madate = new Date();
	      var DateDeb = top.MyApp.fctFormatDate(Madate, top.MyApp.SYSTEM_DATE, top.MyApp.USER_DATE, "DATE");
	      //top.MyApp.SetItemValue("AcnStartDate", new Date());
	      top.MyApp.fraMenuBar.Execute("R_Save");
	     }
	    }
	                if (top.MyApp.GetItemValue("AcnExtTelFixContact") != nFixContact) {
	     if (!isNaN(nFixContact)) {
	      top.MyApp.SetItemValue("AcnExtTelFixContact", nFixContact);
	      var Madate = new Date();
	      var DateDeb = top.MyApp.fctFormatDate(Madate, top.MyApp.SYSTEM_DATE, top.MyApp.USER_DATE, "DATEk");
	      //top.MyApp.SetItemValue("AcnStartDate", new Date());
	      top.MyApp.fraMenuBar.Execute("R_Save");
	     }
	    }
	   }
	   if ((top.MyApp.GetItemValue("AcnExtIndicatif") != nIndFrs) || (top.MyApp.GetItemValue("AcnExtTelephone") != nTelFrs)) {
	    if (!isNaN(nIndFrs)) {
	     top.MyApp.SetItemValue("AcnExtIndicatif", nIndFrs);
	    }
	    if (!isNaN(nTelFrs)) {
	     top.MyApp.SetItemValue("AcnExtTelephone", nTelFrs);
	    }
	    var Madate = new Date();
	    var DateDeb = top.MyApp.fctFormatDate(Madate, top.MyApp.SYSTEM_DATE, top.MyApp.USER_DATE, "DATE");
	    //top.MyApp.SetItemValue("AcnStartDate", new Date());
	    top.MyApp.fraMenuBar.Execute("R_Save");
	   }
	   top.MyApp.SetItemValue("AcnExtMailContact", vEmailContact);
	  }
	 }
	}
	
	// HAS END 29/09/2020 : Remplir le champ Téléphone du contact chargé contact
		if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	 // HAS DEB : 29/09/2020 - descriptif du lot obligatoire si LOT detected
	 //PS_Acn_Type_AddEvent();
	 var typeHnd = top.MyApp.FindItem("AcnType", top.MyData_View);
	 if (typeHnd) {
	  top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Acn_Type_AddEvent);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Acn_Type_AddEvent);
	 }
	 // HAS DEB : 29/09/2020 - descriptif du lot obligatoire si LOT detected 
	
	 // HAS DEB : 29/09/2020 - 29/09/2020 - Replaced affair obligatoire si type action REMPLACE 
	 //PS_Acn_Status_AddEvent();
	 var typeHnd = top.MyApp.FindItem("AcnNature", top.MyData_View);
	 if (typeHnd) {
	  top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Acn_Status_AddEvent);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Acn_Status_AddEvent);
	 }
	 // HAS DEB : 29/09/2020 - 29/09/2020 - Replaced affair obligatoire si type action REMPLACE 
	
	 // HAS DEB : 29/09/2020 - charger le numéro de téléphone du contact séléctionné.
	 var typeHnd = top.MyApp.FindItem("AcnPerName", top.MyData_View);
	 if (typeHnd) {
	  top.MyApp.fctRemoveEvent(typeHnd, "change", PS_Acn_Status_AddEvent);
	  top.MyApp.fctAddEvent(typeHnd, "change", PS_Acn_Status_AddEvent);
	 }
	 // HAS DEB : 29/09/2020 - charger le numéro de téléphone du contact séléctionné.
	}
		//[D]Communik PROD
	try {
	  var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	  var vInitials = top.MyApp.UserSetting.User.Initials;
	  var vUserName = top.MyApp.UserSetting.User.Name;
	
	
	  var vItemLblCnKM = top.MyApp.FindItem("Label37229487709614");
	  var vItemLblCnKF = top.MyApp.FindItem("Label38960189168150");
	
	
	  var vItemTel = top.MyApp.GetItemValue("AcnExtTelContact");
	  var vTeam = top.MyApp.CustomSetting.Equipe;
	  var strStatus = top.MyApp.GetItemValue("AcnStatus", top.MyData_View);
	
	
	  var vListTeamValid = "NESTINGAMEAFRIQUE;NESTINGAMEMIDDLEEAST-EGYPTE;PROSALIMENTAIRETUNISIE;NEGALIMENTAIRETUNISIE;NEGISS;NESTINGPOUFSOUFFLES1;LESSERPENTARDS1;LESGRYFFONDORS1;LESGRYFFONDORS2;NESTINGGRYFFONDORS1;NESTINGE-COMMERCE;NESTINGE-COMMERCE2;NESTINGSERDAIGLES;NESTINGMARSEILLE;LESPOUFSOUFFLES2;LESSERDAIGLES2;HISPAMTEAM;PROSZAD1;PROSZAD2;PROSZAD3;PROSZAD4;PROSZAD5;PROSZAD6;TAIWANTEAM;FULLIDLE;NEGADTTUNISIE;NEGBRICOLAGEJARDINANIMALERIETUNISIE;NEGCHAUSSURETUNISIE;NEGCONFLINGERIECHOSSETTETUNISIE;NEGDPHTUNISIE;NEGEGPPEMTUNISIE;NEGFULLIDLE;NEGJOUETTUNISIE;NEGLMTUNISIE;NEGMAROACCESSTUNISIE;NEGMEUBLEDECOTUNISIE;NEGPAPETERIETUNISIE;NEGPUERICULTURETUNISIE;NEGSPORTTUNISIE;NEGTUNISIEMARSEILLE;PROSADTTUNISIE;PROSBRICOLAGEJARDINANIMALERIETUNISIE;PROSCHAUSSURETUNISIE;PROSCONFLINGERIECHAUSSETTESTUNISIE;PROSDPHTUNISIE;PROSEGPEPMTUNISIE;PROSFULLIDLE;PROSJOUETTUNISIE;PROSLMTUNISIE;PROSMAROACCESSTUNISIE;PROSMEUBLEDECOTUNISIE;PROSPAPETERIETUNISIE;PROSPEPINIERETUNISIE;PROSPUERICULTURETUNISIE;PROSSPORTTUNISIE;PROSTUNISIEMARSEILLE;NEGMARSEILLE;PROSMARSEILLE;PROSE-COMMERCE2;PROSE-COMMERCE;NEGE-COMMERCE;PROSTUNISIE;NEGTUNISIE";
	    //if ((vProfiluser == 'ADMT' || vProfiluser == 'ADMF' || vProfiluser == 'ACH_TER' || vProfiluser == 'MAN_HA_TER' || vProfiluser == 'ASS_CO' || vProfiluser == 'MAN_HA_ASS') && vItemTel != '') {
	  if (strStatus == 'A FAIRE' && (vProfiluser == 'ADMT' || vListTeamValid.indexOf(vTeam) != -1) && vItemTel != '' && vItemTel != null && vItemTel != undefined) {
	    var vValidScr = true;
	  }
	  if (vItemLblCnKM) {
	    vItemLblCnKM.innerHTML = "<a id='Label37229487709614' ><img src='../../UICache/DynaScreen/" + top.MyApp.DBName + "/Img/Cpy/icon-tel-1_2.png' height=20 width=20></div><div style='text-align:center;' width=20 height=20></a> ";
	    if (vValidScr == true) {
	      vItemLblCnKM.onclick = function () {
	        var vArgTel = "Per";
	        PS_Acn_AppelComunik(vArgTel);
	        //alert('je suis ' + vInitials);
	      }
	    }
	  }
	
	
	  if (vItemLblCnKF) {
	    vItemLblCnKF.innerHTML = "<a id='Label38960189168150' ><img src='../../UICache/DynaScreen/" + top.MyApp.DBName + "/Img/Cpy/icon-tel-1_2.png' height=20 width=20></div><div style='text-align:center;' width=20 height=20></a> ";
	    if (vValidScr == true) {
	      vItemLblCnKF.onclick = function () {
	        var vArgTel = "Fix";
	        PS_Acn_AppelComunik(vArgTel);
	        //alert('je suis ' + vInitials);
	      }
	    }
	  }
	} catch (e) {
	 alert("AfterLoad Général Acn - Per Communik : " + e.message);
	}
	//[F]Communik PROD
	
	
	 
	
	
		//[D]Communik
	try {
	 var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	 var vInitials = top.MyApp.UserSetting.User.Initials;
	 var vUserName = top.MyApp.UserSetting.User.Name;
	 var vItemLblCnK = top.MyApp.FindItem("Label37239487709614");
	 var vItemTel = top.MyApp.GetItemValue("AcnExtTelephone");
	 var vTeam = top.MyApp.CustomSetting.Equipe;
	 var strStatus = top.MyApp.GetItemValue("AcnStatus");
	 var vListTeamValid = "NESTINGAMEAFRIQUE;NESTINGAMEMIDDLEEAST-EGYPTE;PROSALIMENTAIRETUNISIE;NEGALIMENTAIRETUNISIE;NEGISS;NESTINGPOUFSOUFFLES1;LESSERPENTARDS1;LESGRYFFONDORS1;LESGRYFFONDORS2;ARENATEAM;NESTINGGRYFFONDORS1;NESTINGE-COMMERCE;NESTINGE-COMMERCE2;NESTINGSERDAIGLES;NESTINGMARSEILLE;LESPOUFSOUFFLES2;LESSERDAIGLES2;HISPAMTEAM;PROSZAD1;PROSZAD2;PROSZAD3;PROSZAD4;PROSZAD5;PROSZAD6;TAIWANTEAM;FULLIDLE;NEGADTTUNISIE;NEGBRICOLAGEJARDINANIMALERIETUNISIE;NEGCHAUSSURETUNISIE;NEGCONFLINGERIECHOSSETTETUNISIE;NEGDPHTUNISIE;NEGEGPPEMTUNISIE;NEGFULLIDLE;NEGJOUETTUNISIE;NEGLMTUNISIE;NEGMAROACCESSTUNISIE;NEGMEUBLEDECOTUNISIE;NEGPAPETERIETUNISIE;NEGPUERICULTURETUNISIE;NEGSPORTTUNISIE;NEGTUNISIEMARSEILLE;PROSADTTUNISIE;PROSBRICOLAGEJARDINANIMALERIETUNISIE;PROSCHAUSSURETUNISIE;PROSCONFLINGERIECHAUSSETTESTUNISIE;PROSDPHTUNISIE;PROSEGPEPMTUNISIE;PROSFULLIDLE;PROSJOUETTUNISIE;PROSLMTUNISIE;PROSMAROACCESSTUNISIE;PROSMEUBLEDECOTUNISIE;PROSPAPETERIETUNISIE;PROSPEPINIERETUNISIE;PROSPUERICULTURETUNISIE;PROSSPORTTUNISIE;PROSTUNISIEMARSEILLE;NEGMARSEILLE;PROSMARSEILLE;PROSE-COMMERCE;NEGE-COMMERCE;PROSTUNISIE;NEGTUNISIE";
	
	
	 //if ((vProfiluser == 'ADMT' || vProfiluser == 'ADMF' || vProfiluser == 'ACH_TER' || vProfiluser == 'MAN_HA_TER' || vProfiluser == 'ASS_CO' || vProfiluser == 'MAN_HA_ASS') && vItemTel != '') {
	 if (vItemLblCnK) {
	  vItemLblCnK.innerHTML = "<a id='Label37239487709614' ><img src='../../UICache/DynaScreen/" + top.MyApp.DBName + "/Img/Cpy/icon-tel-1_2.png' height=20 width=20></div><div style='text-align:center;' width=20 height=20></a> ";
	  if (strStatus == 'A FAIRE' && (vProfiluser == 'ADMT' || vListTeamValid.indexOf(vTeam) != -1) && vItemTel != '' && vItemTel != null && vItemTel != undefined) {
	   vItemLblCnK.onclick = function () {
	    var vArgTel = "Cpy";
	    PS_Acn_AppelComunik(vArgTel);
	    //alert('je suis ' + vInitials);
	   }
	  }
	  //onclick='top.MyApp.PS_Cpy_AppelComunik();'
	 }
	 /*} else {
	     if (vItemLblCnK) {
	         vItemLblCnK.innerHTML = "";
	     }
	 }*/
	} catch (e) {
	 alert("AfterLoad Général Acn - Communik : " + e.message);
	}
	//[F]Communik
	
	
	
		//RLM 16.09.2014
	try{
	
	  if(top.MyApp.CurrentSetting.nChapMode == "Open"){
	     top.MyApp._gfctPutButtonGauche('AcnSubject', "top.MyApp._gfctAfficheInfos('"+top.MyApp.GetItemValue("AcnNRID")+"','hi0','sujet')", '', false, '?');
	     top.MyApp._gfctPutButtonGauche('AcnExtCommentaire', "top.MyApp._gfctAfficheInfos('"+top.MyApp.GetItemValue("AcnNRID")+"','hi0','xcommentaire')", '', false, '?');
	  }
	
	}catch(e){
	     alert(e.message);
	}
		top.MyApp._gfctPutButton('AcnExtConsigne', "top.MyApp.PS_RempliChamp('AcnExtConsigne')", '', false, '...');
		function() {
	    var resultat = top.MyApp.GetItemValue("AcnType") || "";
	    var status   = top.MyApp.GetItemValue("AcnStatus") || "";
	    if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	        if (status == "FAIT" && resultat == "LOT DETECTE") {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "NM");
	            top.MyApp.SetItemValue("AcnExtReplaceAff", "1");
	        } else {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "UM");
	            top.MyApp.SetItemValue("AcnExtReplaceAff", "0");
	        }
	    }
	}
	updateReplaceField();
	var statusField = top.MyApp.FindItem("AcnStatus");
	if (statusField) {
	    statusField.onchange = updateReplaceField;
	}
	var typeField = top.MyApp.FindItem("AcnType");
	if (typeField) {
	    typeField.onchange = updateReplaceField;
	}
	var replaceField = top.MyApp.FindItem("AcnExtReplaceAff");
	if (replaceField) {
	    replaceField.onchange = function() {
	        var replaceValue = top.MyApp.GetItemValue("AcnExtReplaceAff");
	        
	        if (replaceValue == "1" || replaceValue == 1 || replaceValue === true) {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "NM");
	        } else {
	            top.MyApp._gfctSetClassName("AcnExtAffairAR", "UM");
	        }
	    };
	}
}