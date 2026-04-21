function PS_Quo_Sht_Export_LigneDet()
{
	
	
	//PS_Quo_Sht_Export_LigneDet => Check Team
	var vTeam = top.MyApp.CustomSetting.Equipe;
	var vTestOzSimulator = top.MyApp.CustomSetting.TestOzSimulator;
	var vTest = "";
	
	var vListTeamOzSimulator = "NEGBRICOLAGEJARDINANIMALERIETUNISIE";
	
	if (vListTeamOzSimulator.indexOf(vTeam) != -1 || vTestOzSimulator == 1) {
	    vTest = "OzSimulator";
	} else {
	    vTest = "SAP";
	}
		if(vTest ==  "SAP")
	{
		// PS SHT EXP
		PS_Opp_SP_AddRoles();
		
		var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER,ASS_CO;MAN_HA_ASS";
		var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
		var vProf = top.MyApp.UserSetting.User.ProfileInitials;
		var vCancelOffer = top.MyApp.GetItemValue("QuoExtRefAR");
		var nrid = top.MyApp.GetItemValue("QuoNRID");
		var vAffair = top.MyApp.GetItemValue("QuoOppReference");
		var vOffer = top.MyApp.GetItemValue("QuoCustReference");
		
		if (vListProfilsValides.indexOf(vProf) == -1 && 
		    vProfNeg.indexOf(vProf) == -1 && 
		    vProf != 'ADMT' && 
		    vProf != 'QUA' && 
		    vProf != 'MNG_ACH_OPR') 
		{
		    top.MyApp.OpenDlg("Alert", ["Attention", "Your are not allowed to move to status T0.\n Request cancelled."]);
		    return false;
		}
		
		// -- Cancel / Replace condition ----------------------------------------------
		if (vCancelOffer == '' || vCancelOffer == null || vCancelOffer == undefined) {
		    var vStrSQL = 
		    "select (select count(1) from sysadm.dc0 " +
		    "        where dc0.xstatoff = '5. Commandée' " +
		    "        and dc0.no_dossier = do0.ref " +
		    "        and template is null) As Count_Offer_Under_SAME_AFFAIR, " +
		    "       (select count(1) from sysadm.dc0 " +
		    "        where dc0.xstatoff = '5. Commandée' " +
		    "        and dc0.no_dossier = do0.xAffairAR " +
		    "        and template is null) As Count_Offer_Under_CR_AFFAIR " +
		    "from sysadm.dc0 " +
		    "inner join sysadm.do0 on do0.nrid = dc0.do0_nrid " +
		    "where dc0.template is null and vos_ref = '" + vOffer + "'";
		
		    var res = top.MyApp.ExecuteServerScript(30231053360342, [vStrSQL]);
		    var objXmlRes = top.MyApp.InitXmlCli(res);
		    var objCountSame = objXmlRes.getElementsByTagName("Count_Offer_Under_SAME_AFFAIR");
		    var objCountCR   = objXmlRes.getElementsByTagName("Count_Offer_Under_CR_AFFAIR");
		    var countSame = 0;
		    var countCR   = 0;
		    if (objCountSame.length > 0) {
		        countSame = parseInt(objCountSame[0].getAttribute("Val") || "0", 10);
		    }
		    if (objCountCR.length > 0) {
		        countCR = parseInt(objCountCR[0].getAttribute("Val") || "0", 10);
		    }
		    var shouldShowCancelReplacePopup = (countSame > 0 || countCR > 0);
		    if (shouldShowCancelReplacePopup) {
		        var arrParams = [];
		        arrParams[0] = top.MyApp;
		        arrParams[1] = top.bWizard;
		        top.MyApp.OpenDlg('43001744544830', arrParams, top, undefined, undefined, undefined, undefined, function() {
		            // Callback executed after dialog is closed
		            proceedWithExport();
		        });
		        // Do not call proceedWithExport here — wait for callback
		        return;
		    }
		}
		// -- End Cancel / Replace condition ------------------------------------------
		
		// If no popup needed, proceed directly
		proceedWithExport();
		
		
		function proceedWithExport() {
		    var vReturn = top.MyApp.ExecuteServerScript(41491953458744, [vAffair, vOffer, "E"]);
		    alert("Sending export result : " + vReturn);
		    if (vReturn.substr(0, 1) == "I") {
		        var strResultat = top.MyApp.ExecuteServerScript(30360107382948, [nrid, "9. A Négocier"]);
		        if (strResultat == true || strResultat == "True") {
		            top.MyApp.fraMenuBar.Execute("T_Refresh");
		            top.MyApp.fraMenuBar.Execute("R_Save");
		            top.MyApp.fraMenuBar.Execute("R_Consult");
		        }
		    }
		}
			}
	else if(vTest ==  "OzSimulator")
	{
		// PS SHT EXP
		PS_Opp_SP_AddRoles();
		
		var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER,ASS_CO;MAN_HA_ASS";
		var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
		var vProf = top.MyApp.UserSetting.User.ProfileInitials;
		var vCancelOffer = top.MyApp.GetItemValue("QuoExtRefAR");
		var nrid = top.MyApp.GetItemValue("QuoNRID");
		var vAffair = top.MyApp.GetItemValue("QuoOppReference");
		var vOffer = top.MyApp.GetItemValue("QuoCustReference");
		
		if (vListProfilsValides.indexOf(vProf) == -1 && 
		    vProfNeg.indexOf(vProf) == -1 && 
		    vProf != 'ADMT' && 
		    vProf != 'QUA' && 
		    vProf != 'MNG_ACH_OPR') 
		{
		    top.MyApp.OpenDlg("Alert", ["Attention", "Your are not allowed to move to status T0.\n Request cancelled."]);
		    return false;
		}
		
		
		// -- Cancel / Replace condition ----------------------------------------------
		if (vCancelOffer == '' || vCancelOffer == null || vCancelOffer == undefined) {
		    var vStrSQL = 
		    "select (select count(1) from sysadm.dc0 " +
		    "        where dc0.xstatoff = '5. Commandée' " +
		    "        and dc0.no_dossier = do0.ref " +
		    "        and template is null) As Count_Offer_Under_SAME_AFFAIR, " +
		    "       (select count(1) from sysadm.dc0 " +
		    "        where dc0.xstatoff = '5. Commandée' " +
		    "        and dc0.no_dossier = do0.xAffairAR " +
		    "        and template is null) As Count_Offer_Under_CR_AFFAIR " +
		    "from sysadm.dc0 " +
		    "inner join sysadm.do0 on do0.nrid = dc0.do0_nrid " +
		    "where dc0.template is null and vos_ref = '" + vOffer + "'";
		
		    var res = top.MyApp.ExecuteServerScript(30231053360342, [vStrSQL]);
		    var objXmlRes = top.MyApp.InitXmlCli(res);
		    var objCountSame = objXmlRes.getElementsByTagName("Count_Offer_Under_SAME_AFFAIR");
		    var objCountCR   = objXmlRes.getElementsByTagName("Count_Offer_Under_CR_AFFAIR");
		    var countSame = 0;
		    var countCR   = 0;
		    if (objCountSame.length > 0) {
		        countSame = parseInt(objCountSame[0].getAttribute("Val") || "0", 10);
		    }
		    if (objCountCR.length > 0) {
		        countCR = parseInt(objCountCR[0].getAttribute("Val") || "0", 10);
		    }
		    var shouldShowCancelReplacePopup = (countSame > 0 || countCR > 0);
		    if (shouldShowCancelReplacePopup) {
		        var arrParams = [];
		        arrParams[0] = top.MyApp;
		        arrParams[1] = top.bWizard;
		        top.MyApp.OpenDlg('43001744544830', arrParams, top, undefined, undefined, undefined, undefined, function() {
		            // Callback executed after dialog is closed
		            proceedWithExport();
		        });
		        // Do not call proceedWithExport here — wait for callback
		        return;
		    }
		}
		// -- End Cancel / Replace condition ------------------------------------------
		
		// If no popup needed, proceed directly
		proceedWithExport();
		
		function proceedWithExport() {
		
		    var vLink =  top.MyApp.CustomSetting.tabGlobalVar.TAQUET_WS + "open-by-offer-nb/" + vOffer;
		    var winName = "win_" + new Date().getTime(); // nom unique
		var vStatus = top.MyApp.GetItemValue("QuoExtStatOff");
		
		    // Vérifier le statut
		    if (vStatus === "1. Valorisé" || vStatus === "1.1 Revalorisée") {
		
		        vLink = vLink + "?mode=export";
		
		        var vReturn = top.MyApp.ExecuteServerScript(42449689158944, [vOffer, "E", nrid]);
		
		        if (vReturn != null && vReturn.includes('Offer successfully')) {
		
		            alert("Offer successfully exported to Oz Simulator");
		
		            var strResultat = top.MyApp.ExecuteServerScript(30360107382948, [nrid, "9. A Négocier"]);
		
		            if (strResultat == true || strResultat == "True") {
		                top.MyApp.fraMenuBar.Execute("T_Refresh");
		
		                window.open(
		                    vLink,
		                    winName,
		                    "channelmode=yes,status=yes,toolbar=yes,scrollbars=yes,resizable=yes,menubar=yes,location=yes"
		                );
		            }
		
		        } else {
		            alert("Error: " + vReturn);
		        }
		
		    } else {
		        // Si statut différent ? ouvrir seulement le lien
		        vLink = vLink +  "?mode=open";
		        window.open(
		            vLink,
		            winName,
		            "channelmode=yes,status=yes,toolbar=yes,scrollbars=yes,resizable=yes,menubar=yes,location=yes"
		        );
		    }
		}
		
		
		
			}
}