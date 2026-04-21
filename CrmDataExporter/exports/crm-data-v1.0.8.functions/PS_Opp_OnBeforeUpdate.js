function()
{
	try {
	 //commentaire
	 var _oCurWnd;
	 if (!top.MyApp.wizardWindow) {
	  _oCurWnd = top.MyData_View;
	 } else {
	  _oCurWnd = top.MyApp.wizardWindow;
	 }
	 var vUserProfile = top.MyApp.UserSetting.User.ProfileInitials;
	 // DEBUT HAS : Si echatillon oui alors num tracking obligatoire
	 var echantillon = top.MyApp.GetItemValue("OppExtEchantillonRepresentatif");
	 var tracking = top.MyApp.GetItemValue("OppExtNumTrack");
	 if (echantillon == 'Oui' && (tracking == null || tracking == undefined || tracking == '')) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Merci de renseigner le Numéro de Tracking."]]);
	  return false;
	 }
	 // END HAS
	
	
	
	
	
	 // Gestion des acces concurrentsy
	 //PS_All_Acces_Concurrent('Opp');
	
	
	
	
	
	 if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppStatus", "blnModified")) {
	  top.MyApp.CustomSetting.OppIsUpdatedStatus = true
	  var vMyStatus = top.MyApp.GetItemValue("OppStatus", _oCurWnd);
	  // DEBUT MASAO@FNA - 15/12/2017 - Mantis #14184 - [Affaire] - RG7 : Statut = 05-DEPOSE
	  //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	  if (vMyStatus.substr(0, 2) == "05" || vMyStatus.substr(0, 2) == "07" || vMyStatus.substr(0, 2) == "06") {
	   //FIN FTC@MASAO - MANTIS 14219 -
	   var vListProfilsValides = "ADMT;ADMF;ACH_TER;ASS_ACH;MAN_HA_TER";
	   var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF;MNG_ACH_OPR";
	   if (vListProfilsValides.indexOf(vUserProfile) == -1 && vProfNeg.indexOf(vUserProfile) == -1) {
	    top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vMyStatus + " » "]);
	    return false;
	   }
	   //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	   /*
	   if (vMyStatus.substr(0, 2) == "05" && !(Boolean(top.MyApp.Custom_DeposerDossBtn))) {
	   //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	   top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0003"]]);
	   return false;
	   }*/
	   top.MyApp.Custom_DeposerDossBtn = false;
	
	
	
	
	   // HAS : Quo - Contrôle de saisie champ "site web"
	   /*
	   var vWebsite = top.MyApp.GetItemValue("OppExtwebsiteGi");
	   
	   if (vWebsite){
	   
	    if (!vWebsite.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
	   
	    //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Merci de vérifier le site web"]]);
	    top.MyApp.OpenDlg("Alert", ["Attention", "Please verify the website"]);
	    return false;
	    }  
	   }
	   */
	  }
	  // FIN MASAO@FNA - 15/12/2017 - Mantis #14184 
	  //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	  // DEBUT MASAO@FNA - 18/12/2017 - Mantis #14201 - [Affaire] - RG10 : Statut= 03-DMD.VALID MNG PROSP
	  // DEBUT MASAO@FNA - 19/12/2017 - Mantis #14202 - [Affaire] - RG11 : Statut=06-DMD.VALID MNG ACH
	  if (vMyStatus.substr(0, 2) == "02" || vMyStatus.substr(0, 2) == "03" || vMyStatus.substr(0, 2) == "04" || vMyStatus.substr(0, 2) == "05" || vMyStatus.substr(0, 2) == "06" || vMyStatus.substr(0, 2) == "07") {
	   var famille = top.MyApp.GetItemValue("OppExtFamille");
	
	
	
	
	   if (famille == null || famille == undefined || famille == '') {
	    top.MyApp.OpenDlg("Alert", ["Attention", "Product range missing"]);
	    return false;
	   }
	  }
	  if (vMyStatus.substr(0, 2) == "03" || vMyStatus.substr(0, 2) == "04" || vMyStatus.substr(0, 2) == "05" || vMyStatus.substr(0, 2) == "06") {
	   // FIN MASAO@FNA - 19/12/2017 - Mantis #14202 
	   //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	   var vSQL = "select count(*) from sysadm.xda11 where do0_nrid='" + top.MyApp.GetItemValue("OppNRID") + "'";
	   var vSQL2 = "select [OppStatus] from sysadm.do0 where nrid='" + top.MyApp.GetItemValue("OppNRID") + "'";
	   var arrRes = top.MyApp._gfctExtReq(vSQL);
	   var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	   if (arrRes[0][0] == 0) {
	    //top.MyApp.OpenDlg("Alert", ["", "Vous n'êtes pas autorisé à passer au statut « " + vMyStatus + " » sans l'alimentation du listing achat "]);
	    var msgStatus = top.MyApp.arrTranslations["MSG_OPPSTATUS_0005"];
	    top.MyApp.SetItemValue("OppStatus", arrRes2[0][0]);
	    top.MyApp.OpenDlg("Alert", ["", msgStatus]);
	    top.MyApp.fraMenuBar.Execute("T_Refresh");
	
	
	
	
	    return false;
	   }
	  }
	
	
	
	
	  // FIN MASAO@FNA - 18/12/2017 - Mantis #14201
	  // DEBUT MASAO@FNA - 14/12/2017 - Mantis #14179 - [Affaire] - RG5 Statut = "03. VALID. TERRAIN"
	  /*
	  if (vMyStatus == "03. VALID. TERRAIN") {
	  var vProf = top.MyApp.UserSetting.User.ProfileInitials
	  //Ajout ACO VEO demande de NG 10.03.2014
	  if (vProf != "ACH_TER" && vProf != "ASS_ACH" && vProf != "GRP_ACH" && vProf != 'ADMf' && vProf != 'ADMT' && vProf != 'ASS_CO_VEO') {
	  top.MyApp.OpenDlg("Alert", ["", "Vous n'êtes pas autorisé à passer au statut « " + vMyStatus + " » "]);
	  return false;
	  }
	  }
	  */
	  // FIN MASAO@FNA - 14/12/2017 - Mantis #14179
	  // DEBUT MASAO@FNA - 14/12/2017 - Mantis #14182 - [Affaire] - RG3 : Statut = 02-NON SUIVI
	  if (vMyStatus.substr(0, 2) == "02") {
	   if (Boolean(top.MyApp.Custom_NonSuiviBtn)) {
	    var vRaisonNS = top.MyApp.GetItemValue("OppExtRaisonNS");
	    var vCommNS = top.MyApp.GetItemValue("OppExtRaisonComNS");
	    var existe_raisonNS = (vRaisonNS != null && vRaisonNS != "" && vRaisonNS != undefined) ? true : false;
	    var existe_commNS = (vCommNS != null && vCommNS != "" && vCommNS != undefined) ? true : false;
	    if (!existe_raisonNS || !existe_commNS) {
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0002"]]);
	     return false;
	    }
	   } else {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0001"]]);
	    return false;
	   }
	   top.MyApp.Custom_NonSuiviBtn = false;
	  }
	  // FIN MASAO@FNA - 14/12/2017 - Mantis #14182
	  // DEBUT MASAO@FNA - 18/12/2017 - Mantis #14214 - [Affaire] - RG4 : Bouton="Demande de validation"
	  if (vMyStatus.substr(0, 2) == "03" || vMyStatus.substr(0, 2) == "06") {
	   if (!(Boolean(top.MyApp.Custom_DemandeValidationBtn)) && (vUserProfile != "ADMT" && vUserProfile != "ADMF")) {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0010"]]);
	    return false;
	
	
	
	
	   }
	  }
	  top.MyApp.Custom_DemandeValidationBtn = false;
	  // FIN MASAO@FNA - 18/12/2017 - Mantis #14214
	  // DEBUT MASAO@FNA - 19/12/2017 - Mantis #14183 - [Affaire] - RG6 : Statut=04-COMPLET
	  if (vMyStatus.substr(0, 2) == "04" || vMyStatus.substr(0, 2) == "07") {
	   if (!(Boolean(top.MyApp.Custom_ValidationBtn)) && (vUserProfile != "ADMT" && vUserProfile != "ADMF")) {
	    //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0012"]]);
	    //return false;
	   }
	  }
	  top.MyApp.Custom_ValidationBtn = false;
	  // FIN MASAO@FNA - 19/12/2017 - Mantis #14183 
	  // DEBUT MASAO@FNA - 15/12/2017 - Mantis #14185 - [Affaire] - RG8 : Statut = 08-SANS SUITE
	  if (vMyStatus.substr(0, 2) == "08") {
	   var vListProfilsValides = "ADMT;ADMF";
	   if (vListProfilsValides.indexOf(vUserProfile) == -1) {
	    var msgStatus = top.MyApp.arrTranslations["MSG_OPPSTATUS_0004"].replace("[STATUS]", vMyStatus);
	    top.MyApp.OpenDlg("Alert", ["", msgStatus]);
	    return false;
	
	
	
	
	   }
	  }
	  // FIN MASAO@FNA - 15/12/2017 - Mantis #14185
	  // DEBUT MASAO@FNA - 18/12/2017 - Mantis #14203 - [Affaire] - RG12 : Statut=09-INCOMPLET PROSP
	  if ((vMyStatus.substr(0, 2) == "09" || vMyStatus.substr(0, 2) == "10") && !(Boolean(top.MyApp.Custom_IncompletBtn)) && (vUserProfile != "ADMT" && vUserProfile != "ADMF" && vUserProfile != "MAN_HA_TER" && vUserProfile != "MAN_HA_ASS")) {
	   top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0006"]]);
	   return false;
	  }
	  top.MyApp.Custom_IncompletBtn = false;
	  // FIN MASAO@FNA - 18/12/2017 - Mantis #14203 
	 }
	 var arrChampOblig = [];
	 var strIsOblig = "";
	 var vStatut = top.MyApp.GetItemValue("OppStatus", _oCurWnd);
	 /*
	 //DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	 if (vStatut.substr(0, 2) == "05") {
	 //FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	 var arrMandatory = [];
	 if (top.MyApp.GetItemValue("OppExtNoteAff", _oCurWnd) == "") arrMandatory.push("Note ");
	 if (top.MyApp.GetItemValue("OppExtObjAct", _oCurWnd) == "") arrMandatory.push("Objet Action");
	 if (top.MyApp.GetItemValue("OppComment", _oCurWnd) == "") arrMandatory.push("Desc. du lot ");
	 if (arrMandatory.length > 0) {
	 vMsg = top.MyApp.arrTranslations["Merci de renseigner Le(s) champ(s) suivant(s) :"]+"\n" + arrMandatory.join("\n");
	 top.MyApp.OpenDlg("Alert", ["Message", vMsg]);
	 return false;
	 }
	 }
	 */
	 //DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	 if (vStatut.substr(0, 2) == "04") {
	  //FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	  //OppExtSiOui si OppExtConcLot = "Oui"
	  var vOppExtConcLot = top.MyApp.GetItemValue("OppExtConcLot", _oCurWnd);
	  var vOppExtSiOui = top.MyApp.GetItemValue("OppExtSiOui", _oCurWnd);
	  if (vOppExtConcLot == "Oui" && (vOppExtSiOui == '' || vOppExtSiOui == undefined)) {
	   strIsOblig += "OppExtSiOui;"
	  }
	  //OppExtRaisUrg si OppExtUrg = "Urgent"
	  var vOppExtUrg = top.MyApp.GetItemValue("OppExtUrg", _oCurWnd);
	  var vOppExtRaisUrg = top.MyApp.GetItemValue("OppExtRaisUrg", _oCurWnd);
	  if (vOppExtUrg == "Urgent" && (vOppExtRaisUrg == '' || vOppExtRaisUrg == undefined)) {
	   strIsOblig += "OppExtRaisUrg;"
	  }
	  //OppExtRaisUrg si OppExtUrg = "Urgent"
	  var vOppExtDateEcheance = top.MyApp.GetItemValue("OppExtDateEcheance", _oCurWnd);
	  if (vOppExtUrg == "Urgent" && (vOppExtDateEcheance == '' || vOppExtDateEcheance == undefined)) {
	   strIsOblig += "OppExtDateEcheance;"
	  }
	  //OppExtRaisInterd si OppExtMagasinsinterdits = "Oui"
	  var vOppExtMagasinsinterdits = top.MyApp.GetItemValue("OppExtMagasinsinterdits", _oCurWnd);
	  var vOppExtRaisInterd = top.MyApp.GetItemValue("OppExtRaisInterd", _oCurWnd);
	  if (vOppExtMagasinsinterdits == "Oui" && (vOppExtRaisInterd == '' || vOppExtRaisInterd == undefined)) {
	   strIsOblig += "OppExtRaisInterd;"
	  }
	  //OppExtCommQu si OppExtInfoMarkt non vide
	  var vOppExtInfoMarkt = top.MyApp.GetItemValue("OppExtInfoMarkt", _oCurWnd);
	  var vOppExtCommQu = top.MyApp.GetItemValue("OppExtCommQu", _oCurWnd);
	  if ((vOppExtInfoMarkt != "" && vOppExtInfoMarkt != undefined) && (vOppExtCommQu == '' || vOppExtCommQu == undefined)) {
	   strIsOblig += "OppExtCommQu;"
	  }
	  //OppExtPalettes si OppExtPrdtsdejaplttses = "Oui"
	  var vOppExtPrdtsdejaplttses = top.MyApp.GetItemValue("OppExtPrdtsdejaplttses", _oCurWnd);
	  var vOppExtPalettes = top.MyApp.GetItemValue("OppExtPalettes", _oCurWnd);
	  if (vOppExtPrdtsdejaplttses == "Oui" && (vOppExtPalettes == '' || vOppExtPalettes == undefined)) {
	   strIsOblig += "OppExtPalettes;"
	  }
	  strIsOblig = strIsOblig.slice(0, -1);
	  if (strIsOblig != "") arrChampOblig = strIsOblig.split(";");
	  if (arrChampOblig.length > 0) {
	   var MyResult = top.MyApp.OpenDlg("Mandatory", [arrChampOblig, top.MyApp.arrTranslations["My Mandatory dialog"], true]);
	   if (!MyResult) return false;
	   for (var i in top.MyApp.AppSetting.dlgReturn) {
	    top.MyApp.SetItemValue(i, top.MyApp.AppSetting.dlgReturn[i], _oCurWnd);
	   }
	   return true;
	  }
	 }
	 //[Date depot]
	 //RLM - 19/08/2013 Mod : 24.10.2014
	 var dteDatOffre = top.MyApp.GetItemValue("OppExtDatOffre", _oCurWnd);
	 var strStatus = top.MyApp.GetItemValue("OppStatus", _oCurWnd);
	 var dteNow = new Date();
	 //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	 if ((dteDatOffre == null || dteDatOffre == "") && (strStatus.substr(0, 2) == "05" || strStatus.substr(0, 2) == "07")) {
	  //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	  top.MyApp.SetItemValue("OppExtDatOffre", dteNow, _oCurWnd);
	 }
	 //[/Date depot]
	 //[Sans suite]
	 var vStatut = top.MyApp.GetItemValue("OppStatus", _oCurWnd);
	 var vRaison = top.MyApp.GetItemValue("OppExtRaisonSS", _oCurWnd);
	 var vRaisonCom = top.MyApp.GetItemValue("OppExtRaisonSSCom", _oCurWnd);
	 //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	 if (vStatut.substr(0, 2) == "06" && vRaison == "9 - Autres" && vRaisonCom == "") {
	  //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Le champ commentaire Sans Suite est obligatoire lors du choix '9 - Autres'"]]);
	  return false;
	 }
	 //[/Sans suite]
	 /*[D]Grand Import*/
	 /*
	 try {
	 var strSQLRes = "select COUNT(*) as nbLigne from sysadm.am0 where titulaire = '" + top.MyApp.GetItemValue("OppExtAcheteur") + "' and team_name = 'GI'"
	 var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	 //DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	 if (arrRes == 1 && top.MyApp.GetItemValue('OppExtMailGI') == 0 && top.MyApp.GetItemValue('OppStatus').substr(0, 2) == '04') {
	 //FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	 var vAcheteur = top.MyApp.GetItemValue('OppExtAcheteur');
	 var vSQL = "select e_mail from sysadm.am0 where titulaire = ('" + vAcheteur + "')";
	 //[D] GI Zone 
	 var vSQL2 = "select xGI_Zone from sysadm.am0 where titulaire = ('" + vAcheteur + "')";
	 var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	 //[F] GI Zone             
	 var arrRes = top.MyApp._gfctExtReq(vSQL);
	 var vEmail = arrRes.join(";");
	 vEmail += ";buyworld@ozeol.com;mhamadaine@ra-expansion.fr"; //MH 21092016 - Ajout de mon mail pour check envoi PB signalé par Ingrid; MH 01062017 ajout adresse buyworld
	 if (arrRes.length >= 1) {
	 var arrParam = []
	 //[D] GI Zone 
	 //arrParam[0] = "adm10import@gimport10.com"; //From
	 if (arrRes2 != "") {
	 arrParam[0] = arrRes2; //From
	 } else {
	 arrParam[0] = "adm10import@gimport10.com"; //From
	 }
	 //[F] GI Zone 
	 arrParam[1] = vEmail; //To
	 arrParam[2] = top.MyApp.GetItemValue('OppComment'); //Title
	 arrParam[3] = "Hello, <br /><br />Your proposal entitled " + top.MyApp.GetItemValue('OppComment') + " has been taken into account by " + top.MyApp.GetItemValue('OppExtChefproduit') + " under the affair number " + top.MyApp.GetItemValue('OppReference') + ". <br /><br />Sincerly, <br /><br />Import Admin. Dept."; //Body
	 //arrParam[3] = "Hello, Import Admin. Dept."; //Body
	 var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	 if (str_Ret == true || str_Ret == "True") {
	 top.MyApp.SetItemValue("OppExtMailGI", "1");
	 top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Un mail d'information vient d'etre envoyé pour l'acheteur à l'adresse : "] + vEmail]);
	 } else {
	 top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Send Mail GI : "] + str_Ret]);
	 }
	 } else {
	 top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Il manque l'adresse mail de l'Acheteur."]]);
	 }
	 }
	 } catch (e) {
	 top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Send Mail GI : "] + e.message]);
	 }
	 */
	 var strStatus = top.MyApp.GetItemValue("OppStatus", top.MyData_View);
	 var strHeureComp = top.MyApp.GetItemValue("OppExtHeureComplet", top.MyData_View);
	 var strHeureDepo = top.MyApp.GetItemValue("OppExtHeureDepose", top.MyData_View);
	 //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	 if (strStatus.substr(0, 2) == "05" && (strHeureDepo == "" || strHeureDepo == undefined)) {
	  //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	  try {
	   var timeTEMP = new Date();
	   var h = timeTEMP.getHours();
	   if (h < 10) {
	    h = "0" + h
	   }
	   var m = timeTEMP.getMinutes();
	   if (m < 10) {
	    m = "0" + m
	   }
	   var s = timeTEMP.getSeconds();
	   if (s < 10) {
	    s = "0" + s
	   }
	   var strHeure = h + ":" + m + ":" + s;
	   top.MyApp.SetItemValue("OppExtHeureDepose", strHeure);
	  } catch (e) {
	   alert(e.message);
	  }
	 }
	 //Modifs MH 19/05/2015
	 //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	 if (strStatus.substr(0, 2) == "04" && (strHeureComp == "" || strHeureComp == undefined)) {
	  //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	  try {
	   var timeTEMP = new Date();
	   var h = timeTEMP.getHours();
	   if (h < 10) {
	    h = "0" + h
	   }
	   var m = timeTEMP.getMinutes();
	   if (m < 10) {
	    m = "0" + m
	   }
	   var s = timeTEMP.getSeconds();
	   if (s < 10) {
	    s = "0" + s
	   }
	   var strHeure = h + ":" + m + ":" + s;
	   top.MyApp.SetItemValue("OppExtHeureComplet", strHeure);
	  } catch (e) {
	   alert(e.message);
	  }
	 }
	
	
	
	
	 // 05.01.2016 CBA #607[Création de contrôle sur action + bloquage pop up] 
	 //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	 if (vStatut.substr(0, 2) == "04") {
	  //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	  var vSQL = "select count(*) from sysadm.hi0 where do0_nrid='" + top.MyApp.GetItemValue("OppNRID") + "' and (ref = 'RDV' or ref = 'PROPO') and status = 'A FAIRE' ";
	  var arrRes = top.MyApp._gfctExtReq(vSQL);
	  if (arrRes > 0) {
	   var vSQL = "select nrid from sysadm.hi0 where do0_nrid='" + top.MyApp.GetItemValue("OppNRID") + "' and (ref = 'RDV' or ref = 'PROPO') and status = 'A FAIRE' ";
	   var arrRes = top.MyApp._gfctExtReq(vSQL);
	   var vConf = confirm(top.MyApp.arrTranslations['Une action PROPO/RDV liée a cette affaire a toujours\nle statut "A FAIRE". Souhaitez-vous la passer en "FAIT"?']);
	   if (vConf == true) {
	    /*
	    var arrParam = [];
	    //arrParam[0] = "update sysadm.hi0 set status = 'FAIT' where  nrid ='"+arrRes[0][0]+"' and (ref = 'RDV' or ref = 'PROPO') and hi0.status = 'A FAIRE' ";
	    arrParam[0] = "hi0"; // table
	    arrParam[1] = ["status","ntype"]; //columns
	    arrParam[2] = ["FAIT","0"]; //values
	    arrParam[3] = "hi0.nrid ='"+arrRes[0][0]+"' and (ref = 'RDV' or ref = 'PROPO') and status = 'A FAIRE'" //clause
	    arrParam[4] = 2; // length
	    var res = top.MyApp.ExecuteServerScript("33789099586538", arrParam); // _gfctUpdateFromSelligent
	    var objXmlRes;
	    objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	    objXmlRes.async = false;
	    objXmlRes.loadXML(res); 
	    var tag = objXmlRes.getElementsByTagName("Parameter");
	    if(tag[0].getAttribute("Value") != 'True')
	    return false;
	    */
	    var vNRID = arrRes[0][0];
	    top.MyApp.ExecuteServerScript("33972157664150", [vNRID]);
	   } else {
	    return false;
	   }
	  }
	 }
	 // 10.01.2017
	
	
	
	
	 var val = top.MyApp.GetItemValue("OppExtNbPalettes");
	 if (!isNaN(val)) {
	  val = Math.ceil(val);
	 };
	 top.MyApp.SetItemValue("OppExtNbPalettes", val);
	
	
	
	
	
	 if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "Result", "blnModified") != "true") {
	  top.MyApp.OpenDlg("Alert", [top.MyApp.arrTranslations["MERCI"], top.MyApp.arrTranslations["L'affaire a été mise ajour avec succés."]]);
	  top.MyApp.fraMenuBar.Execute("R_Consult");
	  return true;
	 }
	} catch (e) {
	 throw " OnBeforeUpdate : " + e.message;
	}
	
	
	
	
	/*
	   // DEBUT HAS: Si statut COMPLET alors Insertion dans xso4 pour donner accès à l'acheteur sélectionné
	   try {
	   
	 var vstatut = top.MyApp.GetItemValue("OppStatus");
	 if (vstatut == '04. COMPLET') {
	  var arrResult = [];
	  var arrParam = [];
	   
	  var supplyer = top.MyApp.GetItemValue("OppCpyNrid");
	  var acht = top.MyApp.GetItemValue("OppExtAcheteur");
	   
	  if (acht != null && acht != '' && acht != undefined) {
	   
	   var strSQLRes = "select COUNT(*) as nbLigne from sysadm.xso4 xso4 where xso4.Acht = '" + acht + "' and xso4.so0_nrid = '" + supplyer + "'";
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   if (arrRes == 0) {
	   
	    var arrResult = [];
	    var arrParam = [];
	    arrParam[0] = "insert into sysadm.xso4 (Acht, so0_nrid) values ('" + acht + "', '" + supplyer + "')";
	   
	    //appel du script _gsfctExecuteSql
	    arrResult[0] = top.MyApp.ExecuteServerScript("30231053360342", arrParam);
	   
	   
	   }
	  } else {
	   return true;
	  }
	 }
	   } catch (e) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Error -- " + e.description]);
	   }
	   */
	
	
	
	
	
	/*
	   try {
	   
	 var vstatut = top.MyApp.GetItemValue("OppStatus");
	 if (vstatut == '04. COMPLET') {
	   
	  // tester si l'acheteur selectionn est le titulaire de la société, si oui donc pas besoin de l'inserer comme interlocuteur
	  var supplyer = top.MyApp.GetItemValue("OppCpyNrid");
	  var acht = top.MyApp.GetItemValue("OppExtAcheteur");
	   
	  //var strSQLRes = "select count(*) as Nbr from sysadm.xso4 xso4, sysadm.so0 so0 where so0.titulaire = xso4.acht and so0.nrid = xso4.so0_nrid and  xso4.acht = '" + acht + "' and xso4.so0_nrid = '" + supplyer + "' ";
	  var strSQLRes = " select count(*) as Nbr from sysadm.so0 so0 where so0.titulaire =  '" + acht + "' and so0.nrid = '" + supplyer + "' " ;
	   
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	  top.MyApp.OpenDlg("Alert", ["", "nombre acheteur affaire deja titulaire societe : " + arrRes]);
	   
	  if (arrRes > 0) {
	   
	   var exist = 1;
	  }
	  // fin test sur acheteur deja titulaire de la societe
	   
	  // cherche si c'est un nouvel acheteur, si oui insérer comme interlocuteur affaire
	  var arrResult = [];
	  var arrParam = [];
	   
	  if ( exist != 1 && acht != null && acht != '' && acht != undefined) {
	   
	   var strSQLRes = "select COUNT(*) as nbLigne from sysadm.xso4 xso4 where xso4.Acht = '" + acht + "' and xso4.so0_nrid = '" + supplyer + "'";
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   if (arrRes == 0) {
	   
	    var arrResult = [];
	    var arrParam = [];
	    arrParam[0] = "insert into sysadm.xso4 (Acht, so0_nrid) values ('" + acht + "', '" + supplyer + "')";
	   
	    //appel du script _gsfctExecuteSql
	    arrResult[0] = top.MyApp.ExecuteServerScript("30231053360342", arrParam);
	   
	   
	   }
	  } else {
	   return true;
	  }
	  // fin insertion interlocuteur dans xso4
	 }
	   } catch (e) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Error insertion interlocuteur -- " + e.description]);
	   }
	   
	 
	   
	 */
	
	
	
	
	
	try {
	 var vstatut = top.MyApp.GetItemValue("OppStatus");
	 var vUserName = top.MyApp.UserSetting.User.Name;
	 //if ((vstatut == '04. COMPLET' && vUserProfile != 'NEG_SEN') || (vstatut == '01.A DEMANDE AVIS' && vUserProfile == 'NEG_SEN')) {
	
	
	
	
	 if ((vstatut == '04. COMPLET' && vUserProfile != 'NEG_SEN') || (vstatut == '01.A DEMANDE AVIS' && (vUserProfile == 'MNG_ACH_OPR' || vUserProfile == 'NEG_SEN' || vUserProfile == 'LEAD_NEG'))) {
	
	
	
	
	  // tester si l'acheteur selectionn est le titulaire de la société, si oui donc pas besoin de l'inserer comme interlocuteur
	  var supplyer = top.MyApp.GetItemValue("OppCpyNRID");
	  var acht = top.MyApp.GetItemValue("OppExtAcheteur");
	
	
	
	
	  //var strSQLRes = "select count(*) as Nbr from sysadm.xso4 xso4, sysadm.so0 so0 where so0.titulaire = xso4.acht and so0.nrid = xso4.so0_nrid and  xso4.acht = '" + acht + "' and xso4.so0_nrid = '" + supplyer + "' ";
	  var strSQLRes = " select count(*) as Nbr from sysadm.so0 so0 where so0.titulaire =  '" + acht + "' and so0.nrid = '" + supplyer + "' ";
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	  //top.MyApp.OpenDlg("Alert", ["", "nombre acheteur affaire deja titulaire societe : " + arrRes]);
	  if (arrRes > 0) {
	   var exist = 1;
	  }
	  // fin test sur acheteur deja titulaire de la societe
	  // cherche si c'est un nouvel acheteur, si oui insérer comme interlocuteur affaire
	  var arrResult = [];
	  var arrParam = [];
	
	
	
	
	  if (exist != 1 && acht != null && acht != '' && acht != undefined) {
	   var strSQLRes = "select COUNT(*) as nbLigne from sysadm.xso4 xso4 where xso4.Acht = '" + acht + "' and xso4.so0_nrid = '" + supplyer + "'";
	   var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	   if (arrRes == 0) {
	
	
	
	
	    var arrResult = [];
	    var arrParam = [];
	    arrParam[0] = "insert into sysadm.xso4 (Acht, so0_nrid, xstart_date, xaffair, xvalideur ) values ('" + acht + "', '" + supplyer + "', getdate(), '1', '" + vUserName + "' )";
	    //appel du script _gsfctExecuteSql
	    arrResult[0] = top.MyApp.ExecuteServerScript("30231053360342", arrParam);
	   }
	  } else {
	   return true;
	  }
	  // fin insertion interlocuteur dans xso4
	 }
	} catch (e) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Error insertion interlocuteur -- " + e.description]);
	}
	
	
	
	
	
	// HAS DEB : 18/10/2019 : bloquer le choix de la société honkongaise
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppExtPaysFacturation", "blnModified")) {
	 top.MyApp.CustomSetting.OppIsUpdatedStatus = true
	
	
	
	
	 //var vPaysFact = top.MyApp.GetItemValue('xPaysFacturation');
	
	
	
	
	 if (top.MyApp.GetItemValue("OppExtPaysFacturation").substr(0, 2) == 'HK') {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Invoice Country Not available \n Please use another choice."]);
	  return false;
	 }
	}
	// HAS FIN : 18/10/2019 : bloquer le choix de la société honkongaise
	
	
	
	
	
	// OZ 29/06/2018: Enlever les lignes vides du problématique du lot
	var ProbLot = top.MyApp.GetItemValue("OppExtProbLot");
	top.MyApp.SetItemValue("OppExtProbLot", ProbLot.replace(/^\s*[\r\n]/gm, ''));
	
	
	
	
	
	//END HAS : Insertion xso4 et suppression de tout ancien acheteur 
	/*
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	   
	if ((top.MyApp.GetItemValue("OppStatus").substr(0, 2) == "07" ) && vProfiluser != 'ADMT' && vProfiluser != 'ADMT' ){
	top.MyApp.OpenDlg("Alert",["", "Impossible to change Affair reuqesting CP Offer"]);
	return false;
	}
	*/
	
	
	
	
	/*
	var arrParam = []; //
	arrParam[0] = "bouzouita.hasen@gmail.com"; //From 
	arrParam[1] = "hassen.bouzouita@ozeol.com"; //To
	arrParam[2] = "test"; //Title
	arrParam[3] = "Hello, <br /><br />Your proposal entitled  has been taken into account by  under the affair number . <br /><br />Sincerly, <br /><br />Import Admin. Dept."; //Body
	   
	var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	alert(str_Ret);
	*/
	
	
	
	
	// HAS DEB 20/02/2020 : Alerte sur choix acheteur différent de l'acheteur titulaire de la fiche fournisseur
	var vAcht = top.MyApp.GetItemValue('OppExtAcheteur');
	var nSoc = top.MyApp.GetItemValue('OppCpyNRID');
	
	
	
	
	var vSqlAcht = " select xacht, xetat_pepite from so0 where template is null and nrid = '" + nSoc + " ' ";
	var arrResAcht = top.MyApp._gfctExtReq(vSqlAcht);
	var vAchtSoc = arrResAcht[0][0];
	var vPortfolio = arrResAcht[0][1];
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppExtAcheteur", "blnModified")) {
	    if (vAchtSoc != '' && vAchtSoc != null && vAchtSoc != undefined && vAcht != '' && vAcht != null && vAcht != undefined) {
	  if (vAchtSoc != vAcht) {
	   top.MyApp.OpenDlg("Alert", ["Notification", "The supplier Owner is different from Affair Buyer. \n do you want to continue?", "YesNo"]);
	   var vResp = top.MyApp.AppSetting.dlgReturn[0];
	   if (vResp) {
	    return true;
	   } else {
	    top.MyApp.fraMenuBar.Execute("R_Consult");
	   }
	  }
	 }
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppStatus", "blnModified")) {
	    //top.MyApp.OpenDlg("Alert", ["Attention", "sttaut affaire est : "+top.MyApp.GetItemValue('OppStatus').substring(0,2)]);
	    if (vPortfolio != 'PEPITE' && (top.MyApp.GetItemValue('OppStatus').substring(0,4) == "01.A" || top.MyApp.GetItemValue('OppStatus').substring(0,2) =="03" || top.MyApp.GetItemValue('OppStatus').substring(0,2) =="06") ) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Please ask supplier validation from Back Office before moving to this status"]);
	        return false;
	    }
	}
	
	
	
	
	// HAS END 20/02/2020 : Alerte sur choix acheteur différent de l'acheteur titulaire de la fiche fournisseur
	
	
	
	
		// HAS END 14/05/2021 : mise à jour etape sur niveau le plus optimiste
	/*if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppExtClient1Dec", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppExtClient2Dec", "blnModified")) {
	    var DecMag = top.MyApp.GetItemValue("OppExtClient1Dec", _oCurWnd);
	    var DecFi = top.MyApp.GetItemValue("OppExtClient2Dec", _oCurWnd);
	    var vDec = "";
	    if (DecMag == 'Intéressé' || DecFi == 'Intéressé') {
	        top.MyApp.SetItemValue("OppExtEtape", "Intéressé"); 
	    }else if (DecMag == 'Non intéressé' || DecFi == 'Non intéressé') {
	        if (DecMag == 'Non intéressé' && DecFi != 'Intéressé') {
	            if (DecFi == '' || DecFi == 'Attente de décision') {
	                vDec = DecFi;
	            }
	        } else if  (DecFi == 'Non intéressé' && DecMag != 'Intéressé') {
	            if (DecMag == '' || DecMag == 'Attente de décision') {
	                vDec = DecMag;
	            }
	        }
	        if (vDec != '') {
	            top.MyApp.SetItemValue("OppExtEtape", vDec);
	        } 
	    } else if (DecMag == 'Non intéressé' && DecFi == 'Non intéressé') {
	        top.MyApp.SetItemValue("OppExtEtape", "Non intéressé"); 
	    }
	}*/
	// HAS END 14/05/2021 : mise à jour etape sur niveau le plus optimiste
		// NEW opp UPDATE Acheteur affaire pour demande avis
	var vProsp = top.MyApp.GetItemValue('OppExtProspecteur');
	var vFamille = top.MyApp.GetItemValue('OppExtFamille');
	var vAcht = top.MyApp.GetItemValue('OppExtAcheteur');
	var vEmailDest = "";
	var vAchDest = "";
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppExtFamille", "blnModified") && vFamille != '' && vFamille != null && vProsp != '' && vProsp != null && vProsp != undefined) {
	    var vReqDest = "select remark from sysadm.am6 inner join sysadm.am0 on am0.nrid = am6.am0_nrid where am0.template is null and am0.bactive = 1 and ap00_name = 'Famille de produit' and ap01_name = '" + vFamille + "' and am0.titulaire = '" + vProsp + "' ";
	    var arrResDest = top.MyApp._gfctExtReq(vReqDest);
	    if (arrResDest.length == 1) {
	        var vEmailDest = arrResDest[0][0];
	        var vReqUserDest = "select top 1 titulaire from sysadm.am0 where am0.template is null and bactive = '1' and am0.fonction like '%negocia%' and e_mail = '" + vEmailDest + "' ";
	        var arrUserDest = top.MyApp._gfctExtReq(vReqUserDest);
	        if (arrUserDest.length == 1) {
	            vAchDest = arrUserDest[0][0];
	            if (vAchDest != '' && vAchDest != null && vAchDest != undefined) {
	                //if (vAcht == '' || vAcht == null || vAcht == undefined) {
	                    top.MyApp.SetItemValue("OppExtAcheteur", vAchDest);
	                //}
	            }
	        }
	    }
	}
		//PS_Opp_OnBeforeUpdate => Demande AVIS
	//update acheteur affaire par famille de produit
	    var vProsp = top.MyApp.UserSetting.User.Name;
	    var vFamille = top.MyApp.GetItemValue('OppExtFamille');
	    var nSoc = top.MyApp.GetItemValue('QuoCpyNRID');
	    var vOutSrc = top.MyApp.GetItemValue('OppExtOutSrc');
	    var vAcht = top.MyApp.GetItemValue('OppExtAcheteur');
	    var vEmail = "";
	    var vEmailDest = "";
	    var vTeamPros = top.MyApp.CustomSetting.Equipe;
	
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppStatus", "blnModified")) {
	
	    if (top.MyApp.GetItemValue('OppStatus') == "01.A DEMANDE AVIS") {
	
	        if (vAcht != '' && vAcht != null && vAcht != undefined) {
	            var vReqDest = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "' ";
	            var arrResDest = top.MyApp._gfctExtReq(vReqDest);
	            if (arrResDest.length == 1) {
	                vEmailDest = arrResDest[0][0];
	            }
	        } else {
	            var vReqDest = "select remark from sysadm.am6 inner join sysadm.am0 on am0.nrid = am6.am0_nrid where am0.template is null and am0.bactive = 1 and ap00_name = 'Famille de produit' and ap01_name = '" + vFamille + "' and am0.titulaire = '" + vProsp + "' ";
	            var arrResDest = top.MyApp._gfctExtReq(vReqDest);
	            if (arrResDest.length == 1) {
	                var vEmailDest = arrResDest[0][0];
	                // HAS DEB 20/09/2020 : Si email destination vers acheteur alors Affectation automatique des affaires
	                var vReqUserDest = "select top 1 titulaire from sysadm.am0 where am0.template is null and am0.fonction like '%negocia%' and e_mail = '" + vEmailDest + "' ";
	                var arrUserDest = top.MyApp._gfctExtReq(vReqUserDest);
	                if (arrUserDest.length == 1) {
	                    vAchDest = arrUserDest[0][0];
	                    if (vAchDest != '' && vAchDest != null && vAchDest != undefined) {
	                        if (vAcht == '' || vAcht == null || vAcht == undefined) {
	                            top.MyApp.SetItemValue("OppExtAcheteur", vAchDest);
	                        }
	                    }
	                }
	            }
	            // HAS END 20/09/2020 : Si email destination vers acheteur alors Affectation automatique des affaires
	        }
	
	        if (vOutSrc == 1) {
	            vEmail = "stock@ozeol.com";
	        } else {
	            var vSQL = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vProsp + "' ";
	            var arrRes = top.MyApp._gfctExtReq(vSQL);
	            vEmail = arrRes.join(";");
	        }
	
	        if (vEmail != '' && vEmail != null && vEmail != undefined) {
	            var arrParam = [];
	
	            arrParam[0] = vEmail;
	            arrParam[1] = vEmailDest;
	            arrParam[2] = "Opinion for Affair Number : " + top.MyApp.GetItemValue('OppReference', _oCurWnd);
	            arrParam[3] = `
	<!DOCTYPE html>
	<html>
	<body style="margin:0;padding:20px;background-color:#f0f4f8;font-family:Arial,sans-serif;">
	  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
	
	    <!-- Header -->
	    <div style="background-color:#28A8D6;padding:20px 28px;display:flex;align-items:center;">
	      <span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:0.5px;">Opinion Request</span>
	      <span style="margin-left:auto;background:rgba(255,255,255,0.25);color:#fff;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:20px;">Opinion Request</span>
	    </div>
	
	    <!-- Body -->
	    <div style="padding:28px;">
	      <p style="margin:0 0 12px;color:#333;font-size:15px;">Hello,</p>
	      <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.6;">
	        You have received an opinion request for the affair referenced below. Please review the details and approve if possible to proceed for <strong style="color:#28A8D6;">CRV</strong>.
	      </p>
	
	      <!-- Affair Card -->
	      <div style="background:#f8f9fa;border-left:4px solid #28A8D6;border-radius:0 6px 6px 0;padding:14px 18px;margin-bottom:20px;">
	        <div style="font-size:11px;color:#28A8D6;font-weight:bold;letter-spacing:0.8px;margin-bottom:6px;">AFFAIR REFERENCE</div>
	        <div style="font-size:16px;font-weight:bold;color:#222;">${top.MyApp.GetItemValue('OppReference', _oCurWnd)}</div>
	      </div>
	
	      <!-- Details Table -->
	      <table style="width:100%;border-collapse:collapse;font-size:13px;color:#444;">
	        <tr style="border-bottom:1px solid #eee;">
	          <td style="padding:10px 8px;font-weight:bold;width:40%;color:#28A8D6;letter-spacing:0.5px;">AFFAIR NUMBER</td>
	          <td style="padding:10px 8px;font-weight:bold;">${top.MyApp.GetItemValue('OppReference', _oCurWnd)}</td>
	        </tr>
	        <tr style="border-bottom:1px solid #eee;">
	          <td style="padding:10px 8px;font-weight:bold;color:#28A8D6;letter-spacing:0.5px;">REQUESTED BY</td>
	          <td style="padding:10px 8px;">${top.MyApp.UserSetting.User.Name}</td>
	        </tr>
	        <tr>
	          <td style="padding:10px 8px;font-weight:bold;color:#28A8D6;letter-spacing:0.5px;">REQUIRED ACTION</td>
	          <td style="padding:10px 8px;">Review &amp; approve to proceed for CRV</td>
	        </tr>
	      </table>
	
	      <p style="margin:20px 0 4px;color:#555;font-size:14px;">Have a nice day.</p>
	      <p style="margin:0;color:#333;font-size:14px;">Sincerely,<br/><strong>${top.MyApp.UserSetting.User.Name}</strong></p>
	    </div>
	
	    <!-- Footer -->
	    <div style="background:#f0f4f8;padding:14px 28px;text-align:center;font-size:11px;color:#888;">
	      This is an automated notification. Please do not reply directly to this email. For any queries, contact the sender directly.
	    </div>
	
	  </div>
	</body>
	</html>`;
	
	            var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	            if (str_Ret == true || str_Ret == "True") {
	                top.MyApp.OpenDlg("Alert", ["Notification", "A notification was sent to address : " + vEmailDest]);
	            } else {
	                top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sending issue : " + str_Ret]);
	                return false;
	            }
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Attention", "Your email address is missing. Please contact administrator"]);
	            return false;
	        }
	    }
	}
	
		// HAS DEB 06/02/2020 : Envoyer un mail automatique au prospecteur pour OK CRV ou Rjection
	
	var vStatOff = top.MyApp.GetItemValue("OppStatus").substr(0, 4);
	if (vStatOff == "02. ") {
	    vStatut = "REJECTION";
	}
	if (vStatOff == "01.C") {
	    vStatut = "VALIDATION";
	}
	var vProsp = top.MyApp.GetItemValue('OppExtProspecteur');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppStatus", "blnModified") && (vStatOff == "02. " || vStatOff == "01.C") ) {
	    top.MyApp.CustomSetting.OppIsUpdatedStatus = true;
	
	    var vSQL = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vProsp + "' ";
	    var arrRes = top.MyApp._gfctExtReq(vSQL);
	    var vDest = arrRes.join(";");
	    top.MyApp.OpenDlg("Alert", ["Mail", "Addresse mail du prospecteur : " + vDest]);
	
	    var vEmail = top.MyApp.UserSetting.Settings.EMail;
	    if (arrRes.length >= 1) {
	        var arrParam = [];
	        arrParam[0] = vEmail;
	        arrParam[1] = vDest;
	        arrParam[2] = "Prenegociation response for affair: " + top.MyApp.GetItemValue('OppReference', _oCurWnd);
	
	        if (vStatut == "VALIDATION") {
	            arrParam[3] = `
	<!DOCTYPE html>
	<html>
	<body style="margin:0;padding:20px;background-color:#f0f4f8;font-family:Arial,sans-serif;">
	  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
	
	    <!-- Header -->
	    <div style="background-color:#28a745;padding:20px 28px;display:flex;align-items:center;">
	      <span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:0.5px;">Prenegociation Response</span>
	      <span style="margin-left:auto;background:rgba(255,255,255,0.25);color:#fff;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:20px;">VALIDATION</span>
	    </div>
	
	    <!-- Body -->
	    <div style="padding:28px;">
	      <p style="margin:0 0 12px;color:#333;font-size:15px;">Hello,</p>
	      <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.6;">
	        CONGRATULATIONS! The pre-negotiation stage of your affair has resulted in <strong>VALIDATION</strong> status. Please proceed to CRV creation.
	      </p>
	
	      <!-- Affair Card -->
	      <div style="background:#f8f9fa;border-left:4px solid #28a745;border-radius:0 6px 6px 0;padding:14px 18px;margin-bottom:20px;">
	        <div style="font-size:11px;color:#28a745;font-weight:bold;letter-spacing:0.8px;margin-bottom:6px;">AFFAIR REFERENCE</div>
	        <div style="font-size:16px;font-weight:bold;color:#222;">${top.MyApp.GetItemValue('OppReference', _oCurWnd)}</div>
	      </div>
	
	      <!-- Status Table -->
	      <table style="width:100%;border-collapse:collapse;font-size:13px;color:#444;">
	        <tr style="border-bottom:1px solid #eee;">
	          <td style="padding:10px 8px;font-weight:bold;width:40%;">STATUS</td>
	          <td style="padding:10px 8px;">
	            <span style="background:#d4edda;color:#155724;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:bold;">VALIDATION</span>
	          </td>
	        </tr>
	        <tr>
	          <td style="padding:10px 8px;font-weight:bold;">CONTACT</td>
	          <td style="padding:10px 8px;">${top.MyApp.UserSetting.User.Name}</td>
	        </tr>
	      </table>
	
	      <p style="margin:20px 0 4px;color:#555;font-size:14px;">Have a nice day.</p>
	      <p style="margin:0;color:#333;font-size:14px;">Sincerely,<br/><strong>${top.MyApp.UserSetting.User.Name}</strong></p>
	    </div>
	
	    <!-- Footer -->
	    <div style="background:#f0f4f8;padding:14px 28px;text-align:center;font-size:11px;color:#888;">
	      This is an automated message from the <a href="#" style="color:#28a745;text-decoration:none;font-weight:bold;">Prenegociation Response</a> system. Please do not reply directly to this email.
	    </div>
	  </div>
	</body>
	</html>`;
	        }
	
	        if (vStatut == "REJECTION") {
	            arrParam[3] = `
	<!DOCTYPE html>
	<html>
	<body style="margin:0;padding:20px;background-color:#f0f4f8;font-family:Arial,sans-serif;">
	  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
	
	    <!-- Header -->
	    <div style="background-color:#fd7e14;padding:20px 28px;display:flex;align-items:center;">
	      <span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:0.5px;">Prenegociation Response</span>
	      <span style="margin-left:auto;background:rgba(255,255,255,0.25);color:#fff;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:20px;">REJECTION</span>
	    </div>
	
	    <!-- Body -->
	    <div style="padding:28px;">
	      <p style="margin:0 0 12px;color:#333;font-size:15px;">Hello,</p>
	      <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.6;">
	        The pre-negotiation stage of your affair has resulted in <strong>REJECTION</strong>. Please check if you need more details.
	      </p>
	
	      <!-- Affair Card -->
	      <div style="background:#f8f9fa;border-left:4px solid #fd7e14;border-radius:0 6px 6px 0;padding:14px 18px;margin-bottom:20px;">
	        <div style="font-size:11px;color:#fd7e14;font-weight:bold;letter-spacing:0.8px;margin-bottom:6px;">AFFAIR REFERENCE</div>
	        <div style="font-size:16px;font-weight:bold;color:#222;">${top.MyApp.GetItemValue('OppReference', _oCurWnd)}</div>
	      </div>
	
	      <!-- Status Table -->
	      <table style="width:100%;border-collapse:collapse;font-size:13px;color:#444;">
	        <tr style="border-bottom:1px solid #eee;">
	          <td style="padding:10px 8px;font-weight:bold;width:40%;">STATUS</td>
	          <td style="padding:10px 8px;">
	            <span style="background:#ffe5d0;color:#7d3a00;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:bold;">REJECTION</span>
	          </td>
	        </tr>
	        <tr>
	          <td style="padding:10px 8px;font-weight:bold;">CONTACT</td>
	          <td style="padding:10px 8px;">${top.MyApp.UserSetting.User.Name}</td>
	        </tr>
	      </table>
	
	      <p style="margin:20px 0 4px;color:#555;font-size:14px;">Have a nice day.</p>
	      <p style="margin:0;color:#333;font-size:14px;">Sincerely,<br/><strong>${top.MyApp.UserSetting.User.Name}</strong></p>
	    </div>
	
	    <!-- Footer -->
	    <div style="background:#f0f4f8;padding:14px 28px;text-align:center;font-size:11px;color:#888;">
	      This is an automated message from the <a href="#" style="color:#fd7e14;text-decoration:none;font-weight:bold;">Prenegociation Response</a> system. Please do not reply directly to this email.
	    </div>
	  </div>
	</body>
	</html>`;
	        }
	
	        var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	        if (str_Ret == true || str_Ret == "True") {
	            top.MyApp.OpenDlg("Alert", ["Notification", "Une notification vient d'être envoyée à l'adresse : " + vDest]);
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Erreur", "Problème envoi mail automatique : " + str_Ret]);
	        }
	    } else {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail du prospecteur"]);
	    }
	}
	// HAS END 06/02/2020 : Envoyer un mail automatique au prospecteur pour OK CRV ou Rjection
		if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "OppExtQui", "blnModified") && top.MyApp.GetItemValue("OppExtQui") != '' && top.MyApp.GetItemValue("OppExtQui") != null) {
	//if (top.MyApp.CustomSetting.SbSendAffair == '1') {
	    //alert("j'appelle la fonction _PS_Opp_Appel_DA11 !! et la veleur modifiée de XQUI est : " + top.MyApp.GetItemValue("OppExtQui"))
	    _PS_Opp_Appel_DA11();
	}
}