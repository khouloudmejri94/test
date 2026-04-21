function()
{
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	    var vStatut = top.MyApp.GetItemValue("OppStatut");
	    var vBool = confirm("Êtes-vous sûr?");
	    if (vBool == true) {
	        var vSQL = "SELECT COUNT(*) FROM sysadm.dc0 WHERE do0_nrid ='" + top.MyApp.GetItemValue("OppNRID") + "'";
	        var vCount = top.MyApp._gfctExtReq(vSQL);
	        if (vCount != 0) {
	            top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Cette affaire a déjà offre(s) créé(s)."]]);
	            return false;
	        } else {
	             //DEBUT FTC@MASAO - MANTIS 14219 - 19/12/2017
	            if (vStatut.substr(0, 2) == "07") {
	             //FIN FTC@MASAO - MANTIS 14219 - 19/12/2017
	                top.MyApp.SetItemValue("OppStatut", "05. DEPOSE");
	                top.MyApp.fraMenuBar.Execute("R_Save");
	                 top.MyApp.fraMenuBar.Execute("R_Consult");
	            } else {
	                top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Cette fonctionnalité c'est dispo que pour le statut 07. SUIVI D'UNE OFFRE!!"]]);
	            }
	        }
	
	    } else return false;
	}
}