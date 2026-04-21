function SS_Cpy_OnAfterInsert()
{
	top.MyApp.OpenDlg("Alert", ["BRAVO", "Le fournisseur a été mis à jour."]);
	 return true;
		return ;
}