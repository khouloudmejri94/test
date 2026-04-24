function PS_Opp_Insert_Sample_Affair()
{
	// PS_Opp_Insert_Sample_Affair
	/*try {
	    // HAS DEB : 09/07/2019 - vérifier si il ya des offres reçues, si oui alors impossible d'insérer un tracking
	    var vSQL = "select count(*) from v_dc0 where template is null and SUBSTRING (XSTATOFF,1,1) != '3' and no_dossier = :OppReference ";
	    var arrRes = top.MyApp._gfctExtReq(vSQL);
	    var nombre = arrRes[0][0];
	    if (arrRes[0][0] > 0) {
	        top.MyApp.OpenDlg("Alert", ["Attention", "You are not allowed to insert Tracking because there are offer received \n Insertion Cancelled"]);
	        return false;
	    }
	    top.MyApp.OpenDlg("UserPrompt", ["Please insert the Tracking Number :", ""]);
	    if (top.MyApp.AppSetting.dlgReturn[0]) {
	        vTrack = top.MyApp.AppSetting.dlgReturn[0];
	    } else {
	        vTrack = "Aucune saisie";
	    }
	    var vOppNRID = top.MyApp.GetItemValue("OppNRID");
	    //SS_Opp_Insert_Sample_Affair (vOppNRID,vTrack);
	    if (vTrack != "Aucune saisie") {
	        var strResultat = top.MyApp.ExecuteServerScript(36041754457909, [vOppNRID, vTrack]); //SS_Opp_Insert_Sample_Affair
	        //if (strResultat == true || strResultat == "True") {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Tracking insertion success !! "]);
	        top.MyApp.fraMenuBar.Execute("T_Refresh");
	        //}
	    }
	} catch (e) {
	    alert("PS HAS Ajout Tracking Affaire " + e.message);
	}*/
	
	var arrParams = []
	 arrParams[0] = top.MyApp
	 arrParams[1] = top.bWizard
	 
	 top.MyApp.OpenDlg('38020193460148',arrParams , top, undefined, undefined, undefined, undefined, function (){});
}