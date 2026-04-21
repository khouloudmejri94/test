function PS_OSa_Sht_Valider()
{
	//Valider
	
	if (top.MyApp.CurrentSetting.nChapMode == "Open") {
	    var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	    var vFunction = top.MyApp.UserSetting.User.Function;
	    var vStatut = top.MyApp.GetItemValue("OSaExtStatut");
	    var vListProfilsValides = "MNG_ACH_OPR;LEAD_NEG;ADMT";
	    if(vStatut == 'En préconisation' ){
	        if (vProf == 'ADMT' || top.MyApp.CustomSetting.AdSalon == '1' || vFunction == 'Directeur operations') {
	            var vBool = confirm("Êtes-vous sûr?");
	            if (vBool == true) {
	                top.MyApp.SetItemValue("OSaExtStatut", "En préparation");
	                top.MyApp.fraMenuBar.Execute("R_Save");
	                top.MyApp.fraMenuBar.Execute("R_Consult");
	            }
	        } else {
	            top.MyApp.OpenDlg("Alert", ["Attention", "Cette fonctionnalité n'est pas dispo que pour votre profil!!"]);
	        }
	    }  else {
	        top.MyApp.OpenDlg("Alert", ["Attention", "Cette fonctionnalité n'est pas accessible à partir de ce statut !! \n Merci de contacter votre administrateur"]);
	    }
	}
}