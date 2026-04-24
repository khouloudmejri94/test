function PS_Acn_Checked_BigFish()
{
	//PS_Acn_Checked_BigFish
	// HAS DEB 11/10/2021 : Ajouter une hyerlin BIG FISH pour Valider les fiche salon PAS DE BAIG FOSH
	try {
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    var vProfValid = "LEAD_NEG;LEAD_PROS;MNG_ACH_OPR";
	    if (vProf == 'ADMT' || vProfValid.indexOf(vProf) != -1) {
	        top.MyApp.OpenDlg("Alert",["Confirmation",  top.MyApp.arrTranslations["Voulez-vous valider le lot detecté BIG FISH ?"],"YesNo"]) ;
	        var bRes = top.MyApp.AppSetting.dlgReturn[0];
	        if(bRes){
	            var nrid = top.MyApp.GetItemValue("AcnNRID");
	      var strResultat = top.MyApp.ExecuteServerScript(38558385246962, [nrid, "0", "1"]);
	        } else {
	            return false;
	        }
	        //top.MyApp.fraMenuBar.Execute("R_Save");
	        top.MyApp.fraMenuBar.Execute("T_Refresh");
	        top.MyApp.OpenDlg("Alert", ["Attention", "BIG FISH request done ! "]);
	    } else {
	        top.MyApp.OpenDlg("Alert", ["Attention", "You are not allowed to do this action"]);
	    }
	} catch (e) {
	 alert("PS Acn NOT BIG FISH issue " + e.message);
	}
}