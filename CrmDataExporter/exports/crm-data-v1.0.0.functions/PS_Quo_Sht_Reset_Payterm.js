function PS_Quo_Sht_Reset_Payterm()
{
	//PS_Quo_Sht_Reset_Payterm - Quo : Sht Reset payment term
	// HAS DEB 08/03/2023 : réinitiliser le flux de validation de modalité de paiement
	try {
	    if (top.MyApp.CurrentSetting.nChapMode != "Reset") {
	        var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	        var vProfValid = "LEAD_NEG;MNG_ACH_OPR";
	        var vAppelCmd = top.MyApp.GetItemValue("QuoExtAppelCmd");
	        if (vAppelCmd != 1) {
	            if (vProf == 'ADMT' || vProfValid.indexOf(vProf) != -1) {
	                top.MyApp.OpenDlg("Alert", ["Confirmation", top.MyApp.arrTranslations["Voulez-vous réinitialiser le flux de modalité de paiement ?"], "YesNo"]);
	                //top.MyApp.OpenDlg("Alert", ["Confirmation", ["Voulez-vous réinitialiser le flux de modalité de paiement ?"], "YesNo"]);
	                var bRes = top.MyApp.AppSetting.dlgReturn[0];
	                if (bRes) {
	                    var nQuoNrid = top.MyApp.GetItemValue("QuoNRID");
	                    var strResultat = top.MyApp.ExecuteServerScript(40128057476340, [nQuoNrid]);
	                    //top.MyApp.fraMenuBar.Execute("R_Save");
	                    top.MyApp.fraMenuBar.Execute("T_Refresh");
	                    top.MyApp.OpenDlg("Alert", ["Attention", "Payment Term was reset successfully !"]);
	                } else {
	                    return false;
	                }
	            } else {
	                top.MyApp.OpenDlg("Alert", ["Attention", "You are not allowed to do this action"]);
	            }
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Attention", "You are not allowed to do this action. \nPlease contact order department!"]);
	        }
	    }
	} catch (e) {
	    alert("PS Quo Sht Reset PayTerm issue " + e.message);
	}
	// HAS END 08/03/2023 : réinitiliser le flux de validation de modalité de paiement
}