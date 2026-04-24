function Ps_Per_OnAfterInsert()
{
	top.MyApp.OpenDlg("Alert", ["", top.MyApp.arrTranslations["Le Contact a été crée."]]);
	top.MyApp.fraMenuBar.Execute("R_Consult");
	 
		return true;
}