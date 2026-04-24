function Ps_Per_OnAfterUpdate()
{
	  top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Le Contact a été modifié."]]);
	top.MyApp.fraMenuBar.Execute("R_Consult");
	 
		return true;
}