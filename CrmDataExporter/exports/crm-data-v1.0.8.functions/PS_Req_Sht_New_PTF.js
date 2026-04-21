function()
{
	if(top.MyApp.MySetting[top.MyApp.MySetting.CurrentData_View].nChapMode !="Open") return false;
	if(top.MyApp.CurrentViewID3 =="30881012489146")
	{
	     //top.MyApp.g_tblWindow.InsertInDlg()
	     top.MyApp.fraData_View.ifrView3.fraData.InsertInDlg();
	}
	else
	{
	     top.MyApp.OpenView("Req","DV",30881012489146,"ifrView3","","");
	     top.MyApp.fraData_View.ifrView3.fraData.InsertInDlg()
	}
}