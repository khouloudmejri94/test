function()
{
	//DEBUT FTC@MASAO - MANTIS 14375 - 10/01/2018
	var vStatusOffre = top.MyApp.GetItemValue("QuoExtStatOff");
	var vRaisonLost = top.MyApp.GetItemValue("QuoExtRaisonOffre");
	var oDelPai = top.MyApp.FindItem('QuoExtDelPai');
	var vDelPai = top.MyApp.GetItemValue("QuoExtDelPai");
	if (top.MyApp.CurrentSetting.nChapMode == "Reset") return true;
	if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
		if (vStatusOffre.substr(0, 1) == "3") {
			top.MyApp.CurrentSetting.Catalog["QuoExtRaisonOffre"].Ed = 1;
			top.MyApp._gfctSetClassName("QuoExtRaisonOffre", "NM");
			top.MyApp._gfctSetClassName("QuoExtResuNego", "NM");
			if (vRaisonLost == "N.C/Prix") {
				top.MyApp._gfctSetClassName("QuoExtOffreFrs", "NM");
			}
		} else {
			top.MyApp._gfctSetClassName("QuoExtRaisonOffre", "UM");
			top.MyApp._gfctSetClassName("QuoExtOffreFrs", "UM");
			top.MyApp._gfctSetClassName("QuoExtResuNego", "UM");
		}
	}
	//END FTC@MASAO - MANTIS 14375 - 10/01/2018
	if (top.MyApp.CurrentSetting.nChapMode != 'Reset') {
		// HAS DEB - 15/04/2020 - si rapport de test est modifié de Madatory vers Not mandatory alors réinitialiser les champ stat RT et statut Packaging
		var vRaptest = top.MyApp.GetItemValue("QuoExtRapTest");
		/*if (vRaptest == 'Non Obligatoire' || vRaptest == '') {
		 top.MyApp.SetItemValue("QuoExtStatutRT", "");
		 top.MyApp.SetItemValue("QuoExtStatutPack", "");
		}*/
		/* if (vRaptest == 'Obligatoire') {
		top.MyApp.SetItemValue("QuoExtStatutRT", "Non reçu");
		top.MyApp.SetItemValue("QuoExtStatutPack", "Non reçu");
		} */
		// HAS DEB  17/09/2020 : ajouter liste de choix obligatiore pour dem derog mdp
		var oMotifMdp = top.MyApp.FindItem('QuoExtMotifMdp');
		var strSQLRes = "select Derog from sysadm.dcx01 where label = '" + top.MyApp.GetItemValue("QuoExtDelPai") + "'";
		var arrRes = top.MyApp._gfctExtReq(strSQLRes);
		var vTypeDerog = arrRes[0][0];
		var nTypeDerog = parseInt(vTypeDerog);
		if (nTypeDerog > 0) {
			if (oMotifMdp) {
				//top.MyApp.SetItemAttribute("QuoExtMotifMdp", "className", "Mandatory");
				//top.MyApp.CurrentSetting.Catalog["QuoExtMotifMdp"].Mn = 1;
				top.MyApp._gfctSetClassName("QuoExtMotifMdp", "NM");
			}
		} else {
			if (oMotifMdp) {
				top.MyApp._gfctSetClassName("QuoExtMotifMdp", "UM");
			}
		}
		// HAS END  17/09/2020 : ajouter liste de choix obligatiore pour dem derog mdp
		// HAS DEB : 24/02/2021 - bloquer le champ Agent Export en fonction de l'appel de passage commande/standby
		var vAppelCmd = top.MyApp.GetItemValue("QuoExtAppelCmd");
		var oFrsExport = top.MyApp.FindItem("QuoExtFrsExport", top.MyData_View);
		if (vAppelCmd == '1') {
			if (oFrsExport) oFrsExport.disabled = true;
		} else {
			if (oFrsExport) oFrsExport.disabled = false;
		}
		// HAS END : 24/02/2021 - bloquer le champ Agent Export en fonction de l'appel de passage commande/standby
		// HAS DEB : 29/11/2023 - IF buyer select a payment term then the Marchanidse availability date is MANDATORY
		// HAS DEB : 19/09/2025 - If the payment term selected >>> packaging status and comment are mandatory
		if (oDelPai) {
			if ((vStatusOffre == '2. Négocié' || vStatusOffre == '7. StandBy') && vDelPai != '' && vDelPai != null && vDelPai != undefined) {
				top.MyApp._gfctSetClassName("QuoExtDateMDM", "NM");
				top.MyApp._gfctSetClassName("QuoExtChangePkg", "NM");
				top.MyApp._gfctSetClassName("QuoExtComChangePkg", "NM");
			} else {
				top.MyApp._gfctSetClassName("QuoExtDateMDM", "UM");
				top.MyApp._gfctSetClassName("QuoExtChangePkg", "UM");
				top.MyApp._gfctSetClassName("QuoExtComChangePkg", "UM");
			}
		}
		// HAS DEB : 19/09/2025 - If the payment term selected >>> packaging status and comment are mandatory
		// HAS END : 29/11/2023 - IF buyer select a payment term then the Marchanidse availability date is MANDATORY
	
	
	}
}