function PS_Acn_OnBeforeUpdate()
{
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	 _oCurWnd = top.MyData_View;
	} else {
	 _oCurWnd = top.MyApp.wizardWindow;
	}
	var cpyNrid = top.MyApp.GetItemValue("AcnCpyNRID");
	var strType = top.MyApp.GetItemValue("AcnType", top.MyData_View);
	var strComm = top.MyApp.GetItemValue("AcnExtCommentaire", top.MyData_View);
	var strProfileInitials = top.MyApp.UserSetting.User.ProfileInitials;
	var strMntEsc = top.MyApp.GetItemValue("AcnExtMontantEsc", top.MyData_View);
	var strObjet = top.MyApp.GetItemValue("AcnNature", top.MyData_View);
	var strStatus = top.MyApp.GetItemValue("AcnStatus", top.MyData_View);
	var strSalon = top.MyApp.GetItemValue("AcnExtListeSalon", top.MyData_View);
	var strDescrLot = top.MyApp.GetItemValue("AcnSubject", top.MyData_View);
	var strAtypic = top.MyApp.GetItemValue("AcnExtAtypique", top.MyData_View);
	var strHeureClot = top.MyApp.GetItemValue("AcnExtHeureCloture", top.MyData_View);
	var strPersonneClot = top.MyApp.GetItemValue("AcnExtPersonneCloture", top.MyData_View);
	var vEmail = top.MyApp.GetItemValue("AcnExtMailContact", top.MyData_View);
	var strProfileName = top.MyApp.UserSetting.User.Name;
	
	
	//HICH DEB : Obligation selection contact
	
	 var vContact = top.MyApp.GetItemValue("AcnPerName", top.MyData_View);
	
	if (strStatus == "FAIT" && (vContact == "" || vContact == null)) {
	
	  top.MyApp.OpenDlg("Alert", ["Attention", "Please select a contact before closing action"]);
	  return false;
	 
	}
	
	//HICH FIN : Obligation selection contact
	
	
	
	//HAS DEB : Ajouter un contrôle sur enregistrement de la qualification avant cloture de l'action
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "AcnStatus", "blnModified")) {
	 var vStatus = top.MyApp.GetItemValue("AcnStatus", top.MyData_View);
	 if (strObjet == 'TEL' && vStatus == 'FAIT' && top.MyApp.GetItemValue("AcnExtFlagComunik") == '1') {
	  // top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] +  "DONE"]);
	  top.MyApp.OpenDlg("Alert", ["Attention", "Please keep status TO DO when you qualifiy the call \nThen you can complete the ation."]);
	  //  top.MyApp.SetItemValue("AcnStatus", "A FAIRE");
	  return false;
	 }
	}
	//HAS END : Ajouter un contrôle sur enregistrement de la qualification avant cloture de l'action
	
	
	/*[D]Blocage TEL*/
	try {
	 // SS Acn - Contrôle de saisie champ "numéro de téléphone"
	 //var indicatif = top.MyApp.GetItemValue("AcnExtIndicatif",top.MyData_View)
	 var telNbr = top.MyApp.GetItemValue("AcnExtTelephone", top.MyData_View)
	 var re = /^\d+$/;
	 var vobjet = top.MyApp.GetItemValue("AcnNature");
	 var vflagRelAuto = top.MyApp.GetItemValue("AcnExtRelanceAuto");
	 var vnrid = top.MyApp.GetItemValue("AcnAcnNRID");
	 var strProfile = top.MyApp.UserSetting.User.ProfileInitials;
	 var inEdit = top.MyApp.FindItem("AcnNature", top.MyData_View).disabled;
	
	 if (vobjet == 'PROPO' && inEdit == false && strProfile != 'ADMT' && strProfile != 'ADMF') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["L’action ne peut pas être remplacée par : PROPO"]]);
	  return false;
	 }
	
	 if (vobjet != 'PROPO') {
	  top.MyApp.SetItemValue("AcnExtRelanceAuto", 0);
	 }
	} catch (e) {
	 alert(e.message);
	}
	
	/*[F]*/
	
	//Modifs RLM 08/12/14
	if (strStatus == "FAIT" && (strHeureClot == "" || strHeureClot == undefined) && (strPersonneClot == "" || strPersonneClot == undefined)) {
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
	
	  top.MyApp.CurrentSetting.Catalog["AcnExtHeureCloture"].Ed = 1;
	  top.MyApp.SetItemValue("AcnExtHeureCloture", strHeure);
	  top.MyApp.CurrentSetting.Catalog["AcnExtHeureCloture"].Ed = 0;
	  top.MyApp.SetItemValue("AcnExtPersonneCloture", strProfileName);
	 } catch (e) {
	  alert(e.message);
	 }
	}
	
	// SC ADD
	
	var vQuery = "select xetat_pepite, titulaire, xAtypique,xValidSrc from sysadm.so0 where nrid =" + cpyNrid + " ";
	var arrRes = top.MyApp._gfctExtReq(vQuery);
	var vPortfolio = arrRes[0][0];
	var vTitSoc = arrRes[0][1];
	var vFrsAtyp = arrRes[0][2];
	var vValisrc = arrRes[0][3];
	var strQual = top.MyApp.GetItemValue("AcnObject", top.MyData_View);
	
	
	/* if (arrRes[0][0] == 'SAS' && strType != 'A SUPPRIMER' && top.MyApp.UserSetting.User.ProfileInitials != "ADMT" && top.MyApp.UserSetting.User.ProfileInitials != "ADMF") {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Merci de demander la validation de votre fournisseur avant de modifier ses actions."]]);
	 return false;
	} else if (arrRes[0][0] == 'POUBELLE' && strQual != 'SORTIE POUBELLE' && top.MyApp.UserSetting.User.ProfileInitials != "ADMT" && top.MyApp.UserSetting.User.ProfileInitials != "ADMF") {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous ne pouvez pas modifier des actions pour un fournisseur POUBELLE!"]]);
	 return false;
	}*/
	if (vValisrc != 'Approuvé' && vValisrc != '' && vValisrc != null) {
	 if (strProfileInitials == "ASS_ACH") {
	  top.MyApp.OpenDlg("Alert", ["Attention", "You can not create an action without prevalidation"]);
	  return false;
	 }
	}
	
	//if (arrRes[0][0] == 'POUBELLE' && strQual != 'SORTIE POUBELLE' && strProfileInitials != "ADMT") {
	if (arrRes[0][0] == 'POUBELLE' && strQual != 'SORTIE POUBELLE' && strObjet != "ACT-SALON") {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous ne pouvez pas modifier des actions pour un fournisseur POUBELLE!"]]);
	 return false;
	}
	
	if (strObjet == 'PROPO' && strStatus == "FAIT") {
	 if (vPortfolio == 'SAS' && strAtypic != '1') {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Please ask supplier validation from Back Office before creation affair"]);
	  return false;
	 }
	}
	
	if (arrRes[0][0] != 'POUBELLE' && strQual == 'SORTIE POUBELLE') {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Ce fournisseur n'est pas en POUBELLE"]]);
	 return false;
	}
	
	// SC Add: le status doit etre fait
	if (strQual == 'SORTIE POUBELLE' && strStatus == 'A FAIRE') {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous ne pouvez pas selectionner ce status pour un "] + strQual + " "]);
	 return false;
	}
	if (strQual == 'SORTIE POUBELLE' && (strComm == "" || strComm == null)) {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas renseigné de raison pour la sortie de poubelle de la fiche (champ Commentaire)"]]);
	 return false;
	}
	
	//SC END ADD
	if (strType == 'A SUPPRIMER' && (strComm == "" || strComm == null)) {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas renseigné de raison pour la suppression de la fiche (champ Commentaire)"]]);
	 return false;
	}
	
	if (strType == 'A SUPPRIMER' && strStatus != "FAIT") {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous devez sélectionner le statut 'FAIT' pour un 'A SUPPRIMER'"]]);
	 return false;
	}
	
	var strObjet1 = top.MyApp.GetItemValue("AcnNature", top.MyData_View);
	var strSalon1 = top.MyApp.GetItemValue("AcnExtListeSalon", top.MyData_View);
	var strNote1 = top.MyApp.GetItemValue("AcnExtNote", top.MyData_View);
	if (strObjet1 == 'ACT-SALON' && strStatus == 'FAIT' && (strSalon1 == '' || strNote1 == '' || strSalon1 == null || strNote1 == null)) {
	 top.MyApp.OpenDlg("Alert", ["Attention", "The fair and the note fiche is mandatory for " + strObjet1 + "."]);
	 return false;
	}
	
	// HAS DEB 14/10/2020: controle appel et mail avant de mettre FAIT
	var vTeam = top.MyApp.CustomSetting.Equipe;
	var vListTeamValid = "PROSALIMENTAIRETUNISIE;NEGALIMENTAIRETUNISIE;LESGRYFFONDORS1;LESGRYFFONDORS2;HISPAMTEAM;PROSZAD1;PROSZAD2;PROSZAD3;PROSZAD4;PROSZAD5;PROSZAD6;TAIWANTEAM;FULLIDLE;NEGADTTUNISIE;NEGBRICOLAGEJARDINANIMALERIETUNISIE;NEGCHAUSSURETUNISIE;NEGCONFLINGERIECHOSSETTETUNISIE;NEGDPHTUNISIE;NEGEGPPEMTUNISIE;NEGFULLIDLE;NEGJOUETTUNISIE;NEGLMTUNISIE;NEGMAROACCESSTUNISIE;NEGMEUBLEDECOTUNISIE;NEGPAPETERIETUNISIE;NEGPUERICULTURETUNISIE;NEGSPORTTUNISIE;NEGTUNISIEMARSEILLE;PROSADTTUNISIE;PROSBRICOLAGEJARDINANIMALERIETUNISIE;PROSCHAUSSURETUNISIE;PROSCONFLINGERIECHAUSSETTESTUNISIE;PROSDPHTUNISIE;PROSEGPEPMTUNISIE;PROSFULLIDLE;PROSJOUETTUNISIE;PROSLMTUNISIE;PROSMAROACCESSTUNISIE;PROSMEUBLEDECOTUNISIE;PROSPAPETERIETUNISIE;PROSPEPINIERETUNISIE;PROSPUERICULTURETUNISIE;PROSSPORTTUNISIE;PROSTUNISIEMARSEILLE;NEGMARSEILLE;PROSMARSEILLE;PROSE-COMMERCE;NEGE-COMMERCE;PROSTUNISIE;NEGTUNISIE";
	var vFlagAppel = top.MyApp.GetItemValue("AcnExtFlagAppel", top.MyData_View);
	var vFlagMail = top.MyApp.GetItemValue("AcnExtFlagMail", top.MyData_View);
	//if (strProfile == 'ADMT' || vListTeamValid.indexOf(vTeam) != -1) {
	if (vListTeamValid.indexOf(vTeam) != -1) {
	 if (strStatus == "FAIT") {
	  if (strObjet1 == 'TEL' && strQual != 'PROSPECT' && (vFlagAppel == '' || vFlagAppel == null || vFlagAppel == undefined)) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "You need to make a qualified call to complete this action."]);
	   return false;
	  }
	  if (strObjet1 == 'MAIL' && vFlagMail != '1') {
	   top.MyApp.OpenDlg("Alert", ["Attention", "You need to send an email to complete this action."]);
	   return false;
	  }
	 }
	}
	// HAS END 14/10/2020: controle appel et mail avant de mettre FAIT
	
	if (strType == 'LOT DETECTE' && strDescrLot == '') {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Le Descriptif du lot est obligatoire."]]);
	 return false;
	}
	
	// check if event day is in either today or in the future
	
	var dateE = top.MyApp.GetItemValue("AcnStartDate");
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
	if (aujourdhuiCompare > dateES && top.MyApp.UserSetting.User.ProfileInitials != "ADMT" && top.MyApp.UserSetting.User.ProfileInitials != "ADMF") {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous ne pouvez pas sélectionner une date antérieur."]]);
	 return false;
	}
	
	
	
	// HAS : Deb : 25/12/2018 - vérifier si l'interlocuteur a toujours 7 jours accès pour créer des relances
	var vCreateur = '';
	var vProspecteur = top.MyApp.GetItemValue("AcnExtProsp");
	var vAcheteur = top.MyApp.GetItemValue("AcnExtAcheteur");
	
	
	if (vProspecteur != null && vProspecteur != '') {
	 vCreateur = vProspecteur;
	} else if (vAcheteur != null && vAcheteur != '' && (vProspecteur == '' || vProspecteur == null)) {
	 vCreateur = vAcheteur;
	}
	//top.MyApp.OpenDlg("Alert", ["Attention", "La personne traitee dans la requete est :" + vCreateur]);
	
	
	var vSQL2 = " select TOP 1 Expired , xaffair, PAccess, xvalideur from sysadm.xso4  where Acht= '" + vCreateur + "' and so0_nrid='" + top.MyApp.GetItemValue("AcnCpyNRID") + "' and template is null order by dmod desc ";
	
	var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	var vExpired = arrRes2[0][0];
	var vXaffair = arrRes2[0][1];
	var vPAccess = arrRes2[0][2];
	var vUserValid = arrRes2[0][3];
	
	
	
	
	
	//top.MyApp.OpenDlg("Alert", ["Attention", "La TOP 1 de date entrée est :" + dateES ]);
	if (arrRes2.length == 1) {
	 if (top.MyApp.UserSetting.User.Name.toUpperCase() != vTitSoc.toUpperCase() && vCreateur.toUpperCase() != vTitSoc.toUpperCase()) {
	  var vMarge = aujourdhuiCompare - dateES;
	  /* if (vPAccess != 1 && (vXaffair == 1 || (vXaffair != 1 && vExpired == 1))) {
	      //top.MyApp.OpenDlg("Alert", ["Attention", "le delai entre la date interlocuteur et date du jour est"+vMarge]);
	      top.MyApp.OpenDlg("Alert", ["Attention", "Your access is expired to follow up this supplier, Please contact the Back Office Team"]);
	      return false;
	  } */
	  if ((strObjet == 'PROPO' && strStatus == 'FAIT' && vUserValid == 'Business Card') || vXaffair == 1 || (vXaffair != 1 && vExpired == 1)) {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Your access is not valid to follow up this supplier! \nPlease make access request to the Back Office Team"]);
	   return false;
	  }
	 }
	}
	// HAS : FIN : 25/12/2018 - vérifier si l'interlocuteur a un accès pour créer des relances
	
	
	
	// HAS : DEB : 10/11/2022 - si statut FAIT alors mettre à jour date courante
	if (strStatus == 'FAIT') {
	 top.MyApp.SetItemValue('AcnStartDate', new Date());
	}
	
	
	// HAS : DEB : 10/11/2022 - si statut FAIT alors mettre à jour date courante
		var vPlateau = top.MyApp.CustomSetting.Plateau;
	var vListPlateauValid = "Tunisie;ECOMMERCE;SPS;Inde";
	
	
	if (vListPlateauValid.indexOf(vPlateau) != -1) {
	
	//if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "AcnExtMailContact", "blnModified")) {
	 var vQuery = "select  top 1 Case when xVerifEmail is null then 'To Verify' else xVerifEmail end  as VerifEmail from sysadm.pe0 inner join sysadm.sp0 on sp0.pe0_nrid = pe0.nrid where so0_nrid = " + cpyNrid + " and e_mail = '" + vEmail + "' order by pe0.dmod desc ";
	 var arrRes = top.MyApp._gfctExtReq(vQuery);
	 var vStatus = arrRes[0][0];
	 alert("Selected Email address status : " + vStatus);
	 /////var vStatus = top.MyApp.GetItemValue("PerExtVerifEmail", top.MyData_View);
	 if (strStatus != 'A FAIRE'){
	  if (strType != 'A SUPPRIMER' && strType != 'INJOIGNABLE' ) {
	      if (vStatus != 'To Verify') {
	        if (vStatus != 'valid' && vStatus != 'accept_all') {
	          alert("Email address refused, please check and update!\nOperation canceled.");
	          return false;
	        }
	      } else {
	        alert("Email address not checked, please check and update if necessary!\nOperation canceled.");
	        return false;
	      }
	    }
	  } 
	}
	//}
		/*[D]Test Suede*/
	/*try{
	var strName = top.MyApp.UserSetting.User.Name;
	var strType = top.MyApp.GetItemValue("AcnType",top.MyData_View);
	var strObjet = top.MyApp.GetItemValue("AcnNature",top.MyData_View);
	var strStatus = top.MyApp.GetItemValue("AcnStatus",top.MyData_View);
	var strAcheteur = top.MyApp.GetItemValue("AcnExtAcheteur",top.MyData_View);
	var strDateDeb = top.MyApp.GetItemValue("AcnStartDate",top.MyData_View);
	var strNrid = top.MyApp.GetItemValue("AcnNRID",top.MyData_View);
	var now = new Date();
	now.setDate(now.getDate()+1);
	var year = now.getFullYear();
	var month = now.getMonth();
	var day = now.getDate();
	
	if(month < 10){month = "0"+month;}
	if(day< 10){day= "0"+day;}
	
	var dateDebCompare = strDateDeb.substring(0,4) + strDateDeb.substring(5,7) + strDateDeb.substring(8,10);
	var aujourdhuiCompare = year +""+ month +""+ day;
	
	
	var strSQLRes= "select COUNT(*) as nbLigne from sysadm.am0 t2 where t2.titulaire = '"+ strAcheteur +"' and t2.xcategorie = 'Groupe'";
	var arrRes = top.MyApp._gfctExtReq(strSQLRes);
	
	if(arrRes == 1){
	     top.MyApp.SetItemValue("AcnExtAcheteur", strName); 
	}
	if(arrRes == 1 && strObjet == 'TEL' && strStatus == 'A FAIRE' && dateDebCompare > aujourdhuiCompare){
	     top.MyApp.SetItemValue("AcnExtAcheteur", strAcheteur); 
	}
	
	
	
	}catch(e){
	     alert(e.message);
	}
	
	*/
	
	
	/*[F]*/
		//#1131 CBA 18.01.2017
	var vStatus = top.MyApp.GetItemValue("AcnStatus");
	var vContact = top.MyApp.GetItemValue("AcnPerName");
	var vCompany = top.MyApp.GetItemValue("AcnCpyName");
	
	if((vStatus != "A FAIRE")){
	     if (vContact == ""){
	          //top.MyApp.SetItemValue("AcnCpyName",vCompany );
	          top.MyApp.OpenGenDlg(["Per"],"AcnPerName",["Acn"],[["PerCpyCpyName",top.MyApp.GetItemValue("AcnCpyName")],["PerCpyCpyName","disabled","true"],["PerName","disabled","true"]]);
	 
	          if((top.MyApp.AppSetting.dlgReturn[0] == undefined) || (top.MyApp.AppSetting.dlgReturn[0] == '') )
	          {
	               top.MyApp.OpenDlg("Alert",["", top.MyApp.arrTranslations["Pour tout changement de statut de l’action, le contact est obligatoire.\nMerci de le renseigner!"]]); 
	               return false;
	          
	          }    
	     }
	
	}
		// HAS DEB 10/11/2021 : Message alerte pour dépassement de 30 actions
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "AcnStartDate", "blnModified")) {
	 var vDateDeb = top.MyApp.GetItemValue("AcnStartDate");
	 var vSQL = "select count (*) from sysadm.hi0 where template is null and hi0.titulaire  = :AcnOwner and status = 'A FAIRE' and hi0.date_deb = '"+ vDateDeb +"' ";
	 var arrRes = top.MyApp._gfctExtReq(vSQL);
	 top.MyApp.OpenDlg("Alert", ["Attention", "You already have : "+ arrRes +" actions TO DO at this date"]);
	 //if (arrRes[0][0] > 50) {
	 //top.MyApp.OpenDlg("Alert", ["Attention", "The max allowed reaffectation from sourcing is 20 \n Please complete validation for the followed suppliers"]);
	 //return false;
	 //}
	 // HAS DEB 10/11/2021 : Message alerte pour dépassement de 30 actions
	}
}