function()
{
	//Script insertion visualisation pour une personne
	//RLM 25/11/2012
	var Personne = top.MyApp.GetItemValue("ResName", top.MySetting["Res"].Record_XML);
	
	if(Personne=="")
	{
	     top.OpenDlg("Alert",["Alerte","Vous n'avez pas selectionné de ressource."]);
	}
	else
	{
	     top.OpenDlg("UserPrompt",["Vue equipe :",""]);
	     var vue_equipe=top.MyApp.AppSetting.dlgReturn[0];
	     top.OpenDlg("UserPrompt",["Vue ressource :",""]);
	     var vue_ressource = top.MyApp.AppSetting.dlgReturn[0];
	     
	     if(!vue_equipe) vue_equipe="";
	     if(!vue_ressource ) vue_ressource ="";
	     
	     var oArray = [Personne,vue_equipe,vue_ressource];
	     var vRes = top.MyApp.ExecuteServerScript(29970617350344, oArray);
	     
	     if(vRes == 0) 
	           {top.MyApp.OpenDlg("Alert", ["", "Ressource liée ajoutée."]);}
	     else if(vRes == 1)
	          {top.MyApp.OpenDlg("Alert", ["", "L'equipe existe deja."]);}
	     else if(vRes == 2)
	           {top.MyApp.OpenDlg("Alert", ["", "La ressource existe deja."]);}
	     else 
	          {top.MyApp.OpenDlg("Alert", ["", "Rien a été ajouté."]);}
	
	
	}
	 
	 
		return true;
}