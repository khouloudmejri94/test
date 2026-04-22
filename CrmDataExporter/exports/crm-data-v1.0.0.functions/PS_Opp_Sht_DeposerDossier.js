function PS_Opp_Sht_DeposerDossier()
{
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	// DEBUT MASAO@FNA - 15/12/2017 - Mantis #14184 - [Affaire] - RG7 : Statut = 05-DEPOSE
	var vListProfilsValides = "ADMT;ADMF;ACH_TER;ASS_ACH;MAN_HA_TER";
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF;MNG_ACH_OPR";
	if (vListProfilsValides.indexOf(vProf) == -1 && vProfNeg.indexOf(vProf) == -1) {
	    // FIN MASAO@FNA - 15/12/2017 - Mantis #14184 
	    top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé d’utiliser cette fonctionnalité  !! \n Merci de contacter votre administrateur."]]);
	    return false;
	} else {
	    var vOppNRID = top.MyApp.GetItemValue("OppNRID");
	    var vStatut = top.MyApp.GetItemValue("OppStatus");
	    var prosp = top.MyApp.GetItemValue("OppExtProspecteur");
	    if (prosp != null && prosp != '') {
	        if (top.MyApp.CurrentSetting.nChapMode != "Open") return true;
	        //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	        if (vStatut.substr(0, 2) == "04" || vStatut.substr(0, 2) == "02") {
	            //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	            //DEBUT FTC@MASAO - MANTIS 0014184 - 26/12/2017 ne plus afficher cette boite de dialogue.
	            //Sélecteur sur  Acheteur
	            top.MyApp._gfctPutButton('OppExtChefproduit', "top.MyApp.PS_RempliChamp('OppExtChefproduit')", '', true, '...');
	            //Sélecteur sur CP
	            top.MyApp._gfctPutButton('OppExtAcheteur', "top.MyApp.PS_RempliChamp('OppExtAcheteur')", '', true, '...');
	            //On passe le Statut à Déposé
	            top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	            top.MyApp.SetItemValue("OppStatus", "05. DEPOSE");
	            PS_Opp_Header_Status();
	            top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	            //   top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	            top.MyApp.fraMenuBar.Execute("R_Save");
	            //top.MyApp.fraMenuBar.Execute("R_Consult");
	            // DEBUT MASAO@FNA - 15/12/2017 - Mantis #14184 - [Affaire] - RG7 : Statut = 05-DEPOSE
	            top.MyApp.Custom_DeposerDossBtn = true;
	            // FIN MASAO@FNA - 15/12/2017 - Mantis #14184
	            //On met le statut en lecture seule
	            top.MyApp.SetItem("OppStatus", "disabled", true);
	            top.MyApp.SetItem("OppStatusBtn", "disabled", true);
	            //On rend le champ Note éditable
	            // top.MyApp.SetItem("OppExtNoteAff", "disabled", false);
	            // top.MyApp.SetItemAttribute("OppExtNoteAff", "className", "Mandatory");
	            // top.MyApp.CurrentSetting.Catalog["OppExtNoteAff"].Mn=1;
	            // top.MyApp.CurrentSetting.Catalog.OppExtNoteAff.Ed = 1;
	            // top.MyApp.SetItem("OppExtNoteAff", "contentEditable", false);
	
	            top.MyApp.SetItem("OppExtRaisonSS", "disabled", true);
	            top.MyApp.SetItem("OppExtRaisonSSCom", "disabled", true);
	            top.MyApp.SetItemAttribute("OppExtRaisonSS", "className", "");
	            top.MyApp.CurrentSetting.Catalog["OppExtRaisonSS"].Mn = 0;
	            top.MyApp.CurrentSetting.Catalog.OppExtRaisonSS.Ed = 0;
	            top.MyApp.CurrentSetting.Catalog.OppExtChefproduit.Ed = 1;
	            top.MyApp.SetItem("OppExtChefproduit", "contentEditable", false);
	            //FIN FTC@MASAO - MANTIS 0014184 - 26/12/2017 
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_OPPSTATUS_0015"]]);
	            return false;
	        }
	    } else if (vProf == 'ACH_TER' || vProf == 'ASS_ACH' || vProf == 'MAN_HA_TER' || vProf == 'ADMT') {
	        var vSQL = "select count(*) from sysadm.xda11 where do0_nrid='" + top.MyApp.GetItemValue("OppNRID") + "'";
	        var arrRes = top.MyApp._gfctExtReq(vSQL);
	        if (arrRes[0][0] == 0) {
	            //top.MyApp.OpenDlg("Alert", ["", "Vous n'êtes pas autorisé à passer au statut « " + vStatut + " » sans l'alimentation du listing achat "]);
	            var msgStatus = top.MyApp.arrTranslations["MSG_OPPSTATUS_0005"];
	            top.MyApp.OpenDlg("Alert", ["", msgStatus]);
	            //  top.MyApp.SetItemValue("OppStatus", arrRes2[0][0]);
	            return false;
	        } else {
	            //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	            //DEBUT FTC@MASAO - MANTIS 0014184 - 26/12/2017 ne plus afficher cette boite de dialogue.
	            //Sélecteur sur  Acheteur
	            top.MyApp._gfctPutButton('OppExtChefproduit', "top.MyApp.PS_RempliChamp('OppExtChefproduit')", '', true, '...');
	            //Sélecteur sur CP
	            top.MyApp._gfctPutButton('OppExtAcheteur', "top.MyApp.PS_RempliChamp('OppExtAcheteur')", '', true, '...');
	            //On passe le Statut à Déposé
	            top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 1;
	            top.MyApp.SetItemValue("OppStatus", "05. DEPOSE");
	            PS_Opp_Header_Status();
	            top.MyApp.CurrentSetting.Catalog["OppStatus"].Ed = 0;
	            //    top.MyApp.fraMenuBar.UpdateMenuItem('R_Save', 'E');
	            top.MyApp.fraMenuBar.Execute("R_Save");
	            //top.MyApp.fraMenuBar.Execute("R_Consult");
	            // DEBUT MASAO@FNA - 15/12/2017 - Mantis #14184 - [Affaire] - RG7 : Statut = 05-DEPOSE
	            top.MyApp.Custom_DeposerDossBtn = true;
	            // FIN MASAO@FNA - 15/12/2017 - Mantis #14184
	            //On met le statut en lecture seule
	            top.MyApp.SetItem("OppStatus", "disabled", true);
	            top.MyApp.SetItem("OppStatusBtn", "disabled", true);
	            //On rend le champ Note éditable
	            // top.MyApp.SetItem("OppExtNoteAff", "disabled", false);
	            // top.MyApp.SetItemAttribute("OppExtNoteAff", "className", "Mandatory");
	            // top.MyApp.CurrentSetting.Catalog["OppExtNoteAff"].Mn=1;
	            // top.MyApp.CurrentSetting.Catalog.OppExtNoteAff.Ed = 1;
	            // top.MyApp.SetItem("OppExtNoteAff", "contentEditable", false);
	
	            top.MyApp.SetItem("OppExtRaisonSS", "disabled", true);
	            top.MyApp.SetItem("OppExtRaisonSSCom", "disabled", true);
	            top.MyApp.SetItemAttribute("OppExtRaisonSS", "className", "");
	            top.MyApp.CurrentSetting.Catalog["OppExtRaisonSS"].Mn = 0;
	            top.MyApp.CurrentSetting.Catalog.OppExtRaisonSS.Ed = 0;
	            top.MyApp.CurrentSetting.Catalog.OppExtChefproduit.Ed = 1;
	            top.MyApp.SetItem("OppExtChefproduit", "contentEditable", false);
	            //FIN FTC@MASAO - MANTIS 0014184 - 26/12/2017   
	        }
	    }
	}
}