function PS_Cpy_OnBeforeInsert()
{
	 /*************************************************************/
	  // Société                                : MASAO
	  // Nom script                             : PS_Cpy_OnBeforeInsert
	  // Infos Paramètres                       : 
	  // Auteur                                 : CCO                                          
	  // Chapitre concerné                      : Fournisseur  
	  // Date de création                       : 29/05/2012
	  // Modifié par                            :                                             
	  // Date de modification                   :  
	  // Commentaires                           : RG
	  /*************************************************************/
		var vPays = top.MyApp.GetItemValue('CpyAddr1Country');
	var vSiret = top.MyApp.GetItemValue('CpyExtSiret');
	//var nConsigne = top.MyApp.GetItemValue('CpyExtConsigne');
	var vConsigne = top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtConsigne", "Val");
	console.log("Consigne selected:", vConsigne);
	
	if (vPays == 'FR- FRANCE' && (vSiret == '' || vSiret == null || vSiret == undefined)) {
	 top.MyApp.asyncOpenDlg("Alert", ["", "The filed Siret is mandatory. \n Thanks to complete before saving"]);
	 return false;
	}
	
	
	// Cpy - Contrôle de saisie champ "E-mail de cde"
	var email = top.MyApp.GetItemValue("CpyEmailAddress", top.MyData_View);
	var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,9}$/;
	
	
	if (email) {
	 if (!email.match(re)) {
	  //alert("Vérifiez l'E-mail de commande, s'il vous plait.");
	  top.MyApp.asyncOpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez l'E-mail de commande, s'il vous plait."]]);
	  return false;
	 } else {
	  //return true;
	 }
	}
	
	
	// HAS :Cpy - Contrôle de saisie champ "Num Tel"
	var re = /^\d+$/;
	var rex = /^[0-9A-Za-z\s\-]+$/;
	var telNbr = top.MyApp.GetItemValue("CpyPhoneNbr", top.MyData_View);
	if (telNbr) {
	 if (!telNbr.match(re)) {
	  top.MyApp.asyncOpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le numéro de telephone, s'il vous plait."]]);
	  return false;
	 } else {
	  //return true;
	 }
	}
	// HAS :Cpy - Contrôle de saisie champ "Mobile"
	var re = /^\d+$/;
	var rex = /^[0-9A-Za-z\s\-]+$/;
	var nMobile = top.MyApp.GetItemValue("CpyExtMobile", top.MyData_View);
	if (nMobile) {
	 if (!nMobile.match(re)) {
	  top.MyApp.asyncOpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le numéro de telephone, s'il vous plait."]]);
	  return false;
	 } else {
	  //return true;
	 }
	}
	// HAS : Cpy - Contrôle de saisie champ "site web"
	var website = top.MyApp.GetItemValue("CpyWebAddress", top.MyData_View);
	if (website) {
	 if (!website.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
	  top.MyApp.asyncOpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez la saisie du champ Web, s'il vous plait."]]);
	  return false;
	 }
	}
	// HAS :Cpy - Contrôle de saisie champ "TVA".
	/*
	var re1 = /^\d+$/;
	var TVA = top.MyApp.GetItemValue("CpyVatNbr");
	if (TVA)
	{
	 if (!TVA.match(re1))
	 {
	  top.MyApp.asyncOpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le numéro de TVA, s'il vous plait."]]);
	 return false;
	 }
	 else
	 {
	   //return true;
	 }
	}
	*/
	var vSQL = "select (select count(nrid) from sysadm.v_so0 where xsiret = '" + top.MyApp.GetItemValue("CpyExtSiret") + "' and xsiret != ''),(select count(nrid) from sysadm.x_frs_exclude where siret = '" + top.MyApp.GetItemValue("CpyExtSiret") + "' and siret != '')";
	var arrRes = top.MyApp._gfctExtReq(vSQL);
	
	
	var NbrFrs1 = arrRes[0][0];
	var NbrFrs2 = arrRes[0][1];
	
	
	//alert(NbrFrs1 + NbrFrs2);
	
	
	if (parseInt(NbrFrs1) + parseInt(NbrFrs2) > 0) {
	 top.MyApp.asyncOpenDlg("Alert", ["", top.MyApp.arrTranslations["Attention le siret existe deja"] + "\n" + top.MyApp.arrTranslations["Veuillez le modifier pour pourvoir enregistrer votre fiche."]]);
	 return false;
	}
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	 _oCurWnd = top.MyData_View;
	} else {
	 _oCurWnd = top.MyApp.wizardWindow;
	}
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vMyStatus = top.MyApp.GetItemValue("CpyExtValidSas", _oCurWnd);
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidSas", "blnModified")) {
	 top.MyApp.CustomSetting.CpyIsUpdatedStatus = true;
	 if (vMyStatus == "COMPLETE" || vMyStatus == "INCOMPLETE" || vMyStatus == "METTRE EN POUBELLE") {
	  if (vProf != "ADMT" && vProf != "ADMF") {
	   top.MyApp.asyncOpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vMyStatus + " » "]);
	   return false;
	  }
	 }
	}
	var ValidAdmin = top.MyApp.FindItem("CpyExtValidAdm");
	if (vProf == 'ADMF' || vProf == 'ADMT') {
	 if (ValidAdmin == 1) {
	  if (ValidAdmin) ValidAdmin.disabled = false;
	 }
	} else {
	 var ValidAdmin = top.MyApp.FindItem("CpyExtValidAdm");
	 if (ValidAdmin) ValidAdmin.disabled = true;
	}
	
	
	// HAS DEB : 23/02/2025 - add flag for autorised zone
	var vOwner = top.MyApp.GetItemValue("CpyOwner", top.MyData_View);
	var vCountry = top.MyApp.GetItemValue("CpyAddr1Country", top.MyData_View);
	
	//if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyOwner", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyAddr1Country", "blnModified")) {
	var vReturn = top.MyApp.ExecuteServerScript(42728053379348, [vOwner, vCountry]);
	
	//alert("call function param : " + vOwner + " , " + vCountry);
	//alert("Check GI Zone Export result : " + vReturn);
	
	if (vReturn == '0') {
	 top.MyApp.SetItemValue("CpyExtGi", 0);
	} else if (vReturn == '1') {
	 top.MyApp.SetItemValue("CpyExtGi", 1);
	}
	//}
	// HAS END : 23/02/2025 - add flag for autorised zone
	
	// HAS DEB : 02/11/2025 - set consigne default value
	if (vConsigne == '' || vConsigne == null || vConsigne == undefined) {
	 top.MyApp.SetItemValue("CpyExtConsigne", "SANS CONSIGNE");
	}
	// HAS END : 02/11/2025 - set consigne default value
		// PS_Cpy_OnBeforeInsert => DOUBLON
	
	var vCompany = top.MyApp.GetItemValue('CpyName');
	var vPhone = top.MyApp.GetItemValue('CpyPhoneNbr');
	var vMobile = top.MyApp.GetItemValue('CpyExtMobile');
	var vEmail = top.MyApp.GetItemValue('CpyEmailAddress');
	
	var WebFrn = "undefinedxxxxxxxxxxxxx";
	var AddrFrn = "undefinedxxxxxxxxxxxxxx";
	var SiretFrn = "undefinedxxxxxxxxxxxxxxxxxx";
	
	if (vPhone == '') {
	 vPhone = 'undefinedxxxxxxxxxxxxxxxx'
	}
	if (vMobile == '') {
	 vMobile = 'undefinedxxxxxxxxxxxxxxxxxx'
	}
	if (vEmail == '') {
	 vEmail = 'undefinedxxxxxxxxxxxxxxxxxx'
	}
	
	
	var vFormattedCompany = '%' + vCompany.toUpperCase()
	 .replace(/&/g, '%')
	 .replace(/LLC|llc/g, '%')
	 .replace(/Ltd|LTD/g, '%')
	 .replace(/Co\.|CO\./g, '%')
	 .replace(/Co,|CO,/g, '%')
	 .replace(/CO\.,/g, '%')
	 .replace(/SARL|sarl/g, '%')
	 .replace(/Inc\.|Inc,/g, '%')
	 .replace(/export\.|import\.|imp\.|exp\./g, '%')
	 .replace(/LIMITED/g, '%')
	 .replace(/\./g, '%')
	 .replace(/,/g, '%')
	 .replace(/\s/g, '%') + '%';
	
	try {
	
	 var dt = top.MyApp.ExecuteServerScript("41688058318854", [vFormattedCompany, vEmail, WebFrn, AddrFrn, vMobile, SiretFrn, vPhone, "search"]);
	
	
	 // Parse the HTML table
	 var parser = new DOMParser();
	 var doc = parser.parseFromString(dt, "text/html");
	 var tableRows = doc.querySelectorAll("#reAffectTable tr");
	
	 // Count data rows (exclude the header row)
	 var NbrDuplicates = tableRows.length - 1; // Subtract 1 to exclude the header row
	
	 // Check if duplicates exist
	 if (NbrDuplicates > 0) {
	      alert("j'ai trouve des doublons !!")
	  //top.MyApp.OpenDlg("Alert", ["Attention", "A company with similar details (name, phone, mobile, or email) already exists!"]);
	  /* var arrParams = []
	  arrParams[0] = top.MyApp
	  arrParams[1] = top.bWizard
	  top.MyApp.asyncOpenDlg('42121373460934', arrParams, top, undefined, undefined, undefined, undefined, function() {}); */
	  //////return false;
	
	  var arrParam = [];
	  arrParam[0] = top.MyApp
	  //arrParam[1] = top.bWizard
	  top.MyApp.asyncOpenDlg("42121373460934", arrParam, top, undefined, undefined, undefined, undefined, function() {
	   return top.MyApp.AppSetting.dlgReturn;
	  });
	      // important permet de stopper l'insert si on répond non au WDS
	    return top.MyApp.AppSetting.dlgReturn;
	 } else {
	      return true;
	   }
	 // important permet de stopper l'insert si on répond non au WDS
	 /////////////return top.MyApp.AppSetting.dlgReturn;
	
	} catch (e) {
	 console.error("Error executing server function: ", e);
	 //top.MyApp.OpenDlg("Alert", ["Error", "An error occurred while checking for duplicates."]);
	 //return false;
	}
	
		var vSiret = top.MyApp.GetItemValue('CpyExtSiret');
	var vPays = top.MyApp.GetItemValue('CpyAddr1Country');
	if (top.MyApp.CustomSetting.OutSrc == "1" && vSiret != '' && vSiret != null && vSiret != undefined) {
	    __PS_Cpy_SendExclude();
	}
	
		
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	if (vProf != 'SRC' && vProf != 'MNG_SRC' && vProf != 'LEAD_SRC') {
	 top.MyApp.SetItemValue("CpyExtFlagAffect", '1');
	}
	
	
	
	
	//MH 03.8.2015 Ajout popup alerte à la creation fiche fournisseur demande N°139
	if (vProf == 'SRC' || vProf == 'MNG_SRC' || vProf == 'LEAD_SRC') {
	 top.MyApp.asyncOpenDlg("Alert", ["Supplier creation", "Your supplier is corrtectly created."]);
	} else {
	 top.MyApp.asyncOpenDlg("Alert", [top.MyApp.arrTranslations["Fournisseur créé"], top.MyApp.arrTranslations["Merci de ne pas oublier de créer le contact et de demander la validation Back Office."]]);
	 top.MyApp.fraMenuBar.Execute("R_Consult");
	}
	return true;
	
	
	
	
	 
		// 04.02.2016 CBA #643
	
	
	
	
	/*
	var vFBook = top.MyApp.GetItemValue("CpyExtFBook",top.MyData_View);
	
	
	
	
	if(vFBook == '')
	{
	     top.MyApp.SetItemValue("CpyExtFBook","En attente");
	}else if(vFBook == 'Oui')
	{
	     top.MyApp.OpenDlg("Alert",["Confirmation " , top.MyApp.arrTranslations["Merci d’enregistrer l’autorisation du fournisseur dans « Documents fournisseur »."] , "YesNo"]) ;
	          if(!top.MyApp.AppSetting.dlgReturn[0])
	          {
	               top.MyApp.SetItemValue("CpyExtFBook","En attente");              
	          }
	
	
	
	
	}
	*/
		return true;
}