function PS_Quo_OnBeforeUpdate()
{
	
	
	
	Chapter='Quo'
	top.MyApp.AppSetting.Update = true;
	var CurrentChapterNRID = Chapter + 'NRID'
	var strSQL = "select SUBSTRING(rmod,4,3)  from [" + Chapter + "] where nrid= " + top.MyApp.GetItemValue(CurrentChapterNRID);
	var DMOD_in_base = top.MyApp._gfctExtReq(strSQL);
	var CurrentChapterDMOD = Chapter + 'RMOD'
	var DMOD_in_screen1 = top.MyApp.GetItemValue(CurrentChapterDMOD);
	var DMOD_in_screen = DMOD_in_screen1.substr(3, 3);
	if (top.MyApp.AppSetting.CurrentData_View == 'Quo' && DMOD_in_base == '$WS' && DMOD_in_base != DMOD_in_screen) {
	 var nResult = "1";
	 //alert(nResult);
	} else {
	 var nResult = "0";
	 //alert(nResult);
	}
	/*var arrParam = [];
	arrParam[0] = top.MyApp;
	arrParam[1] = nResult;*/
	if (nResult == "1") {
	    //top.MyApp.asyncOpenDlg(undefined, undefined, undefined, undefined, undefined, undefined, undefined, function() {
	  //top.MyApp.OpenDlg("Alert", ["Attention", "Update impossible!! \n Another user has made changes at this object.. Please refresh"]);
	        //return top.MyApp.AppSetting.dlgReturn;
	    //});
	 top.MyApp.OpenDlg("Alert", ["Attention", "Update impossible!! \n Another user has made changes at this object.. Please refresh"]);
	 return false;
	}
	// important permet de stopper l'insert si on répond non au WDS
	//return top.MyApp.AppSetting.dlgReturn;
	//return true;
		// HAS : Appel fonction de gestion des accès concurrents sur la même offre
	
	
	/*
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatOff", "blnModified") != true) {
	  PS_All_Acces_Concurrent('Quo');
	}*/
	
	
	//PS_All_Acces_Concurrent('Quo');
	// HAS End : gestion des accès concurrents
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoOppReference", "blnModified")) {
	 alert('test');
	}
	/*
	var text = top.MyApp.GetItemValue('QuoExtDetailsDem');
	var lines = text.split("\r");
	var count = lines.length;
	if (count > 1) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The Deposit Request Détails can only contain one line."]);
	 return false;
	}
	*/
	var prevision = top.MyApp.GetItemValue('QuoExtForecast');
	if (isNaN(prevision)) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The Forecast Can only contain numbers."]);
	 return false;
	} else if (prevision != null && prevision != '') {
	 top.MyApp.SetItemValue('QuoExtForecast', parseInt(prevision));
	}
	
	
	var DeviseForecast = top.MyApp.GetItemValue('QuoExtDeviseForecast');
	if (prevision != null && prevision != '' && (DeviseForecast == null || DeviseForecast == '')) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The Forecast currency is mandatory."]);
	 return false;
	}
	// HAS : 21/06/2018 : controle de saisie montants litige
	var vCreditnote = top.MyApp.GetItemValue('QuoExtValCreaditNote');
	var vMontavoir = top.MyApp.GetItemValue('QuoExtValDemAvoir');
	var vMonrembouse = top.MyApp.GetItemValue('QuoExtValRembourseClt');
	if (isNaN(vCreditnote) || isNaN(vMontavoir) || isNaN(vMonrembouse)) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "Litigation amounts can only contain numbers."]);
	 return false;
	}
	
	
	// HAS : 27/08/2018 : controle de saisie Volume CBM dans la fiche taquet
	var vVolumeCBM = top.MyApp.GetItemValue('QuoExtVolumeCBM');
	
	
	/*if (isNaN(vVolumeCBM)) {
	    top.MyApp.OpenDlg("Alert", ["Attention", "CBM can only contain numbers."]);
	    return false;
	}
	
	*/
	
	// SIR && HIC @ozeol 25/05/2018 
	var statutWH = top.MyApp.GetItemValue('QuoExtStatutWH');
	var DateRepWH = top.MyApp.GetItemValue('QuoExtDateLivWH');
	var email = top.MyApp.GetItemValue('QuoExtEmailWH');
	var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	var retel = /^\d+$/;
	var rextel = /^[0-9A-Za-z\s\-]+$/;
	var telNbr = top.MyApp.GetItemValue('QuoExtNumTel');
	/*
	if (statutWH != 'Demande Réception' && statutWH != '' && statutWH != null && (DateRepWH == null || DateRepWH == '')) {
	    top.MyApp.OpenDlg("Alert", ["Attention", "You can't select the Warehouse validation status."]);
	    return false;
	}
	*/
	
	
	if ((statutWH == null || statutWH == '') && ((top.MyApp.GetItemValue('QuoExtEmailWH') != null && top.MyApp.GetItemValue('QuoExtEmailWH') != '') || (top.MyApp.GetItemValue('QuoExtNumTel') != null && top.MyApp.GetItemValue('QuoExtNumTel') != '') || (top.MyApp.GetItemValue('QuoExtNomContact') != null && top.MyApp.GetItemValue('QuoExtNomContact') != '') || (top.MyApp.GetItemValue('QuoExtVolumeCbmWH') != null && top.MyApp.GetItemValue('QuoExtVolumeCbmWH') != '') || (top.MyApp.GetItemValue('QuoExtDateLivPrevWH') != null && top.MyApp.GetItemValue('QuoExtDateLivPrevWH') != ''))) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "You have to select warehouse status."]);
	 return false;
	}
	
	
	
	var xDerogation = top.MyApp.GetItemValue('QuoExtDerogation');
	var XRAPTEST = top.MyApp.GetItemValue('QuoExtRapTest');
	var XSTATUTPACK = top.MyApp.GetItemValue('QuoExtStatutPack');
	var xstatutrt = top.MyApp.GetItemValue('QuoExtStatutRT');
	
	
	/*
	if (XRAPTEST != '' && statutWH == 'Demande Réception'){
	 if (( XRAPTEST == 'Obligatoire' && ( xstatutrt != 'Validé' || XSTATUTPACK != 'Validé' ) ) ) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "You Need Norms Validation before Requesting reception"]);
	  return false;
	 }
	
	
	}
	 if ( xDerogation != 'OUI' ){
	  top.MyApp.OpenDlg("Alert", ["Attention", "You Need Norms Validation before Requesting reception"]);
	  return false;
	 } 
	*/
	var validcq = 0;
	if ((xstatutrt == 'Validé' && XSTATUTPACK == 'Validé' && XRAPTEST == 'Obligatoire') || (XRAPTEST == 'Non Obligatoire') || (xDerogation == 'OUI')) {
	 validcq = 1
	}
	if (validcq != 1 && statutWH == 'Demande Réception') {
	 top.MyApp.OpenDlg("Alert", ["Attention", "You Need Norms Validation before Requesting reception"]);
	 return false;
	}
	
	
	
	var statOff = top.MyApp.GetItemValue('QuoExtStatOff');
	if (statOff != '5. Commandée' && statutWH == 'Demande Réception') {
	 top.MyApp.OpenDlg("Alert", ["Attention", "You Need to request order before Requesting reception"]);
	 return false;
	}
	
	
	// HAS DEB : Gestion des format de données Volume CBM + Mail + Téléphone
	var CBMWH = top.MyApp.GetItemValue('QuoExtVolumeCbmWH');
	if (isNaN(CBMWH)) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The Warehouse CBM Volume Can only contain numbers."]);
	 return false;
	}
	if (email) {
	 if (!email.match(re)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Check the e-mail please!"]);
	  return false;
	 }
	}
	if (telNbr) {
	 if (!telNbr.match(retel)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Check the Telephone number please!"]);
	  return false;
	 }
	}
	// HAS DEB : Gestion des format de données Volume CBM + Mail + Téléphone
	
	
	// DEB HAS : 28/01/2019 Alerte sur client fiche taquet incorrect
	var vAssur = top.MyApp.GetItemValue("QuoextAssurance");
	var vDouane = top.MyApp.GetItemValue("QuoextCoutDouane");
	var vTrans = top.MyApp.GetItemValue("QuoextCoutTrans");
	if (vAssur == '0' && vDouane == '0' && vTrans == '0') {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The client of the offer and the client of taquet file are different! Please correct your file \n Insertion Cancelled"]);
	 return false;
	}
	// FIN HAS  : 28/01/2019 Alerte sur client fiche taquet incorrect
	
	// HAS DEB : achat 2020 RG champ MDM obligatoire pour faire demande PC - seulement pour OZEOL Tunisie
	var vMDM = top.MyApp.GetItemValue('QuoExtDateMDM');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailDemande", "blnModified")) {
	 top.MyApp.CustomSetting.QuoIsUpdatedStatus = true;
	 //var vAcheteur = top.MyApp.GetItemValue('QuoExtAcht');
	 //var StrSQL = "select xplateau from sysadm.am0 where Template is null and titulaire = '" + vAcheteur + "' ";
	 //var arrRes = top.MyApp._gfctExtReq(StrSQL);
	 //if (arrRes.length > 0 && arrRes == 'Tunisie') {
	 if (vMDM == '' || vMDM == null || vMDM == undefined) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Thanks to complete the Merchandise availability date before requesting to place order"]);
	  return false;
	 }
	 //}
	}
	// HAS END : achat 2020 RG champ MDM obligatoire pour faire demande PC
	
	// HAS DEB : Envoyer un mail automatique au service Passage commande si sort de standby et redemande PassCmd
	var vDateSbCmd = top.MyApp.GetItemValue('QuoExtCmdSBdate');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailDemande", "blnModified") && vDateSbCmd != '' && vDateSbCmd != null && vDateSbCmd != undefined) {
	 top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	 //top.MyApp.OpenDlg("Alert", ["Mail", "La valeur VVCP taquet est : " + VVCPTaquet]);
	 var vAcht = top.MyApp.UserSetting.User.Name;
	 var vDest = 'gestion.commande@ozeol.com'; // 'gestion.commande@ozeol.com'; // 'hichem.bouzaiene@ozeol.com'
	 // chercher le l'adresse mail de l'acheteur
	 var vSQL = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "' ";
	 var arrRes = top.MyApp._gfctExtReq(vSQL);
	 var vEmail = arrRes.join(";");
	 top.MyApp.OpenDlg("Alert", ["Mail", "Mon adresse mail est : " + vEmail]);
	 if (arrRes.length >= 1) {
	  var arrParam = [];
	  arrParam[0] = vEmail //"selligent@ozeol.com";  //From 
	  arrParam[1] = vDest; //To
	  //arrParam[2] = "Offre " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd) + " StandBy"; //Title
	  arrParam[2] = "Stand by request placing order for offer " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd); //Title
	  arrParam[3] = "Bonjour, <br /><br />Une nouvelle demande de passage commande a été envoyée suite à une mise en StandBy.<br /><br />" + "Merci et bonne journée. " + "<br /><br />Cordialement,<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	  var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	  if (str_Ret == true || str_Ret == "True") {
	   top.MyApp.OpenDlg("Alert", ["Notification", "Une notification vient d'être envoyée à l'adresse : " + vDest]);
	   top.MyApp.SetItemValue("QuoExtAlertCmd", "1");
	  } else {
	   top.MyApp.OpenDlg("Alert", ["Erreur", "Problème envoi mail automatique : " + str_Ret]);
	  }
	 } else {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail"]);
	 }
	}
	// HAS END : Envoyer un mail automatique au service Passage commande si sort de standby et redemande PassCmd
	
		// PS_Quo_OnBeforeUpdate - client déposit
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailsDem", "blnModified")) {
	    top.MyApp.SetItemValue("QuoExtDemdep", '1');
	    /*var vSQL = "SELECT convert(varchar(20), xDateDemDeposit ,112) as QuoExtDateDemDeposit, convert(varchar(20), xDateDemDepositDer ,112) as QuoExtDateDemDepositDer ";
	    vSQL += "from dc0 where nrid='" + top.MyApp.GetItemValue('QuoNRID') + "' ";
	    //alert(vSQL);
	    var arrResDest = top.MyApp._gfctExtReq(vSQL);
	    var vPremDemDep = arrResDest[0][0];
	    var vDernDemDep = arrResDest[0][1];*/
	    var vDate1 = top.MyApp.GetItemValue('QuoExtDateDemDeposit');
	    var vDate2 = top.MyApp.GetItemValue('QuoExtDateDemDepositDer');
	    //alert(vDate1);
	    var vPremDemDep = vDate1.substring(0,10).split('-').join('');
	    var vDernDemDep = vDate2.substring(0,10).split('-').join('');
	    //alert('la date trans est $'+vtrans+'$');
	
	
	    var vDteDemDep = "";
	    if (vDernDemDep != '' && vDernDemDep != null && vDernDemDep != undefined) {
	        vDteDemDep = vDernDemDep;
	    } else {
	        vDteDemDep = vPremDemDep;
	    }
	    
	    var vAff = top.MyApp.GetItemValue('QuoOppReference');
	    var vOff = top.MyApp.GetItemValue('QuoCustReference');
	    var vDetail = top.MyApp.GetItemValue('QuoExtDetailsDem').replace(/[&\\\#,+()~%."*?<>{}]/g, "");
	    alert("affaire : " + vAff + "\noffre : " + vOff + "\ndate : "+ vDteDemDep +"\ndetail : " +vDetail );
	    var arrParam = [];
	    arrParam[0] = vAff;
	    arrParam[1] = vOff;
	    arrParam[2] = vDteDemDep;
	    arrParam[3] = vDetail;
	    var result = top.MyApp.ExecuteServerScript(40922181486148, arrParam);
	    //alert(result);
	    if (result == 'OK - Offre modifiée') {
	        top.MyApp.OpenDlg("Alert", ["", "Deposit request sccessfully sent"]);
	    } else {
	        top.MyApp.OpenDlg("Alert", ["", result + "\nPlease retry your request"]);
	        return false;
	    }
	}
		var nValidMdpTl = 0;
	var nValidMdpBum = 0;
	var nValidMdpMz = 0;
	var nValidMdpDo = 0;
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValTlDerogMdp", "blnModified")) {
	var nValidMdpTl = 1;
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValAchDerogMdp", "blnModified")) {
	var nValidMdpBum = 1;
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValMngzDerogMdp", "blnModified")) {
	var nValidMdpMz = 1;
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValDirDerogMdp", "blnModified")) {
	var nValidMdpDo = 1;
	}
	if (nValidMdpTl == 1 || nValidMdpBum == 1 || nValidMdpMz == 1 || nValidMdpDo == 1 || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDelPai", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtTypeLtg", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog1", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog2", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog3", "blnModified")) {
	var vStat1 = top.MyApp.GetItemValue("QuoExtStatDerog1");
	var vStat2 = top.MyApp.GetItemValue("QuoExtStatDerog2");
	var vStat3 = top.MyApp.GetItemValue("QuoExtStatDerog3");
	var vStatLtg = top.MyApp.GetItemValue("QuoExtTypeLtg");
	var vDelPai = top.MyApp.GetItemValue("QuoExtDelPai");
	var vRep = top.MyApp.UserSetting.User.Name;
	var vEmailRep = top.MyApp.UserSetting.Settings.EMail;
	var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	var vAcht = top.MyApp.GetItemValue("QuoExtAcht");
	var vManager = top.MyApp.GetItemValue("QuoExtManager");
	var vTotDerog = top.MyApp.GetItemValue("QuoExtTotValDerog").replace(/,/g, ".");
	var ConvDepass = top.MyApp.GetItemValue("QuoExtValDepassDerog").replace(/,/g, ".");
	var vNormsAffectea = top.MyApp.GetItemValue("QuoExtNormsAffectea");
	if (vTotDerog == '') vTotDerog = '0';
	vTotDerog = parseFloat(vTotDerog);
	ConvDepass = parseFloat(ConvDepass);
	var nValidTlMdp = 0;
	var nValidBumMdp = 0;
	var nValidMzMdp = 0;
	var nValidDoMdp = 0;
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValTlDerogMdp", "blnModified")) {
	var nValidTlMdp = 1;
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValAchDerogMdp", "blnModified")) {
	var nValidBumMdp = 1;
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValMngzDerogMdp", "blnModified")) {
	var nValidMzMdp = 1;
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValDirDerogMdp", "blnModified")) {
	var nValidDoMdp = 1;
	}
	if (vStat1 == 'Approuvé' || vStat2 == 'Approuvé' || vStat3 == 'Approuvé') {
	vTotDerog += ConvDepass;
	top.MyApp.SetItemValue("QuoExtTotValDerog", vTotDerog);
	}
	if ((nValidTlMdp == 1 || nValidBumMdp == 1 || nValidMzMdp == 1 || nValidDoMdp == 1) || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDelPai", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtTypeLtg", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog1", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog2", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog3", "blnModified")) {
	var vSQLdest1 = "SELECT cast(STUFF ( (SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50)) ";
	vSQLdest1 += "from sysadm.am0 mng_ach ";
	vSQLdest1 += "inner join sysadm.set_us1 prof on prof.nom = mng_ach.titulaire ";
	vSQLdest1 += "inner join sysadm.res_liees res_mng on res_mng.personne = mng_ach.titulaire ";
	vSQLdest1 += " inner join sysadm.am0 ach on ach.team_name = res_mng.vue_equipe ";
	vSQLdest1 += "where ";
	vSQLdest1 += "ach.template is null ";
	vSQLdest1 += "and mng_ach.template is null ";
	vSQLdest1 += "and mng_ach.bactive = '1' ";
	vSQLdest1 += "and prof.set_us_profile_init = 'MNG_ACH_OPR' ";
	vSQLdest1 += "and ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' ";
	vSQLdest1 += " FOR XML PATH('') ),1, 1, '') AS varchar(1000)) as Famille ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	var vBUMDest = arrResDest.join(";");
	var vSQLdest1 = "select (select e_mail from sysadm.am0 where Template is null and titulaire = '" + vManager + "'),(select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "') ,(select ISNULL(e_mail, '') from sysadm.am0 where Template is null and titulaire = '" + vNormsAffectea + "') ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	var vTLDest = arrResDest[0][0];
	var vNEGDest = arrResDest[0][1];
	var vNORMSDest = arrResDest[0][2];
	//var vNEGTLNEGDest = arrResDest.join(";");
	var vNEGTLNEGDest = vNEGDest + ";" + vTLDest; // arrResDest.join(";");
	var vSQLdest1 = "select res_mng.e_mail as mngz from sysadm.am0 res_mng , sysadm.am0 res_user where res_mng.team_name = res_user.team_name and res_mng.Template is null and res_mng.Template is null and res_mng.bactive =1 and res_user.bactive =1 and res_mng.fonction = 'Manager support' and res_user.titulaire = '" + top.MyApp.GetItemValue("QuoExtUserDemDerog") + "' ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	var vMNGZDest = arrResDest.join(";");
	var vSQLdest1 = "select e_mail as cq from sysadm.am0 where template is null and titulaire = '" + top.MyApp.GetItemValue("QuoExtUserDemDerog") + "' ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	var vCQDest = arrResDest.join(";");
	var vSQLdest1 = "select e_mail from sysadm.am0 dirsup inner join sysadm.set_us1 prof on prof.nom = dirsup.titulaire where dirsup.Template is null and prof.titre = 'directeur support' ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	//var vDIROPDest = arrResDest[0][0];
	var vDIRSUPDest = arrResDest.join(";");
	var vSQLdest1 = "select e_mail from sysadm.am0 dirop inner join sysadm.set_us1 prof on prof.nom = dirop.titulaire where dirop.Template is null and prof.titre = 'Directeur operations' ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	var vDIROPDest = arrResDest.join(";");
	
	var vSQLdestBO = "select e_mail from sysadm.am0 dirop inner join sysadm.set_us1 prof on prof.nom = dirop.titulaire where dirop.Template is null and prof.titre = 'Directeur Back Office' ";
	var arrResDestBO = top.MyApp._gfctExtReq(vSQLdestBO);
	var vDIROPBODest = arrResDestBO.join(";");
	
	var vRegDest = "";
	vRegDest += "SELECT cast(STUFF ( (SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50)) ";
	vRegDest += "from sysadm.am0 mng_ach ";
	vRegDest += "inner join sysadm.set_us1 prof on prof.nom = mng_ach.titulaire ";
	vRegDest += "inner join sysadm.res_liees res_mng on res_mng.personne = mng_ach.titulaire ";
	vRegDest += "inner join sysadm.am0 ach on ach.team_name = res_mng.vue_equipe ";
	vRegDest += "where ";
	vRegDest += "ach.template is null ";
	vRegDest += "and mng_ach.template is null ";
	vRegDest += "and mng_ach.bactive = '1' ";
	vRegDest += "and prof.titre = 'Regional director' ";
	vRegDest += "and ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' ";
	vRegDest += " FOR XML PATH('') ),1, 1, '') AS varchar(1000)) as MngZone ";
	var strResDest = top.MyApp._gfctExtReq(vRegDest);
	var vRegzDest = strResDest.join(";");
	
	var vSQLdest1 = "select e_mail from sysadm.am0 mngsup inner join sysadm.set_us1 prof on prof.nom = mngsup.titulaire where mngsup.Template is null and prof.titre = 'Manager support' ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	var vMNGSUPDest = arrResDest.join(";");
	var vSQLdest1 = "select top 1 e_mail from sysadm.am0 inner join sysadm.x_controle_qualite x on x.UserDemCQ = am0.titulaire where DC0_NRID = :QuoNRID order by x.dmod desc ";
	var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	var vValidCQDest = arrResDest.join(";");
	// get the address of the ZONE MANAGER
	var MySql = "";
	MySql += "SELECT cast(STUFF ( (SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50)) ";
	MySql += "from sysadm.am0 mng_ach ";
	MySql += "inner join sysadm.set_us1 prof on prof.nom = mng_ach.titulaire ";
	MySql += "inner join sysadm.res_liees res_mng on res_mng.personne = mng_ach.titulaire ";
	MySql += "inner join sysadm.am0 ach on ach.team_name = res_mng.vue_equipe ";
	MySql += "where ";
	MySql += "ach.template is null ";
	MySql += "and mng_ach.template is null ";
	MySql += "and mng_ach.bactive = '1' ";
	MySql += "and prof.titre = 'Manager Zone' ";
	MySql += "and ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' ";
	MySql += " FOR XML PATH('') ),1, 1, '') AS varchar(1000)) as MngZone ";
	var strResDest = top.MyApp._gfctExtReq(MySql);
	var vMzDest = strResDest.join(";");
	}
	}
		
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	    _oCurWnd = top.MyData_View;
	} else {
	    _oCurWnd = top.MyApp.wizardWindow;
	}
	var arrChampOblig = [];
	var strIsOblig = "";
	var vStatusOffre = top.MyApp.GetItemValue("QuoExtStatOff");
	if (vStatusOffre.substr(0, 1) == "3") {
	    var vOffreFrs = top.MyApp.GetItemValue("QuoExtOffreFrs", _oCurWnd);
	    var vRaisonLost = top.MyApp.GetItemValue("QuoExtRaisonOffre", _oCurWnd);
	    if (vRaisonLost == "N.C/Prix" && (vOffreFrs == '' || vOffreFrs == undefined)) {
	        strIsOblig += "QuoExtOffreFrs;"
	        strIsOblig = strIsOblig.slice(0, -1);
	        if (strIsOblig != "") arrChampOblig = strIsOblig.split(";");
	        if (arrChampOblig.length > 0) {
	            //alert(arrChampOblig.length);
	            var MyResult = top.MyApp.OpenDlg("Mandatory", [arrChampOblig, top.MyApp.arrTranslations["My Mandatory dialog"], true]);
	            if (!MyResult) return false;
	            alert(MyResult);
	            for (var i in top.MyApp.AppSetting.dlgReturn) {
	                top.MyApp.SetItemValue(i, top.MyApp.AppSetting.dlgReturn[i], _oCurWnd);
	            }
	            return true;
	        }
	    }
	}
		// Payment Term Derogation Management
	// Author: HAS - Date: 18/06/2020
	// Updated: Fixed vRegzDest double-declaration and ensured all email variables are declared upfront
	
	var vDateDemPC   = top.MyApp.GetItemValue("QuoExtDateDemande", _oCurWnd);
	var vPaymTerm    = top.MyApp.GetItemValue("QuoExtDelPai", _oCurWnd);
	var vPrchPI      = top.MyApp.GetItemValue("QuoExtValeurProforma");
	var vPrchPIDev   = top.MyApp.GetItemValue("QuoExtDeviseProforma");
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDelPai", "blnModified")) {
	
	    // Query derogation data with zone and country information
	    var strSQLRes = "SELECT Derog, Prc_Pmnt, level1, level2, level3, level4, code, Amount, Currency " +
	                    "FROM sysadm.dcx01 " +
	                    "INNER JOIN sysadm.x_Zone ON x_Zone.Zone = dcx01.Authorise " +
	                    "INNER JOIN sysadm.dc0 ON dc0.xpaysprovenance = x_Zone.country " +
	                    "WHERE label = '" + top.MyApp.GetItemValue("QuoExtDelPai") + "' " +
	                    "AND dc0.nrid = :nDocNRID";
	
	    var arrRes     = top.MyApp._gfctExtReq(strSQLRes);
	    var vTypeDerog = arrRes[0][0];
	    var vPrc       = arrRes[0][1];
	    var nLevel1    = arrRes[0][2];
	    var nLevel2    = arrRes[0][3];
	    var nLevel3    = arrRes[0][4];
	    var nLevel4    = arrRes[0][5];
	    var nCode      = arrRes[0][6];
	    var nAmount    = arrRes[0][7];
	    var nCurrency  = arrRes[0][8];
	    var nResLevel  = 0;
	
	    var vToControl = (nLevel1 == 0 && nLevel2 == 0 && nLevel3 == 0 && nLevel4 == 0) ? 0 : 1;
	
	    // Validate payment term selection
	    if (vPaymTerm == '--------') {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Please select a correct payment term"]);
	        return false;
	    }
	
	    // Reset derogation fields
	    top.MyApp.SetItemValue("QuoExtValAchDerogMdp", '');
	    top.MyApp.SetItemValue("QuoExtValDirDerogMdp", '');
	    top.MyApp.SetItemValue("QuoExtDemDerogMdp", "0");
	
	    if (vPaymTerm != '' && vPaymTerm != null && vPaymTerm != undefined) {
	        top.MyApp.SetItemValue("QuoExtCodeMdp", nCode);
	
	        if (vPrc != '' && vPrc != null && vPrc != undefined) {
	
	            // Validate Purchase Price PI
	            if (vPrchPI == '' || vPrchPI == null || vPrchPI == undefined || vPrchPI == '0') {
	                top.MyApp.OpenDlg("Alert", ["Attention", "The purchase price PI is mandatory \nPlease complete the taquet file and retry"]);
	                return false;
	            }
	
	            var nPrc     = parseInt(vPrc);
	            var nPrchPI  = parseInt(vPrchPI);
	            var vDepCalc = 0;
	
	            // Check if Amount from dcx01 is provided (fixed amount instead of percentage)
	            if (nAmount !== '' && nAmount !== null && nAmount !== undefined && nAmount !== 0) {
	                // Use fixed amount from dcx01
	                vDepCalc = parseFloat(nAmount);
	                top.MyApp.SetItemValue("QuoExtDepMdp", vDepCalc);
	
	                if (nCurrency !== '' && nCurrency !== null && nCurrency !== undefined) {
	                    top.MyApp.SetItemValue("QuoExtDeviceProforma", nCurrency);
	                }
	            } else if (vPrc != '' && vPrc != null && vPrc != undefined && vPrc != 0 && vPrc !== '0') {
	                // Calculate deposit based on percentage
	                vDepCalc = (nPrchPI * nPrc) / 100;
	                top.MyApp.SetItemValue("QuoExtDepMdp", vDepCalc);
	            }
	
	            // Determine derogation level
	            if (vToControl == 0) {
	                nResLevel = parseInt(vTypeDerog);
	            } else if (vToControl == 1) {
	                if (vDepCalc == 0) {
	                    nResLevel = vTypeDerog;
	                } else if (vDepCalc > 0) {
	                    if (vDepCalc >= nLevel4) {
	                        nResLevel = 4;
	                    } else if (vDepCalc < nLevel4 && vDepCalc >= nLevel3) {
	                        nResLevel = 3;
	                    } else if (vDepCalc < nLevel3 && vDepCalc >= nLevel2) {
	                        nResLevel = 2;
	                    } else if (vDepCalc < nLevel2) {
	                        nResLevel = 1;
	                    }
	                }
	
	                if (nResLevel > 0) {
	                    top.MyApp.CustomSetting.QuoMandReasonPterm = 1;
	                }
	            }
	
	            top.MyApp.OpenDlg("Alert", ["Attention", "REQUIRED DEROGATION -- " + nResLevel]);
	
	            // Map derogation level to qualifier
	            var vQualifDerog = '';
	            switch (nResLevel) {
	                case 0:  vQualifDerog = '0. Sans derogation'; break;
	                case 1:  vQualifDerog = '1. Team Leader';     break;
	                case 2:  vQualifDerog = '2. BUM';             break;
	                case 3:  vQualifDerog = '3. Zone Manager';    break;
	                case 4:  vQualifDerog = '4. Op. Director';    break;
	                default: vQualifDerog = 'NA';
	            }
	
	            top.MyApp.SetItemValue("QuoExtTypeDerogMdp", vQualifDerog);
	
	            // Handle derogation request
	            if (nResLevel != '0') {
	                top.MyApp.OpenDlg("Alert", ["Confirm", "The Payment term requires derogation request to be accepted \nDo you want to continue?", "YesNo"]);
	                var vResp = top.MyApp.AppSetting.dlgReturn[0];
	
	                if (vResp) {
	
	                    // -- Declare all email destination variables upfront --------------
	                    /*var vEmailDest  = "";
	                    var vTLDest     = "";   // Team Leader    — populate from your existing source
	                    var vBUMDest    = "";   // BUM            — populate from your existing source
	                    var vDIROPDest  = "";   // Op. Director   — populate from your existing source
	                    var vMzDest     = "";   // Zone Manager   — resolved below for levels 3 & 4
	                    var vRegzDest   = "";   // Regional Dir.  — resolved below for level 4
	                    */
	                    // ----------------------------------------------------------------
	
	                    // Get buyer's email
	                    var vAcht     = top.MyApp.UserSetting.User.Name;
	                    var vDatabase = top.MyApp.AppSetting.DBName;
	                    var vSQLAch   = "SELECT e_mail FROM sysadm.am0 WHERE Template IS NULL AND titulaire = '" + vAcht + "'";
	                    var arrResAch = top.MyApp._gfctExtReq(vSQLAch);
	                    var arrParam  = [];
	
	                    if (arrResAch.length >= 1) {
	                        arrParam[0] = arrResAch;
	                        alert('FROM : #' + arrResAch + '#');
	                    } else {
	                        top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail de l'acheteur"]);
	                        return false;
	                    }
	
	                    // Check database environment — override all destinations for non-PROD
	                    if (vDatabase != 'PROD') {
	                        vEmailDest = "saibal.misra@ozeol.com";
	                        vTLDest    = "saibal.misra@ozeol.com";
	                        vBUMDest   = "saibal.misra@ozeol.com";
	                        vDIROPDest = "saibal.misra@ozeol.com";
	                        vMzDest    = "saibal.misra@ozeol.com";
	                        vRegzDest  = "saibal.misra@ozeol.com";
	                    }
	
	                    // Determine email recipients based on derogation level
	                    if (nResLevel == '1') {
	                        vEmailDest = vTLDest;
	
	                    } else if (nResLevel == '2') {
	                        vEmailDest = vBUMDest + ";" + vTLDest;
	
	                    } else if (nResLevel == '3' || nResLevel == '4') {
	
	                        // Resolve Zone Manager emails (PROD only — already set for non-PROD above)
	                        if (vDatabase == 'PROD') {
	                            var sqlMz = "SELECT CAST(STUFF((SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50)) " +
	                                        "FROM sysadm.am0 mng_ach " +
	                                        "INNER JOIN sysadm.set_us1 prof ON prof.nom = mng_ach.titulaire " +
	                                        "INNER JOIN sysadm.res_liees res_mng ON res_mng.personne = mng_ach.titulaire " +
	                                        "INNER JOIN sysadm.am0 ach ON ach.team_name = res_mng.vue_equipe " +
	                                        "WHERE ach.template IS NULL " +
	                                        "AND mng_ach.template IS NULL " +
	                                        "AND mng_ach.bactive = '1' " +
	                                        "AND prof.titre = 'Manager Zone' " +
	                                        "AND ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' " +
	                                        "FOR XML PATH('')), 1, 1, '') AS VARCHAR(1000)) AS MngZone";
	                            var arrMz = top.MyApp._gfctExtReq(sqlMz);
	                            vMzDest   = arrMz.join(";");
	                        }
	
	                        if (nResLevel == '3') {
	                            vEmailDest = vMzDest + ";" + vBUMDest + ";" + vTLDest;
	
	                        } else if (nResLevel == '4') {
	
	                            // Resolve Regional Director emails (PROD only — already set for non-PROD above)
	                            if (vDatabase == 'PROD') {
	                                var sqlReg = "SELECT CAST(STUFF((SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50)) " +
	                                             "FROM sysadm.am0 mng_ach " +
	                                             "INNER JOIN sysadm.set_us1 prof ON prof.nom = mng_ach.titulaire " +
	                                             "INNER JOIN sysadm.res_liees res_mng ON res_mng.personne = mng_ach.titulaire " +
	                                             "INNER JOIN sysadm.am0 ach ON ach.team_name = res_mng.vue_equipe " +
	                                             "WHERE ach.template IS NULL " +
	                                             "AND mng_ach.template IS NULL " +
	                                             "AND mng_ach.bactive = '1' " +
	                                             "AND prof.titre = 'Regional director' " +
	                                             "AND ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' " +
	                                             "FOR XML PATH('')), 1, 1, '') AS VARCHAR(1000)) AS MngZone";
	                                var arrReg = top.MyApp._gfctExtReq(sqlReg);
	                                vRegzDest  = arrReg.join(";");
	                            }
	
	                            // Level 4: Op. Director + Regional Dir. + Zone Manager + BUM + Team Leader
	                            vEmailDest = vDIROPDest + ";" + vRegzDest + ";" + vMzDest + ";" + vBUMDest + ";" + vTLDest;
	                        }
	                    }
	
	                    // Send notification email
	                    if (vEmailDest != "" && vEmailDest != null && vEmailDest != undefined) {
	                        arrParam[1] = vEmailDest;
	                        alert('TO : #' + vEmailDest + '#');
	
	                        arrParam[2] = "Request approval for payment terms - Offer : " + top.MyApp.GetItemValue('QuoCustReference');
	
	                        var vBody = "Hello,<br /><br />" +
	                                    vAcht + " request approval from " + vQualifDerog +
	                                    " for payment term: " + top.MyApp.GetItemValue('QuoExtDelPai');
	
	                        if (vDepCalc > 0) {
	                            vBody += "<br /><br />The estimated deposit amount is: " + vDepCalc + " " + vPrchPIDev + ".";
	                        }
	
	                        vBody += "<br /><br />Please check and make the response" +
	                                 "<br /><br />Have a nice day." +
	                                 "<br /><br />Sincerely.<br /><br />" +
	                                 top.MyApp.UserSetting.User.Name + ".";
	
	                        arrParam[3] = vBody;
	
	                        var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam);
	
	                        if (str_Ret == true || str_Ret == "True") {
	                            top.MyApp.OpenDlg("Alert", ["Notification", "A notification was sent to address : " + vEmailDest]);
	                        } else {
	                            top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sending issue : " + str_Ret]);
	                            return false;
	                        }
	                    } else {
	                        top.MyApp.OpenDlg("Alert", ["Attention", "Destination email is missing!"]);
	                    }
	
	                } else {
	                    return false;
	                }
	            }
	        }
	    }
	}
	
	
		// HAS DEB 22/06/2020 - Mail de retour pour demande derogation mode de paiement
	var vRep = top.MyApp.UserSetting.User.Name;
	var vEmailRep = top.MyApp.UserSetting.Settings.EMail
	var vAcht = top.MyApp.GetItemValue("QuoExtAcht");
	var vManager = top.MyApp.GetItemValue("QuoExtManager");
	var vDerog = top.MyApp.GetItemValue("QuoExtDelPai");
	var vDepMdp = top.MyApp.GetItemValue("QuoExtDepMdp");
	var vTypeDerogMdp = top.MyApp.GetItemValue("QuoExtTypeDerogMdp");
	var vRetour = "";
	var vValTlDerogMdp = top.MyApp.GetItemValue("QuoExtValTlDerogMdp");
	var vValBumDerogMdp = top.MyApp.GetItemValue("QuoExtValAchDerogMdp");
	var vValMngzDerogMdp = top.MyApp.GetItemValue("QuoExtValMngzDerogMdp");
	var vValDirDerogMdp = top.MyApp.GetItemValue("QuoExtValDirDerogMdp");
	var nTypeDerogMdp = vTypeDerogMdp.substr(0, 1);
	
	if (nValidMdpTl == 1 || nValidMdpBum == 1 || nValidMdpMz == 1 || nValidMdpDo == 1) {
	 if (nTypeDerogMdp != '0') {
	  var vSQLAch = "select top 1 e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "' ";
	  var arrResAch = top.MyApp._gfctExtReq(vSQLAch);
	  var vEmailAch = arrResAch.join(";");
	  top.MyApp.OpenDlg("Alert", ["Attention", "NECESSITE DEROGATION DE RETOUR -- " + vTypeDerogMdp]);
	  if (vValDirDerogMdp != null && vValDirDerogMdp != '' && vValDirDerogMdp != undefined) {
	   vRetour = vValDirDerogMdp;
	  } else if (vValMngzDerogMdp != null && vValMngzDerogMdp != '' && vValMngzDerogMdp != undefined) {
	   vRetour = vValMngzDerogMdp;
	  } else if (vValBumDerogMdp != null && vValBumDerogMdp != '' && vValBumDerogMdp != undefined) {
	   vRetour = vValBumDerogMdp;
	  } else if (vValTlDerogMdp != null && vValTlDerogMdp != '' && vValTlDerogMdp != undefined) {
	   vRetour = vValTlDerogMdp;
	  }
	  var arrParam = [];
	  if (vEmailRep == '' || vEmailRep == null || vEmailRep == undefined) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Your email address is missing !"]);
	   return false;
	  }
	  arrParam[0] = vEmailRep; //From
	  top.MyApp.OpenDlg("Alert", ["Attention", "My Email address is -- " + vEmailRep]);
	  if (nTypeDerogMdp == '1') {
	   if ((vValDirDerogMdp != null && vValDirDerogMdp != '' && vValDirDerogMdp != undefined) || (vValMngzDerogMdp != null && vValMngzDerogMdp != '' && vValMngzDerogMdp != undefined) || (vValBumDerogMdp != null && vValBumDerogMdp != '' && vValBumDerogMdp != undefined) || (vValTlDerogMdp != null && vValTlDerogMdp != '' && vValTlDerogMdp != undefined)) {
	    // Destination Emails
	    vEmailDest = vTLDest + ';' + vEmailAch;
	   }
	  }
	  if (nTypeDerogMdp == '2') {
	   if ((vValDirDerogMdp != null && vValDirDerogMdp != '' && vValDirDerogMdp != undefined) || (vValMngzDerogMdp != null && vValMngzDerogMdp != '' && vValMngzDerogMdp != undefined) || (vValBumDerogMdp != null && vValBumDerogMdp != '' && vValBumDerogMdp != undefined)) {
	    // Destination Emails
	    vEmailDest = vTLDest + ';' + vEmailAch;
	   }
	  }
	  if (nTypeDerogMdp == '3') {
	   if ((vValDirDerogMdp != null && vValDirDerogMdp != '' && vValDirDerogMdp != undefined) || (vValMngzDerogMdp != null && vValMngzDerogMdp != '' && vValMngzDerogMdp != undefined)) {
	    // Destination Emails
	    vEmailDest = vBUMDest + ";" + vTLDest + ';' + vEmailAch;
	   }
	  }
	  if (nTypeDerogMdp == '4') {
	   if ((vValDirDerogMdp != null && vValDirDerogMdp != '' && vValDirDerogMdp != undefined)) {
	    // Destination Emails
	    vEmailDest = vMzDest + ";" + vBUMDest + ";" + vTLDest + ';' + vEmailAch;
	   }
	  }
	    top.MyApp.OpenDlg("Alert", ["Attention", "Destination Email ISSS -- " + vEmailDest]);
	  if (vEmailDest != '' && vEmailDest != null && vEmailDest != undefined) {
	   arrParam[1] = vEmailDest; //To
	   arrParam[2] = "Request Response for payment terms - Offer :  " + top.MyApp.GetItemValue('QuoCustReference'); //Title
	   var vBody = "";
	   if (vRetour == 'Approuvé') {
	    vBody = "Hello. <br /><br />CONGRATULATIONS! <br /><br /> The derogation request was APPROUVED for payement term:  " + top.MyApp.GetItemValue('QuoExtDelPai'); //Body
	    vBody += "<br /><br />Please proceed to requeting to place order";
	   }
	   if (vRetour == 'Non approuvé') {
	    vBody = "Hello.<br/><br/>The derogation request was NOT APPROUVED for payement term:  " + top.MyApp.GetItemValue('QuoExtDelPai'); //Body
	    vBody += "<br /><br />Please check you offer for further details";
	   }
	   vBody += "<br/><br />" + "Have a nice day." + "<br/><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	   arrParam[3] = vBody;
	   var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	   if (str_Ret == true || str_Ret == "True") {
	    top.MyApp.OpenDlg("Alert", ["Notification", "A notification was sent to address : " + vEmailDest]);
	   } else {
	    top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sendimg issue : " + str_Ret]);
	    return false;
	   }
	  } else {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail destination"]);
	  }
	 }
	}
	// HAS DEB 22/06/2020 - Mail de retour pour demande derogation mode de paiement
		// 2ND ORDER REQUEST EMAIL SENDING
	// Author: SAIM - Date: 18/03/2026
	var vReqReason = top.MyApp.FindItem("Sht43600557650138");
	var vComment = top.MyApp.GetItemValue("QuoExtSRReqComment");
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtSRReqComment", "blnModified")) {
	    if (vReqReason != '' && vReqReason != null && vReqReason != undefined) {
	        var vAcht      = top.MyApp.UserSetting.User.Name;
	        var vEmailRep  = top.MyApp.UserSetting.Settings.EMail;
	        var vDatabase  = top.MyApp.AppSetting.DBName;
	        var vReference = top.MyApp.GetItemValue('QuoCustReference');
	        var arrParam   = [];
	        arrParam[0] = vEmailRep;
	        // -- TL destination (already cached) -------------------------
	        var vEmailDest = "";
	        if (vDatabase != 'PROD') {
	            vEmailDest = "saibal.misra@ozeol.com";
	        } else {
	            vEmailDest = vTLDest + ";" + vBUMDest + ";" + vEmailRep;
	        }
	        // -- Check destination is not empty ---------------------------
	        if (vEmailDest != '' && vEmailDest != null && vEmailDest != undefined) {
	            arrParam[1] = vEmailDest;
	            // -- Subject ----------------------------------------------
	            arrParam[2] = "Request For 2nd Order Approval : " + vReference;
	            // -- Body -------------------------------------------------
	            var vBody =
	                "<div style='font-family: Arial, sans-serif; font-size: 14px; color: #333; background: #f0f4f8; padding: 40px 0;'>" +
	                    "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'>" +
	
	                        "<!-- HEADER -->" +
	                        "<div style='background: #29abe2; padding: 20px 28px; display: flex; align-items: center;'>" +
	                            "<span style='font-size: 18px; font-weight: bold; color: #ffffff;'>2nd Order Approval Request</span>&nbsp;&nbsp;" +
	                            "<span style='background: rgba(255,255,255,0.25); color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px;'>2nd Order Approval</span>" +
	                        "</div>" +
	
	                        "<!-- BODY -->" +
	                        "<div style='padding: 28px;'>" +
	
	                            "<p style='margin: 0 0 16px;'>Hello,</p>" +
	                            "<p style='margin: 0 0 24px;'>Buyer <b>" + vAcht + "</b> has submitted a 2nd order approval request. Please review the details and provide your response.</p>" +
	
	                            "<!-- REFERENCE BLOCK -->" +
	                            "<div style='border-left: 4px solid #29abe2; padding: 10px 16px; margin-bottom: 24px; background: #f9f9f9;'>" +
	                                "<div style='font-size: 11px; font-weight: bold; color: #29abe2; letter-spacing: 1px; margin-bottom: 4px;'>REFERENCE</div>" +
	                                "<div style='font-size: 20px; font-weight: bold; color: #222;'>" + vReference + "</div>" +
	                            "</div>" +
	
	                            "<!-- DETAILS TABLE -->" +
	                            "<table style='width: 100%; border-collapse: collapse; margin-bottom: 24px;'>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #29abe2; letter-spacing: 1px; width: 40%;'>REQUESTED BY</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>" + vAcht + "</td>" +
	                                "</tr>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #29abe2; letter-spacing: 1px;'>OFFER NUMBER</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>" + vReference + "</td>" +
	                                "</tr>" +
	                                "<tr>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #29abe2; letter-spacing: 1px;'>COMMENT</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>" + vComment + "</td>" +
	                                "</tr>" +
	                            "</table>" +
	
	                            "<p style='margin: 0 0 4px;'>Have a nice day.</p>" +
	                            "<p style='margin: 0;'>Sincerely,<br/><b>" + vAcht + "</b></p>" +
	
	                        "</div>" +
	
	                        "<!-- FOOTER -->" +
	                        "<div style='background: #f5f5f5; padding: 14px 28px; text-align: center; font-size: 11px; color: #999;'>" +
	                            "This is an automated notification. Please do not reply directly to this email. For any queries, contact the sender directly." +
	                        "</div>" +
	
	                    "</div>" +
	                "</div>";
	
	            arrParam[3] = vBody;
	            // -- Send email -------------------------------------------
	            var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam);
	            if (str_Ret == true || str_Ret == "True") {
	                top.MyApp.OpenDlg("Alert", ["Notification", "A notification was sent to : " + vEmailDest]);
	            } else {
	                top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sending issue : " + str_Ret]);
	                return false;
	            }
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Attention", "TL destination email is missing!"]);
	        }
	    }
	}
		// 2ND ORDER REQUEST APPROVAL EMAIL SENDING
	// Author: SAIM - Date: 18/03/2026
	
	var vRep       = top.MyApp.UserSetting.User.Name;
	var vEmailRep  = top.MyApp.UserSetting.Settings.EMail;
	var vAcht      = top.MyApp.GetItemValue("QuoExtAcht");
	var vDatabase  = top.MyApp.AppSetting.DBName;
	var vReference = top.MyApp.GetItemValue('QuoCustReference');
	
	var vTLStatus  = top.MyApp.GetItemValue("QuoExtSRTLStatus");
	var vDIRStatus = top.MyApp.GetItemValue("QuoExtSRDIRStatus");
	
	var arrParam = [];
	
	arrParam[0] = vEmailRep;
	
	// -- Non-PROD ? override all destinations ----------------------------
	if (vDatabase != 'PROD') {
	    arrResAch = "hichem.bouzaiene@ozeol.com";
	    vTLDest   = "hichem.bouzaiene@ozeol.com";
	    vDIROPBODest = "hichem.bouzaiene@ozeol.com";
	}
	
	var vEmailDest = "";
	var vRetour    = "";
	var vBody      = "";
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtSRTLStatus", "blnModified")) {
	// -- TL Approval/Rejection --------------------------------------------
	if (vTLStatus != null && vTLStatus != '' && vTLStatus != undefined) {
	        vRetour = vTLStatus;
	
	        // -- Approve ? GREEN ------------------------------------------
	        if (vRetour == 'Approuvé') {
	            vEmailDest = vDIROPBODest + ";" + arrResAch + ";" + vEmailRep;
	            vBody =
	                "<div style='font-family: Arial, sans-serif; font-size: 14px; color: #333; background: #f0f4f8; padding: 40px 0;'>" +
	                    "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'>" +
	
	                        "<div style='background: #27ae60; padding: 20px 28px;'>" +
	                            "<span style='font-size: 18px; font-weight: bold; color: #ffffff;'>2nd Order Request &ndash; TL Response</span>&nbsp;&nbsp;" +
	                            "<span style='background: rgba(255,255,255,0.25); color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px;'>APPROVED</span>" +
	                        "</div>" +
	
	                        "<div style='padding: 28px;'>" +
	                            "<p style='margin: 0 0 16px;'>Hello,</p>" +
	                            "<p style='margin: 0 0 24px;'>The 2nd order request has been <b style='color: #27ae60;'>APPROVED</b> by TL : <b>" + vRep + "</b>.</p>" +
	
	                            "<div style='border-left: 4px solid #27ae60; padding: 10px 16px; margin-bottom: 24px; background: #f9f9f9;'>" +
	                                "<div style='font-size: 11px; font-weight: bold; color: #27ae60; letter-spacing: 1px; margin-bottom: 4px;'>OFFER REFERENCE</div>" +
	                                "<div style='font-size: 20px; font-weight: bold; color: #222;'>" + vReference + "</div>" +
	                            "</div>" +
	
	                            "<table style='width: 100%; border-collapse: collapse; margin-bottom: 24px;'>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #27ae60; letter-spacing: 1px; width: 40%;'>RESPONDED BY</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>" + vRep + "</td>" +
	                                "</tr>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #27ae60; letter-spacing: 1px;'>REQUIRED ACTION</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>Please check and make the response.</td>" +
	                                "</tr>" +
	                            "</table>" +
	
	                            "<p style='margin: 0 0 4px;'>Have a nice day.</p>" +
	                            "<p style='margin: 0;'>Sincerely,<br/><b>" + vRep + "</b></p>" +
	                        "</div>" +
	
	                        "<div style='background: #f5f5f5; padding: 14px 28px; text-align: center; font-size: 11px; color: #999;'>" +
	                            "This is an automated notification. Please do not reply directly to this email. For any queries, contact the sender directly." +
	                        "</div>" +
	
	                    "</div>" +
	                "</div>";
	        }
	
	        // -- Reject ? ORANGE ------------------------------------------
	        if (vRetour == 'Non approuvé') {
	            vEmailDest = arrResAch + ";" + vEmailRep;
	            vBody =
	                "<div style='font-family: Arial, sans-serif; font-size: 14px; color: #333; background: #f0f4f8; padding: 40px 0;'>" +
	                    "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'>" +
	
	                        "<div style='background: #e67e22; padding: 20px 28px;'>" +
	                            "<span style='font-size: 18px; font-weight: bold; color: #ffffff;'>2nd Order Request &ndash; TL Response</span>&nbsp;&nbsp;" +
	                            "<span style='background: rgba(255,255,255,0.25); color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px;'> NOT APPROVED</span>" +
	                        "</div>" +
	
	                        "<div style='padding: 28px;'>" +
	                            "<p style='margin: 0 0 16px;'>Hello,</p>" +
	                            "<p style='margin: 0 0 24px;'>The 2nd order request has been <b style='color: #e67e22;'>NOT APPROVED</b> by TL : <b>" + vRep + "</b>.</p>" +
	
	                            "<div style='border-left: 4px solid #e67e22; padding: 10px 16px; margin-bottom: 24px; background: #f9f9f9;'>" +
	                                "<div style='font-size: 11px; font-weight: bold; color: #e67e22; letter-spacing: 1px; margin-bottom: 4px;'>OFFER REFERENCE</div>" +
	                                "<div style='font-size: 20px; font-weight: bold; color: #222;'>" + vReference + "</div>" +
	                            "</div>" +
	
	                            "<table style='width: 100%; border-collapse: collapse; margin-bottom: 24px;'>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #e67e22; letter-spacing: 1px; width: 40%;'>RESPONDED BY</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>" + vRep + "</td>" +
	                                "</tr>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #e67e22; letter-spacing: 1px;'>REQUIRED ACTION</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>Please check your offer for further details.</td>" +
	                                "</tr>" +
	                            "</table>" +
	
	                            "<p style='margin: 0 0 4px;'>Have a nice day.</p>" +
	                            "<p style='margin: 0;'>Sincerely,<br/><b>" + vRep + "</b></p>" +
	                        "</div>" +
	
	                        "<div style='background: #f5f5f5; padding: 14px 28px; text-align: center; font-size: 11px; color: #999;'>" +
	                            "This is an automated notification. Please do not reply directly to this email. For any queries, contact the sender directly." +
	                        "</div>" +
	
	                    "</div>" +
	                "</div>";
	        }
	
	        arrParam[1] = vEmailDest;
	        arrParam[2] = "2nd Order Request - TL Response : " + vReference;
	        arrParam[3] = vBody;
	
	        var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam);
	
	        if (str_Ret == true || str_Ret == "True") {
	            top.MyApp.OpenDlg("Alert", ["Notification", "A notification was sent to : " + vEmailDest]);
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sending issue : " + str_Ret]);
	            return false;
	        }
	    }
	}
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtSRDIRStatus", "blnModified")) {
	// -- Backoffice Director Approval/Rejection ----------------------------
	if (vDIRStatus != null && vDIRStatus != '' && vDIRStatus != undefined) {
	        vRetour = vDIRStatus;
	
	        // -- Approve ? GREEN ------------------------------------------
	        if (vRetour == 'Approuvé') {
	            vEmailDest = vTLDest + ";" + arrResAch + ";" + vEmailRep;
	            vBody =
	                "<div style='font-family: Arial, sans-serif; font-size: 14px; color: #333; background: #f0f4f8; padding: 40px 0;'>" +
	                    "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'>" +
	
	                        "<div style='background: #27ae60; padding: 20px 28px;'>" +
	                            "<span style='font-size: 18px; font-weight: bold; color: #ffffff;'>2nd Order Request &ndash; Director Response</span>&nbsp;&nbsp;" +
	                            "<span style='background: rgba(255,255,255,0.25); color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px;'>APPROVED</span>" +
	                        "</div>" +
	
	                        "<div style='padding: 28px;'>" +
	                            "<p style='margin: 0 0 16px;'>Hello,</p>" +
	                            "<p style='margin: 0 0 24px;'>The 2nd order request has been <b style='color: #27ae60;'>APPROVED</b> by Backoffice Director : <b>" + vRep + "</b>.</p>" +
	
	                            "<div style='border-left: 4px solid #27ae60; padding: 10px 16px; margin-bottom: 24px; background: #f9f9f9;'>" +
	                                "<div style='font-size: 11px; font-weight: bold; color: #27ae60; letter-spacing: 1px; margin-bottom: 4px;'>OFFER REFERENCE</div>" +
	                                "<div style='font-size: 20px; font-weight: bold; color: #222;'>" + vReference + "</div>" +
	                            "</div>" +
	
	                            "<table style='width: 100%; border-collapse: collapse; margin-bottom: 24px;'>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #27ae60; letter-spacing: 1px; width: 40%;'>RESPONDED BY</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>" + vRep + "</td>" +
	                                "</tr>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #27ae60; letter-spacing: 1px;'>REQUIRED ACTION</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>Please proceed to placing the order.</td>" +
	                                "</tr>" +
	                            "</table>" +
	
	                            "<p style='margin: 0 0 4px;'>Have a nice day.</p>" +
	                            "<p style='margin: 0;'>Sincerely,<br/><b>" + vRep + "</b></p>" +
	                        "</div>" +
	
	                        "<div style='background: #f5f5f5; padding: 14px 28px; text-align: center; font-size: 11px; color: #999;'>" +
	                            "This is an automated notification. Please do not reply directly to this email. For any queries, contact the sender directly." +
	                        "</div>" +
	
	                    "</div>" +
	                "</div>";
	        }
	
	        // -- Reject ? ORANGE ------------------------------------------
	        if (vRetour == 'Non approuvé') {
	            vEmailDest = vTLDest + ";" + arrResAch + ";" + vEmailRep;
	            vBody =
	                "<div style='font-family: Arial, sans-serif; font-size: 14px; color: #333; background: #f0f4f8; padding: 40px 0;'>" +
	                    "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'>" +
	
	                        "<div style='background: #e67e22; padding: 20px 28px;'>" +
	                            "<span style='font-size: 18px; font-weight: bold; color: #ffffff;'>2nd Order Request &ndash; Director Response</span>&nbsp;&nbsp;" +
	                            "<span style='background: rgba(255,255,255,0.25); color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px;'> NOT APPROVED</span>" +
	                        "</div>" +
	
	                        "<div style='padding: 28px;'>" +
	                            "<p style='margin: 0 0 16px;'>Hello,</p>" +
	                            "<p style='margin: 0 0 24px;'>The 2nd order request has been <b style='color: #e67e22;'>NOT APPROVED</b> by Backoffice Director : <b>" + vRep + "</b>.</p>" +
	
	                            "<div style='border-left: 4px solid #e67e22; padding: 10px 16px; margin-bottom: 24px; background: #f9f9f9;'>" +
	                                "<div style='font-size: 11px; font-weight: bold; color: #e67e22; letter-spacing: 1px; margin-bottom: 4px;'>OFFER REFERENCE</div>" +
	                                "<div style='font-size: 20px; font-weight: bold; color: #222;'>" + vReference + "</div>" +
	                            "</div>" +
	
	                            "<table style='width: 100%; border-collapse: collapse; margin-bottom: 24px;'>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #e67e22; letter-spacing: 1px; width: 40%;'>RESPONDED BY</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>" + vRep + "</td>" +
	                                "</tr>" +
	                                "<tr style='border-bottom: 1px solid #eeeeee;'>" +
	                                    "<td style='padding: 10px 0; font-size: 11px; font-weight: bold; color: #e67e22; letter-spacing: 1px;'>REQUIRED ACTION</td>" +
	                                    "<td style='padding: 10px 0; color: #333;'>Please check your offer for further details.</td>" +
	                                "</tr>" +
	                            "</table>" +
	
	                            "<p style='margin: 0 0 4px;'>Have a nice day.</p>" +
	                            "<p style='margin: 0;'>Sincerely,<br/><b>" + vRep + "</b></p>" +
	                        "</div>" +
	
	                        "<div style='background: #f5f5f5; padding: 14px 28px; text-align: center; font-size: 11px; color: #999;'>" +
	                            "This is an automated notification. Please do not reply directly to this email. For any queries, contact the sender directly." +
	                        "</div>" +
	
	                    "</div>" +
	                "</div>";
	        }
	
	        arrParam[1] = vEmailDest;
	        arrParam[2] = "2nd Order Request - Regional Director Response : " + vReference;
	        arrParam[3] = vBody;
	
	        var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam);
	
	        if (str_Ret == true || str_Ret == "True") {
	            top.MyApp.OpenDlg("Alert", ["Notification", "A notification was sent to : " + vEmailDest]);
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sending issue : " + str_Ret]);
	            return false;
	        }
	    }
	}
		// Debut HAS : V2: AfterLoad résultat de negociation : mettre anné forecast sur anné en cours si la semaine est selectionnée
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtForecastWeek", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var vForecastWeek = top.MyApp.FindItem("QuoExtForecastWeek", top.MyData_View);
	    var today = new Date();
	    var yyyy = today.getFullYear();
	    //yyyy = yyyy + 1;
	    if (vForecastWeek != '' && vForecastWeek != null && vForecastWeek != undefined) {
	        top.MyApp.SetItemValue("QuoExtForecastYear", yyyy);
	    }
	}
	// FIN HAS : V1: AfterLoad résultat de negociation : mettre anné forecast sur anné en cours si la semaine est selectionnée
	/*
	var vDateSaisi = top.MyApp.GetItemValue("QuoExtDebutNorms",top.MyData_View); 
	   var timeTEMP = new Date();
	   var mm = timeTEMP.getMonth()+1;
	   if (mm < 10) {
	    mm = "0" + mm
	   }
	   var jj = timeTEMP.getDate();
	   if (jj < 10) {
	    jj = "0" + jj
	   }
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
	var vDatejour =  timeTEMP.getFullYear() + "-" + mm + "-" + jj + " " + "00:00:00" ;
	top.MyApp.OpenDlg("Alert", ["Attention", "Le date saisie est : "+vDateSaisi+"."]);
	top.MyApp.OpenDlg("Alert", ["Attention", "La date du jour est "+vDatejour+"."]);
	if (vDateSaisi != vDatejour){
	 top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	 return false;
	}
	*/
	/*
	var dateE = top.MyApp.GetItemValue("QuoExtDebutNorms");
	var dateES = dateE.substring(0,4) + dateE.substring(5,7) + dateE.substring(8,10);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
	    dd = '0'+dd
	} 
	if(mm<10) {
	    mm = '0'+mm
	}
	aujourdhuiCompare = yyyy + "" + mm + "" + dd; 
	//if(aujourdhuiCompare != dateES && top.MyApp.UserSetting.User.ProfileInitials !="ADMT" && top.MyApp.UserSetting.User.ProfileInitials !="ADMF")
	if(aujourdhuiCompare != dateES)
	{
	     top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	      return false;
	}
	*/
	// test sur la fenêtre courante
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	    _oCurWnd = top.MyData_View;
	} else {
	    _oCurWnd = top.MyApp.wizardWindow;
	}
	// vProcStart - norms starting process :Début traitement norms
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDebutNorms", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDebutNorms");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vRtStart - Valorisation start : Date début valorisation  
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateDebVal", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateDebVal");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vRecRap - Report reception date : Date Réception dossier  
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateRecNS", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateRecNS");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vSendMkt - Sending to MKT date : Date de l'envoi MKT  
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateEnvoiMKT", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateEnvoiMKT");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	
	// vLabDate - Labs date : Date Labos 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateLabos", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateLabos");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vMktValidDate - MKT validation date : Date validation MKT :
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateValidMKT", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateValidMKT");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vPackRec - Pack Rec. Date : Date Réception Pack : 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateRecPack", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateRecPack");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vPackStart - Start date : Date début traitement :
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateDebPack", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateDebPack");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vPackSendMkt - Sending to MKT date : Date envoi MKT : 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateEnMKT", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateEnMKT");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vPackMktValid - MKT validation date : Date validation MKT : 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateValidMKTNormes", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateValidMKTNormes");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vAutSend - Authorization sending date : Date d'envoi autorisation  
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateEnAuto", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateEnAuto");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vAutValid - Authorization validation date : Date validation autorisation 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateValidAuto", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateValidAuto");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vRecInspec - Inspect. recept. date : Date Réception Inspection  
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateRecInspec", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateRecInspec");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vConfStart - Conform. start date : Date Début Autorisation 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateDebAut", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateDebAut");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	
	
	/*
	 // vLabDateRec - Conform. start date : Date Début Autorisation 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtLabDateRec", "blnModified")) {
	 top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	 var dateE = top.MyApp.GetItemValue("QuoExtLabDateRec");
	 var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	 var today = new Date();
	 var dd = today.getDate();
	 var mm = today.getMonth() + 1; //January is 0!
	 var yyyy = today.getFullYear();
	 if (dd < 10) {
	  dd = '0' + dd
	 }
	 if (mm < 10) {
	  mm = '0' + mm
	 }
	 aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	 if (aujourdhuiCompare != dateES) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	  return false;
	 }
	}
	 */
	
	/*
	 // vLabDateEnvoi - Conform. start date : Date Début Autorisation 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtLabDateEnvoi", "blnModified")) {
	 top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	 var dateE = top.MyApp.GetItemValue("QuoExtLabDateEnvoi");
	 var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	 var today = new Date();
	 var dd = today.getDate();
	 var mm = today.getMonth() + 1; //January is 0!
	 var yyyy = today.getFullYear();
	 if (dd < 10) {
	  dd = '0' + dd
	 }
	 if (mm < 10) {
	  mm = '0' + mm
	 }
	 aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	 if (aujourdhuiCompare != dateES) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	  return false;
	 }
	}
	*/
	// vDateRecCA - Conform. start date : Date Début Autorisation 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateRecCA", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateRecCA");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	
	// vDateDispoCA - Conform. start date : Date Début Autorisation 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateDispoCA", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateDispoCA");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
	// vDateValidCA - Conform. start date : Date Début Autorisation 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDateValidCA", "blnModified")) {
	    top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	    var dateE = top.MyApp.GetItemValue("QuoExtDateValidCA");
	    var dateES = dateE.substring(0, 4) + dateE.substring(5, 7) + dateE.substring(8, 10);
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	        dd = '0' + dd
	    }
	    if (mm < 10) {
	        mm = '0' + mm
	    }
	    aujourdhuiCompare = yyyy + "" + mm + "" + dd;
	    if (aujourdhuiCompare != dateES) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Les dates ne sont pas conformes !!!!"]);
	        return false;
	    }
	}
		// HAS DEB 23/12/2020 : Identification agent export et lancement demande approbation BO
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	 _oCurWnd = top.MyData_View;
	} else {
	 _oCurWnd = top.MyApp.wizardWindow;
	}
	var vUser = top.MyApp.UserSetting.User.Name;
	var vAgExport = top.MyApp.GetItemValue('QuoExtFrsExport');
	var vCpyName = top.MyApp.GetItemValue('QuoCpyName');
	var nExpNrid = top.MyApp.GetItemValue('QuoExtFrsExpNrid');
	var nCpyNRID = top.MyApp.GetItemValue('QuoCpyNRID');
	var nOffer = top.MyApp.GetItemValue('QuoCustReference');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtFrsExport", "blnModified")) {
	 if (vAgExport != '' && vAgExport != null && vAgExport != undefined) {
	  //var strSQLRes = "select xIsExporter, xValid_Exporter, xpour, xExportZone, xValDirExport from sysadm.v_so0 where template is null and nrid ='" + nExpNrid + "' ";
	  var vStrSQL = "SELECT CASE WHEN xIsExporter = '1' then 'YES' ELSE 'NO' END as CpyExtIsExporter, ";
	  vStrSQL += "    (select COUNT(x.nrid) from sysadm.x_access_agexp x inner join sysadm.am0 amv on amv.titulaire = x.User_Req_Exp inner join sysadm.x_param_Plateau_zone plz on plz.Plateau = amv.xplateau and amv.xBureau = plz.Bureau where plz.Zone = '" + top.MyApp.CustomSetting.ZoneGI + "' AND  x.so0_nrid = so0.nrid  and Acces_Status = 'Approuvé') as CpyExtValidExporter,";
	  vStrSQL += "    CASE WHEN so0.xValid_Exporter = 'Non approuvé' THEN 'Not Approved' ELSE '-' END as RejectExporter,";
	  vStrSQL += "    (select COUNT(x.nrid) from sysadm.x_access_agexp x inner join sysadm.dc0 on dc0.nrid = x.dc0_nrid where x.User_Req_Exp = :strUserNom and x.so0_nrid = so0.nrid and dc0.nrid = :nDocNRID and x.User_Req_Exp = dc0.XACHT and x.ValDirExport = 'Approuvé unique') as 'PartialValid',";
	  vStrSQL += "    (select COUNT(x.nrid) from sysadm.x_access_agexp x inner join sysadm.dc0 on dc0.nrid = x.dc0_nrid where x.User_Req_Exp = :strUserNom and x.so0_nrid = so0.nrid and x.User_Req_Exp = dc0.XACHT and x.ValDirExport = 'Approuvé permanent') as 'TotalValid',";
	
	  vStrSQL += "    (select COUNT(x.nrid) from sysadm.x_access_agexp x inner join sysadm.dc0 on dc0.nrid = x.dc0_nrid where x.User_Req_Exp = :strUserNom and x.so0_nrid = so0.nrid and x.User_Req_Exp = dc0.XACHT and x.ValDirExport = 'Rejeté') as 'Reject',";
	
	  vStrSQL += "    CASE WHEN removed = '1' then 'YES' ELSE 'NO' END as CpyIsBlackList, ";
	  vStrSQL += "    xetat_pepite as CpyExtEtatPepite, ";
	  vStrSQL += "    ISNULL(xPour2, '0') as NbrSupp, ISNULL(xRisque, '0') as NbrExport";
	  vStrSQL += "    from sysadm.v_so0 so0";
	  vStrSQL += "    where so0.template is null";
	  vStrSQL += "  and so0.nrid = '" + nExpNrid + "'  ";
	
	  var arrRes = top.MyApp._gfctExtReq(vStrSQL);
	  var vIsExport = arrRes[0][0];
	  var nValidExpBO = arrRes[0][1];
	  var vRejectExpBO = arrRes[0][2];
	  var nPartValDir = arrRes[0][3];
	  var nTotValDir = arrRes[0][4];
	  var nRejDir = arrRes[0][5];
	  var IsBalckList = arrRes[0][6];
	  var vPortfolio = arrRes[0][7];
	  var nCmdSupp = arrRes[0][8];
	  var nCmdAgxp = arrRes[0][9];
	  //alert(vIsExport);
	  //alert("ValidExpBO = " + parseInt(nValidExpBO));
	  /* if (parseInt(nValidExpBO) > 0) {
	   alert("Mon fournisseur est approubé par le BO !!")
	  } */
	  if (vIsExport == 'YES') {
	   if (parseInt(nValidExpBO) > 0 || nTotValDir > 0 || nPartValDir > 0) {
	    var QueryLnk = "select count(nrid) from lnk0 where lnk2_nrid = '" + nCpyNRID + "' and lnk1_nrid = '" + nExpNrid + "' ";
	    var arrResult = top.MyApp._gfctExtReq(QueryLnk);
	    var vLiaison = arrResult[0][0];
	    //alert ("row number links supplier and exporter is: "+vLiaison);
	    if (vLiaison == 0) {
	     top.MyApp.ExecuteServerScript("38962153497748", [nCpyNRID, nExpNrid, vCpyName, vAgExport]); //SS_Quo_Liaison_AgentExport
	    }
	    top.MyApp.OpenDlg("Alert", ["Alerte", "Exporter already APPROUVED \nInsertion success !!"]);
	   } else if (nRejDir > 0) {
	    top.MyApp.OpenDlg("Alert", ["Alerte", "Export activity Prohibited with this agent!\nPlease select another."]);
	    return false;
	   } else {
	    top.MyApp.OpenDlg("Alert", ["Alerte", "An approuval request will be sent to Back Office Team.\nPlease wait until validation"]);
	    top.MyApp.ExecuteServerScript("38802153497748", [nExpNrid, vUser, nOffer]); // HAS //SS_Cpy_MAJ_AgentExport
	    top.MyApp.SetItemValue("QuoExtFrsExport", "");
	    top.MyApp.SetItemValue("QuoExtFrsExpCd", "");
	    top.MyApp.SetItemValue("QuoExtFrsExpNrid", "");
	   }
	  } else {
	   top.MyApp.OpenDlg("Alert", ["Attention!", "An approuval request will be sent to Back Office Team. \nWould you like to continue?", "YesNo"]);
	   if (top.MyApp.AppSetting.dlgReturn[0]) {
	    top.MyApp.ExecuteServerScript("38802153497748", [nExpNrid, vUser, nOffer]); //SS_Cpy_MAJ_AgentExport
	    top.MyApp.SetItemValue("QuoExtFrsExport", "");
	    top.MyApp.SetItemValue("QuoExtFrsExpCd", "");
	    top.MyApp.SetItemValue("QuoExtFrsExpNrid", "");
	   } else {
	    return false;
	   }
	  }
	 }
	}
	// HAS DEB 23/12/2020 : Identification agent export et lancement demande approbation BO
	
		//PS_Quo_Sht_Dem_Derog
	// Detail taquet
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtMntDerogNego", "blnModified")) {
	 var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	 var vDeviseDerog = top.MyApp.GetItemValue("QuoExtDeviseDepassDerog");
	 var vDepass = top.MyApp.GetItemValue("QuoExtValDepassDerog");
	 var vMntDerogNego = top.MyApp.GetItemValue("QuoExtMntDerogNego");
	 var vMargeTq = top.MyApp.GetItemValue("QuoExtMntDerogMarge");
	 var vTotDerog = top.MyApp.GetItemValue("QuoExtTotValDerog").replace(/,/g, ".");
	 if (vTypeDerog != '' && vTypeDerog != null && vTypeDerog != undefined) {
	  var vProformaTqt = top.MyApp.GetItemValue("QuoExtValeurProforma");
	  var vDeviseProformaTqt = top.MyApp.GetItemValue("QuoExtDeviseProforma");
	  var vValeurAchatTqt = top.MyApp.GetItemValue("QuoExtValeurAchat1");
	  var vDeviseAchatTqt = top.MyApp.GetItemValue("QuoExtDeviseAchat");
	  var vValMargeNegoTqt = top.MyApp.GetItemValue("QuoExtValMargeNego");
	  var vDeviseMargeTqt = top.MyApp.GetItemValue("QuoExtDeviseMarge");
	  // importer données taquet
	  if (vProformaTqt != '') top.MyApp.SetItemValue("QuoExtMntDerogPi", vProformaTqt);
	  if (vDeviseDerog != '') top.MyApp.SetItemValue("QuoExtDeviseDerogPi", vDeviseDerog);
	  if (vValeurAchatTqt != '') top.MyApp.SetItemValue("QuoExtMntDerogTq", vValeurAchatTqt);
	  if (vDeviseDerog != '') top.MyApp.SetItemValue("QuoExtDeviseDerogTq", vDeviseDerog);
	  if (vValMargeNegoTqt != '') top.MyApp.SetItemValue("QuoExtMntDerogMarge", vValMargeNegoTqt);
	  if (vDeviseDerog != '') top.MyApp.SetItemValue("QuoExtDeviseDerogMarge", vDeviseDerog);
	  var ConvDerogDepass = top.MyApp.GetItemValue("QuoExtValDepassDerog").replace(/,/g, ".");
	  var ConvDerogNego = top.MyApp.GetItemValue("QuoExtMntDerogNego").replace(/,/g, ".");
	  var ConvMarge = top.MyApp.GetItemValue("QuoExtMntDerogMarge").replace(/,/g, ".");
	  var ConvDepass = 0;
	  if (ConvDerogNego != '' && ConvDerogNego != null && ConvDerogNego != undefined) {
	   ConvDepass = ConvDerogNego;
	  } else {
	   ConvDepass = ConvDerogDepass;
	  }
	  if (vTotDerog == '') vTotDerog = '0';
	  vTotDerog = parseFloat(vTotDerog);
	  var MargeDepass = ConvMarge - ConvDepass - vTotDerog;
	  //top.MyApp.OpenDlg("Alert", ["Attention", "La marge aprés dépassement est : "+MargeDepass+"."]);
	  if (MargeDepass < 0) {
	   top.MyApp.SetItemValue("QuoExtFlagDepassDerog", '1');
	  } else {
	   top.MyApp.SetItemValue("QuoExtFlagDepassDerog", '0');
	  }
	  //top.MyApp.fraMenuBar.Execute("R_Save");
	 }
	}
		//email litige
	try {
	    //var vSender = top.MyApp.UserSetting.Settings.EMail;
	    var vSender = "litiges@ozeol.com";
	    var vTypeLtg = top.MyApp.GetItemValue("QuoExtTypeLtg");
	    if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtTypeLtg", "blnModified") && vTypeLtg != '' && vTypeLtg != null && vTypeLtg != undefined ) {
	        /*if (vComm == "" || vComm == undefined) {
	            top.MyApp.OpenDlg("Alert", ["", "The MailText is mandatory!"]);
	            return false;
	        }*/
	        // send email
	        var StrSMTP = "";
	        if (vNEGDest != "") {
	            var arrParam = [];
	            var vTitle = "Declared litigation - Order number : " + top.MyApp.GetItemValue("QuoExtBCClient") + " / " + top.MyApp.GetItemValue("QuoExtBCFourn");
	            StrSMTP = vSender.substr((vSender.length - 9), 9);
	            //alert(vSender);
	            arrParam[0] = vSender; //From
	            arrParam[1] = vNEGDest; //To
	            arrParam[2] =  vTLDest + ";" + vBUMDest + ";" + vValidCQDest+ ";" + vNORMSDest + ";" + vMNGSUPDest + ";" + vDIRSUPDest + ";" + vMzDest + ";" + vSender ; //CC
	            arrParam[3] = vTitle; //Title
	            //alert('From :' + arrParam[0]);;1
	            //alert('To :' + arrParam[1]);
	            //alert('CC :' + arrParam[2]);
	            var vBody = "";
	            vBody = "<p>Dear collaborator.</p>"; //Body
	            vBody += "<p><span>I would like to inform you that a litigation has just been declared.</span></p>";
	
	
	
	
	            vBody += "<p><strong>Order number :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoExtBCClient") + " / " + top.MyApp.GetItemValue("QuoExtBCFourn") + "</p>";
	            vBody += "<p><strong>Supplier :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoCpyName") + "</p>";
	            vBody += "<p><span><strong>Litigation Date :&nbsp;</strong></span>" + top.MyApp.GetItemValue("QuoExtDateLtg").substring(0,10) + "</p>";
	            vBody += "<p><strong>Litigation Type :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoExtTypeLtg") + "</p>";
	            vBody += "<p><strong>Qualif. Litige :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoExtQualifLitige") + "</p>";
	            vBody += "<p><strong>Client Litigation Status :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoExtStatutLtgClt") + "</p>";
	            vBody += "<p><strong> Litigation Status :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoExtStatLtg") + "</p>";
	            vBody += "<p><strong>Litigation Comment :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoExtCommentLtg") + "</p>";
	            vBody += "<p><strong>CP Comment :&nbsp;</strong>" + top.MyApp.GetItemValue("QuoExtCommentCpLtg") + "</p>";
	
	
	
	
	            vBody += "<p>You can check your Selligent litigation tab for tracking.</p><p>An investigation report will be shared if the litigation is proven.</p>";
	            
	            vBody += "<br/><br />" + "Thanks." +"<br/><br />" + "Have a nice day." + "<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	
	
	
	
	            arrParam[4] = vBody;
	            //arrParam[4] = "Hello new litigation";
	            arrParam[5] = StrSMTP; //smtpServer
	
	
	
	
	            /*arrParam[0] = "hassen.bouzouita@ozeol.com"; //From
	            arrParam[1] = "bouzouita.hasen@gmail.com"; //To
	            arrParam[2] = ""; //CC
	            arrParam[3] = "My email Subject";
	            arrParam[4] = "Hello my Email Body.";
	            arrParam[5] = "ozeol.com";*/
	            var str_Ret = top.MyApp.ExecuteServerScript(37959387709614, arrParam); //_gfctSendMail
	            if (str_Ret == true || str_Ret == "mail envoyé") {
	                alert("The email was correctly sent to the address: " + vNEGDest);
	            } else {
	                top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sendimg issue : " + str_Ret]);
	                return false;
	            }
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Attention", "Destination email is missing !!"]);
	            return false;
	        }
	    }
	} catch (e) {
	    alert("WDS_Action_Email: " + e.message);
	}
	
		
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog1", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog2", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog3", "blnModified")) {
	    __PS_Quo_Sht_JQuery();
	}
}