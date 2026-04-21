//[Start - 34749078438414 - START]
function PS_Opp_BtnDemandeValidation()
{
//[Start - 34749078438414 - END]
//[Code - 34739078438414 - START]
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var vProfPros = "LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN;LEAD_PROS";
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF;MNG_ACH_OPR";
	var LotAtyp = top.MyApp.GetItemValue("OppExtAtypique");
	var vEtape = top.MyApp.GetItemValue("OppExtEtape");
	var vStatut = top.MyApp.GetItemValue("OppStatus");
	// forcer la valeur HK dans la liste de choix de pays de facturation
	//top.MyApp.SetItemValue("OppExtPaysFacturation", "ZZ - Autre");
	// SC OZEOL DEBUT: 15/01/2018 Achteur ne peut demander la validation de son manager qu'après déposer le dossier
	if ((vProf == "ACH_TER" || vProf == "ASS_ACH") && top.MyApp.GetItemValue("OppStatus").substr(0, 2) < '05') {
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous devez dépose le dossier avant de demander la validation."]]);
	 return false;
	} // SC FIN:
	if (LotAtyp == '1' && (vEtape == '' || vEtape == null || vEtape == undefined)) {
	    //HAS DEB 27/05/2021 : les champs obligatoires pour envoyer un lot vers le HUB
	    var vFamille = top.MyApp.GetItemValue("OppExtFamille");
	    var vCategorie = top.MyApp.GetItemValue("OppExtCategorie");
	    var vCodePaysDepart = top.MyApp.GetItemValue("OppExtCodePaysDepart");
	    var vPortDepart = top.MyApp.GetItemValue("OppExtPortDepart");
	    var vQuantiteTotale = top.MyApp.GetItemValue("OppExtQuantiteTotale");
	    if (vFamille == '' || vFamille == null || vCategorie == '' || vCategorie == null || vCodePaysDepart == '' || vCodePaysDepart == null || vPortDepart == '' || vPortDepart == null || vQuantiteTotale == '' || vQuantiteTotale == null ) {
	    top.MyApp.OpenDlg("Alert", ["Attention", "To request sending affair to HUB you need to complete: \n- Product range\n- Category\n- Departure country code\n- port of departure\n- Total Quantity"]);
	    return false;
	    //HAS END 27/05/2021 : les champs obligatoires pour envoyer un lot vers le HUB
	    } else {
	        top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = 1;
	        top.MyApp.SetItemValue('OppExtEtape', '1. Demande envoi');
	        top.MyApp.CurrentSetting.Catalog["OppExtEtape"].Ed = 0;
	        //PS_Opp_Header_Status();
	        top.MyApp.fraMenuBar.Execute("R_Save");
	    }
	} else if ((vStatut == '01.C OK POUR CRV' || vStatut == '09. INCOMPLET PROS') && (vProf == "ASS_CO" || vProf == "MAN_HA_ASS" || vProf == "ADMT" || vProfPros.indexOf(vProf) != -1)) {
	    if ((LotAtyp == '1' && vEtape == '4. Intéressé')  || (LotAtyp != '1')) {
	        top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	        top.MyApp.Custom_DemandeValidationBtn = true;
	        top.MyApp.SetItemValue('OppStatus', '03. Dmd.VALID. MANAG.PROS');
	        PS_Opp_Header_Status();
	        top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	        top.MyApp.fraMenuBar.Execute("R_Save");
	        //top.MyApp.fraMenuBar.Execute("R_Consult"); 
	    }
	} else if (vProf == "ACH_TER" || vProf == "MAN_HA_TER" || vProf == "ADMT" || vProf == "ASS_ACH" || vProfNeg.indexOf(vProf) != -1) {
	    if ((LotAtyp == '1' && vEtape == '4. Intéressé') || (LotAtyp != '1')){
	        top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	        top.MyApp.Custom_DemandeValidationBtn = true;
	        PS_Opp_Header_Status();
	        top.MyApp.SetItemValue('OppStatus', '06. Dmd.VALID.MANAG.ACHAT');
	        top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	        top.MyApp.fraMenuBar.Execute("R_Save");
	        //top.MyApp.fraMenuBar.Execute("R_Consult");
	    }
	} else if (vProf == "ADMF") {
	 top.MyApp.Custom_DemandeValidationBtn = true;
	 top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0009"]]);
	 return false;
	} else {
	    top.MyApp.OpenDlg("Alert", ["Attention", "You are not authorized to update to this status"]);
	    return false; 
	 //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0007"]]);
	 //return false;
	}
	//[Code - 34739078438414 - END]
}