function PS_Opp_DA11()
{
	
	
	//MASAO - 2013
	//Modifs : RLM - 21/08/2013 (nb lignes + controle ligne excel + insert nbre à null + verif champs num)
	//Modifs : RLM - 27/08/2013 (mess d'erreurs apres req SQL + gestion format date sur DLUO)
	//Modifs : RLM MeP- 27/03/2015 (flux GI)
	//Modifs : RLM MeP- 18/05/2015 (flux GI- modif listing)
	if (top.MyApp.CurrentSetting.nChapMode != 'Open')
	    return false;
	var vProfPros = "LEAD_PROS_SEN;LEAD_PROS_JUN;MNG_PROS_SEN;MNG_PROS_ZON;PROS_JUN;PROS_SEN;MNG_PROS_JUN;LEAD_PROS";
	var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	function isValidDate(date) {
	    try {
	        var matches = /^(\d{2})[\/](\d{2})[\/](\d{4})$/.exec(date);
	        if (matches == null)
	            return false;
	        return date;
	    } catch (e) {
	        return false;
	    }
	}
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	var vn = vProf.substr(0, 3)
	if (vProfPros.indexOf(vProf) != -1 || vProfNeg.indexOf(vProf) != -1 || vProf == "ACH_TER" || vProf == "ASS_ACH" || vProf == "GRP_ACH" || vProf == "ACH_SED" || vProf == "MAN_HA_TER" || vProf == "MAN_HA_ASS" || vProf == "ACH_GI" || vProf == "ACH_SED_VEO" || vProf == "MAN_HA_SED_VEO" || vProf == "PROS_VEO" || vProf == "MAN_PROS_VEO" || vProf == "MAN_HA_SED" || vProf == "ASS_CO" || vProf == "MNG_ACH_OPR" || vProf == 'ADMT' || vProf == 'ADMF') {
	    var vStatus = top.MyApp.GetItemValue("OppStatus");
	    //DEBUT FTC@MASAO - MANTIS 14219 - 15/12/2017
	    if (vStatus.substr(0, 2) != "01" && vStatus.substr(0, 2) != "02" && vStatus.substr(0, 2) != "03" && vStatus.substr(0, 2) != "04" && vStatus.substr(0, 2) != "05" && vStatus.substr(0, 2) != "06" && vStatus.substr(0, 2) != "08" && vStatus.substr(0, 2) != "09" && vStatus.substr(0, 2) != "10")
	    //FIN FTC@MASAO - MANTIS 14219 - 15/12/2017
	    {
	        top.MyApp.OpenDlg("Alert", [top.MyApp.arrTranslations["Alerte"], top.MyApp.arrTranslations["Cette fonctionnalité est accessible uniquement au statut « 01. EN CONSTITUTION »!!"]]);
	        return false;
	    }
	
	
	
	 var strURL = top.MyApp.AppSetting.RootPath + "UICache/DynaScreen/" + top.MyApp.UserSetting.User.Database + "/38379449729944.aspx?SID=" + top.MyApp.AppSetting.sstrSID;
	
	 //construction d'un Form pas affiché avec 2 cmhamps hidden , les champs de paramètre commeQuoNRID 
	 top.MyApp.$("body").append("<form id=frmUploadXL name=frmUploadXL enctype='multipart/form-data' method='post' action='" + strURL + "' target=fraRSAsynchronous>"
	 + "<input type=file id='browseCustom' name='browseCustom' style='display:none'><input type='hidden' id='OppNRID' name='OppNRID' ></form>");
	 //passage valeur parametre OppNRID
	 top.MyApp.$("#OppNRID").val(top.MyApp.GetItemValue('OppNRID') );
	 
	 top.MyApp.$("#browseCustom").trigger("click");
	 top.MyApp.$("#browseCustom").change(function ()
	 {
	  top.AppSetting.dlgReturn = [top.MyApp.$("#browseCustom").val(), top.MyApp.$("#OppNRID").val()];
	
	
	   var chemin = top.MyApp.$("#browseCustom").val();
	   if (chemin) {
	     var nrid = top.MyApp.GetItemValue("OppNRID");
	     var parts = chemin.split(".");
	     var extention = parts[(parts.length - 1)];
	     var extention = extention.toUpperCase();
	     if (extention != "XLS" && extention != "XLSX") {
	        top.MyApp.OpenDlg("Alert", [top.MyApp.arrTranslations["Fichier"], "The Purchase Listing must be in Excel format."]);
	        top.MyApp.$("#frmUploadXL").remove();
	        return false;
	   }
	
	    top.MyApp.OpenDlg("Alert", ["Confirmation", top.MyApp.arrTranslations["Vous voulez supprimer les lignes existantes dans cette affaire?"], "YesNo"])
	     if (top.MyApp.AppSetting.dlgReturn[0] == true) {
	      strSQLDelete = "delete from sysadm.xda11 where do0_nrid=" + nrid;
	       var strResultat = top.MyApp.ExecuteServerScript('30231053360342', [strSQLDelete]);
	   }
	
	
	   }
	
	  top.MyApp.frmUploadXL.submit();
	  // fermer le WDS strURL
	   top.MyApp.$("#frmUploadXL").remove();
	});
	
	
	} else {
	    top.MyApp.OpenDlg("Alert", ["Alert", "You are not allowed to use this feature !!"]);
	}
	 
		return true;
}