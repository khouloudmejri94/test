function PS_Cpy_Insertion_Acheteur()
{
	 
	var Personne = top.MyApp.GetItemValue("CpyExtMultiAcht", top.MySetting["Cpy"].Record_XML);
	if(Personne=="")
	{
	     top.OpenDlg("Alert",["Alerte","Vous n'avez pas selectionné un acheteur."]);
	}
	else
	{
	     top.OpenDlg("UserPrompt",["Autre Acheteur :",""]);
	     var vue_acht=top.MyApp.AppSetting.dlgReturn[0];
	
	     
	     if(!vue_acht) vue_acht="";
	     
	     var oArray = [Personne,vue_acht];
	     var vRes = top.MyApp.ExecuteServerScript(29970617350344, oArray);
	     
	     if(vRes == 0) 
	           {top.MyApp.OpenDlg("Alert", ["", "Ressource liée ajoutée."]);}
	     else if(vRes == 1)
	          {top.MyApp.OpenDlg("Alert", ["", "L'equipe existe deja."]);}
	}
		return ;
}