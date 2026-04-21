function()
{
	try {
	 var owner = top.MyApp.UserSetting.User.Name;
	 var acht = top.MyApp.GetItemValue("AcnExtAcheteur", top.MyData_View)
	 var prosp = top.MyApp.GetItemValue("AcnExtProsp", top.MyData_View);
	 if (acht == undefined || acht == '') {
	  if (prosp == undefined || prosp == '') {
	   owner = prosp;
	  }
	 } else {
	  owner = acht;
	 }
	 var vSQL = "select count (*) from sysadm.hi0 where status='A FAIRE' and so0_nrid='" + top.MyApp.GetItemValue("AcnCpyNRID") + "' and  titulaire = '" + owner + "' and Template is null ";
	 var arrRes = top.MyApp._gfctExtReq(vSQL);
	 if (arrRes[0][0] > 0) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_ACN_TODO"]]);
	  return false;
	 }
	 /*
	     var vSQL1 = "select xaffair from sysadm.xso4 where Acht='" + top.MyApp.GetItemValue("AcnOwner") + "' and so0_nrid='" + top.MyApp.GetItemValue("AcnCpyNRID") + "' and  (xaffair != '' or xaffair is not null) and Template is null ";
	     var arrRes1 = top.MyApp._gfctExtReq(vSQL1);
	     if (arrRes1[0][0] > 0) {
	         top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas le droit de créer cette action."]]);
	         return false;
	     }
	 */
	 // SS Acn - Contrôle de saisie champ "numéro de téléphone"
	 //var indicatif = top.MyApp.GetItemValue("AcnExtIndicatif",top.MyData_View)
	
	 var telNbr = top.MyApp.GetItemValue("AcnExtTelephone", top.MyData_View)
	 var re = /^\d+$/;
	 /*if (indicatif )
	 {
	  if (!indicatif.match(re))
	  {
	  //alert("Vérifiez l'E-mail de commande, s'il vous plait.");
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le numéro de telephone, s'il vous plait."]]);
	  return false;
	  }
	  else
	  {
	    //return true;
	  }
	 }*/
	 /*if (telNbr)
	 {
	  if (!telNbr.match(re))
	  {
	  //alert("Vérifiez l'E-mail de commande, s'il vous plait.");
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le numéro de telephone, s'il vous plait."]]);
	  return false;
	  }
	  else
	  {
	    //return true;
	  }
	 }*/
	 // SC END 
	 var strType = top.MyApp.GetItemValue("AcnType", top.MyData_View);
	 var strComm = top.MyApp.GetItemValue("AcnExtCommentaire", top.MyData_View);
	 var strProfileInitials = top.MyApp.UserSetting.User.ProfileInitials;
	    var cpyNrid = top.MyApp.GetItemValue("AcnCpyNRID");
	 // SC Delete: AcnExtMontantEsc should be hidden according to Dico Action
	 /*var strMntEsc = top.MyApp.GetItemValue("AcnExtMontantEsc",top.MyData_View);*/
	 //SC End Delete:
	 var strObjet = top.MyApp.GetItemValue("AcnNature", top.MyData_View);
	 var strStatus = top.MyApp.GetItemValue("AcnStatus", top.MyData_View);
	 var strSalon = top.MyApp.GetItemValue("AcnExtListeSalon", top.MyData_View);
	 var strDescrLot = top.MyApp.GetItemValue("AcnSubject", top.MyData_View);
	 var strHeureClot = top.MyApp.GetItemValue("AcnExtHeureCloture", top.MyData_View);
	 var strPersonneClot = top.MyApp.GetItemValue("AcnExtPersonneCloture", top.MyData_View);
	 var strAtypic = top.MyApp.GetItemValue("AcnExtAtypique", top.MyData_View);
	 var strProfileName = top.MyApp.UserSetting.User.Name;
	    var vEmail = top.MyApp.GetItemValue("AcnExtMailContact", top.MyData_View);
	
	
	
	
	 //Modifs RLM 08/12/14
	 if (strStatus == "FAIT" && (strHeureClot == "" || strHeureClot == undefined) && (strPersonneClot == "" || strPersonneClot == undefined)) {
	
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
	 }
	
	
	 // SC ADD : l'utilisateur n'a pas le droit de créer une action PROPO
	 var strObjet1 = top.MyApp.GetItemValue("AcnNature", top.MyData_View);
	 if ((strObjet1 == 'PROPO' || strObjet1 == 'RDV') && strProfileInitials != 'ADMT' && strProfileInitials != 'ADMF') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas le droit de créer cette action."]]);
	  return false;
	 } else if (strObjet1 == 'PROPO' && strStatus == "FAIT") {
	  top.MyApp.SetItemValue("AcnStatus", "A FAIRE");
	 }
	 // SC End ADD:
	 // SC Delete: There's no more Type (resultat) = "Fiche Salon"
	 /*
	 if(strObjet == 'TEL' && strStatus == "FAIT" && strType == "Fiche salon" && (strSalon == "" || strSalon == null))
	 {
	      top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas renseigné le champ Salon (obligatoire lors d'une Fiche Salon)"]]);
	      return false;
	 }*/
	 // SC ADD: make sure no action is created until a company is validated
	
	 var cpyNrid = top.MyApp.GetItemValue("AcnCpyNRID");
	 var vQuery = "select xetat_pepite, titulaire, xValidSrc from sysadm.so0 where nrid =" + cpyNrid + " ";
	 var arrRes = top.MyApp._gfctExtReq(vQuery);
	 var vPortfolio = arrRes[0][0];
	 var vTitSoc = arrRes[0][1];
	 var vValisrc = arrRes[0][2];
	 //alert("vValisrc "+vValisrc);
	 var strQual = top.MyApp.GetItemValue("AcnObject", top.MyData_View);
	 /*  if (arrRes[0][0] == 'SAS' && strType != 'A SUPPRIMER') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Merci de demander la validation de votre fournisseur avant de créer des actions"]]);
	  return false;
	 } else if (arrRes[0][0] == 'POUBELLE' && strQual != 'SORTIE POUBELLE') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous ne pouvez pas créer des action pour un fournisseur en POUBELLE!"]]);
	  return false;
	 } */
	 if (vValisrc != 'Approuvé' && vValisrc != '') {
	  if (strProfileInitials != "ADMT") {
	   top.MyApp.OpenDlg("Alert", ["Attention", "You can not create an action without prevalidation"]);
	   return false;
	  }
	 }
	
	 if (arrRes[0][0] == 'POUBELLE' && strQual != 'SORTIE POUBELLE') {
	  if (strProfileInitials != "ADMT") {
	   top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous ne pouvez pas créer des action pour un fournisseur en POUBELLE!"]]);
	   return false;
	  }
	 }
	
	 if (strObjet == 'PROPO' && strStatus == "FAIT") {
	  if (vPortfolio == 'SAS' && strAtypic != '1') {
	   top.MyApp.OpenDlg("Alert", ["Attention", "Please ask supplier validation from Back Office before creating affair"]);
	   return false;
	  }
	 }
	
	 // SC END ADD
	 if (strType == 'A SUPPRIMER' && (strComm == "" || strComm == null)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas renseigné de raison pour la suppression de la fiche (champ Commentaire)"]]);
	  return false;
	 }
	 // SC Add: le status doit etre fait pour 'A SUPPRIMER'
	 if (strType == 'A SUPPRIMER' && strStatus == 'A FAIRE') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous devez selectionner le status 'FAIT' pour un "] + strType + " "]);
	  return false;
	 }
	
	 if (arrRes[0][0] != 'POUBELLE' && strQual == 'SORTIE POUBELLE') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Ce fournisseur n'est pas en POUBELLE"]]);
	  return false;
	 }
	 // SC Add: le status doit etre fait pour 'A SUPPRIMER'
	 if (strQual == 'SORTIE POUBELLE' && strStatus == 'A FAIRE') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous devez selectionner le status 'FAIT' pour un "] + strQual + " "]);
	  return false;
	 }
	 if (strQual == 'SORTIE POUBELLE' && (strComm == "" || strComm == null)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n'avez pas renseigné de raison pour la sortie de poubelle de la fiche (champ Commentaire)"]]);
	  return false;
	 }
	
	 var strObjet1 = top.MyApp.GetItemValue("AcnNature", top.MyData_View);
	 var strSalon1 = top.MyApp.GetItemValue("AcnExtListeSalon", top.MyData_View);
	 var strNote1 = top.MyApp.GetItemValue("AcnExtNote", top.MyData_View);
	 if (strObjet1 == 'ACT-SALON' && (strSalon1 == '' || strNote1 == '' || strSalon1 == null || strNote1 == null)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "The fair and the note fiche is mandatory for " + strObjet1 + "."]);
	  return false;
	 }
	 /*else if((strObjet1 != 'ACT-SALON' &&  strObjet1 != 'PROPO' )&& (strSalon1 != '' || strNote1  != '' || strSalon1 != null || strNote1  != null)) 
	    {
	     top.MyApp.OpenDlg("Alert", ["Attention", "The fair and the note fiche are only filled when Action is ACT-SALON."]);
	        return false;
	    }*/
	 // SC End Add:
	 // SC Delete: There's no more Type (resultat) = "ESCOMPTE"
	 /*
	 if(strType == 'ESCOMPTE' && strProfileInitials != 'COMP' && strProfileInitials != 'LTG' && strProfileInitials != 'ADMT' && strProfileInitials != 'ADMF')
	 {
	     top.MyApp.OpenDlg("Alert", ["Attention", "Vous n'etes pas autorisés à enregistrer ce type d'action ESCOMPTE"]);
	     return false;
	 }
	 */
	 // SC Edit: According to the Dico the "Description du Lot" is mandatory when the type is "Lot Détecté"
	 if (strType == 'LOT DETECTE' && strDescrLot == '') {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Le Descriptif du lot est obligatoire pour un "] + strType + "."]);
	  return false;
	 }
	 /*if(strObjet == 'RDV' && strStatus == 'A FAIRE' && strDescrLot == '')
	  {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Le Descriptif du lot est obligatoire pour un(e) "+strObjet+"."]);
	      return false;
	  }
	  if(strObjet == 'PROPO' && strStatus == 'FAIT' && strDescrLot == '')
	  {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Le Descriptif du lot est obligatoire pour un(e) "+strObjet+"."]);
	      return false;
	  }
	  if(strObjet == 'DIRECT' && strStatus == 'FAIT' && strDescrLot == '')
	  {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Le Descriptif du lot est obligatoire pour un(e) "+strObjet+"."]);
	      return false;
	  }
	  
	  if(strObjet == 'ACT-SALON' && strStatus == 'FAIT' && strDescrLot == '')
	  {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Le Descriptif du lot est obligatoire pour un(e) "+strObjet+"."]);
	      return false;
	  }
	  if(strObjet == 'PROPO' && strStatus == 'A FAIRE' && strDescrLot == '')
	  {
	      top.MyApp.OpenDlg("Alert", ["Attention", "Le Descriptif du lot est obligatoire pour un(e) "+strObjet+"."]);
	      return false;
	  }*/
	
	
	 // check if event day is in either today or in the future
	 /*
	  var dateE = top.MyApp.GetItemValue("AcnStartDate");
	  var dateES = dateE.substring(0,4) + dateE.substring(5,7) + dateE.substring(8,10);
	  var today = new Date();
	  today.setDate(today.getDate()+1);
	  var year = today.getFullYear();
	   var month = today.getMonth()+1;
	  if(month <10) month = '0'+month;
	   var day = today.getDate()-1;
	  if(day <10) day = '0'+day;
	  var aujourdhuiCompare = year +""+ month +""+ day;
	  if(dateES < aujourdhuiCompare )
	  {
	       top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous ne pouvez pas sélectionner une date antérieur."]]);
	        return false;
	  
	  }
	  */
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
	 //top.MyApp.fraMenuBar.Execute("R_Consult");
	 // SC End Edit:
	} catch (e) {
	 alert('ps_acn_onbeforeinsert ' + e.message);
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
	var vSQL2 = " select TOP 1 Expired , xaffair, PAccess from sysadm.xso4  where Acht= '" + vCreateur + "' and so0_nrid='" + top.MyApp.GetItemValue("AcnCpyNRID") + "' order by dmod desc ";
	var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	var vExpired = arrRes2[0][0];
	var vXaffair = arrRes2[0][1];
	var vPAccess = arrRes2[0][2];
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	 _oCurWnd = top.MyData_View;
	} else {
	 _oCurWnd = top.MyApp.wizardWindow;
	}
	//top.MyApp.OpenDlg("Alert", ["Attention", "La TOP 1 de date entrée est :" + dateES ]);
	if (top.MyApp.UserSetting.User.Name.toUpperCase() != vTitSoc.toUpperCase() && vCreateur.toUpperCase() != vTitSoc.toUpperCase()) {
	 var vMarge = aujourdhuiCompare - dateES;
	 if (vPAccess != 1 && (vXaffair == 1 || (vXaffair != 1 && vExpired == 1))) {
	  //top.MyApp.OpenDlg("Alert", ["Attention", "le delai entre la date interlocuteur et date du jour est"+vMarge]);
	  top.MyApp.OpenDlg("Alert", ["Attention", "Your access is expired to follow up this supplier, Please contact the Back Office Team"]);
	  return false;
	 }
	}
	// HAS : FIN : 25/12/2018 - vérifier si l'interlocuteur a un accès pour créer des relances
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
}