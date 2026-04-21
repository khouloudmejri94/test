function Copy_PS_Quo_OnBeforeUpdate()
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
	if (isNaN(vVolumeCBM)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "CBM can only contain numbers."]);
	  return false;
	}
	
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
	// HAS DEB : Gestion des données obligatoires sur onglet Warehouse
	/*
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
	    var OstatutWH = top.MyApp.FindItem('QuoExtStatutWH');
	    var statutWH = top.MyApp.GetItemValue('QuoExtStatutWH');
	    if (OstatutWH) {
	        if (statutWH == 'Demande Réception') {
	            top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "Mandatory");
	            top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = 1;
	            top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "Mandatory");
	            top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = 1;
	            top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "Mandatory");
	            top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = 1;
	            top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "Mandatory");
	            top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = 1;
	            top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "Mandatory");
	            top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = 1;
	            top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "Mandatory");
	            top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = 1;
	        } else {
	            top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "");
	            top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = -1;
	            top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "");
	            top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = -1;
	            top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "");
	            top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = -1;
	            top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "");
	            top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = -1;
	            top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "");
	            top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = -1;
	            top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "");
	            top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = -1;
	        }
	        vDateDemande.onchange = function () {
	            if (statutWH == 'Demande Réception') {
	                top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "Mandatory");
	                top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = 1;
	                top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "Mandatory");
	                top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = 1;
	                top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "Mandatory");
	                top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = 1;
	                top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "Mandatory");
	                top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = 1;
	                top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "Mandatory");
	                top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = 1;
	                top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "Mandatory");
	                top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = 1;
	            } else {
	                top.MyApp.SetItemAttribute("QuoExtStatutWH", "className", "");
	                top.MyApp.CurrentSetting.Catalog["QuoExtStatutWH"].Mn = -1;
	                top.MyApp.SetItemAttribute("QuoExtNomContact", "className", "");
	                top.MyApp.CurrentSetting.Catalog["QuoExtNomContact"].Mn = -1;
	                top.MyApp.SetItemAttribute("QuoExtNumTel", "className", "");
	                top.MyApp.CurrentSetting.Catalog["QuoExtNumTel"].Mn = -1;
	                top.MyApp.SetItemAttribute("QuoExtEmailWH", "className", "");
	                top.MyApp.CurrentSetting.Catalog["QuoExtEmailWH"].Mn = -1;
	                top.MyApp.SetItemAttribute("QuoExtVolumeCbmWH", "className", "");
	                top.MyApp.CurrentSetting.Catalog["QuoExtVolumeCbmWH"].Mn = -1;
	                top.MyApp.SetItemAttribute("QuoExtDateLivPrevWH", "className", "");
	                top.MyApp.CurrentSetting.Catalog["QuoExtDateLivPrevWH"].Mn = -1;
	            }
	        };
	    }
	}
	*/
	// HAS DEB : Gestion des données obligatoires sur onglet Warehouse
	 
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
	// HAS DEB : Envoyer un mail automatique au service litigation si VVCP Taquet supérieur à 20.000 USD
	/*
	var PaysList = "Afghanistan ;  Arabie Saoudite ;   Arménie ;   Azerbaïdjan ;   Bahreïn ;   Bangladesh ;  Bhoutan ;   Birmanie ;  Brunei ;  Cambodge ;  Chine ;   Corée du Nord ;   Corée du Sud ;  Émirats arabes unis ;   Géorgie ;   Inde ;  Indonésie ;   Irak ;  Iran ;  Israël ;  Japon ;   Jordanie ;  Kazakhstan ;  Kirghizistan ;  Koweït ;  Laos ;  Liban ;   Malaisie ;  Maldives ;  Mongolie ;  Népal ;   Oman ;  Ouzbékistan ;   Palestine ;   Pakistan ;  Philippines ;   Qatar ;   Singapour ;   Sri Lanka ;   Syrie ;   Tadjikistan ;   Thaïlande ;   Timor oriental ;  Turkménistan ;  Turquie ;   Vietnam ;   Yémen "
	var vPayProv = top.MyApp.GetItemValue('QuoExtPaysProvenance');
	 if (PaysList.indexOf(vPayProv) != -1){
	  IsValidPays = 1;
	 }
	var vVTaquet = top.MyApp.GetItemValue('QuoExtValeurVente1');
	var VVCPTaquet = 0;
	if (vVTaquet !='' && vVTaquet != null && vVTaquet != undefined) {
	  var VVCPTaquet = parseInt(vVTaquet);
	}
	if (VVCPTaquet >= 20000 && IsValidPays == 1) {
	top.MyApp.OpenDlg("Alert", ["Mail", "La valeur VVCP taquet est : " + VVCPTaquet]);
	  var vAcheteur = 'Hassen Bouzouita';
	  // chercher le pays de l'adresse mail de Hassen
	  var vSQL = "select e_mail from sysadm.am0 where titulaire = '" + vAcheteur + "' ";        
	  var arrRes = top.MyApp._gfctExtReq(vSQL);
	  var vEmail = arrRes.join(";");
	  
	  if (arrRes.length >= 1) {
	    var arrParam = []
	    arrParam[0] = "selligent@ozeol.com"; //From 
	    arrParam[1] = vEmail + ";hichem.bouzaiene@ozeol.com" ; //To
	    arrParam[2] = "Notification for New Offer: " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd)  + " - Affair : " + top.MyApp.GetItemValue('QuoOppReference', _oCurWnd)  ; //Title
	    arrParam[3] = "Bonjour Neji, <br /><br />Une nouvelle fiche taquet a été intégrée selon les règles de notification : Pays Asie + Montant VVCP > 20.000 USD :<br /><br />" + "Affaire : " + top.MyApp.GetItemValue('QuoOppReference', _oCurWnd) + "<br /><br />" + "Offre : " +  top.MyApp.GetItemValue('QuoCustReference', _oCurWnd)  + "<br /><br />Cordialement,<br /><br />SELLIGENT. Dept. "; //Body
	    var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	    if (str_Ret == true || str_Ret == "True") {
	      top.MyApp.OpenDlg("Alert", ["Notification", "Une notification vient d'être envoyée à l'adresse : " + vEmail]);
	    } else {
	      top.MyApp.OpenDlg("Alert", ["Erreur", "Problème envoi mail automatique : " + str_Ret]);
	    }
	  } else {
	    top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail"]);
	  }
	}
	*/
	/*
	// HAS DEB : Envoyer un mail automatique au service litigation si VVCP Taquet supérieur à 20.000 USD
	var PaysList = "Afghanistan ;  Arabie Saoudite ;   Arménie ;   Azerbaïdjan ;   Bahreïn ;   Bangladesh ;  Bhoutan ;   Birmanie ;  Brunei ;  Cambodge ;  Chine ;   Corée du Nord ;   Corée du Sud ;  Émirats arabes unis ;   Géorgie ;   Inde ;  Indonésie ;   Irak ;  Iran ;  Israël ;  Japon ;   Jordanie ;  Kazakhstan ;  Kirghizistan ;  Koweït ;  Laos ;  Liban ;   Malaisie ;  Maldives ;  Mongolie ;  Népal ;   Oman ;  Ouzbékistan ;   Palestine ;   Pakistan ;  Philippines ;   Qatar ;   Singapour ;   Sri Lanka ;   Syrie ;   Tadjikistan ;   Thaïlande ;   Timor oriental ;  Turkménistan ;  Turquie ;   Vietnam ;   Yémen "
	var vPayProv = top.MyApp.GetItemValue('QuoExtPaysProvenance');
	var IsValidPays = 0;
	var vAcheteur = top.MyApp.GetItemValue('QuoExtAcht');
	var vAlert = top.MyApp.GetItemValue('QuoExtAlertCmd');
	if (PaysList.indexOf(vPayProv) != -1) {
	  IsValidPays = 1;
	}
	var vVTaquet = top.MyApp.GetItemValue('QuoExtValeurVente1');
	var VVCPTaquet = 0;
	if (vVTaquet != '' && vVTaquet != null && vVTaquet != undefined) {
	  var VVCPTaquet = parseInt(vVTaquet);
	}
	if (VVCPTaquet >= 20000 && IsValidPays == 1 && vAlert != 1) {
	  top.MyApp.OpenDlg("Alert", ["Mail", "La valeur VVCP taquet est : " + VVCPTaquet]);
	  var vAdmin = 'Hassen Bouzouita';
	  // chercher le pays de l'adresse mail de Hassen
	  var vSQL = "select e_mail from sysadm.am0 where titulaire = '" + vAdmin + "' ";
	  var arrRes = top.MyApp._gfctExtReq(vSQL);
	  var vEmail = arrRes.join(";");
	  if (arrRes.length >= 1) {
	    var arrParam = [];
	    arrParam[0] = "selligent@ozeol.com"; //From 
	    arrParam[1] = vEmail; //+ "naji.badrouch@ozeol.com" ; //To
	    arrParam[2] = "Notification for New Offer: " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd) + " - Affair : " + top.MyApp.GetItemValue('QuoOppReference', _oCurWnd); //Title
	    arrParam[3] = "Bonjour Neji, <br /><br />Une nouvelle fiche taquet a été intégrée selon les règles de notification : Pays Asie + Montant VVCP > 20.000 USD :<br /><br />" + "Affaire : " + top.MyApp.GetItemValue('QuoOppReference', _oCurWnd) + "<br /><br />" + "Offre : " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd)  + "<br /><br />" + "Acheteur : " + top.MyApp.GetItemValue('QuoExtAcht', _oCurWnd)  + "<br /><br />" + "Manager : " + top.MyApp.GetItemValue('QuoExtManager', _oCurWnd)  + "<br /><br />" + "Fournisseur : " + top.MyApp.GetItemValue('QuoCpyName', _oCurWnd)  + "<br /><br />" + "Valeur Vente CP : " + top.MyApp.GetItemValue('QuoExtValeurVente1', _oCurWnd) + " " +  top.MyApp.GetItemValue('QuoExtDeviseVente', _oCurWnd)  + "<br /><br />" + "Pays provenance : " + top.MyApp.GetItemValue('QuoExtPaysProvenance', _oCurWnd)  + "<br /><br />" + "Famille de produit : " + top.MyApp.GetItemValue('QuoExtFamille', _oCurWnd)  + "<br /><br />" + "Statut Offre : " + top.MyApp.GetItemValue('QuoExtStatOff', _oCurWnd)  + "<br /><br />Cordialement,<br /><br />SELLIGENT. Dept. "; //Body
	    var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	    if (str_Ret == true || str_Ret == "True") {
	      top.MyApp.OpenDlg("Alert", ["Notification", "Une notification vient d'être envoyée à l'adresse : " + vEmail]);
	      top.MyApp.SetItemValue("QuoExtAlertCmd", "1");
	    } else {
	      top.MyApp.OpenDlg("Alert", ["Erreur", "Problème envoi mail automatique : " + str_Ret]);
	    }
	  } else {
	    top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail"]);
	  }
	}
	// HAS END : Envoyer un mail automatique au service litigation si VVCP Taquet supérieur à 20.000 USD
	*/
	
	
	
	// HAS DEB : achat 2020 RG champ MDM obligatoire pour faire demande PC - seulement pour OZEOL Tunisie
	
	var vMDM = top.MyApp.GetItemValue('QuoExtDateMDM');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailDemande", "blnModified")) {
	  top.MyApp.CustomSetting.QuoIsUpdatedStatus = true;
	var vAcheteur = top.MyApp.GetItemValue('QuoExtAcht');
	var StrSQL = "select xplateau from sysadm.am0 where Template is null and titulaire = '" + vAcheteur + "' ";
	var arrRes = top.MyApp._gfctExtReq(StrSQL);
	  if (arrRes.length > 0 && arrRes == 'Tunisie'){
	    if (vMDM == '' || vMDM == null || vMDM == undefined) {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Thanks to complete the Merchandise availability date before requesting to place order"]);
	      return false;
	    }
	  }
	}
	// HAS DEB : achat 2020 RG champ MDM obligatoire pour faire demande PC
	
	// HAS DEB : 28/01/2020 -  Achat 2020 RG champ MDM SCH obligatoire pour faire demande déposit
	/*var vMDMSCH = top.MyApp.GetItemValue('QuoExtDateMDMSCH');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailsDem", "blnModified")) {
	  top.MyApp.CustomSetting.QuoIsUpdatedStatus = true;
	var vSupChn = top.MyApp.GetItemValue('QuoExtSupChain');
	var StrSQL = "select xplateau from sysadm.am0 where Template is null and titulaire = '" + vSupChn + "' ";
	var arrRes = top.MyApp._gfctExtReq(StrSQL);
	  if (arrRes.length > 0 && arrRes == 'Tunisie'){
	    if (vMDMSCH == '' || vMDMSCH == null || vMDMSCH == undefined) {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Thanks to complete the Merchandise availability date before requesting Deposit"]);
	      return false;
	    }
	  }
	}*/
	// HAS END  : 28/01/2020 - Achat 2020 RG champ MDM SCH obligatoire pour faire demande PC
	// HAS DEB : 28/01/2020 -  Achat 2020 RG champ MDM SCH obligatoire pour faire demande déposit
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vMDMSCH = top.MyApp.GetItemValue('QuoExtDateMDMSCH');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailsDem", "blnModified")) {
	  top.MyApp.CustomSetting.QuoIsUpdatedStatus = true;
	  
	  if (vProf == 'LEAD_SUP_CHN' || vProf == 'ASS_SUP_CHN') {
	    if (vMDMSCH == '' || vMDMSCH == null || vMDMSCH == undefined) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Thanks to complete the Merchandise availability date before requesting Deposit"]);
	        return false;
	    }
	  }
	}
	// HAS END  : 28/01/2020 - Achat 2020 RG champ MDM SCH obligatoire pour faire demande PC
	
	
	
	// HAS DEB : achat 2020 RG champ MDM obligatoire pour faire demande PC - seulement pour OZEOL Tunisie
	
	var vMDM = top.MyApp.GetItemValue('QuoExtDateMDM');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailDemande", "blnModified")) {
	  top.MyApp.CustomSetting.QuoIsUpdatedStatus = true;
	var vAcheteur = top.MyApp.GetItemValue('QuoExtAcht');
	var StrSQL = "select xplateau from sysadm.am0 where Template is null and titulaire = '" + vAcheteur + "' ";
	var arrRes = top.MyApp._gfctExtReq(StrSQL);
	  if (arrRes.length > 0 && arrRes == 'Tunisie'){
	    if (vMDM == '' || vMDM == null || vMDM == undefined) {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Thanks to complete the Merchandise availability date before requesting to place order"]);
	      return false;
	    }
	  }
	}
	// HAS DEB : achat 2020 RG champ MDM obligatoire pour faire demande PC
	
	
	
	 
	
	// HAS DEB : Envoyer un mail automatique au service Passage commande si sort de standby et redemande PassCmd
	var vDateSbCmd = top.MyApp.GetItemValue('QuoExtCmdSBdate');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDetailDemande", "blnModified") && vDateSbCmd != '' && vDateSbCmd != null  && vDateSbCmd != undefined ) {
	
	  top.MyApp.CustomSetting.QuoIsUpdatedStatus = true
	  //top.MyApp.OpenDlg("Alert", ["Mail", "La valeur VVCP taquet est : " + VVCPTaquet]);
	  var vAcht = top.MyApp.UserSetting.User.Name;
	  var vDest = 'gestion.commande@ozeol.com';// 'gestion.commande@ozeol.com'; // 'hichem.bouzaiene@ozeol.com'
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
	
	 
		if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog1", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog2", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog3", "blnModified")) {
	 var vStat1 = top.MyApp.GetItemValue("QuoExtStatDerog1");
	 var vStat2 = top.MyApp.GetItemValue("QuoExtStatDerog2");
	 var vStat3 = top.MyApp.GetItemValue("QuoExtStatDerog3");
	 var vRep = top.MyApp.UserSetting.User.Name;
	 var vEmailRep = top.MyApp.UserSetting.Settings.EMail;
	 var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	 var vAcht = top.MyApp.GetItemValue("QuoExtAcht");
	 var vManager = top.MyApp.GetItemValue("QuoExtManager");
	 var vTotDerog = top.MyApp.GetItemValue("QuoExtTotValDerog").replace(/,/g, ".");
	 var ConvDepass = top.MyApp.GetItemValue("QuoExtValDepassDerog").replace(/,/g, ".");
	 if (vTotDerog == '') vTotDerog = '0';
	 vTotDerog = parseFloat(vTotDerog);
	 ConvDepass = parseFloat(ConvDepass);
	 if (vStat1 == 'Approuvé' || vStat2 == 'Approuvé' || vStat3 == 'Approuvé') {
	  vTotDerog += ConvDepass;
	  top.MyApp.SetItemValue("QuoExtTotValDerog", vTotDerog);
	 }
	 if ((vStat1 != '' && vStat1 != null && vStat1 != undefined) || (vStat2 != '' && vStat2 != null && vStat2 != undefined) || (vStat3 != '' && vStat3 != null && vStat3 != undefined)) {
	  var vSQLdest1 = "SELECT cast(STUFF (  (SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50))  ";
	  vSQLdest1 += "from sysadm.am0 mng_ach  ";
	  vSQLdest1 += "inner join sysadm.set_us1 prof on prof.nom = mng_ach.titulaire ";
	  vSQLdest1 += "inner join sysadm.res_liees res_mng on res_mng.personne = mng_ach.titulaire ";
	  vSQLdest1 += " inner join sysadm.am0 ach on ach.team_name = res_mng.vue_equipe ";
	  vSQLdest1 += "where ";
	  vSQLdest1 += "ach.template is null  ";
	  vSQLdest1 += "and mng_ach.template is null ";
	  vSQLdest1 += "and mng_ach.bactive = '1' ";
	  vSQLdest1 += "and prof.set_us_profile_init = 'MNG_ACH_OPR' ";
	  vSQLdest1 += "and ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' ";
	  vSQLdest1 += "   FOR XML PATH('') ),1, 1, '') AS varchar(1000)) as Famille ";
	  var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	  var vBUMDest = arrResDest.join(";");
	  var vSQLdest1 = "select (select e_mail from sysadm.am0 where Template is null and titulaire = '" + vManager + "'),(select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "')  ";
	  var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	  var vTLDest = arrResDest[0][0];
	  var vNEGDest = arrResDest[0][1];
	  var vNEGTLNEGDest = arrResDest.join(";");
	  var vSQLdest1 = "select e_mail as mngz from sysadm.am0 res_mng , sysadm.am0 res_user where res_mng.team_name = res_user.team_name and res_mng.Template is null and res_mng.Template is null and res_mng.bactive =1 and res_user.bactive =1 and res_mng.fonction = 'Manager support' and res_user.titulaire = '" + top.MyApp.GetItemValue("QuoExtUserDemDerog") + "' ";
	  var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	  var vMNGZDest = arrResDest.join(";");
	  var vSQLdest1 = "select e_mail as cq from sysadm.am0 where template is null and titulaire = '" + top.MyApp.GetItemValue("QuoExtUserDemDerog") + "' ";
	  var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	  var vCQDest = arrResDest.join(";");
	  var vSQLdest1 = "select(select e_mail from sysadm.am0 dirop inner join sysadm.set_us1 prof on prof.nom = dirop.titulaire where dirop.Template is null and prof.titre = 'Directeur operations'),(select e_mail from sysadm.am0 dirsup inner join sysadm.set_us1 prof on prof.nom = dirsup.titulaire where dirsup.Template is null and prof.titre = 'directeur support') ";
	  var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	  var vDIROPDest = arrResDest[0][0];
	  var vDIRSUPDest = arrResDest[0][1];
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
		// HAS DEB 18/06/2020 - Gestion des derogation sur mode de paiement
	var vDateDemPC = top.MyApp.GetItemValue("QuoExtDateDemande", _oCurWnd);
	var vPaymTerm = top.MyApp.GetItemValue("QuoExtDelPai", _oCurWnd);
	var vPrchPI = top.MyApp.GetItemValue("QuoExtValeurProforma");
	var vPrchPIDev = top.MyApp.GetItemValue("QuoExtDeviseProforma");
	//var strSQLRes = "select Derog, Prc_Pmnt, MaxDep from sysadm.dcx01 where label = '" + top.MyApp.GetItemValue("QuoExtDelPai") + "'";
	var strSQLRes = "SELECT Derog, Prc_Pmnt, MaxDep from sysadm.dcx01 inner join sysadm.x_Zone on x_Zone.Zone = dcx01.Authorise inner join sysadm.dc0 on dc0.xpaysprovenance = x_Zone.country where label = '" + top.MyApp.GetItemValue("QuoExtDelPai") + "' and dc0.nrid = :nDocNRID ";
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	var vTypeDerog = arrRes[0][0];
	var vPrc = arrRes[0][1];
	var vMax = arrRes[0][2];
	var vMaxDep = parseInt(vMax);
	/*
	var nMaxDep = 0;
	if !(isNaN(vMaxDep)) {
	  nMaxDep = parseInt(vMaxDep);
	}*/
	//top.MyApp.OpenDlg("Alert", ["Attention", "Le valeur max deposit est -- " + vMaxDep]);
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtDelPai", "blnModified")) {
	
	 // HAS DEB: 17/08/2020 -  Ajouter un champ qualification de recherche de type dérogation
	 var vQualifDerog = '';
	 switch (vTypeDerog) {
	  case '0':
	   vQualifDerog = 'Sans derogation';
	   break;
	  case '1':
	   vQualifDerog = 'Simple';
	   break;
	  case '2':
	   vQualifDerog = 'Double';
	   break;
	  default:
	   '';
	 }
	 top.MyApp.SetItemValue("QuoExtTypeDerogMdp", vQualifDerog);
	 // HAS END: 17/08/2020 -  Ajouter un champ qualification de recherche de type dérogation
	
	 if (vPaymTerm == '--------') {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Please select a correct payment term"]);
	  return false;
	 }
	 //var vUser = top.MyApp.UserSetting.User.Name;
	 //initialiser le montant despoit estimé
	 top.MyApp.SetItemValue("QuoExtDepMdp", '0');
	 top.MyApp.SetItemValue("QuoExtValAchDerogMdp", '');
	 top.MyApp.SetItemValue("QuoExtValDirDerogMdp", '');
	 top.MyApp.SetItemValue("QuoExtDemDerogMdp", "0");
	 if (vPaymTerm != '' && vPaymTerm != null && vPaymTerm != undefined) {
	  // HAS DEB 18/06/2020 - Controle vaeur proformat différents de vide et de zéro
	  if (vPrc != '' && vPrc != null && vPrc != undefined) {
	   if (vPrchPI == '' || vPrchPI == null || vPrchPI == undefined || vPrchPI == '0') {
	    top.MyApp.OpenDlg("Alert", ["Attention", "The purchase price PI is mandatory \n Please complete the taquet file and retry"]);
	    return false;
	   } else {
	    var nPrc = parseInt(vPrc);
	    var nPrchPI = parseInt(vPrchPI);
	    if (vPrc != '' && vPrc != null && vPrc != undefined) {
	     //top.MyApp.OpenDlg("Alert", ["Attention", "Le valeur PI est -- " + nPrchPI]);
	     //top.MyApp.OpenDlg("Alert", ["Attention", "Le pourcentage de derogation est -- " + nPrc]);
	     var vDepEstim = (nPrchPI * nPrc) / 100;
	     top.MyApp.SetItemValue("QuoExtDepMdp", vDepEstim);
	     if (vTypeDerog == '0' && vMaxDep > 0 && vDepEstim > vMaxDep) {
	      //top.MyApp.OpenDlg("Alert", ["Attention", "The estimated deposit amount is higher than possible \n you will be converted to type DOUBLE"]);
	      vTypeDerog = '2';
	      top.MyApp.SetItemValue("QuoExtTypeDerogMdp", 'Double');
	     }
	     /* if (vTypeDerog == '0' && vMaxDep > 0 && vDepEstim > vMaxDep) {
	      top.MyApp.OpenDlg("Alert", ["Attention", "The estimated deposit amount is higher than " + vMaxDep + "\n Please select another payment term."]);
	      return false;
	     } else {
	      top.MyApp.SetItemValue("QuoExtDepMdp", vDepEstim);
	     } */
	    }
	   }
	  }
	  // HAS DEB 18/06/2020 - Controle vaeur proformat différents de vide et de zéro
	  top.MyApp.OpenDlg("Alert", ["Attention", "NECESSITE DEROGATION -- " + arrRes[0][0]]);
	  if (vTypeDerog != '0') {
	   top.MyApp.OpenDlg("Alert", ["Confirm", "The Payment term require derogation request to be accepted \n do you want to continue?", "YesNo"]);
	   var vResp = top.MyApp.AppSetting.dlgReturn[0];
	   if (vResp) {
	    top.MyApp.SetItemValue("QuoExtDemDerogMdp", "1");
	    //top.MyApp.SetItemValue("QuoExtUserDemDerogMdp", vUser);
	    //top.MyApp.OpenDlg("Alert", ["Attention", "The derogation request will be sent by Email for validation -- "]);
	    // email de l'acheteur
	    var vAcht = top.MyApp.UserSetting.User.Name;
	    var vSQLAch = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "' ";
	    var arrResAch = top.MyApp._gfctExtReq(vSQLAch);
	    var vEmailAch = arrResAch.join(";");
	    var arrParam = [];
	    if (arrResAch.length >= 1) {
	     arrParam[0] = arrResAch; //From
	    } else {
	     top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail de l'acheteur"]);
	     return false;
	    }
	    // ajouter bloc envoi de mail vers valideurs
	    var MySql = "";
	    MySql += "SELECT  cast(STUFF (  (SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50))  ";
	    MySql += "from sysadm.am0 mng_ach  ";
	    MySql += "inner join sysadm.set_us1 prof on prof.nom = mng_ach.titulaire  ";
	    MySql += "inner join sysadm.res_liees res_mng on res_mng.personne = mng_ach.titulaire ";
	    MySql += "inner join sysadm.am0 ach on ach.team_name = res_mng.vue_equipe ";
	    MySql += "where ";
	    MySql += "ach.template is null ";
	    MySql += "and mng_ach.template is null ";
	    MySql += "and mng_ach.bactive = '1' ";
	    MySql += "and prof.set_us_profile_init in ('MNG_ACH_OPR', 'MAN_HA_TER', 'LEAD_NEG') ";
	    MySql += "and ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' ";
	    MySql += "   FOR XML PATH('') ),1, 1, '') AS varchar(1000)) as Famille ";
	    var strResDest = top.MyApp._gfctExtReq(MySql);
	    var vEmailDest = strResDest.join(";");
	    var vStrMail = strResDest[0][0];
	    //top.MyApp.OpenDlg("Alert", ["Attention", "Email destinatire de base -- \n" + vStrMail]);
	    if (strResDest.length >= 1) {
	     if (vTypeDerog == '2') {
	      //envoi vers valid derog Ach + Dir
	      vEmailDest += ";bill@ozeol.com;kelly@ozeol.com"; // adresse du directeur achat
	     }
	     arrParam[1] = vEmailDest; //To
	     arrParam[2] = "Request approval for payment terms - Offer :  " + top.MyApp.GetItemValue('QuoCustReference'); //Title
	     vBody = "Hello,<br /><br />" + vAcht + " request your approval for payement term:  " + top.MyApp.GetItemValue('QuoExtDelPai'); //Body
	     if (vPrc != '' && vPrc != null && vPrc != undefined) {
	      vBody += "<br /><br />The estimated despoit amout is: " + vDepEstim + " " + vPrchPIDev + " ."; //Body
	     }
	     vBody += "<br /><br /> Please check and make the response" + "<br /><br />" + "Have a nice day." + "<br /><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
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
	   } else {
	    return false;
	   }
	  }
	 }
	}
	
	// HAS DEB 18/06/2020 - Gestion des derogation sur mode de paiement
		// HAS DEB 22/06/2020 - Mail de retour pour demande derogation mode de paiement
	var vRep = top.MyApp.UserSetting.User.Name;
	var vEmailRep = top.MyApp.UserSetting.Settings.EMail
	var vAcht = top.MyApp.GetItemValue("QuoExtAcht");
	var vManager = top.MyApp.GetItemValue("QuoExtManager");
	var vDerog = top.MyApp.GetItemValue("QuoExtDelPai");
	var vDepMdp = top.MyApp.GetItemValue("QuoExtDepMdp");
	var vValAchDerogMdp = top.MyApp.GetItemValue("QuoExtValAchDerogMdp");
	var vValDirDerogMdp = top.MyApp.GetItemValue("QuoExtValDirDerogMdp");
	if ((top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValAchDerogMdp", "blnModified")) || (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValDirDerogMdp", "blnModified"))) {
	    if (vTypeDerog != '0') {
	        top.MyApp.OpenDlg("Alert", ["Attention", "NECESSITE DEROGATION DE RETOUR -- " + vTypeDerog]);
	        var arrParam = [];
	        if (vEmailRep == '' || vEmailRep == null || vEmailRep == undefined) {
	            top.MyApp.OpenDlg("Alert", ["Attention", "Il manque l'adresse mail du répondeur"]);
	            return false;
	        }
	        arrParam[0] = vEmailRep; //From
	        top.MyApp.OpenDlg("Alert", ["Attention", "Mon mail est -- " + vEmailRep]);
	        if (vTypeDerog == '1' && (vValAchDerogMdp != '' && vValAchDerogMdp != null && vValAchDerogMdp != undefined) || (vValDirDerogMdp != '' && vValDirDerogMdp != null && vValDirDerogMdp != undefined)) {
	            // email du répondeur
	            var vSQLdest1 = "select (select e_mail from sysadm.am0 where Template is null and titulaire = '" + vManager + "'),(select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "')  ";
	            var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	            var vEmailDest = arrResDest.join(";");
	            //vEmailDest += ";finance@ozeol.com";
	        }
	        if (vTypeDerog == '2' && ((vValAchDerogMdp != '' && vValAchDerogMdp != null && vValAchDerogMdp != undefined) || (vValDirDerogMdp != '' && vValDirDerogMdp != null && vValDirDerogMdp != undefined))) {
	            // email du répondeur
	            var vSQLdest1 = "select (select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "'), ";
	            vSQLdest1 += "(SELECT  cast(STUFF (  (SELECT ';' + CAST(mng_ach.e_mail AS VARCHAR(50))  ";
	            vSQLdest1 += "from sysadm.am0 mng_ach  ";
	            vSQLdest1 += "inner join sysadm.set_us1 prof on prof.nom = mng_ach.titulaire  ";
	            vSQLdest1 += "inner join sysadm.res_liees res_mng on res_mng.personne = mng_ach.titulaire ";
	            vSQLdest1 += "inner join sysadm.am0 ach on ach.team_name = res_mng.vue_equipe ";
	            vSQLdest1 += "where ";
	            vSQLdest1 += "ach.template is null ";
	            vSQLdest1 += "and mng_ach.template is null ";
	            vSQLdest1 += "and mng_ach.bactive = '1' ";
	            vSQLdest1 += "and prof.set_us_profile_init in ('MNG_ACH_OPR', 'MAN_HA_TER', 'LEAD_NEG') ";
	            vSQLdest1 += "and ach.titulaire = '" + top.MyApp.GetItemValue("QuoExtAcht") + "' ";
	            vSQLdest1 += "   FOR XML PATH('') ),1, 1, '') AS varchar(1000)) as Famille) ";
	            var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	            var vEmailDest = arrResDest.join(";");
	            vEmailDest += ";bill@ozeol.com;kelly@ozeol.com"; // adresse du directeur achat
	        }
	
	        if (vEmailDest != '' && vEmailDest != null && vEmailDest != undefined) {
	            arrParam[1] = vEmailDest; //To
	            arrParam[2] = "Request Response for payment terms - Offer :  " + top.MyApp.GetItemValue('QuoCustReference'); //Title
	            var vBody = "";
	            if (vValAchDerogMdp == 'Approuvé' || vValDirDerogMdp == 'Approuvé') {
	                vBody = "Hello. <br /><br />CONGRATULATIONS! <br /><br /> The derogation request was APPROUVED for payement term:  " + top.MyApp.GetItemValue('QuoExtDelPai'); //Body
	                vBody += "<br /><br />Please proceed to requeting to place order";
	            }
	            if (vValAchDerogMdp == 'Non approuvé'  || vValDirDerogMdp == 'Non approuvé') {
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
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtFrsExport", "blnModified")) {
	 if (vAgExport != '' && vAgExport != null && vAgExport != undefined) {
	  var strSQLRes = "select xIsExporter, xValid_Exporter from sysadm.v_so0 where template is null and nrid ='" + nExpNrid + "' ";
	  var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	  var vIsExport = arrRes[0][0];
	  var vStatExport = arrRes[0][1];
	  //alert(vIsExport);
	  //alert(vStatExport);
	  if (vIsExport == '1') {
	   if (vStatExport == 'Approuvé') {
	    top.MyApp.ExecuteServerScript("38962153497748", [nCpyNRID, nExpNrid, vCpyName, vAgExport]); //SS_Quo_Liaison_AgentExport
	    //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas le droit de créer cette action."]]);
	    top.MyApp.OpenDlg("Alert", ["Alerte", "Exporter already APPROUVED \nInsertion success !!"]);
	   } else if (vStatExport == 'Non approuvé') {
	    //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas le droit de créer cette action."]]);
	    top.MyApp.OpenDlg("Alert", ["Alerte", "Exporter already REJECTED \nPlease select another exporter"]);
	    return false;
	   } else {
	    //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas le droit de créer cette action."]]);
	    //top.MyApp.OpenDlg("Alert", ["Alerte", "Exporter request sent is pending\nPlease contact the Back Office Team for more details"]);
	    top.MyApp.OpenDlg("Alert", ["Alerte", "An approuval request will be sent to Back Office Team.\nPlease wait until validation"]);
	    top.MyApp.ExecuteServerScript("38802153497748", [nExpNrid, vUser]); // HAS //SS_Cpy_MAJ_AgentExport
	    top.MyApp.SetItemValue("QuoExtFrsExport", "");
	    top.MyApp.SetItemValue("QuoExtFrsExpCd", "");
	    top.MyApp.SetItemValue("QuoExtFrsExpNrid", "");
	   }
	  } else {
	   //top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["An approuval request will be sent to Back Office Team. \nXould you like to continue?"]])
	   top.MyApp.OpenDlg("Alert", ["Attention!", "An approuval request will be sent to Back Office Team. \nWould you like to continue?", "YesNo"]);
	   if (top.MyApp.AppSetting.dlgReturn[0]) {
	    top.MyApp.ExecuteServerScript("38802153497748", [nExpNrid, vUser]); //SS_Cpy_MAJ_AgentExport
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
		var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	//if ((Boolean(top.MyApp.Custom_DemandeDerogBtn))) {
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtValDepassDerog", "blnModified") && vTypeDerog != 'Controle qualité') {
	 var vCurrentEmail = top.MyApp.UserSetting.Settings.EMail;
	 var vAcht = top.MyApp.GetItemValue("QuoExtAcht");
	 // chercher le l'adresse mail de l'acheteur
	 var vSQLdest1 = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vAcht + "' ";
	 var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	 var vNEGDest = arrResDest[0][0];
	 //top.MyApp.Custom_DemandeDerogBtn = false;
	 top.MyApp.OpenDlg("Alert", ["Mail", "Mon adresse mail est : " + vCurrentEmail]);
	 if (arrResDest.length >= 1) {
	  var arrParam = [];
	  arrParam[0] = vCurrentEmail //"selligent@ozeol.com";  //From 
	  arrParam[1] = vNEGDest; //To
	  //arrParam[2] = "Offre " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd) + " StandBy"; //Title
	  arrParam[2] = "New derogation request to place for Offer " + top.MyApp.GetItemValue('QuoCustReference', _oCurWnd); //Title
	  arrParam[3] = "Hello, <br /><br />A new additionnal fee was inserted to your offer.<br />Please check and make the derogation request.<br /><br />" + "Have a nice day. " + "<br /><br />Sincerely,<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	  var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	  if (str_Ret == true || str_Ret == "True") {
	   top.MyApp.OpenDlg("Alert", ["Notification", "Derogation Email notification was sent to : " + vNEGDest]);
	  } else {
	   top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic email sendiing issue : " + str_Ret]);
	  }
	 } else {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Destination email missing."]);
	 }
	}
		//ENVOI MAIL WF DEROGATION
	var vRep = top.MyApp.UserSetting.User.Name;
	var vEmailRep = top.MyApp.UserSetting.Settings.EMail;
	var vTypeDerog = top.MyApp.GetItemValue("QuoExtTypeDerog");
	var vAcht = top.MyApp.GetItemValue("QuoExtAcht");
	var vManager = top.MyApp.GetItemValue("QuoExtManager");
	var vStatDerog1 = top.MyApp.GetItemValue("QuoExtStatDerog1");
	var vStatDerog2 = top.MyApp.GetItemValue("QuoExtStatDerog2");
	//var vStatDerog3 = top.MyApp.GetItemValue("QuoExtStatDerog3");
	var arrParam = [];
	var vEmailDest = "";
	var vBody = "";
	var StrDerg = "";
	switch (vTypeDerog) {
	 case 'Controle qualité':
	  vTypeDerog = 'CQ'
	  break;
	 case 'Emballage et stickers':
	  vTypeDerog = 'ES'
	  break;
	 case 'Rapport de test':
	  vTypeDerog = 'RT'
	  break;
	 case 'Transport':
	  vTypeDerog = 'TR'
	  break;
	 default:
	  vTypeDerog = ''
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog1", "blnModified") && vStatDerog1 != '' && vStatDerog1 != null && vStatDerog1 != undefined) {
	 var vTypeRep = "";
	 if (vStatDerog1 == 'Approuvé') {
	  vTypeRep = 'VL';
	  arrParam[0] = vEmailRep; //From
	  //arrParam[3] = vBody;
	  if (vTypeDerog == 'RT') {
	   StrDerg = 'Test report';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'CQ') {
	   StrDerg = 'Quality control';
	   vEmailDest = vCQDest + ';' + vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'ES') {
	   StrDerg = 'Packaging and Stickers';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'TR') {
	   StrDerg = 'Transport';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  }
	 } else if (vStatDerog1 == 'Non approuvé') { //REQ N+1
	  vTypeRep = 'AN';
	  arrParam[0] = vEmailRep; //From
	  //arrParam[3] = vBody;
	  if (vTypeDerog == 'RT') {
	   StrDerg = 'Test report';
	   vEmailDest = vBUMDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'CQ') {
	   StrDerg = 'Quality control';
	   vEmailDest = vCQDest + ';' + vNEGDest + ';' + vDIRSUPDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'ES') {
	   StrDerg = 'Packaging and Stickers';
	   vEmailDest = vBUMDest + ';' + vNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'TR') {
	   StrDerg = 'Transport';
	   vEmailDest = vBUMDest + ';' + vNEGDest;
	   arrParam[1] = vEmailDest; //To
	  }
	 } else if (vStatDerog1 == 'Refusé') {
	  vTypeRep = 'RJ';
	  arrParam[0] = vEmailRep; //From
	  //arrParam[3] = vBody;
	  if (vTypeDerog == 'RT') {
	   StrDerg = 'Test report';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'ES') {
	   StrDerg = 'Packaging and Stickers';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'TR') {
	   StrDerg = 'Transport';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  }
	 }
	 if (vStatDerog1 == 'Approuvé') {
	  vBody = "Hello. <br /><br />CONGRATULATIONS! <br /><br /> The request was APPROVED for derogation: " + StrDerg; //Body
	  vBody += "<br /><br />Please check for more details";
	  vBody += "<br/><br />" + "Have a nice day." + "<br/><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	 } else if (vStatDerog1 == 'Non approuvé') {
	  vBody = "Hello. <br /><br /> The request was NOT APPROVED for derogation: " + StrDerg; //Body
	  vBody += "<br /><br />Please check for more details";
	  vBody += "<br/><br />" + "Have a nice day." + "<br/><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	 } else if (vStatDerog1 == 'Refusé') {
	  vBody = "Hello. <br /><br /> The request was REJECTED for derogation: " + StrDerg; //Body
	  vBody += "<br /><br />Please check for more details";
	  vBody += "<br/><br />" + "Have a nice day." + "<br/><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	 }
	}
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog2", "blnModified") && vStatDerog2 != '' && vStatDerog2 != null && vStatDerog2 != undefined) {
	 var arrParam = [];
	 var vEmailDest = "";
	 var vBody = "";
	 var StrDerg = "";
	 var vTypeRep = "";
	 arrParam[0] = vEmailRep; //From
	 if (vStatDerog2 == 'Approuvé') {
	  vTypeRep = 'VL';
	  if (vTypeDerog == 'RT') {
	   StrDerg = 'Test report';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'CQ') {
	   StrDerg = 'Quality control';
	   vEmailDest = vCQDest + ';' + vMNGZDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'ES') {
	   StrDerg = 'Packaging and Stickers';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'TR') {
	   StrDerg = 'Transport';
	   vEmailDest = vNEGTLNEGDest;
	   arrParam[1] = vEmailDest; //To
	  }
	 } else if (vStatDerog2 == 'Non approuvé') { //REQ N+1
	  vTypeRep = 'AN';
	  if (vTypeDerog == 'RT') {
	   StrDerg = 'Test report';
	   vEmailDest = vNEGTLNEGDest + ';' + vDIROPDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'CQ') {
	   StrDerg = 'Quality control';
	   vEmailDest = vCQDest + ';' + vMNGZDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'ES') {
	   StrDerg = 'Packaging and Stickers';
	   vEmailDest = vNEGTLNEGDest + ';' + vDIROPDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'TR') {
	   StrDerg = 'Transport';
	   vEmailDest = vNEGTLNEGDest + ';' + vDIRSUPDest;
	   arrParam[1] = vEmailDest; //To
	  }
	 } else if (vStatDerog2 == 'Refusé') {
	  vTypeRep = 'RJ';
	  if (vTypeDerog == 'RT') {
	   StrDerg = 'Test report';
	   vEmailDest = vNEGTLNEGDest + ';' + vDIROPDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'ES') {
	   StrDerg = 'Packaging and Stickers';
	   vEmailDest = vNEGTLNEGDest + ';' + vDIROPDest;
	   arrParam[1] = vEmailDest; //To
	  } else if (vTypeDerog == 'TR') {
	   StrDerg = 'Transport';
	   vEmailDest = vNEGTLNEGDest + ';' + vDIRSUPDest;
	   arrParam[1] = vEmailDest; //To
	  }
	 }
	 if (vStatDerog2 == 'Approuvé') {
	  vBody = "Hello. <br /><br />CONGRATULATIONS! <br /><br /> The request was APPROVED for derogation: " + StrDerg; //Body
	  vBody += "<br /><br />Please check for more details";
	  vBody += "<br/><br />" + "Have a nice day." + "<br/><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	 } else if (vStatDerog2 == 'Non approuvé') {
	  vBody = "Hello. <br /><br /> The request was NOT APPROVED for derogation: " + StrDerg; //Body
	  vBody += "<br /><br />Please check for more details";
	  vBody += "<br/><br />" + "Have a nice day." + "<br/><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	 } else if (vStatDerog2 == 'Refusé') {
	  vBody = "Hello. <br /><br /> The request was REJECTED for derogation: " + StrDerg; //Body
	  vBody += "<br /><br />Please check for more details";
	  vBody += "<br/><br />" + "Have a nice day." + "<br/><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	 }
	}
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog1", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "QuoExtStatDerog2", "blnModified")) {
	 if (!(vTypeDerog == 'CQ' && vStatDerog1 == 'Refusé') && !(vTypeDerog == 'CQ' && vStatDerog2 == 'Refusé')) {
	  arrParam[2] = "Response for Derogation request - Offer :  " + top.MyApp.GetItemValue('QuoCustReference'); //Title
	  arrParam[3] = vBody;
	  if (vEmailRep == '' || vEmailRep == null || vEmailRep == undefined) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Your email address is missing, Please contact administrator"]);
	   return false;
	  }
	  // email du repondeur
	  top.MyApp.OpenDlg("Alert", ["Attention", "Mon mail est -- " + vEmailRep]);
	  // email du destinataire
	  if (vEmailDest != '' && vEmailDest != null && vEmailDest != undefined) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Destination email is -- " + vEmailDest]);
	   var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	   if (str_Ret == true || str_Ret == "True") {
	    top.MyApp.OpenDlg("Alert", ["Notification", "A notification was sent to address : " + vEmailDest]);
	   } else {
	    top.MyApp.OpenDlg("Alert", ["Erreur", "Automatic E-mail sendimg issue : " + str_Ret]);
	    return false;
	   }
	  } else {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Destination email is missing"]);
	   return false;
	  }
	 }
	}
}