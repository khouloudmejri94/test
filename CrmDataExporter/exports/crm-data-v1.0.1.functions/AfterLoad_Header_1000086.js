function AfterLoad_Header_1000086()
{
	//Auteur : Pierre-Louis EGAUD
	//Société : Masao
	//Date de création : 31/05/2012
	//Description : si profil différent de Admin, alors pas le droit d'accéder à Ressource => ouverture objet métier Fournisseur
		if(top.MyApp.UserSetting.User.ProfileInitials != 'ADMFT' && top.MyApp.UserSetting.User.ProfileInitials != 'ADMF' && top.MyApp.UserSetting.User.ProfileInitials != 'ADMT' && top.MyApp.UserSetting.User.ProfileInitials != 'ADM_RES')
	{
	  top.MyApp.OpenDlg("Alert",["Alerte","Vous n'avez pas les droits pour accéder à l'objet métier Ressource, vous allez être redirigé vers l'objet métier Fournisseur"]);
	  top.MyApp.OpenData_View('Cpy');
	}
		// ====================================================================
	// GI - Lot 2  #459
	// CBA - 11/01/2016
	// Add a combobox for GI Zone
	// ====================================================================
	if(top.MyApp.CurrentSetting.nChapMode == "Reset")
	{
	     //hide the combobox
	     top.MyApp.SetItem("ResExtGIZone","parentElement.style.visibility","hidden",top.MyData_View);
	     top.MyApp.SetItem("ResExtGIZone","parentElement.previousSibling.style.visibility","hidden",top.MyData_View);
	     
	}
	else
	{
	     //call PS_Res_Header_Status
	     PS_Res_Header_Status(); 
	}
	//check if Team Name is changed and call PS_Res_Header_Status if changed
	var typeHnd = top.MyApp.FindItem("ResTeamName", top.MyData_View);  
	if ((typeHnd))  
	{           
	     top.MyApp.fctAddEvent(typeHnd, "change", PS_Res_Header_Status);
	} 
	 
		return true;
}