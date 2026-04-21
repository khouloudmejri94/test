function testdlgYesNo()
{
	top.MyApp.OpenDlg("YesNo", [top.MyApp.arrTranslations["Voulez-vous passer au statut « 2. Négocié » ?"]])
	 if (top.MyApp.AppSetting.dlgReturn[0]) {
	alert('Yes');
	}
	else
	{
	alert('No');
	}
	
	alert('fin');
}