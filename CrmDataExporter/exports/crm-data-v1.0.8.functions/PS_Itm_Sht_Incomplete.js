function()
{
	
	
	var vProf = top.MyApp.UserSetting.User.ProfileInitials
	
	var vListProfilsValides = "LEAD_NEG;ADMT;ADMF;ADMFT";
	
	
	if (vListProfilsValides.indexOf(vProf) > -1) {
	
	     var vDate = top.MyApp.fctFormatDate(new Date(), top.MyApp.SYSTEM_DATE,  top.MyApp.SYSTEM_DATE ); 
	
	     top.MyApp.SetItemValue("ItmExtStatut","INCOMPLETE");
	     top.MyApp.SetItemValue("ItmExtAuteurIncomplet",top.MyApp.UserSetting.User.Name);
	     top.MyApp.SetItemValue("ItmExtDateIncomplet", vDate);
	console.log(true);
	if (top.MyApp.GetItemValue("ItmExtStatut", top.MyData_View)== "INCOMPLETE") {
	    top.MyApp.SetItem("ItmExtCommentaires", "style.visibility", "", top.MyData_View);
	    top.MyApp.SetItem("ItmExtCommentaires", "parentElement.previousSibling.style.visibility", "");
	    top.MyApp._gfctSetClassName("ItmExtCommentaires", "NM");
	} else {
	    top.MyApp.SetItem("ItmExtCommentaires", "style.visibility", "hidden", top.MyData_View);
	    top.MyApp.SetItem("ItmExtCommentaires", "parentElement.previousSibling.style.visibility", "hidden");
	    top.MyApp._gfctSetClassName("ItmExtCommentaires", "UM");
	}
	
	
	     top.MyApp.fraMenuBar.Execute("R_Save");
	
	}
	else {
	     top.MyApp.OpenDlg("Alert", ["Attention", top.MyApp.arrTranslations["Vous n’êtes pas autorisé à utiliser cette fonctionnalité!!"]]);
	      return false;
	}
	
	return true;
}