function()
{
	//PS_Quo_Sht_Import_LigneDet => Check Team
	var vTeam = top.MyApp.CustomSetting.Equipe;
	var vTestOzSimulator = top.MyApp.CustomSetting.TestOzSimulator;
	var vTest = "";
	
	var vListTeamOzSimulator = "NEGBRICOLAGEJARDINANIMALERIETUNISIE";
	
	if (vListTeamOzSimulator.indexOf(vTeam) != -1 || vTestOzSimulator == 1) {
	    vTest = "OzSimulator";
	} else {
	    vTest = "SAP";
	}
		if(vTest ==  "OzSimulator")
	{
		// PS_Quo_Sht_Import_LigneDet
		var vOffer = top.MyApp.GetItemValue("QuoCustReference");
		var nrid = top.MyApp.GetItemValue("QuoNRID");
		//alert("Calling to import with server function SS_Quo_Call_Exp_Imp for Affair : " + vAffair + " and offer : " +vOffer + ".")
		
		var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER,ASS_CO;MAN_HA_ASS";
		var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
		var vProf = top.MyApp.UserSetting.User.ProfileInitials;
		if (vListProfilsValides.indexOf(vProf) == -1 && vProfNeg.indexOf(vProf) == -1 && vProf != 'ADMT' && vProf != 'QUA' && vProf != 'MNG_ACH_OPR') {
		 top.MyApp.OpenDlg("Alert", ["Attention", "Your are not allowed to do this request!"])
		 return false;
		}
		
		top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["MSG_QUOSTATUS_0005"]]);
		/*
		if (top.MyApp.AppSetting.dlgReturn[0]) {
		 var vReturn = top.MyApp.ExecuteServerScript(42449689158944, [vOffer, "I" , nrid]);
		 alert(vReturn);
		 if (vReturn.substr(0, 1) == "S") {
		    top.MyApp.fraMenuBar.Execute("T_Refresh");
		 }
		}
		*/
		
		if (top.MyApp.AppSetting.dlgReturn[0]) {
		
		    var vReturn = top.MyApp.ExecuteServerScript(42449689158944, [vOffer, "I", nrid]);
		
		    var parts = vReturn.split("|");
		
		    if (parts.length >= 4) {
		
		
		        var data = {
		            status: parts[0],
		            title: parts[1],
		            message: parts[2],
		            action: parts[3]
		        };
		      
		        showNicePopup(data);
		        
		
		        if (data.status === "S") {
		            top.MyApp.fraMenuBar.Execute("T_Refresh");
		        }
		
		    } else {
		        alert(vReturn); // fallback
		    }
		}
				return ;
	}
	else if(vTest ==  "SAP")
	{
		// PS SHT IMP
		var vAffair = top.MyApp.GetItemValue("QuoOppReference");
		var vOffer = top.MyApp.GetItemValue("QuoCustReference");
		//alert("Calling to import with server function SS_Quo_Call_Exp_Imp for Affair : " + vAffair + " and offer : " +vOffer + ".")
		
		var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER,ASS_CO;MAN_HA_ASS";
		var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
		var vProf = top.MyApp.UserSetting.User.ProfileInitials;
		if (vListProfilsValides.indexOf(vProf) == -1 && vProfNeg.indexOf(vProf) == -1 && vProf != 'ADMT' && vProf != 'QUA' && vProf != 'MNG_ACH_OPR') {
		 //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé de passer le statut à ‘négocier’ !! \n Merci de contacter votre administrateur."]]);
		 top.MyApp.OpenDlg("Alert", ["Attention", "Your are not allowed to do this request!"])
		 return false;
		}
		
		top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["MSG_QUOSTATUS_0003"]]);
		//top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_QUOSTATUS_0001"]]);
		if (top.MyApp.AppSetting.dlgReturn[0]) {
		 var vReturn = top.MyApp.ExecuteServerScript(41491953458744, [vAffair, vOffer, "I"]);
		 alert("Import result : " + vReturn);
		 if (vReturn.substr(0, 1) == "I") {
		  top.MyApp.fraMenuBar.Execute("T_Refresh");
		 }
		}
				return ;
	}
}