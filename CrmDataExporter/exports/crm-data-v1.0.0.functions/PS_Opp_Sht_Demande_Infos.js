function PS_Opp_Sht_Demande_Infos()
{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vListProfilMKT = "CH_PRO;DIR_MKT;ASS_MKT;MAN_POLE;CH_MAR;ADMF;ADMFT;ADMT"
	if (vListProfilMKT.indexOf(vProf) == -1 && vProf != 'ADMT') {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé d’utiliser cette fonctionnalité  !! \n Merci de contacter votre administrateur."]]);
	    return false;
	}
	var vStatus = top.MyApp.GetItemValue("OppStatus");
	var vAch = top.MyApp.GetItemValue("OppExtAcheteur");
	var vOppNRID = top.MyApp.GetItemValue("OppNRID");
	var vRef = top.MyApp.GetItemValue("OppReference");
	var vCP = top.MyApp.GetItemValue("OppExtChefproduit");
	var vDesc = top.MyApp.GetItemValue("OppComment");
	var vResp = top.MyApp.GetItemValue("OppExtCommQu");
	var arrParams = []
	arrParams[0] = vOppNRID;
	arrParams[1] = vRef;
	arrParams[2] = vCP;
	arrParams[3] = vDesc;
	arrParams[4] = vResp;
	top.MyApp.OpenDlg('33610707307348', arrParams, top, undefined, undefined, undefined, undefined, function () {}); //     38840653457748
	
	/*
	// CBA 24.02.2016 - LOT G.I 2
	//DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	if (vStatus.substr(0, 2) == "04" || vStatus.substr(0, 2) == "03") {
	//FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	    if ((vAch.substring(0, 2) == "GI") && (!isNaN(vAch.substring(2, 3)))) {
	        top.MyApp.OpenDlg("33610707307348", [vOppNRID, vRef, vCP, vDesc, vResp]);
	        //top.MyApp.fraMenuBar.Execute("R_Save");
	    } else {
	        //top.MyApp.OpenDlg("Wizard", "Opp||Open||"+vOppNRID,top.MyData_View, false, "PS_Opp_FillWizard_DemandeInfo()");
	        top.MyApp.OpenDlg("33610707307348", [vOppNRID, vRef, vCP, vDesc, vResp]); //33541366384850
	        //top.MyApp.fraMenuBar.Execute("R_Save");
	    }
	} else {
	     //DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Cette fonctionnalité est accessible uniquement au statut « 03. Dmd.VALID. MANAG.PROS » et « 04. COMPLET »  !! \n Merci de contacter votre administrateur."]]);
	    return false;
	     //FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	}
	*/
	 
	/********************************************  OLD CODE  ************************************************/
	
	/*var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vListProfilMKT = "CH_PRO;DIR_MKT;ASS_MKT;MAN_POLE;CH_MAR;ADMF;ADMFT;ADMT"
	if (vListProfilMKT.indexOf(vProf) == -1 && vProf != 'ADMT') {
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé d’utiliser cette fonctionnalité  !! \n Merci de contacter votre administrateur."]]);
	    return false;
	}
	var vOppNRID = top.MyApp.GetItemValue("OppNRID");
	var vStatus = top.MyApp.GetItemValue("OppStatus");
	var vRef = top.MyApp.GetItemValue("OppReference");
	var vCP = top.MyApp.GetItemValue("OppExtChefproduit");
	var vDesc = top.MyApp.GetItemValue("OppComment");
	var vResp = top.MyApp.GetItemValue("OppExtCommQu");
	var vAch = top.MyApp.GetItemValue("OppExtAcheteur");
	
	// CBA 24.02.2016 - LOT G.I 2
	//DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	if (vStatus.substr(0, 2) == "04" || vStatus.substr(0, 2) == "03") {
	//FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	    if ((vAch.substring(0, 2) == "GI") && (!isNaN(vAch.substring(2, 3)))) {
	        top.MyApp.OpenDlg("33610707307348", [vOppNRID, vRef, vCP, vDesc, vResp]);
	        top.MyApp.fraMenuBar.Execute("R_Save");
	    } else {
	        //top.MyApp.OpenDlg("Wizard", "Opp||Open||"+vOppNRID,top.MyData_View, false, "PS_Opp_FillWizard_DemandeInfo()");
	        top.MyApp.OpenDlg("33541366384850", [vOppNRID, vRef, vCP, vDesc, vResp]);
	        top.MyApp.fraMenuBar.Execute("R_Save");
	    }
	} else {
	     //DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Cette fonctionnalité est accessible uniquement au statut « 03. Dmd.VALID. MANAG.PROS » et « 04. COMPLET »  !! \n Merci de contacter votre administrateur."]]);
	    return false;
	     //FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	}
	
	*/
}