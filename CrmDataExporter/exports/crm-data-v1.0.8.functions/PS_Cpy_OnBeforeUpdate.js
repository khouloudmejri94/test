function()
{
	 /*************************************************************/
	  // Société                                : MASAO
	  // Nom script                             : PS_Cpy_OnBeforeUpdate
	  // Infos Paramètres                       : 
	  // Auteur                                 : CCO                                          
	  // Chapitre concerné                      : Fournisseur  
	  // Date de création                       : 29/05/2012
	  // Modifié par                            :                                             
	  // Date de modification                   :  
	  // Commentaires                           : RG
	  /*************************************************************/
	//alert('fonction pour Siret');
	//__PS_Cpy_SendExclude();
	/*var textelist = top.MyApp.AppSetting.Cpy.arrChoiceList._Dependancies_.CpyExtDetailsource._Value_;
	var vtab = [];
	vtab = textelist.split(",");
	alert(vtab[0]);*/
	
	
		/*var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	if( top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") == "true" ){
	if (vProf != "ADMT" && vProf != "ADMF" && vProf != "ADMFT") {
	top.MyApp.fraMenuBar.UpdateMenuItem ("R_Save", 'Di');
	}
	}*/
	//var vCpyNrid = top.MyApp.GetItemValue("CpyNRID", top.MyData_View);
	var vOwner = top.MyApp.GetItemValue("CpyOwner", top.MyData_View);
	var vCountry = top.MyApp.GetItemValue("CpyAddr1Country", top.MyData_View);
	// HAS END 08/04/2023 : ajouter controle sur l'onglet qualification fiche
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidExporter", "blnModified")) {
	 if (top.MyApp.GetItemValue("CpyExtValidExporter") == "Approuvé") {
	  var nVatNbr = top.MyApp.GetItemValue("CpyVatNbr");
	  var vExporter = top.MyApp.GetItemValue("CpyExtIsExporter");
	  if (vExporter == '1') {
	   if (nVatNbr == '' || nVatNbr == null || nVatNbr == undefined) {
	    top.MyApp.OpenDlg("Alert", ["Attention", "Please complete the VAT Nunmer to approve an Export Agent!"]);
	    return false;
	   }
	  }
	 }
	}
	// HAS DEB : 23/02/2025 - add flag for autorised zone
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyOwner", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyAddr1Country", "blnModified")) {
	 var vReturn = top.MyApp.ExecuteServerScript(42728053379348, [vOwner, vCountry]);
	
	 alert("call function param : " + vOwner + " , " + vCountry);
	 alert("Check GI Zone Export result : " + vReturn);
	 
	 if (vReturn == '0') {
	  top.MyApp.SetItemValue("CpyExtGi", 0);
	 } else if (vReturn == '1') {
	  top.MyApp.SetItemValue("CpyExtGi", 1);
	 }
	}
	// HAS END : 23/02/2025 - add flag for autorised zone
		// HAS DEB 27/01/2021 : Envoyer un mail automatique au demandeur 
	var vDBName = top.MyApp.AppSetting.DBName;
	var vCpyName = top.MyApp.GetItemValue("CpyName");
	var vStatExport = top.MyApp.GetItemValue("CpyExtValidExporter").substr(0, 1);
	var vDirExport = top.MyApp.GetItemValue("CpyExtValDirExport");
	var vResStat = "";
	//alert (vStatExport);
	if (vStatExport == "A") {
	    vStatut = "VALIDATION";
	} else if (vStatExport == "N") {
	    vStatut = "REJECTION";
	} else if (vStatExport == "D") {
	    vStatut = "DEROGATION REQUEST";
	} else if (vStatExport == "I") {
	    vStatut = "INCOMPLETE";
	}
	var vUserDemValExport = top.MyApp.GetItemValue('CpyExtUserDemValExport');
	if ((top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidExporter", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValDirExport", "blnModified")) && vStatExport != '' && vStatExport != null) {
	    top.MyApp.CustomSetting.CpyIsUpdatedStatus = true;
	    var vReqDest = "";
	    var vSQL = "select e_mail from sysadm.am0 where Template is null and titulaire = '" + vUserDemValExport + "' ";
	    var arrRes = top.MyApp._gfctExtReq(vSQL);
	    var vReqDest = arrRes.join(";");
	    //top.MyApp.OpenDlg("Alert", ["Mail", "Detination email : " + vDest]);
	    //top.MyApp.OpenDlg("Alert", ["Mail", "La valeur VVCP taquet est : " + VVCPTaquet]);
	    var vEmail = top.MyApp.UserSetting.Settings.EMail;
	    if (arrRes.length >= 1) {
	        var arrParam = [];
	        arrParam[0] = vEmail; //"selligent@ozeol.com";  //From 
	        if (vDBName != "PROD") {
	            vDest = vEmail;
	        } else if (vDBName == "PROD") {
	            if (vStatut == "DEROGATION REQUEST") {
	                var vSQLdest1 = "select e_mail from sysadm.am0 dirop inner join sysadm.set_us1 prof on prof.nom = dirop.titulaire where dirop.Template is null and prof.titre = 'Directeur Back Office' ";
	                var arrResDest = top.MyApp._gfctExtReq(vSQLdest1);
	                var vDest = arrResDest.join(";");
	                //vDest = "wajdi@ozeol.com;kelly@ozeol.com"; //To
	            } else {
	                vDest = vReqDest; //To
	            }
	        }
	        arrParam[1] = vDest; //To
	        
	        arrParam[2] = "Export agent validation reply for company : " + vCpyName; //Title
	        if (vStatut == "VALIDATION" || vDirExport == "Approuvé unique" || vDirExport == "Approuvé permanent") {
	            if (vStatut == "VALIDATION") {
	                vResStat = vStatut;
	            } else if (vDirExport == "Approuvé unique") {
	                vResStat = "ONE AFFAIR APPROVE";
	            } else {
	                vResStat = "ALL AFFAIRS APPROVE";
	            }
	            arrParam[3] = "Hello, <br /><br /> CONGRATULATIONS! <br /><br />The Export activity of supplier " + top.MyApp.GetItemValue('CpyName', _oCurWnd) + " has resulted in " + vResStat + " status. <br /><br />" + "Please check your offer and add this exporter to your offer." + "<br /><br />" + "Have a nice day." + "<br /><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	        } else if (vStatut == "REJECTION" ||  vStatut == "INCOMPLETE" || vDirExport == "Rejeté") {
	            if (vStatut == "REJECTION" || vDirExport == "Rejeté") {
	                vResStat = "REJECTION";
	            } else {
	                vResStat = "INCOMPLETE";
	            }
	            arrParam[3] = "Hello, <br /><br />The Export activity of supplier " + top.MyApp.GetItemValue('CpyName', _oCurWnd) + " has resulted in " + vResStat + ". <br /><br /> Please chech your offer and use another exporter." + "<br /><br />" + "Have a nice day." + "<br /><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	        } else if (vStatut == "DEROGATION REQUEST") {
	            arrParam[3] = "Hello, <br /><br />The Back office decision for supplier " + top.MyApp.GetItemValue('CpyName', _oCurWnd) + " has resulted in " + vStatut + ". <br /><br /> Please chech and make the final decision." + "<br /><br />" + "Have a nice day." + "<br /><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	        }
	        
	        var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	        if (str_Ret == true || str_Ret == "True") {
	            top.MyApp.OpenDlg("Alert", ["Notification", "Email notification correctly sent to : " + vDest]);
	            //top.MyApp.SetItemValue("QuoExtAlertCmd", "1");
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Erreur", "Error sending email : " + str_Ret]);
	        }
	    } else {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Destination Email missing !!"]);
	    }
	}
	// HAS END 06/02/2020 : Envoyer un mail automatique au prospecteur pour OK CRV ou Rjection
	//top.MyApp.OpenDlg("Alert", ["Attention", "FIN envoi réponse demande avis"]);
		// HAS : DEB 19/12/2018 Appel fonction de gestion des accès concurrents sur le même FRS
	
	
	//PS_All_Acces_Concurrent('Cpy');
	var _oCurWnd;
	if (!top.MyApp.wizardWindow) {
	    _oCurWnd = top.MyData_View;
	} else {
	    _oCurWnd = top.MyApp.wizardWindow;
	}
	
	
	// HAS : END 19/12/2018 : gestion des accès concurrents
	var vPays = top.MyApp.GetItemValue('CpyAddr1Country');
	var vSiret = top.MyApp.GetItemValue('CpyExtSiret');
	var vStatus = top.MyApp.GetItemValue("CpyExtValidSas", _oCurWnd);
	
	
	if (vPays == 'FR- FRANCE' && (vSiret == '' || vSiret == null || vSiret == undefined)) {
	    top.MyApp.OpenDlg("Alert", ["", "The filed Siret is mandatory. \n Thanks to complete before saving"]);
	    return false;
	}
	
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtSiret", "blnModified")) {
	    var vSQL = "select (select count(nrid) from sysadm.v_so0 where xsiret = '" + top.MyApp.GetItemValue("CpyExtSiret") + "' and xsiret != '' and cd != '" + top.MyApp.GetItemValue("CpyCode") + "'),(select count(nrid) from sysadm.x_frs_exclude where siret = '" + top.MyApp.GetItemValue("CpyExtSiret") + "' and siret != '')";
	    var arrRes = top.MyApp._gfctExtReq(vSQL);
	    var NbrFrs1 = arrRes[0][0];
	    var NbrFrs2 = arrRes[0][1];
	    //alert(NbrFrs1 + NbrFrs2);
	    if (parseInt(NbrFrs1) > 0 || parseInt(NbrFrs2) > 0) {
	        top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Attention le siret existe deja"] + "\n" + top.MyApp.arrTranslations["Veuillez le modifier pour pourvoir enregistrer votre fiche."]]);
	        return false;
	    }
	}
	
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyName", "blnModified")) {
	    top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["Vous-avez modifié le nom du fournisseur, confirmez-vous la modification ?"]])
	    if (!top.MyApp.AppSetting.dlgReturn[0]) {
	        return false;
	    } else {
	        var vNewComp = top.MyApp.GetItemValue("CpyName", _oCurWnd);
	        var vSQL = "select societe from sysadm.so0 where nrid='" + top.MyApp.GetItemValue("CpyNRID") + "'";
	        var arrRes = top.MyApp._gfctExtReq(vSQL);
	        var vOldComp = arrRes[0];
	        top.MyApp.SetItemValue("CpyAddr2CpyName", arrRes[0][0]);
	    }
	}
	
	
	// HAS DEB : 12/04/2019 - Insérer ancien nom fournisseur si changement
	
	
	
	/*if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtVldtndtrnsfrt", "blnModified")) {
	    //top.MyApp.ExecuteServerScript(29718170653452);
	}*/
	
	
	// HAS DEB ACH 2020 : MAJ regle pour demande validation sourceur
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidSas", "blnModified")) {
	    top.MyApp.CustomSetting.CpyIsUpdatedStatus = true;
	    var vMyStatus = top.MyApp.GetItemValue("CpyExtValidSas", _oCurWnd);
	    if (vMyStatus == "COMPLETE" || vMyStatus == "INCOMPLETE" || vMyStatus == "METTRE EN POUBELLE") {
	        if (vProf != "ADMT" && vProf != "ADMF" && vProf != "ADMFT") {
	            top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vMyStatus + " » "]);
	            return false;
	        }
	    }
	    if (vMyStatus == 'A VALIDER' && vProf == 'SRC') {
	        top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vMyStatus + " » "]);
	        return false;
	    }
	
	
	    //HAS DEB : 28/09/2020 - La fiche doit être affectée avant de demander validation BO
	    var vFlagAffect = top.MyApp.GetItemValue("CpyExtFlagAffect", _oCurWnd);
	    if (vMyStatus == 'A VALIDER' && vFlagAffect != '1') {
	        top.MyApp.OpenDlg("Alert", ["", "Please affect supplier before requesting validation !"]);
	        return false;
	    }
	    //HAS END : 28/09/2020 - La fiche sourcing doit être affectée avant de demander validation BO
	}
	// HAS DEB ACH 2020 : MAJ regle pour demande validation sourceur
	
	
	 
	
	
	var vSQL = "select count (*) from sysadm.sp0 where so0_nrid ='" + top.MyApp.GetItemValue("CpyNRID") + "'  ";
	var arrRes = top.MyApp._gfctExtReq(vSQL);
	if (arrRes[0][0] == 0 && vStatus == 'A VALIDER') {
	    top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Merci de compléter la création du contact."]]);
	    return false;
	}
	
	
	var comblkltg = top.MyApp.GetItemValue("CpyComment");
	var caclitige = top.MyApp.GetItemValue("CpyExtLitige");
	if (caclitige == 1 && (comblkltg == null || comblkltg == undefined || comblkltg == '')) {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Merci de compléter le champ Commentaire Blacklist & Litige."]]);
	    return false;
	}
	
	
	var comblkltg = top.MyApp.GetItemValue("CpyComment");
	var cacblack = top.MyApp.GetItemValue("CpyIsBlackList");
	if (cacblack == 1 && (comblkltg == null || comblkltg == undefined || comblkltg == '')) {
	    top.MyApp.OpenDlg("Alert", [top.MyApp.arrTranslations["Caution"], top.MyApp.arrTranslations["Merci de compléter le champ Commentaire Blacklist & Litige."]]);
	    return false;
	}
	
	
	var vEtatPepite = top.MyApp.GetItemValue("CpyExtEtatPepite");
	var vValidSAS = top.MyApp.GetItemValue("CpyExtValidSas");
	var vValidation = top.MyApp.GetItemValue("CpyExtValidAdm");
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	
	
	if (vValidSAS == 'SORTIE POUBELLE' && vEtatPepite != 'POUBELLE') {
	    //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["The supplier is not in Trash"]]);
	    top.MyApp.OpenDlg("Alert", ["", "The supplier is not in Trash "]);
	    return false;
	}
	
	
	//if ((vProfiluser == 'ADMFT') || (vProfiluser == 'ADMF') || (vProfiluser == 'ADMT')) {
	var vUserDem = top.MyApp.GetItemValue("CpyExtDemandeurPepite");
	if ((vValidation == 0 && vValidSAS == 'COMPLETE' && vEtatPepite == 'SAS') || (vValidation == 1 && vValidSAS != 'COMPLETE' && vValidSAS != 'METTRE EN POUBELLE' && vEtatPepite == 'SAS') || (vValidation == 0 && vValidSAS == 'COMPLETE' && vEtatPepite == 'POUBELLE') || (vValidSAS == 'A VALIDER' && vEtatPepite == 'POUBELLE') || (vValidSAS == 'INCOMPLETE' && vEtatPepite == 'PEPITE')) {
	
	
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Merci de respecter les conditions de validation."]]);
	    return false;
	
	
	}
	// }
	/*  OLD controle champs non editable PEPITE
	var vProfiluser = top.MyApp.UserSetting.User.ProfileInitials;
	
	
	if (!(top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyEmailAddress", "blnModified")) && !(top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyPhoneNbr", "blnModified")) && !(top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyAddr1Department", "blnModified")) && (top.MyApp.GetItemValue("CpyExtEtatPepite") == 'PEPITE') && vProfiluser != 'ADMT' && vProfiluser != 'ADMF' && vProfiluser != 'ADMFT' && vProfiluser != 'LTG') {
	    top.MyApp.OpenDlg("Alert", ["", "Impossible de modifier un fournisseur VALIDE"]);
	    return false;
	}
	*/
	//////var vModified = top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyEmailAddress", "blnModified");
	//alert (vModified);
	////////// [DEB] NEW MODIF CHECK
	//var strProsFournisseur = top.MyApp.GetItemAttributeFromXML(top.MyApp.AppSetting["Cpy"].Record_XML,"CpyExtProsp","Val");
	//var vListChamp = "CpyEmailAddress;CpyPhoneNbr;CpyAddr1Department";
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	//var vFonction = top.MyApp.UserSetting.User.Function;
	var vListProfilsValides = "ADMT;ADMF;ADMF;LTG";
	if (vListProfilsValides.indexOf(vProf) == -1 && top.MyApp.GetItemValue("CpyExtEtatPepite") == 'PEPITE') {
	    //var MyNodes = top.MyApp.GetItemAttributeFromXML( top.MyApp.CurrentSetting.Record_XML ,"Flds","","","","","","",true);
	    //var val = top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, MyNodes[0].tagName, "Val");
	    //alert (val);
	    //MyNodesCount = MyNodes.Count
	    //alert (MyNodesCount);
	    ///// [FIN] NEW MODIF CHECK
	    /*var xmlDoc = top.MyApp.CurrentSetting.Record_XML;
	    var x = xmlDoc.getElementsByTagName("CpyEmailAddress")[0].childNodes[0];
	    var display = x.nodeValue;
	    alert (display);*/
	    if (vProf != 'SRC'){
	        var ArrChamp = ["CpyExtFrsPotentialBtn", "CpyExtFrsPotential", "CpyExtValidTlSrc", "CpyEmailAddress", "CpyPhoneNbr", "CpyIntPrefix", "CpyAddr1Department", "CpyExtDdeTransfertACH", "CpyExtDdeTransfertCP", "CpyExtPourach", "CpyExtPourcp", "CpyExtAuditStatus", "CpyExtCommAdt", "CpyExtFrsPotential", "CpyExtValidTlSrc","CpyVatNbr","CpyExtValDirExport","CpyExtConsigne","CpyExtConsigneBtn"];
	        var arrResult = [];
	        var arrVal = [];
	        var MyObjXML = top.MyApp.AppSetting["Cpy"].Record_XML;
	        var nFullCount = top.MyApp.GetItemAttributeFromXML(MyObjXML, "Result", "FullCount");
	        var MyNodes = top.MyApp.GetItemAttributeFromXML(MyObjXML, "Flds/*", "", "", "", "", "", "", true);
	        for (var i = 0; i < MyNodes.length; i++) {
	            if (ArrChamp.includes(MyNodes[i].tagName) == false) {
	                arrResult[i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "blnModified", "../id", 1);
	                arrVal[i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "Val", "../id", 1);
	                if (arrResult[i] == true || arrResult[i] == 'true') {
	                    top.MyApp.OpenDlg("Alert", ["", "You are not allowed to modify a validated supplier!"]);
	                    return false;
	                }
	            }
	        }
	    } else if (vProf == 'SRC'){
	        var ArrChamp = ["CpyExtCommAdt", "CpyExtChkContact", "CpyExtChkEmail", "CpyExtChkFamilProd", "CpyExtChkNatprod", "CpyExtChkMobile", "CpyExtChkAdress", "CpyExtAuditStatus", "CpyExtPropMobile", "CpyExtPropEmail", "CpyExtPropFamilProd", "CpyExtPropNatprod", "CpyExtPropStreet", "CpyExtPropCity", "CpyExtPropPostcode", "CpyExtPropReg", "CpyExtPropCountry", "CpyExtPropWeb", "CpyExtPropTypeActiv","CpyVatNbr"];
	        var arrResult = [];
	        var arrVal = [];
	        var MyObjXML = top.MyApp.AppSetting["Cpy"].Record_XML;
	        var nFullCount = top.MyApp.GetItemAttributeFromXML(MyObjXML, "Result", "FullCount");
	        var MyNodes = top.MyApp.GetItemAttributeFromXML(MyObjXML, "Flds/*", "", "", "", "", "", "", true);
	        //alert (nFullCount);
	        for (var i = 0; i < MyNodes.length; i++) {
	            if (ArrChamp.includes(MyNodes[i].tagName) == false) {
	                arrResult[i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "blnModified", "../id", 1);
	                arrVal[i] = top.MyApp.GetItemAttributeFromXML(MyObjXML, MyNodes[i].tagName, "Val", "../id", 1);
	                if (arrResult[i] == true || arrResult[i] == 'true') {
	                    //alert('champs NOOOON permis pour modification  : ' + MyNodes[i].tagName);
	                    top.MyApp.OpenDlg("Alert", ["", "You are not allowed to modify a validated supplier!"]);
	                    //alert (MyNodes[i].tagName);
	                    //alert (arrResult[i]);
	                    return false;
	                }
	            }
	        }
	    }
	}
	
	
	/*
	var vSQL2 = "select (select team_name from sysadm.am0 where titulaire = :dfSocTitulaire and Template is null) as SecteurComp ";
	  var arrRes2 = top.MyApp._gfctExtReq(vSQL2);
	 top.MyApp.SetItemValue("SecteurComp", arrRes2[0][0]);
	
	
	  top.MyApp.OpenDlg("Alert", ["Attention", "Le Secteur est : "+arrRes2[0][0]+"."]);
	*/
	
	
	// HAS DEB 19102022 : Regle pour selection de statit Audit
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtAuditStatus", "blnModified")) {
	    var vStatAudit = top.MyApp.GetItemValue("CpyExtAuditStatus", _oCurWnd);
	    var DatApprove = top.MyApp.GetItemValue("CpyExtAdtDatApprove");
	    var DatReject = top.MyApp.GetItemValue("CpyExtAdtDatReject");
	    var IsApproved = 0;
	    var IsRejected = 0;
	    if (DatApprove != '' && DatApprove != null && DatApprove != undefined) {
	        IsApproved = 1;
	    }
	    if (DatReject != '' && DatReject != null && DatReject != undefined) {
	        IsRejected = 1;
	    }
	    if (vListProfilsValides.indexOf(vProf) == -1 ) {
	        if (vStatAudit == "Approuvé" || vStatAudit == "Rejeté" || vStatAudit == "Audit" || IsApproved == 1 || IsRejected == 1 ) {
	            top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vStatAudit + " » "]);
	            return false;
	        } else if (vStatAudit == "A vérifier" && vProf != "SRC") {
	            top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vStatAudit + " » "]);
	            return false;
	        } else if (vStatAudit == "Mettre en poubelle" && vProf != "SRC" && vProf != "PROS_SEN") {
	            top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vStatAudit + " » "]);
	            return false;
	        } else if (vStatAudit == "A valider" && vProf != "PROS_SEN") {
	            top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vStatAudit + " » "]);
	            return false;
	        } else if ((vStatAudit == "A vérifier" || vStatAudit == "A valider") && (vProf == "SRC" || vProf == "PROS_SEN")) {
	            if (vStatus == "METTRE EN POUBELLE") {
	                top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vStatAudit + " » "]);
	                return false;
	            }
	        }
	    }
	}
	// HAS END 19102022 : Regle pour selection de statit Audit
	var vSrcStatus = top.MyApp.GetItemValue("CpyExtValidSrc", _oCurWnd);
	// HAS DEB 08/04/2023 : ajouter controler sur profil autorisé pour valsiation sourcing
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidSrc", "blnModified")) {
	    if (vSrcStatus != "Initial") {
	        if (vProf != "ADMT" && vProf != "LEAD_SRC" && vProf != "MNG_ACH_OPR" && vProf != "LEAD_ASS_ACH") {
	            top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Vous n'êtes pas autorisé à passer au statut "] + "« " + vSrcStatus + " » "]);
	            return false;
	        }
	    }
	}
	// HAS DEB 08/04/2023 : ajouter controler sur profil autorisé pour valsiation sourcing
	
	
	
	// HAS DEB 08/04/2023 : si SRC modifie une fiche en statut Incomplet alors maj vers Initial
	if(top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML,"Result","blnModified") == "true"){
	    if ((vProf == 'ASS_ACH'|| vProf == 'SRC') && top.MyApp.GetItemValue("CpyExtValidSrc", _oCurWnd) == "Incomplet") {
	        top.MyApp.SetItemValue("CpyExtValidSrc", "Initial");
	    }
	}
	// HAS END 08/04/2023 : si SRC modifie une fiche en statut Incomplet alors maj vers Initial
	
	
	 
	
	
	// HAS DEB 12/04/2023 - si BO met INCOMPLET pour demande mise en poubelle fiche non approuvée alors retur vers initial 
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidSas", "blnModified")) {
	    if (vStatus == "INCOMPLETE" && vSrcStatus == 'Non approuvé') {
	        top.MyApp.SetItemValue("CpyExtValidSrc", "Initial");
	    }
	}
	// HAS END 12/04/2023 - si BO met INCOMPLET pour demande mise en poubelle fiche non approuvée alors retur vers initial
		
	if(top.MyApp.GetItemValue('CpyExtOutSrc') == '1' && top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtSiret", "blnModified")){
	__PS_Cpy_SendExclude();
	}
	
	/*
	var vNRID = top.MyApp.GetItemValue('CpyNRID');
	var vSiret = top.MyApp.GetItemValue('CpyExtSiret');
	var vPays = top.MyApp.GetItemValue('CpyAddr1Country');
	var arrResult = [];
	var arrVal = [];
	var arrParam = [];
	arrParam[0] = vNRID; //
	arrParam[1] = vSiret; //
	arrParam[2] = vPays;
	var result = top.MyApp.ExecuteServerScript(39388669445142, arrParam);
	//alert(result);
	if (result == 'OK') {
	    top.MyApp.OpenDlg("Alert", ["", "Outsourcing supplier is sccessfully sent"]);
	} else {
	    top.MyApp.OpenDlg("Alert", ["", "Outsourcing supplier NOT sent"]);
	    return false;
	}
	*/
		// Cpy - Contrôle de saisie champ "E-mail de cde"
	var email = top.MyApp.GetItemValue("CpyEmailAddress", top.MyData_View)
	var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,9}$/;
	
	
	if (email) {
	 if (!email.match(re)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", "Adresse e-mail incorrect."]);
	  return false;
	 }
	}
	
	
	
	// HAS :Cpy - Contrôle de saisie champ "Num Tel"
	
	
	var re = /^\d+$/;
	var rex = /^[0-9A-Za-z\s\-]+$/;
	
	
	var telNbr = top.MyApp.GetItemValue("CpyPhoneNbr", top.MyData_View);
	var Prefix = top.MyApp.GetItemValue("CpyIntPrefix", top.MyData_View);
	
	
	
	if (telNbr && Prefix) {
	 if (!telNbr.match(re) || !Prefix.match(rex)) {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez le préfix et le numéro de téléphone, s'il vous plait."]]);
	  return false;
	 }
	}
	
	
	
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidExporter", "blnModified") || top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValDirExport", "blnModified") ) {
	    if (top.MyApp.GetItemValue('CpyExtValidExporter') == 'Approuvé' || (top.MyApp.GetItemValue('CpyExtValDirExport') != "" && top.MyApp.GetItemValue('CpyExtValDirExport') != null && top.MyApp.GetItemValue('CpyExtValDirExport') != undefined)){
	        __PS_Quo_Sht_JQuery();
	    }
	}
	
	
		// SAI DEB 04/02/2025 : Sending email for prevalidation for incomplete and approved status 
	var vCpyName = top.MyApp.GetItemValue("CpyName");
	var vPreValidStat = top.MyApp.GetItemValue("CpyExtValidSrc");
	if (vPreValidStat == "Incomplet") {
	    vStatut = "INCOMPLETE INFORMATION";
	} else if (vPreValidStat == "Approuvé") {
	    vStatut = "APPROVED";
	} 
	var vOwner = top.MyApp.GetItemValue('CpyOwner');
	if (top.MyApp.GetItemAttributeFromXML(top.MyApp.CurrentSetting.Record_XML, "CpyExtValidSrc", "blnModified") && (vPreValidStat == 'Incomplet' || vPreValidStat == 'Approuvé')) {
	    var vSQL = "select top 1 e_mail from sysadm.am0 where Template is null and titulaire = '" + vOwner + "' ";
	    var arrRes = top.MyApp._gfctExtReq(vSQL);
	    var vDest = arrRes;
	    top.MyApp.OpenDlg("Alert", ["Mail", "Detination email : " + vDest]);
	    var vEmail = top.MyApp.UserSetting.Settings.EMail
	    if (arrRes.length >= 1) {
	        var arrParam = [];
	        arrParam[0] = vEmail; //"selligent@ozeol.com";  //From 
	        arrParam[1] = vDest; //To
	        arrParam[2] = "Prevalidation process response for supplier : " + vCpyName; //Title
	        if (vPreValidStat == "Approuvé") {
	            arrParam[3] = "Hello, <br /><br /> CONGRATULATIONS! <br /><br />The supplier status " + top.MyApp.GetItemValue('CpyName', _oCurWnd) + " has been " + vStatut + ". <br /><br />" + "Now you can start making followups." + "<br /><br />" + "Have a nice day." + "<br /><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	        }
	        if (vPreValidStat == "Incomplet") {
	            arrParam[3] = "Hello, <br /><br />The supplier " + top.MyApp.GetItemValue('CpyName', _oCurWnd) + " has " + vStatut + ". <br /><br /> Please check and complete." + "<br /><br />" + "Have a nice day." + "<br /><br />Sincerely.<br /><br />" + top.MyApp.UserSetting.User.Name + "."; //Body
	        }
	        
	        var str_Ret = top.MyApp.ExecuteServerScript(32460371498950, arrParam); //_gfctSendMail
	        if (str_Ret == true || str_Ret == "True") {
	            top.MyApp.OpenDlg("Alert", ["Notification", "Email correctly sent to : " + vDest]);
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Erreur", "Email sending error : " + str_Ret]);
	        }
	    } else {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Destination Email missing !!"]);
	    }
	}
	// SAI END 04/02/2025 : Sending email for prevalidation for incomplete and approved status
		// HAS : Cpy - Contrôle de saisie champ "site web"
	//alert("hello code");
	var website = top.MyApp.GetItemValue("CpyWebAddress", top.MyData_View);
	//var re = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	if (website) {
	 if (website.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null) {
	  return true;
	 } else {
	  top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vérifiez la saisie du champ Web, s'il vous plait."]]);
	  return false;
	 }
	}
	
		/*
	 var strCode2    = top.MyApp.GetItemValue("CpyAddr2Postcode",top.MyData_View);
	 var strStrName2 = top.MyApp.GetItemValue("CpyAddr2StrName",top.MyData_View);
	 var strCity2    = top.MyApp.GetItemValue("CpyAddr2City",top.MyData_View);
	 var strPays2    = top.MyApp.GetItemValue("CpyAddr2Country",top.MyData_View);
	 
	 var strStrNbr2  = top.MyApp.GetItemValue("CpyAddr2StrNbr",top.MyData_View);
	 var strCompl2   = top.MyApp.GetItemValue("CpyAddr2Complt",top.MyData_View);
	 var strReg2     = top.MyApp.GetItemValue("CpyAddr2County",top.MyData_View);
	 
	 
	 var strCode1    = top.MyApp.GetItemValue("CpyAddr1Postcode",top.MyData_View);
	 var strStrName1 = top.MyApp.GetItemValue("CpyAddr1StrName",top.MyData_View);
	 var strCity1    = top.MyApp.GetItemValue("CpyAddr1City",top.MyData_View);
	
	 if(strCode2 !="" && strStrName2 != "" &&  strCity2 != "" &&  strCode1 =="" && strStrName1 == "" &&  strCity1 == "")
	 {
	      top.MyApp.OpenDlg("Alert",["Confirmation " , "Vous souhaitez copier l’adresse de visite sur l’adresse de facturation ? " , "YesNo"]) ; 
	      if(top.MyApp.AppSetting.dlgReturn[0])
	      {
	           top.MyApp.SetItemValue("CpyAddr1Postcode",strCode2);
	           top.MyApp.SetItemValue("CpyAddr1StrName",strStrName2);
	           top.MyApp.SetItemValue("CpyAddr1City",strCity2);
	           top.MyApp.SetItemValue("CpyAddr1Country",strPays2 );
	           top.MyApp.SetItemValue("CpyAddr1StrNbr",strStrNbr2 );
	           top.MyApp.SetItemValue("CpyAddr1Complt",strCompl2 );
	           top.MyApp.SetItemValue("CpyAddr1County",strReg2 );
	      }
	 }
	 */
		//RLM - 27/08/2013 
	//
	
	var strSQL, strCd, strNrid, strResultat, objXmlRes, objNodes, strNewCd;
	strNrid = top.MyApp.GetItemValue("CpyNRID",top.MyData_View);
	strCd = top.MyApp.GetItemValue("CpyCode",top.MyData_View);
	strSQL = "select cd from sysadm.so0 where nrid="+strNrid;
	strResultat = top.MyApp.ExecuteServerScript(30231053360342, [strSQL],'','',true);
	/////////Récupération du jeu de résultat au format XML
	objXmlRes = new ActiveXObject("Microsoft.XMLDOM");
	objXmlRes.async = false;
	objXmlRes.loadXML(strResultat);
	objNodes = objXmlRes.getElementsByTagName("CpyCode");
	strNewCd = objNodes[0].getAttribute("Val");
	if(strNewCd != strCd){
	     alert(top.MyApp.arrTranslations["Le numéro de fournisseur a changé après la création d'une affaire. \n Ancien numéro : "] + strCd +"\n"+ top.MyApp.arrTranslations["Nouveau numéro : "] + strNewCd);
	     return false;
	}
	 
	 
		// 04.02.2016 CBA #643
	var vFBook = top.MyApp.GetItemValue("CpyExtFBook",top.MyData_View);
	if(vFBook == 'Oui')
	{
	     top.MyApp.OpenDlg("Alert",["Confirmation " , " Merci d’enregistrer l’autorisation du fournisseur dans « Documents fournisseur » " , "YesNo"]) ;
	          if(!top.MyApp.AppSetting.dlgReturn[0])
	          {
	               top.MyApp.SetItemValue("CpyExtFBook","En attente");
	               return false;
	          }
	}
		return true;
}