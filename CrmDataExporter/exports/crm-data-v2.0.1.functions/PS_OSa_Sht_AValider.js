function PS_OSa_Sht_AValider()
{
	//A valider
	
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    var vFunction = top.MyApp.UserSetting.User.Function;
	    var vStatut = top.MyApp.GetItemValue("OSaExtStatut");
	    var vListProfilsValides = "MNG_ACH_OPR;LEAD_NEG;ADMT";
	    if (vStatut == 'En préconisation' || vStatut == "A revoir" ) {
	        var vBool = confirm("Êtes-vous sûr?");
	        if (vBool == true) {
	            top.MyApp.SetItemValue("OSaExtStatut", "Demande validation OPS");
	            top.MyApp.fraMenuBar.Execute("R_Save");
	            //top.MyApp.fraMenuBar.Execute("R_Consult");
	        }
	    } else {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Cette fonctionnalité n'est pas accessible à partir de ce statut !! \n Merci de contacter votre administrateur"]);
	    }
	}
}