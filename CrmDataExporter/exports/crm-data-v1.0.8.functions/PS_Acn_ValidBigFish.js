function()
{
	//PS_Acn_ValidBigFish
	// HAS DEB 11/10/2021 : Ajouter une hyerlin BIG FISH pour Valider les FIche salon de type A avec un grand potentiel
	try {
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    var vProfValid = "LEAD_NEG;LEAD_PROS;MNG_ACH_OPR";
	    if (vProf == 'ADMT' || vProfValid.indexOf(vProf) != -1) {
	        top.MyApp.OpenDlg("Alert",["Confirmation",  top.MyApp.arrTranslations["Voulez-vous valider le lot detecté BIG FISH ?"],"YesNo"]) ;
	        var bRes = top.MyApp.AppSetting.dlgReturn[0];
	        if(bRes){
	            var nrid = top.MyApp.GetItemValue("AcnNRID");
	            var CpyNrid = top.MyApp.GetItemValue("AcnCpyNRID");
	            var vTit = top.MyApp.GetItemValue("AcnOwner");
	      var strResultat = top.MyApp.ExecuteServerScript(38558385246962, [nrid, "1", "0"]);
	            //var strEmail = top.MyApp.ExecuteServerScript(38148390569666, [CpyNrid]);
	        } else {
	            return false;
	        }
	        //top.MyApp.fraMenuBar.Execute("R_Save");
	        top.MyApp.fraMenuBar.Execute("T_Refresh");
	        top.MyApp.OpenDlg("Alert", ["Attention", "BIG FISH request done ! "]);
	        
	        var arrParams = []
	        arrParams[0] = top.MyApp
	        arrParams[1] = top.bWizard
	        top.MyApp.OpenDlg('38411285297142',arrParams , top, undefined, undefined, undefined, undefined, function (){});
	    } else {
	        top.MyApp.OpenDlg("Alert", ["Attention", "You are not allowed to do this action"]);
	    }
	} catch (e) {
	 alert("PS Acn BIG FISH issue " + e.message);
	}
}