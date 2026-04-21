function()
{
	/*
	// Initiales du profil attribué à l'utilisateur courant
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var strName = top.MyApp.UserSetting.User.Name;
	
	
	// Les conditions de passage au statut 04. COMPLET
	if (vProf != "NOR" && vProf != "ADMT" ) {
	
	
	 top.MyApp.OpenDlg("Alert", ["Attention", "Only for Norms Prfile"]);
	   return false;
	}else {
	 //PS_All_Acces_Concurrent();
	 top.MyApp.SetItemValue("QuoExtNormsAffectea", strName);
	 top.MyApp.fraMenuBar.Execute("R_Save");
	 //top.MyApp.fraMenuBar.Execute("T_Refresh");
	
	
	}*/
	
	
	
	// Initiales du profil attribué à l'utilisateur courant
	var vProf = top.MyApp.UserSetting.User.ProfileInitials;
	var strName = top.MyApp.UserSetting.User.Name;
	var vFonction = top.MyApp.UserSetting.User.Function;
	
	// Les conditions de passage au statut 04. COMPLET
	if (vProf != "QUA" && vProf != "NOR" && vProf != "ADMT" && vFonction != 'Manager support') {
	
	
	 top.MyApp.OpenDlg("Alert", ["Attention", "Only for Norms Prfile"]);
	 return false;
	} else {
	 top.MyApp.FindItem("QuoExtNormsAffectea").disabled = false;
	 top.MyApp.CurrentSetting.Catalog.QuoExtNormsAffectea.Ed = 1;
	 top.MyApp.SetItem("QuoExtNormsAffectea", "contentEditable", true, top.MyData_View);
	
	 top.MyApp.SetItemValue("QuoExtNormsAffectea", strName);
	
	
	 top.MyApp.FindItem("QuoExtNormsAffectea").disabled = true;
	 top.MyApp.CurrentSetting.Catalog.QuoExtNormsAffectea.Ed = 0;
	 top.MyApp.SetItem("QuoExtNormsAffectea", "contentEditable", false, top.MyData_View);
	
	 top.MyApp.fraMenuBar.Execute("R_Save");
	 //top.MyApp.fraMenuBar.Execute("R_Consult");
	 //top.MyApp.fraMenuBar.Execute("T_Refresh");
	
	
	}
}