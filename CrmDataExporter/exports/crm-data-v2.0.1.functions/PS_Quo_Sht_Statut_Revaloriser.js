function PS_Quo_Sht_Statut_Revaloriser()
{
	    
	var vListProfilsValides = "ADMT;ADMF;ADMFT;ACH_TER;ASS_ACH;MAN_HA_TER,ASS_CO;MAN_HA_ASS";
	 var vProfNeg = "LEAD_NEG;NEG_EXP;NEG_SEN;NEG_JUN;NEG_CNF";
	 var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	 if (vListProfilsValides.indexOf(vProf) == -1 && vProfNeg.indexOf(vProf) == -1 && vProf != 'ADMT' && vProf != 'QUA' && vProf != 'MNG_ACH_OPR') {
	  //top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé de passer le statut à ‘négocier’ !! \n Merci de contacter votre administrateur."]]);
	  top.MyApp.OpenDlg("Alert", ["Attention", "Your are not allowed to move to status T0.\n Request cancelled."])
	  return false;
	 }
	
	top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["MSG_QUOSTATUS_0002"]])
	//top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["MSG_QUOSTATUS_0001"]]);
	if (top.MyApp.AppSetting.dlgReturn[0]) {
	    var nrid = top.MyApp.GetItemValue("QuoNRID");
	    //var strResultat = top.MyApp.ExecuteServerScript(30360107382948, [nrid, "8. A Revaloriser"]);
	        top.MyApp.OpenView("Quo" , "FP" , 1000016 , "ifrView2" , true , "");
	        top.MyApp.CurrentSetting.Catalog["QuoExtStatOff"].Ed = 1;
	        top.MyApp.SetItemValue("QuoExtStatOff", "8. A Revaloriser");
	        PS_Quo_Taquet_Status();
	        top.MyApp.CurrentSetting.Catalog["QuoExtStatOff"].Ed = 0
	        /* top.MyApp.fraMenuBar.Execute("T_Refresh");
	        top.MyApp.fraMenuBar.Execute("R_Save");
	        top.MyApp.fraMenuBar.Execute("R_Consult"); */
	    
	}
}